import fs from "node:fs/promises"

async function initTrees() {
  const files = await fs.readdir("./trees");

  if (!files.length) return [];

  const paths = files.map((file) => `.\\trees\\${file}`);
  const data = await Promise.all(paths.map((path) => fs.readFile(path, { encoding: "utf-8" })));
  
  return data;
}

export default initTrees
