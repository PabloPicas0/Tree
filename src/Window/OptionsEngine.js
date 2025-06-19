class TreesEngine {
  constructor() {
    this.state = {
      name: "",
      image: "",
      isEditMode: false,
    };

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

    this.state.name = trees[0]?.name || "";
    this.state.image = trees[0]?.image || "";

    for (let i = 0; i < trees.length; ++i) {
      const div = document.createElement("div");
      const button = document.createElement("button");
      const p = document.createElement("p");
      const image = new Image(25, 25);
      const tree = trees[i];

      p.textContent = tree.name;
      p.style.wordBreak = "break-word";

      // TODO: this will fail if image dont exist but path to it yes
      image.src = tree.image;

      div.classList.add("current-tree");
      button.classList.add("new-tree");

      button.addEventListener("click", () => {
        this.state.name = tree.name;
        this.state.image = tree.image;
      });

      button.append(image);
      div.append(button);
      div.append(p);
      options.append(div);
    }
  }
}

export default TreesEngine;
