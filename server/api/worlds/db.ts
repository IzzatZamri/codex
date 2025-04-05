import { Worlds } from '~/types/worlds.types'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'
import path from 'path'

const dbDir = path.resolve('./database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbFilePath = path.join(dbDir, 'worlds.json')

const defaultData: Worlds = { worlds: [] }
const db = new Low<Worlds>(new JSONFile<Worlds>(dbFilePath), defaultData)

async function initDB() {
  await db.read()
  db.data ||= defaultData
  await db.write()
}

initDB()

export default db
