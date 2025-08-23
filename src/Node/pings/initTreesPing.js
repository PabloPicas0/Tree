import fs from "node:fs/promises";

async function initTrees() {
  const path = "./trees";

  try {
    const files = await fs.readdir(path);

    if (!files.length) return [];

    const paths = files.map((file) => `.\\trees\\${file}`);
    const data = await Promise.all(paths.map((path) => fs.readFile(path, { encoding: "utf-8" })));

    return data;
  } catch (error) {
    fs.mkdir(path);

    return [];
  }
}

export default initTrees;
