import { dialog } from "electron";

const filters = [{ name: "Images", extensions: ["jpg", "png", "gif", "svg"] }];

async function openFilePathDialogPing() {
  const path = await dialog.showOpenDialog({ filters: filters, properties: ["openFile"] });

  if (path.canceled) return null

  return path.filePaths[0]
}

export default openFilePathDialogPing
