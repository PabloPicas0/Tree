import { app, ipcMain } from "electron";

import createFilePing from "./src/Node/pings/createFilePing.js";
import initTrees from "./src/Node/pings/initTreesPing.js";
import createWindow from "./src/Window/createWindow.js";
import deleteFilePing from "./src/Node/pings/deleteFilePing.js";
import openFilePathDialogPing from "./src/Node/pings/openFilePathDialogPing.js";

function handlePings() {
  ipcMain.handle("initTrees", initTrees);
  ipcMain.handle("createFile", createFilePing);
  ipcMain.handle("deleteFile", deleteFilePing);
  // ipcMain.handle("updateFile", updateFilePing)
  ipcMain.handle("openFilePathDialog", openFilePathDialogPing);
}

app.whenReady().then(() => {
  createWindow()
  handlePings();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
