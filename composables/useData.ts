// composables/useData.ts

// Import both the data and its type directly from the data files.
import { characters, type Character } from '~/content/characters'
// import { races, type Race } from '~/content/races' // Assuming you create this file

// This "database" map links a string key to the actual data array.
const databaseMap = {
  character: characters,
  // race: races,
  // Add other data types here as you create them, e.g., place: places
}

// Define the valid keys for our database map.
export type DataType = keyof typeof databaseMap

// This mapped type will help us infer the correct return type.
// For example, if the input type is 'character', the return type will be 'Character'.
type EntityTypeMap = {
  character: Character
  // race: Race
  // Add other types here
}

/**
 * A generic composable to find any entity from the local database by its type and ID.
 * It uses generics to return a strongly-typed object without needing casting.
 *
 * @param type The type of data to search for (e.g., 'character', 'race').
 * @param id The unique ID of the entity.
 * @returns The typed entity object if found, otherwise undefined.
 */
export const useData = <T extends DataType>(
  type: T,
  id: string
): EntityTypeMap[T] | undefined => {
  // 1. Look up the correct data array using the type.
  const dataStore = databaseMap[type]

  // 2. If the data store doesn't exist, return undefined.
  if (!dataStore) {
    console.warn(`Data type "${type}" is not recognized.`)
    return undefined
  }

  // 3. Find the item in the array with a matching ID.
  // The 'as any' is a safe assertion here because our databaseMap ensures
  // the dataStore's items match the expected return type.
  const item = dataStore.find((entry) => entry.id === id) as any

  return item
}
