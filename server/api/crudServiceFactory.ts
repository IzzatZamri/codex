// ~/server/api/crudServiceFactory.ts
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

// Ensure the database directory exists.
const dbDir = path.resolve('./database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

async function initDB(collectionKey: string) {
  // Dynamically set the database file path based on the collectionKey.
  const dbFilePath = path.join(dbDir, `${collectionKey}.json`)
  // Provide an empty array as the default value.
  const db = new Low<any[]>(new JSONFile<any[]>(dbFilePath), [])

  await db.read()

  // Ensure db.data is an array. If not, reinitialize it.
  if (!db.data || !Array.isArray(db.data)) {
    db.data = []
    await db.write()
  }
  return db
}

// Constrain T to have at least `id` and `slug`.
export function createGenericCrudService<
  T extends { id: string; slug: string }
>(collectionKey: string) {
  return {
    async get(filters?: any): Promise<T[]> {
      const db = await initDB(collectionKey)
      const items: T[] = db.data || []
      // Optionally add filtering logic here based on filters.
      return items
    },

    async getById(id: string): Promise<T | null> {
      const db = await initDB(collectionKey)
      const items: T[] = db.data || []
      return items.find((item) => item.id === id) || null
    },

    async getBySlug(slug: string): Promise<T | null> {
      const db = await initDB(collectionKey)
      const items: T[] = db.data || []
      return items.find((item) => item.slug === slug) || null
    },

    async create(data: Partial<T>): Promise<T> {
      const db = await initDB(collectionKey)
      const now = new Date().toISOString()
      // Construct a new item with default fields.
      const newItem: T & { id: string; createdAt: string; updatedAt: string } =
        {
          id: randomUUID(),
          createdAt: now,
          updatedAt: now,
          ...data,
        } as any

      db.data.push(newItem)
      await db.write()
      return newItem
    },

    async update(id: string, data: Partial<T>): Promise<T> {
      const db = await initDB(collectionKey)
      const items: T[] = db.data || []
      const index = items.findIndex((item) => item.id === id)
      if (index === -1) throw new Error('Item not found')
      items[index] = {
        ...items[index],
        ...data,
        updatedAt: new Date().toISOString(),
      }
      await db.write()
      return items[index]
    },

    async remove(id: string): Promise<boolean> {
      const db = await initDB(collectionKey)
      const items: T[] = db.data || []
      const index = items.findIndex((item) => item.id === id)
      if (index === -1) throw new Error('Item not found')
      items.splice(index, 1)
      await db.write()
      return true
    },
  }
}
