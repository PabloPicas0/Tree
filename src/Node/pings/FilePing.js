import fs from "node:fs/promises";
import { dialog } from "electron";

const filters = [{ name: "tree", extensions: ["json"] }];

async function filePing() {
  const files = await dialog.showOpenDialog({ properties: ["openFile", "multiSelections"], filters });

  if (files.canceled || !files.filePaths.length) {
    return null;
  }

  console.log(files);
  return await fs.readFile(files.filePaths[0], { encoding: "utf-8" });
}

export default filePing;
