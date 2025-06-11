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
  });

  window.loadFile(indexPath);
  window.webContents.openDevTools();
  window.setMenu(null);
}

export default createWindow;
