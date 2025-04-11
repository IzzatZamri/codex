import { defineEventHandler, readBody, getQuery } from 'h3'
import { get, create } from './service'

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method?.toUpperCase()
    const query = getQuery(event)

    switch (method) {
      case 'GET': {
        // Pass the entire query object to get(), so you can later expand filtering
        const data = await get(query)
        return {
          success: true,
          datas: data,
        }
      }
      case 'POST': {
        const newData = await readBody(event)
        // Optionally: add validation logic here for newData
        const createdData = await create(newData)
        return {
          success: true,
          data: createdData,
        }
      }
      default:
        event.node.res.statusCode = 405
        return {
          success: false,
          error: 'Method not allowed',
        }
    }
  } catch (error: any) {
    // Optional: Log the error or add more error context
    event.node.res.statusCode = 500
    return {
      success: false,
      error: error.message || 'Internal Server Error',
    }
  }
})
