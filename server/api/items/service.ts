import db from './db'
import { randomUUID } from 'crypto'
import Fuse from 'fuse.js'
import { Item } from '~/types/items.types'

/**
 * Get all items, with optional search functionality.
 * @param search (optional) - Search query for filtering items.
 * @returns List of items (filtered if search is provided).
 */
export async function getItems(search?: string): Promise<Item[]> {
  await db.read()
  let items = db.data.items

  if (search) {
    const fuse = new Fuse(items, {
      keys: ['name', 'description'],
      threshold: 0.3,
    })
    items = fuse.search(search.toString()).map((result) => result.item)
  }

  return items
}

/**
 * Get a single item by ID.
 * @param id - Unique ID of the item.
 * @returns The item if found, otherwise null.
 */
export async function getItemById(id: string): Promise<Item | null> {
  await db.read()
  return db.data.items.find((item) => item.id === id) || null
}

/**
 * Create a new item and add it to the database.
 * @param newItem - Item data (excluding ID, createdAt, updatedAt).
 * @returns The created item.
 */
export async function createItem(
  newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Item> {
  await db.read()

  if (!newItem.name) throw new Error('Name is required')

  const item: Item = {
    id: randomUUID(),
    name: newItem.name,
    description: newItem.description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  db.data.items.push(item)
  await db.write()

  return item
}

/**
 * Update an existing item by ID.
 * @param id - Unique ID of the item.
 * @param updatedData - Fields to update.
 * @returns The updated item.
 */
export async function updateItem(
  id: string,
  updatedData: Partial<Omit<Item, 'id' | 'createdAt'>>
): Promise<Item> {
  await db.read()
  const index = db.data.items.findIndex((item) => item.id === id)

  if (index === -1) throw new Error('Item not found')

  db.data.items[index] = {
    ...db.data.items[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  }
  await db.write()

  return db.data.items[index]
}

/**
 * Delete an item by ID.
 * @param id - Unique ID of the item.
 * @returns True if deleted, otherwise false.
 */
export async function deleteItem(id: string): Promise<boolean> {
  await db.read()
  const index = db.data.items.findIndex((item) => item.id === id)

  if (index === -1) throw new Error('Item not found')

  db.data.items.splice(index, 1)
  await db.write()

  return true
}
