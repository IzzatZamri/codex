import db from './db'
import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'
import type { ImageRecord } from '~/types/images.types.ts'

const imgFolder = path.resolve('./database/img')
if (!fs.existsSync(imgFolder)) {
  fs.mkdirSync(imgFolder, { recursive: true })
}

/**
 * Get all images, with optional search.
 * @param search (optional) - Search query to filter images by name, description, tags, or slug.
 * @returns List of image records.
 */
export async function get(search?: string): Promise<ImageRecord[]> {
  await db.read()
  let data = db.data.images

  if (search) {
    // You can use Fuse.js here for fuzzy search if desired.
    data = data.filter(
      (x) =>
        x.name.includes(search) ||
        x.description.includes(search) ||
        x.slug.includes(search) ||
        x.tags.some((x) => x.includes(search))
    )
  }

  return data
}

/**
 * Get an image record by its ID.
 * @param id - Unique image ID.
 * @returns The image record if found, otherwise null.
 */
export async function getById(id: string): Promise<ImageRecord | null> {
  await db.read()
  return db.data.images.find((x) => x.id === id) || null
}

/**
 * Create a new image record and save the uploaded file.
 * @param data - Image data (excluding id, createdAt, updatedAt).
 * @param fileBuffer - Buffer of the uploaded file.
 * @param originalName - Original filename.
 * @returns The created image record.
 */
export async function create(
  data: Omit<ImageRecord, 'id' | 'createdAt' | 'updatedAt'>,
  fileBuffer: Buffer,
  originalName?: string
): Promise<ImageRecord> {
  await db.read()

  if (!data.name) throw new Error('Image name is required')

  const id = randomUUID()
  const slug = id.slice(0, 8) // Simple slug from uuid
  const now = new Date().toISOString()

  // Rename file using uuid + original name
  const newFilename = `${id}`
  const filePath = path.join(imgFolder, newFilename)
  fs.writeFileSync(filePath, fileBuffer)

  const payload: ImageRecord = {
    id,
    name: data.name,
    description: data.description || '',
    tags: data.tags || [],
    slug,
    createdAt: now,
    updatedAt: now,
  }

  db.data.images.push(payload)
  await db.write()

  return payload
}

/**
 * Update an existing image record by ID.
 * @param id - Unique image ID.
 * @param data - Fields to update.
 * @returns The updated image record.
 */
export async function update(
  id: string,
  data: Partial<Omit<ImageRecord, 'id' | 'createdAt'>>
): Promise<ImageRecord> {
  await db.read()
  const index = db.data.images.findIndex((x) => x.id === id)
  if (index === -1) throw new Error('Image not found')

  db.data.images[index] = {
    ...db.data.images[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  await db.write()
  return db.data.images[index]
}

/**
 * Delete an image record by ID.
 * @param id - Unique image ID.
 * @returns True if deleted, otherwise false.
 */
export async function remove(id: string): Promise<boolean> {
  await db.read()
  const index = db.data.images.findIndex((x) => x.id === id)
  if (index === -1) throw new Error('Image not found')

  // Optionally delete the file from the img folder.
  // const fileRecord = db.data.images[index]
  // fs.unlinkSync(path.join(imgFolder, fileRecord.filename))

  db.data.images.splice(index, 1)
  await db.write()
  return true
}
