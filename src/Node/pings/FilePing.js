import fs from "node:fs/promises";

// const filters = [{ name: "tree", extensions: ["json"] }];

// TODO: add error when operation failed
async function filePing(e, name) {
  const activeTrees = await fs.readdir("./trees");
  const fileNameExists = activeTrees.some((fileName) => fileName === `${name}.json`);

  if (fileNameExists) return;

  const newFileContent = {
    name,
    image: "",
    options: {},
    tree: {},
  };
  const initial = JSON.stringify(newFileContent);

  return await fs.writeFile(`./trees/${name}.json`, initial, "utf-8");
}

export default filePing;
