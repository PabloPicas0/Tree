import { writeFile, readFile, rename } from "node:fs/promises";

async function updateFilePing(e, update) {
  const { fileName, name } = update;
  const updateKeys = Object.keys(update).slice(1);
  const filePath = `./trees/${fileName}.json`;
  const fileToUpdate = JSON.parse(await readFile(filePath, { encoding: "utf-8" }));

  updateKeys.forEach((key) => (fileToUpdate[key] = update[key]));

  await writeFile(filePath, JSON.stringify(fileToUpdate), "utf-8");

  if (name) {
    const newName = `./trees/${name}.json`;
    rename(filePath, newName);
  }
}

export default updateFilePing;
