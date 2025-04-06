import { defineEventHandler, readMultipartFormData } from 'h3'
import { create, get } from './service'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { search } = event.context.query
    return {
      success: true,
      datas: await get(search?.toString()),
    }
  } else if (event.node.req.method === 'POST') {
    // Read multipart form data. Ensure you have multipart parsing enabled.
    const body = await readMultipartFormData(event)
    if (!body) throw new Error('No form data provided')

    // Expecting fields: file, name, description, tag, slug (optional)
    const filePart = body.find((p) => p.name === 'file')
    if (!filePart) throw new Error('File is required')

    // Parse fields from the form.
    const nameField = body.find((p) => p.name === 'name')
    const descriptionField = body.find((p) => p.name === 'description')
    const tagField = body.find((p) => p.name === 'tags')

    const data = {
      name: nameField?.data.toString() || '',
      description: descriptionField?.data.toString() || '',
      tags: tagField ? JSON.parse(tagField.data.toString()) : [],
      slug: '', // Will be generated automatically.
    }

    const image = await create(data, filePart.data, filePart.filename)
    return { success: true, data: image }
  }
})
