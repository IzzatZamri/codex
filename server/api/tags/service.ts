// ~/server/api/tags/service.ts
import { createGenericCrudService } from '../crudServiceFactory'
import type { Tag } from '~/types/tags.types'

const tagService = createGenericCrudService<Tag>('tags')
export default tagService
