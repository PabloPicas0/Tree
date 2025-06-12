class TreesEngine {
  constructor() {
    this.loadTreesFromDisc().then(this.drawToScreen);
  }

  async loadTreesFromDisc() {
    const trees = (await dialog.initTrees()).map((tree) => JSON.parse(tree));
    return trees;
  }

  async reload() {
    // Trees might be needed in constructor
    const newTrees = await this.loadTreesFromDisc();

    // TODO: add error boundry
    if (!newTrees.length) return;

    this.destroyTrees();
    this.drawToScreen(newTrees);
  }

  destroyTrees() {
    [...document.querySelectorAll(".current-tree")].slice(1).forEach((tree) => tree.remove());
  }

  drawToScreen(trees) {
    const options = document.querySelector(".created-trees");

    for (let i = 0; i < trees.length; ++i) {
      const div = document.createElement("div");
      const button = document.createElement("button");
      const p = document.createElement("p");
      const image = new Image(25, 25);
      const tree = trees[i];

      p.textContent = tree.name;
      image.src = "./assets/default_user.svg";

      div.classList.add("current-tree");
      button.classList.add("new-tree");

      button.append(image);
      div.append(button);
      div.append(p);
      options.append(div);
    }
  }
}

export default TreesEngine;
