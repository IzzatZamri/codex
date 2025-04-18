// ~/server/api/characters/index.ts
import { createCrudHandler } from '../crudHandler'
import service from './service'
import type { Character } from '~/types/characters.types'

export default createCrudHandler<Character>(service)
