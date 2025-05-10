import type { Images } from '~/types/images.types.ts'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'
import path from 'path'

const dbDir = path.resolve('./database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbFilePath = path.join(dbDir, 'img.json')
const defaultData: Images = { images: [] }
const db = new Low<Images>(new JSONFile<Images>(dbFilePath), defaultData)

async function initDB() {
  await db.read()
  db.data ||= defaultData
  await db.write()
}

initDB()

export default db
