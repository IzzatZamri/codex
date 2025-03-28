import { defineEventHandler, readMultipartFormData } from 'h3'
import { createImage, getImages } from './service'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const { search } = event.context.query
    return {
      success: true,
      images: await getImages(search?.toString()),
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
    const tagField = body.find((p) => p.name === 'tag')

    const newImageData = {
      name: nameField?.data.toString() || '',
      description: descriptionField?.data.toString() || '',
      tag: tagField ? JSON.parse(tagField.data.toString()) : [],
      slug: '', // Will be generated automatically.
    }

    const image = await createImage(
      newImageData,
      filePart.data,
      filePart.filename
    )
    return { success: true, image }
  }
})
