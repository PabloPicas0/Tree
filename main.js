import { app, ipcMain } from "electron";

import loadFilePing from "./src/Node/pings/loadFilePing.js";
import initTrees from "./src/Node/pings/initTreesPing.js";
import createWindow from "./src/Window/createWindow.js";
import deleteFilePing from "./src/Node/pings/deleteFilePing.js";

function handlePings() {
  ipcMain.handle("loadFile", loadFilePing);
  ipcMain.handle("deleteFile", deleteFilePing);
  ipcMain.handle("initTrees", initTrees);
}

app.whenReady().then(() => {
  createWindow()
  handlePings();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
