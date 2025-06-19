import { writeFile, readFile } from "node:fs/promises";
import isFilePresent from "../../utils/isFilePresent.js";

// const filters = [{ name: "tree", extensions: ["json"] }];

// TODO: add error when operation failed
async function createFilePing(e, name, photoPath) {
  const isNotPhotoIncluded = photoPath === "";
  const fileNameExists = await isFilePresent("./trees", name)

  if (fileNameExists) return;

  const savedPhotoPath = isNotPhotoIncluded ? "./assets/default_user.svg" : photoPath;
  const saveFilePath = `./trees/${name}.json`;

  const newFileContent = {
    name,
    image: savedPhotoPath,
    options: {},
    tree: {},
  };

  const initial = JSON.stringify(newFileContent);

  await writeFile(saveFilePath, initial, "utf-8");
}

async function copyImage(pathToRead, pathToWrite) {
  const image = await readFile(pathToRead);
  await writeFile(pathToWrite, image);
}

export default createFilePing;
