import { Characters } from '~/types/characters.types'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import fs from 'fs'
import path from 'path'

const dbDir = path.resolve('./database')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbFilePath = path.join(dbDir, 'characters.json')

const defaultData: Characters = { characters: [] }
const db = new Low<Characters>(
  new JSONFile<Characters>(dbFilePath),
  defaultData
)

async function initDB() {
  await db.read()
  db.data ||= defaultData
  await db.write()
}

initDB()

export default db
