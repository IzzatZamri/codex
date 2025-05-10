// ./plugins/randomNumber.ts
import MarkdownIt from 'markdown-it'
import randomNumberTemplate from './template.html?raw'

export default function randomNumberPlugin(md: any) {
  function randomNumberRule(state: any, silent: any) {
    const start = state.pos
    const src = state.src.slice(start)
    // Pattern: "#{random(min,max)}"
    const regex = /^#\{random\((\d+),(\d+)\)\}/
    const match = regex.exec(src)
    if (!match) return false

    if (!silent) {
      const min = parseInt(match[1], 10)
      const max = parseInt(match[2], 10)
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
      // Create a token with the computed random number
      const token = state.push('random_number', '', 0)
      token.content = randomNumber.toString()
      token.meta = { min, max }
    }
    state.pos += match[0].length
    return true
  }

  // Add our rule before the 'emphasis' rule.
  md.inline.ruler.before('emphasis', 'random_number', randomNumberRule)

  // Define how to render the custom token using the imported template.
  md.renderer.rules.random_number = function (tokens: any, idx: any) {
    // Here you could perform simple string interpolation.
    // For example, replacing a placeholder like {{ content }} in your template.
    let tpl = randomNumberTemplate
    tpl = tpl.replace('{{ content }}', tokens[idx].content)
    return tpl
  }
}
