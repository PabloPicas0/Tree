const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("dialog", {
  initTrees: () => ipcRenderer.invoke("initTrees"),
  loadFile: (name) => ipcRenderer.invoke("file", name),
});
