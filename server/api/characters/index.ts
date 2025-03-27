import { defineEventHandler, readBody } from 'h3'
import { getCharacters, createCharacter } from './service'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { search } = getQuery(event)
    return {
      success: true,
      characters: await getCharacters(search?.toString()),
    }
  } else if (event.node.req.method === 'POST') {
    const newData = await readBody(event)
    return { success: true, character: await createCharacter(newData) }
  }
})
