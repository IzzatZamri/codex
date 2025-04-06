import MarkdownIt from 'markdown-it'

// A simple cache object to store previously fetched API data
const apiCache: Record<string, any> = {}

export default function conversationPlugin(md: any) {
  // Function to call the API based on the alias
  async function fetchApiData(alias: string) {
    // If we have already fetched the data for this alias, return it from the cache
    if (apiCache[alias]) {
      console.log(`Using cached data for ${alias}`)
      return apiCache[alias]
    }

    // Otherwise, fetch the data from the API (example endpoint)
    const url = `/api/${alias}` // Assuming API endpoint is based on alias
    try {
      const response = await fetch(url)
      const data = await response.json()

      // Store the fetched data in the cache
      apiCache[alias] = data
      console.log(`Fetched new data for ${alias}`)
      return data
    } catch (error) {
      console.error(`Failed to fetch data for ${alias}`, error)
      return null
    }
  }

  // Custom rule to process the conversation block
  function conversationBlockRule(state: any, silent: any) {
    const start = state.pos
    const src = state.src.slice(start)

    // Regex to identify the conversation block
    const regex = /^\+\+\+conversation([\s\S]*?)\+\+\+/m
    const match = regex.exec(src)

    if (!match) return false

    // If silent mode, just check for the match
    if (silent) {
      return true
    }

    // Process the matched conversation content
    const conversationContent = match[1].trim()

    // Updated Regex to match lines like [[[alias]]] (optional): content!
    const conversationLineRegex =
      /\[\[\[([^\]]+)\]\]\]\s*(?:\(([^\)]+)\))?:\s*(.*?)(?=\n|$)/g
    let matchContent
    const tokens = []

    // Process all conversation lines within the block
    while (
      (matchContent = conversationLineRegex.exec(conversationContent)) !== null
    ) {
      let alias = matchContent[1].trim()
      let urlString = matchContent[1].trim()
      // let search:string[] = []
      const optional = matchContent[2] ? matchContent[2].trim() : null // Optional part (e.g., whisper)
      const content = matchContent[3].trim()

      if (alias.includes('|')) {
        const parts = alias.split('|')
        // search = [parts[0].trim()]
        urlString = parts[0].trim()
        alias = parts[1].trim()
      } else if (alias.includes(',')) {
        // search = [parts[0].trim()]
        alias = alias
          .split(',')
          .map((x) => {
            if (!x.includes(':')) {
              return x
            }
            return x.split(':')[x.split(':').length - 1].trim()
          })
          .join(', ')
      } else if (alias.includes(':')) {
        // search = [parts[0].trim()]
        console.log(
          'alias',
          alias,
          alias.split(':'),
          alias.split(':')[alias.split(':').length - 1]
        )
        alias = alias.split(':')[alias.split(':').length - 1].trim()
      }

      let url: any = []
      if (urlString.includes(',')) {
        url = urlString
          .split(',')
          .filter((x) => {
            return x.includes(':')
          })
          .map((x) => x.replaceAll(':', '/').trim())
      } else if (urlString.includes(':')) {
        url = [urlString.replaceAll(':', '/').trim()]
      }

      // // Fetch the API data for the alias (if not cached)
      // fetchApiData(search).then((data) => {
      //   if (data) {
      //     // Process the API data (you can store it in the token or elsewhere as needed)
      //     // console.log(`Data for ${search}:`, data)
      //   } else {
      //     // console.log(`No data for ${search}`)
      //   }
      // })

      // Create a token for each conversation line
      const token = state.push('conversation', '', 0)
      token.content = content
      token.meta = { alias, optional, content, url }

      // Add the token to the tokens array
      tokens.push(token)
    }

    // Increment state.line to account for the lines we just processed
    state.line = state.pos + match[0].length

    return true
  }

  // Register our custom rule before the default 'fence' rule
  md.block.ruler.before('fence', 'conversation', conversationBlockRule)

  // Define how to render the conversation token
  md.renderer.rules.conversation = function (tokens: any, idx: any) {
    const token = tokens[idx]
    const alias = token.meta.optional
      ? `${token.meta.alias} (${token.meta.optional})`
      : token.meta.alias
    // Return the HTML rendering for each conversation line
    return `<div class="conversation" url="${token.meta.url}"><strong>${alias}:</strong> ${token.content}</div>`
  }
}
