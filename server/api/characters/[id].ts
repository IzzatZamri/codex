import { defineEventHandler, readBody } from 'h3'
import { getById, update, remove } from './service'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    return { success: false, message: 'ID is required' }
  }

  if (event.node.req.method === 'GET') {
    return { success: true, data: await getById(id) }
  } else if (event.node.req.method === 'PUT') {
    const data = await readBody(event)
    return { success: true, data: await update(id, data) }
  } else if (event.node.req.method === 'DELETE') {
    return { success: true, deleted: await remove(id) }
  }
})
