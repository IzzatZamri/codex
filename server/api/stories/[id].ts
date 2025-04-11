// ~/server/api/stories/index.ts
import { createCrudHandler } from '../crudHandler'
import service from './service'
import type { Story } from '~/types/stories.types'

export default createCrudHandler<Story>(service)
