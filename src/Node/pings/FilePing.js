import fs from "node:fs/promises";

// const filters = [{ name: "tree", extensions: ["json"] }];

// TODO: add error when operation failed
async function filePing(e, name) {
  const activeTrees = await fs.readdir("./trees");
  const fileNameExists = activeTrees.some((fileName) => fileName === `${name}.json`);

  if (fileNameExists) return;

  return await fs.writeFile(`./trees/${name}.json`, "{}", {});
}

export default filePing;
