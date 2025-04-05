import { defineEventHandler, readBody } from 'h3'
import { get, create } from './service'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { search } = getQuery(event)
    return { success: true, items: await get(search?.toString()) }
  } else if (event.node.req.method === 'POST') {
    const data = await readBody(event)
    return { success: true, item: await create(data) }
  }
})
