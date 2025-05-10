// ~/server/api/tags/index.ts
import { createCrudHandler } from '../crudHandler'
import service from './service'
import type { Tag } from '~/types/tags.types'

export default createCrudHandler<Tag>(service)
