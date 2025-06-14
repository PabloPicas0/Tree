const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("dialog", {
  initTrees: () => ipcRenderer.invoke("initTrees"),
  loadFile: (name) => ipcRenderer.invoke("loadFile", name),
  deleteFile: (name) => ipcRenderer.invoke("deleteFile", name),
});
