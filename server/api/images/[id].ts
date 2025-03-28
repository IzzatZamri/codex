import { defineEventHandler, readBody } from 'h3'
import { getImageById, updateImage, deleteImage } from './service'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) {
    return { success: false, message: 'ID is required' }
  }

  if (event.node.req.method === 'GET') {
    return { success: true, image: await getImageById(id) }
  } else if (event.node.req.method === 'PUT') {
    const updatedData = await readBody(event)
    return { success: true, image: await updateImage(id, updatedData) }
  } else if (event.node.req.method === 'DELETE') {
    return { success: true, deleted: await deleteImage(id) }
  }
})
