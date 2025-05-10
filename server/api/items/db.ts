import { Items } from '~/types/items.types'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'
import path from 'path'

const dbDir = path.resolve('./database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbFilePath = path.join(dbDir, 'items.json')

const defaultData: Items = { items: [] }
const db = new Low<Items>(new JSONFile<Items>(dbFilePath), defaultData)

async function initDB() {
  await db.read()
  db.data ||= defaultData
  await db.write()
}

initDB()

export default db
