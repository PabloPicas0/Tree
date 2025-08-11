import { app, ipcMain } from "electron";

import createFilePing from "./src/Node/pings/createFilePing.js";
import initTrees from "./src/Node/pings/initTreesPing.js";
import createWindow from "./src/Window/createWindow.js";
import deleteFilePing from "./src/Node/pings/deleteFilePing.js";
import openFilePathDialogPing from "./src/Node/pings/openFilePathDialogPing.js";
import updateFilePing from "./src/Node/pings/updateFilePing.js";

const pings = [
  { name: "initTrees", pingFn: initTrees },
  { name: "createFile", pingFn: createFilePing },
  { name: "deleteFile", pingFn: deleteFilePing },
  { name: "updateFile", pingFn: updateFilePing },
  { name: "openFilePathDialog", pingFn: openFilePathDialogPing },
];

app.whenReady().then(() => {
  createWindow();
  pings.forEach((ping) => ipcMain.handle(ping.name, ping.pingFn));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
