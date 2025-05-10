import db from './db'
import { randomUUID } from 'crypto'
import Fuse from 'fuse.js'
import { World } from '~/types/worlds.types'

/**
 * Get all worlds, with optional search functionality.
 * @param search (optional) - Search query for filtering worlds.
 * @returns List of worlds (filtered if search is provided).
 */
export async function get(search?: string): Promise<World[]> {
  await db.read()
  let res = db.data.worlds

  if (search) {
    const fuse = new Fuse(res, {
      keys: ['name', 'description'],
      threshold: 0.3,
    })
    res = fuse.search(search.toString()).map((result) => result.item)
  }

  return res
}

/**
 * Get a single world by ID.
 * @param id - Unique ID of the world.
 * @returns The world if found, otherwise null.
 */
export async function getById(id: string): Promise<World | null> {
  await db.read()
  return db.data.worlds.find((x) => x.id === id) || null
}

/**
 * Get a single world by slug.
 * @param slug - Unique slug of the world.
 * @returns The world if found, otherwise null.
 */
export async function getBySlug(slug: string): Promise<World | null> {
  await db.read()
  return db.data.worlds.find((x) => x.slug === slug) || null
}

/**
 * Create a new world and add it to the database.
 * @param data - world data (excluding ID, createdAt, updatedAt).
 * @returns The created world.
 */
export async function create(
  data: Omit<World, 'id' | 'createdAt' | 'updatedAt'>
): Promise<World> {
  await db.read()

  if (!data.name) throw new Error('Name is required')

  const payload: World = {
    id: randomUUID(),
    name: data.name,
    description: data.description || '',
    slug: data.slug || '',
    tags: data.tags || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  db.data.worlds.push(payload)
  await db.write()

  return payload
}

/**
 * Update an existing world by ID.
 * @param id - Unique ID of the world.
 * @param data - Fields to update.
 * @returns The updated world.
 */
export async function update(
  id: string,
  data: Partial<Omit<World, 'id' | 'createdAt'>>
): Promise<World> {
  await db.read()
  const index = db.data.worlds.findIndex((x) => x.id === id)

  if (index === -1) throw new Error('Data not found')

  db.data.worlds[index] = {
    ...db.data.worlds[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  await db.write()

  return db.data.worlds[index]
}

/**
 * Delete a world by ID.
 * @param id - Unique ID of the world.
 * @returns True if deleted, otherwise false.
 */
export async function remove(id: string): Promise<boolean> {
  await db.read()
  const index = db.data.worlds.findIndex((x) => x.id === id)

  if (index === -1) throw new Error('Data not found')

  db.data.worlds.splice(index, 1)
  await db.write()

  return true
}
