// ~/server/api/crudHandler.ts
import { defineEventHandler, getQuery, readBody } from 'h3'
import { useUuid } from '~/composables/useUuid'

export interface CrudService<T> {
  get: (filters?: any) => Promise<T[]>
  getById: (id: string) => Promise<T | null>
  getBySlug: (slug: string) => Promise<T | null>
  create: (data: any) => Promise<T>
  update: (id: string, data: any) => Promise<T>
  remove: (id: string) => Promise<boolean>
}

/**
 * Generic CRUD handler that:
 * - Supports collection-level methods for GET (list) and POST (create)
 * - Supports resource-level methods for GET, PUT, DELETE where the ID parameter
 *   may be either a UUID or a slug.
 */
export function createCrudHandler<T>(service: CrudService<T>) {
  return defineEventHandler(async (event) => {
    try {
      const method = event.node.req.method?.toUpperCase()
      const identifier = event.context.params?.id // Could be ID or slug
      const { isValidUUID } = useUuid()

      if (identifier) {
        if (method === 'GET') {
          // Check if identifier is a valid UUID; if not, treat it as a slug.
          const data = isValidUUID(identifier)
            ? await service.getById(identifier)
            : await service.getBySlug(identifier)
          return { success: true, data }
        } else if (method === 'PUT') {
          const body = await readBody(event)
          const data = await service.update(identifier, body)
          return { success: true, data }
        } else if (method === 'DELETE') {
          const deleted = await service.remove(identifier)
          return { success: true, deleted }
        } else {
          event.node.res.statusCode = 405
          return { success: false, error: 'Method not allowed' }
        }
      } else {
        // Collection-level endpoint (no identifier provided)
        if (method === 'GET') {
          const query = getQuery(event)
          const data = await service.get(query)
          return { success: true, data: data }
        } else if (method === 'POST') {
          const body = await readBody(event)
          const data = await service.create(body)
          return { success: true, data }
        } else {
          event.node.res.statusCode = 405
          return { success: false, error: 'Method not allowed' }
        }
      }
    } catch (error: any) {
      event.node.res.statusCode = 500
      return {
        success: false,
        error: error.message || 'Internal Server Error',
      }
    }
  })
}
