const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("dialog", {
  initTrees: () => ipcRenderer.invoke("initTrees"),
  loadFile: () => ipcRenderer.invoke("file"),
});
