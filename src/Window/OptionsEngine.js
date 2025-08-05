class OptionsEngine {
  constructor(events) {
    this.state = {
      name: "",
      image: "",
      data: [], // This needs to be array so when we change whole tree it's passed by reference to tree class
      isEditMode: false,
    };

    this.elem = events.listener;
    this.reloadEvent = events.getEvent("reload");

    this.loadTreesFromDisc().then(this.drawToScreen.bind(this));
  }

  async loadTreesFromDisc() {
    const trees = (await fileHandler.initTrees()).map((tree) => JSON.parse(tree));
    return trees;
  }

  async deleteTreeFromDisc() {
    await fileHandler.deleteFile(this.state.name);
  }

  async updateTreeFromDisc(name, photoPath) {
    await fileHandler.updateFile({ fileName: this.state.name, name, image: photoPath });
  }

  async createFileToDisc(name, photoPath) {
    await fileHandler.createFile(name, photoPath);
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
    this.state.data[0] = trees[0]?.tree || {};

    for (let i = 0; i < trees.length; ++i) {
      const tree = trees[i];
      const isDefault = tree.image.includes("default_user");
      const size = isDefault ? 25 : 45;
      const style = isDefault ? ["null", "null"] : ["custom", "custom-image"];

      const div = document.createElement("div");
      const button = document.createElement("button");
      const p = document.createElement("p");
      const image = new Image(size, size);

      p.textContent = tree.name;
      p.style.wordBreak = "break-word";

      // TODO: this will fail if image dont exist but path to it yes
      image.src = tree.image;

      div.classList.add("current-tree");
      button.classList.add("new-tree", style[0]);
      image.classList.add(style[1]);

      button.addEventListener("click", () => {
        this.state.name = tree.name;
        this.state.image = tree.image;
        this.state.data[0] = tree.tree;
        this.elem.dispatchEvent(this.reloadEvent);
      });

      button.append(image);
      div.append(button);
      div.append(p);
      options.append(div);
    }

    this.elem.dispatchEvent(this.reloadEvent);
  }
}

export default OptionsEngine;
