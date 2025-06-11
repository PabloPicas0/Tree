import { app, ipcMain } from "electron";

import filePing from "./src/Node/pings/FilePing.js";
import initTrees from "./src/Node/pings/initTreesPing.js";
import createWindow from "./src/Window/createWindow.js";

function handlePings() {
  ipcMain.handle("file", filePing);
  ipcMain.handle("initTrees", initTrees);
}

app.whenReady().then(() => {
  createWindow()
  handlePings();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
