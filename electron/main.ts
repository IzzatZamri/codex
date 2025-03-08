// electron/main.ts
import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Enable Node integration if you need it
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // In development mode, load the Nuxt dev server.
  // In production, load the built Nuxt app from the .output folder.
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../.output/public/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
