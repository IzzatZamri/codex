import { defineEventHandler, readBody } from 'h3'
import { getItems, createItem } from './service'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { search } = getQuery(event)
    return { success: true, items: await getItems(search?.toString()) }
  } else if (event.node.req.method === 'POST') {
    const newItem = await readBody(event)
    return { success: true, item: await createItem(newItem) }
  }
})
