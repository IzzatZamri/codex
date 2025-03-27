import db from './db'
import { randomUUID } from 'crypto'
import Fuse from 'fuse.js'
import { Character } from '~/types/characters.types'

/**
 * Get all characters, with optional search functionality.
 * @param search (optional) - Search query for filtering characters.
 * @returns List of characters (filtered if search is provided).
 */
export async function getCharacters(search?: string): Promise<Character[]> {
  await db.read()
  let characters = db.data.characters

  if (search) {
    const fuse = new Fuse(characters, {
      keys: ['name', 'fullName', 'nickName', 'description'],
      threshold: 0.3,
    })
    characters = fuse.search(search.toString()).map((result) => result.item)
  }

  return characters
}

/**
 * Get a single character by ID.
 * @param id - Unique ID of the character.
 * @returns The character if found, otherwise null.
 */
export async function getCharacterById(id: string): Promise<Character | null> {
  await db.read()
  return db.data.characters.find((character) => character.id === id) || null
}

/**
 * Create a new character and add it to the database.
 * @param newCharacter - Character data (excluding ID, createdAt, updatedAt).
 * @returns The created character.
 */
export async function createCharacter(
  newCharacter: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Character> {
  await db.read()

  if (!newCharacter.name) throw new Error('Name is required')

  const character: Character = {
    id: randomUUID(),
    name: newCharacter.name,
    description: newCharacter.description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // add other character fields if needed
  }

  db.data.characters.push(character)
  await db.write()

  return character
}

/**
 * Update an existing character by ID.
 * @param id - Unique ID of the character.
 * @param updatedData - Fields to update.
 * @returns The updated character.
 */
export async function updateCharacter(
  id: string,
  updatedData: Partial<Omit<Character, 'id' | 'createdAt'>>
): Promise<Character> {
  await db.read()
  const index = db.data.characters.findIndex((character) => character.id === id)

  if (index === -1) throw new Error('Character not found')

  db.data.characters[index] = {
    ...db.data.characters[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  }
  await db.write()

  return db.data.characters[index]
}

/**
 * Delete a character by ID.
 * @param id - Unique ID of the character.
 * @returns True if deleted, otherwise false.
 */
export async function deleteCharacter(id: string): Promise<boolean> {
  await db.read()
  const index = db.data.characters.findIndex((character) => character.id === id)

  if (index === -1) throw new Error('Character not found')

  db.data.characters.splice(index, 1)
  await db.write()

  return true
}
