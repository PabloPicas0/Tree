import { BrowserWindow } from "electron";
import path from "node:path";

const indexPath = "index.html";
const preloadPath = "preload.js";

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 960,
    backgroundColor: "#fafafa",
    webPreferences: { preload: path.join(import.meta.dirname + "../../../", preloadPath) },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#fff",
      height: 30,
    },
  });

  window.loadFile(indexPath);
  window.webContents.openDevTools()
  window.setMenu(null);
}

export default createWindow;
