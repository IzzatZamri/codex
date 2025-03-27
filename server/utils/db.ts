import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'
import path from 'path'

// Ensure database directory exists
const dbDir = path.resolve('./database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbFilePath = path.join(dbDir, 'db.json')

// Define database structure
type Data = { items: Record<string, any>[] }

// Provide a default structure for the database
const defaultData: Data = { items: [] }

// Initialize LowDB with JSON storage and default data
const db = new Low<Data>(new JSONFile<Data>(dbFilePath), defaultData)

// Initialize database
async function initDB() {
  await db.read()
  db.data ||= defaultData
  await db.write()
}

initDB()

export default db
