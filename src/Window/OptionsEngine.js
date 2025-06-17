class TreesEngine {
  constructor(deleteTreeOption) {
    this.deleteTreeOption = deleteTreeOption;
    this.loadTreesFromDisc().then(this.drawToScreen.bind(this));
  }

  async loadTreesFromDisc() {
    const trees = (await fileHandler.initTrees()).map((tree) => JSON.parse(tree));
    return trees;
  }

  async reload() {
    // Trees might be needed in constructor
    const newTrees = await this.loadTreesFromDisc();
    
    this.destroyTrees();
    
    // TODO: add error boundry
    if (!newTrees.length) return;

    this.drawToScreen(newTrees);
  }

  destroyTrees() {
    [...document.querySelectorAll(".current-tree")].slice(1).forEach((tree) => tree.remove());
  }

  drawToScreen(trees) {
    const options = document.querySelector(".created-trees");

    this.deleteTreeOption.dataset.name = trees[0]?.name;
    this.deleteTreeOption.dataset.image = trees[0]?.image
    
    for (let i = 0; i < trees.length; ++i) {
      const div = document.createElement("div");
      const button = document.createElement("button");
      const p = document.createElement("p");
      const image = new Image(25, 25);
      const tree = trees[i];

      p.textContent = tree.name;
      p.style.wordBreak = "break-word";
      image.src = tree.image

      div.classList.add("current-tree");
      button.classList.add("new-tree");

      button.addEventListener("click", () => {
        this.deleteTreeOption.dataset.name = tree.name;
        this.deleteTreeOption.dataset.image = tree.image
      });

      button.append(image);
      div.append(button);
      div.append(p);
      options.append(div);
    }
  }
}

export default TreesEngine;
