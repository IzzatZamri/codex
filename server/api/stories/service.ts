// ~/server/api/stories/service.ts
import { createGenericCrudService } from '../crudServiceFactory'
import type { Story } from '~/types/stories.types'

const storyService = createGenericCrudService<Story>('stories')
export default storyService
