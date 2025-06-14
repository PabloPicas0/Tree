import fs from "node:fs/promises";

// const filters = [{ name: "tree", extensions: ["json"] }];

// TODO: add error when operation failed
async function loadFilePing(e, name) {
  const activeTrees = await fs.readdir("./trees");
  const fileNameExists = activeTrees.some((fileName) => fileName === `${name}.json`);

  if (fileNameExists) return;

  const saveFilePath = `./trees/${name}.json`

  const newFileContent = {
    name,
    image: "",
    options: {},
    tree: {},
  };
  const initial = JSON.stringify(newFileContent);

  return await fs.writeFile(saveFilePath, initial, "utf-8");
}

export default loadFilePing;
