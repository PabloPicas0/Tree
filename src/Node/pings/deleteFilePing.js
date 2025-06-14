import fs from "node:fs/promises";

async function deleteFilePing(e, name) {
  const activeTrees = await fs.readdir("./trees");
  const fileNameExists = activeTrees.some((fileName) => fileName === `${name}.json`);

  // If name in file content is different than file name scan files to find that name
  if (!fileNameExists) {
    const paths = activeTrees.map((file) => `.\\trees\\${file}`);
    const data = await Promise.all(paths.map((path) => fs.readFile(path, { encoding: "utf-8" })));
    const filesContent = data.map((tree) => JSON.parse(tree));
    // console.log(filesContent);

    for (let i = 0; i < filesContent.length; ++i) {
      if (filesContent[i].name === name) {
        await fs.rm(paths[i]);
        return;
      }
    }

    // TODO: add error boundry as well 
    return
  }

  const fileToDelete = `./trees/${name}.json`;

  await fs.rm(fileToDelete);
}

export default deleteFilePing;
