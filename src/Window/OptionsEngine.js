class OptionsEngine {
  constructor() {
    this.existingTrees = this.loadTreesFromDisc().then(this.drawToScreen);
  }

  async loadTreesFromDisc() {
    const trees = (await dialog.initTrees()).map((tree) => JSON.parse(tree));
    return trees;
  }

  drawToScreen(trees) {
    const options = document.querySelector(".created-trees");

    for (let i = 0; i < trees.length; ++i) {
      const div = document.createElement("div");
      const button = document.createElement("button");
      const p = document.createElement("p")
      const image = new Image(25, 25)
      const tree = trees[i];

      p.textContent = tree.name
      image.src = "./assets/default_user.svg";

      div.classList.add("current-tree")
      button.classList.add("new-tree");
    
      button.append(image)
      div.append(button);
      div.append(p)
      options.append(div);
    }
  }
}

export default OptionsEngine;
