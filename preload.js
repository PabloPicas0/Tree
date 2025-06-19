const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fileHandler", {
  initTrees: () => ipcRenderer.invoke("initTrees"),
  createFile: (name, path) => ipcRenderer.invoke("createFile", name, path),
  deleteFile: (name) => ipcRenderer.invoke("deleteFile", name),
  updateFile: (updateContent) => ipcRenderer.invoke("updateFile", updateContent),
});

contextBridge.exposeInMainWorld("dialog", {
  openFilePathDialog: () => ipcRenderer.invoke("openFilePathDialog"),
});
