import { readdir } from "node:fs/promises";

async function isFilePresent(path, name) {
  const activeTrees = await readdir(path);
  return activeTrees.some((fileName) => fileName === `${name}.json`);
}


export default isFilePresent