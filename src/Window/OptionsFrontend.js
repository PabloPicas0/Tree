import TreesEngine from "./OptionsEngine.js";

class Trees extends TreesEngine {
  constructor() {
    super();
    this.modal = document.querySelector(".modal");
    this.newTree = document.querySelector(".new-tree");
    this.form = document.querySelector(".file-picker");
    this.exitModal = document.querySelector(".exit-modal");
    this.treeNameInput = document.querySelector("#tree-name");
    this.treePhotoInput = document.querySelector("#photo");
    this.deleteTreeOption = document.querySelector(".delete");
    this.editTreeOption = document.querySelector(".edit");

    this.newTree.addEventListener("click", this.toggleModal.bind(this));
    this.exitModal.addEventListener("click", this.toggleModal.bind(this));
    this.deleteTreeOption.addEventListener("click", this.deleteTree.bind(this));
    this.treePhotoInput.addEventListener("click", this.getPhotoPath.bind(this));
    this.editTreeOption.addEventListener("click", this.editTree.bind(this));
    this.form.addEventListener("submit", this.addNewTree.bind(this));
  }

  async getPhotoPath() {
    const path = await dialog.openFilePathDialog();

    if (!path) return;
    // this.treePhotoInput.value = this.treePhotoInput.textContent + " " + path;
    this.treePhotoInput.dataset.path = path;
  }

  async addNewTree(e) {
    e.preventDefault();

    const data = new FormData(this.form);
    const name = data.get("name").trim();
    const photoPath = this.treePhotoInput.dataset.path;

    if (name === "") {
      this.toggleModal();
      return;
    }

    this.state.isEditMode
      ? await fileHandler.updateFile({ fileName: this.state.name, name, image: photoPath })
      : await fileHandler.createFile(name, photoPath);

    this.toggleModal();
    super.reload();
  }

  async deleteTree() {
    const name = this.state.name;

    await fileHandler.deleteFile(name);

    super.reload();
  }

  editTree() {
    this.toggleModal();
    this.treePhotoInput.dataset.path = this.state.image;
    this.treeNameInput.value = this.state.name;
    this.state.isEditMode = true;
  }

  toggleModal() {
    this.modal.classList.toggle("modal-off");
    this.treeNameInput.value = "";
    this.treePhotoInput.dataset.path = "";
    this.state.isEditMode = false;
  }
}

export default Trees;
