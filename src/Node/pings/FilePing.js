import fs from "node:fs/promises";

// const filters = [{ name: "tree", extensions: ["json"] }];

async function filePing(e, name) {
  return await fs.writeFile(`./trees/${name}.json`, "{}");
}

export default filePing;
