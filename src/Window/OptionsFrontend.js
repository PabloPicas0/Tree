import OptionsEngine from "./OptionsEngine.js";

class Options extends OptionsEngine {
  constructor(elem, event) {
    super(elem, event);
    this.modal = document.querySelector(".modal");
    this.newTree = document.querySelector(".new-tree");
    this.form = document.querySelector(".file-picker");
    this.exitModal = document.querySelector(".exit-modal");
    this.treeNameInput = document.querySelector("#tree-name");
    this.treePhotoInput = document.querySelector("#photo");
    this.treePhotoLabel = document.querySelector(".picture-name");
    this.deleteTreeOption = document.querySelector(".delete");
    this.editTreeOption = document.querySelector(".edit");

    this.newTree.addEventListener("click", this.toggleModal.bind(this));
    this.exitModal.addEventListener("click", this.toggleModal.bind(this));
    this.deleteTreeOption.addEventListener("click", this.deleteTree.bind(this));
    this.treePhotoInput.addEventListener("click", this.getPhotoPath.bind(this));
    this.editTreeOption.addEventListener("click", this.editTree.bind(this));
    this.form.addEventListener("submit", this.handleTree.bind(this));
  }

  async getPhotoPath() {
    const path = await dialog.openFilePathDialog();

    if (!path) return;

    this.treePhotoInput.dataset.path = path;
    this.treePhotoLabel.textContent = path.split("\\").at(-1);
  }

  async handleTree(e) {
    e.preventDefault();

    const data = new FormData(this.form);
    const name = data.get("name").trim();
    const photoPath = this.treePhotoInput.dataset.path;

    if (name === "") {
      this.toggleModal();
      return;
    }

    this.state.isEditMode
      ? await super.updateTreeFromDisc(name, photoPath)
      : await super.createFileToDisc(name, photoPath);

    this.toggleModal();
    super.reload();
  }

  async deleteTree() {
    await super.deleteTreeFromDisc();
    super.reload();
  }

  editTree() {
    this.toggleModal();
    this.treePhotoInput.dataset.path = this.state.image;
    this.treePhotoLabel.textContent = this.state.image.split(/\\|\//).at(-1);
    this.treeNameInput.value = this.state.name;
    this.state.isEditMode = true;
  }

  toggleModal() {
    this.modal.classList.toggle("modal-off");
    this.treeNameInput.value = "";
    this.treePhotoLabel.textContent = "";
    this.treePhotoInput.dataset.path = "";
    this.state.isEditMode = false;
  }
}

export default Options;
