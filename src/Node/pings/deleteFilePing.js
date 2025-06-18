import { rm, readdir, readFile } from "node:fs/promises";

const defaultUser = "./assets/default_user.svg";

async function deleteFilePing(e, name, imageToDelete) {
  const activeTrees = await readdir("./trees");
  const fileNameExists = activeTrees.some((fileName) => fileName === `${name}.json`);
  const isDefaultImage = imageToDelete === defaultUser;

  // If name in file content is different than file name scan files to find that name
  if (!fileNameExists) {
    const paths = activeTrees.map((file) => `.\\trees\\${file}`);
    const data = await Promise.all(paths.map((path) => readFile(path, { encoding: "utf-8" })));
    const filesContent = data.map((tree) => JSON.parse(tree));
    // console.log(filesContent);

    for (let i = 0; i < filesContent.length; ++i) {
      if (filesContent[i].name === name) {
        if (isDefaultImage) {
          await rm(paths[i]);
          return;
        }

        await Promise.all(rm(paths[i]), rm(imageToDelete));
        return;
      }
    }

    // TODO: add error boundry as well
    return;
  }

  const fileToDelete = `./trees/${name}.json`;

  if (isDefaultImage) {
    await rm(fileToDelete);
    return;
  }

  await Promise.all([rm(fileToDelete), rm(imageToDelete)]);
}

export default deleteFilePing;
