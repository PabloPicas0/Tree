import TreesEngine from "./OptionsEngine.js";

class Trees extends TreesEngine {
  constructor(deleteTreeOption) {
    super(deleteTreeOption);
    this.modal = document.querySelector(".modal");
    this.newTree = document.querySelector(".new-tree");
    this.form = document.querySelector(".file-picker");
    this.exitModal = document.querySelector(".exit-modal");
    this.treeNameInput = document.querySelector("#tree-name");
    this.treePhotoInput = document.querySelector("#photo");

    this.newTree.addEventListener("click", this.toggleModal.bind(this));
    this.exitModal.addEventListener("click", this.toggleModal.bind(this));
    this.deleteTreeOption.addEventListener("click", this.deleteTree.bind(this));
    this.treePhotoInput.addEventListener("click", this.getPhotoPath.bind(this));
    this.form.addEventListener("submit", this.addNewTree.bind(this));
  }

  async getPhotoPath() {
    const path = await dialog.openFilePathDialog();

    if (!path) return

    // this.treePhotoInput.value = this.treePhotoInput.textContent + " " + path;
    this.treePhotoInput.dataset.path = path
  }

  async addNewTree(e) {
    e.preventDefault();

    const data = new FormData(this.form);
    const name = data.get("name").trim();
    const photoPath = this.treePhotoInput.dataset.path

    if (name === "") {
      this.toggleModal();
      return;
    }

    await fileHandler.createFile(name, photoPath);

    this.toggleModal();
    super.reload();
  }

  async deleteTree() {
    const name = this.deleteTreeOption.dataset.name;

    await fileHandler.deleteFile(name);
    super.reload();
  }

  toggleModal() {
    this.modal.classList.toggle("modal-off");
    this.treeNameInput.value = "";
    this.treePhotoInput.dataset.path = ""
  }
}

export default Trees;
