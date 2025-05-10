import { v4 as uuidv4, validate as validateUuid } from 'uuid'

export function useUuid() {
  const isValidUUID = (uuid: string): boolean => validateUuid(uuid)
  const generateUUID = (): string => uuidv4()

  return {
    isValidUUID,
    generateUUID,
  }
}
