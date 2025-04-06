import db from './db'
import { randomUUID } from 'crypto'
import Fuse from 'fuse.js'
import { Character } from '~/types/characters.types'

interface CharacterFilters {
  search?: string
  worldId?: string
  // Add more filter options here in the future
}

/**
 * Get all characters, with optional filters.
 * @param filters (optional) - Object containing filtering options.
 * @returns List of characters (filtered if options are provided).
 */
export async function get(
  filters: CharacterFilters = {}
): Promise<Character[]> {
  await db.read()
  let res = db.data.characters

  // Apply worldId filter (if provided)
  if (filters.worldId) {
    res = res.filter((x) => x.worldId === filters.worldId)
  }

  // Apply search filter using Fuse.js if search term is provided
  if (filters.search) {
    const fuse = new Fuse(res, {
      keys: ['name', 'fullName', 'nickName', 'description'],
      threshold: 0.3,
    })
    res = fuse.search(filters.search).map((result) => result.item)
  }

  return res
}

/**
 * Get a single character by ID.
 * @param id - Unique ID of the character.
 * @returns The character if found, otherwise null.
 */
export async function getById(id: string): Promise<Character | null> {
  await db.read()
  return db.data.characters.find((x) => x.id === id) || null
}

/**
 * Create a new character and add it to the database.
 * @param data - Character data (excluding ID, createdAt, updatedAt).
 * @returns The created character.
 */
export async function create(
  data: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Character> {
  await db.read()

  if (!data.name) throw new Error('Name is required')

  const payload: Character = {
    id: randomUUID(),
    name: data.name,
    description: data.description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Ensure that a type field is added if needed, e.g., type: data.type || 'default'
  }

  db.data.characters.push(payload)
  await db.write()

  return payload
}

/**
 * Update an existing character by ID.
 * @param id - Unique ID of the character.
 * @param data - Fields to update.
 * @returns The updated character.
 */
export async function update(
  id: string,
  data: Partial<Omit<Character, 'id' | 'createdAt'>>
): Promise<Character> {
  await db.read()
  const index = db.data.characters.findIndex((x) => x.id === id)

  if (index === -1) throw new Error('Character not found')

  db.data.characters[index] = {
    ...db.data.characters[index],
    ...data,
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
export async function remove(id: string): Promise<boolean> {
  await db.read()
  const index = db.data.characters.findIndex((x) => x.id === id)

  if (index === -1) throw new Error('Character not found')

  db.data.characters.splice(index, 1)
  await db.write()

  return true
}
