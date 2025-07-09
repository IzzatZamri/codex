// composables/useAllData.ts

// Import all your data sources
import { characters, type Character } from '~/content/characters'
// import { races, type Race } from '~/content/races'

// This "database" map links a string key to the actual data array.
const databaseMap = {
  character: characters,
  // race: races,
  // Add other data types here as you create them
}

// Define the valid keys for our database map.
export type DataTypes = keyof typeof databaseMap

// This mapped type will help us infer the correct return type for a list.
type EntityListTypeMap = {
  character: Character[]
  // race: Race[]
  // Add other types here
}

// --- Overloaded Function Signatures ---
// This tells TypeScript what to expect for different inputs.

// Signature 1: If no 'type' is provided, it returns an array of strings (the keys).
export function useAllData(): DataTypes[]

// Signature 2: If a 'type' is provided, it returns the corresponding array of entities.
export function useAllData<T extends DataTypes>(type: T): EntityListTypeMap[T]

// --- Function Implementation ---
export function useAllData<T extends DataTypes>(type?: T) {
  // If no type is provided, return all available keys from the database map.
  // This is for your main index page to list links like "Characters", "Races", etc.
  if (!type) {
    return Object.keys(databaseMap) as DataTypes[]
  }

  // If a type is provided, return the entire corresponding data array.
  // This is for a category index page, like listing all characters.
  const dataStore = databaseMap[type]
  if (!dataStore) {
    console.warn(`Data type "${type}" is not recognized.`)
    return [] // Return an empty array if the type is invalid
  }

  return dataStore
}
