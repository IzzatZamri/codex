// ~/server/api/characters/service.ts
import { createGenericCrudService } from '../crudServiceFactory'
import type { Character } from '~/types/characters.types'

const characterService = createGenericCrudService<Character>('characters')
export default characterService
