import { readdir, writeFile, readFile } from "node:fs/promises";

// const filters = [{ name: "tree", extensions: ["json"] }];

// TODO: add error when operation failed
async function createFilePing(e, name, photoPath) {
  const activeTrees = await readdir("./trees");
  const fileNameExists = activeTrees.some((fileName) => fileName === `${name}.json`);
  const isNotPhotoIncluded = photoPath === "";

  if (fileNameExists) return;

  const imageExtension = photoPath.split(".").at(-1);
  const savedPhotoPath = isNotPhotoIncluded ? "./assets/default_user.svg" : `./assets/${name}.${imageExtension}`;
  const saveFilePath = `./trees/${name}.json`;

  const newFileContent = {
    name,
    image: savedPhotoPath,
    options: {},
    tree: {},
  };

  const initial = JSON.stringify(newFileContent);

  if (!isNotPhotoIncluded)
    return await Promise.all([writeFile(saveFilePath, initial, "utf-8"), copyImage(photoPath, savedPhotoPath)]);

  return await writeFile(saveFilePath, initial, "utf-8");
}

async function copyImage(pathToRead, pathToWrite) {
  const image = await readFile(pathToRead);
  await writeFile(pathToWrite, image);
}

export default createFilePing;
