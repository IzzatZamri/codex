import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createWindow(): void {
  console.log('Creating window...')
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  console.log(process.env.NODE_ENV, 'environment')
  console.log(__dirname, 'dirname')
  if (process.env.NODE_ENV === 'development') {
    console.log('Loading URL: http://localhost:3000')
    mainWindow.loadURL('http://localhost:3000')
  } else {
    console.log(
      'Loading file:',
      join(__dirname, '../.output/public/index.html')
    )
    mainWindow.loadFile(join(__dirname, '../.output/public/index.html'))
  }

  mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    console.log('Window is ready to show')
    mainWindow.show()
  })
}

app.whenReady().then(() => {
  console.log('App is ready')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
