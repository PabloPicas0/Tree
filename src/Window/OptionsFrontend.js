import TreesEngine from "./OptionsEngine.js";

class Trees extends TreesEngine {
  constructor(deleteTreeOption) {
    super(deleteTreeOption);
    this.modal = document.querySelector(".modal");
    this.newTree = document.querySelector(".new-tree");
    this.form = document.querySelector(".file-picker");
    this.exitModal = document.querySelector(".exit-modal");
    this.treeNameInput = document.querySelector("#tree-name");

    this.newTree.addEventListener("click", this.toggleModal.bind(this));
    this.exitModal.addEventListener("click", this.toggleModal.bind(this));
    this.form.addEventListener("submit", this.addNewTree.bind(this));
    this.deleteTreeOption.addEventListener("click", this.deleteTree.bind(this));
  }

  async addNewTree(e) {
    e.preventDefault();

    const data = new FormData(this.form);
    const name = data.get("name").trim();

    if (name === "") {
      this.toggleModal();
      return;
    }

    await dialog.loadFile(name);

    this.toggleModal();
    super.reload();
  }

  async deleteTree() {
    const name = this.deleteTreeOption.dataset.name;

    await dialog.deleteFile(name);
    super.reload();
  }

  toggleModal() {
    this.modal.classList.toggle("modal-off");
    this.treeNameInput.value = "";
  }
}

export default Trees;
