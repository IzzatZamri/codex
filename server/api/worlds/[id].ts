import { defineEventHandler, readBody } from 'h3'
import { getById, getBySlug, update, remove } from './service'
import { useUuid } from '~/composables/useUuid'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const { isValidUUID } = useUuid()

  if (!id) {
    return { success: false, message: 'ID is required' }
  }

  if (event.node.req.method === 'GET') {
    const data = isValidUUID(id) ? await getById(id) : await getBySlug(id)
    return { success: true, data }
  } else if (event.node.req.method === 'PUT') {
    const data = await readBody(event)
    return { success: true, data: await update(id, data) }
  } else if (event.node.req.method === 'DELETE') {
    return { success: true, deleted: await remove(id) }
  }
})
