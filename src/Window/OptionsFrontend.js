import OptionsEngine from "./OptionsEngine.js";

class Options extends OptionsEngine {
  constructor(events) {
    super(events);
    this.modal = document.querySelector(".modal");
    this.newTree = document.querySelector(".new-tree");
    this.form = document.querySelector(".file-picker");
    this.exitModal = document.querySelector(".exit-modal");
    this.treeNameInput = document.querySelector("#tree-name");
    this.treePhotoInput = document.querySelector("#photo");
    this.treePhotoLabel = document.querySelector(".picture-name");
    this.deleteProfileOption = document.querySelector(".delete");
    this.editProfileOption = document.querySelector(".edit");
    this.treeWidthSilider = document.querySelector("#additionalTreeWidth");
    this.treeHeightSilider = document.querySelector("#additionalTreeHeight");
    this.newDescendant = document.querySelector("#add-chldren-input");
    this.addDescendant = document.querySelector(".add-children");
    this.editNode = document.querySelector(".edit-children");
    this.deleteNode = document.querySelector(".delete-children");
    this.accordionButtons = document.querySelectorAll(".toggle-accordion-btn");
    this.accordions = document.querySelectorAll(".accordion");
    this.carrets = document.querySelectorAll(".carret");

    this.accordionButtons.forEach((btn, idx) =>
      btn.addEventListener("click", () => this.toggleAccordions(this.accordions[idx], this.carrets[idx]))
    );

    this.newTree.addEventListener("click", this.toggleModal.bind(this));
    this.exitModal.addEventListener("click", this.toggleModal.bind(this));
    this.deleteProfileOption.addEventListener("click", this.deleteTree.bind(this));
    this.treePhotoInput.addEventListener("click", this.getPhotoPath.bind(this));
    this.editProfileOption.addEventListener("click", this.editTree.bind(this));
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
      ? await super.updateTreeFromDisc({ name, image: photoPath })
      : await super.createFileToDisc(name, photoPath);

    this.toggleModal();
    super.reload();
  }

  async deleteTree() {
    const userAgreed = confirm("Do you want to delete this tree ?");

    if (!userAgreed) return;

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

  toggleAccordions(accordion, carret) {
    accordion.classList.toggle("accordion-on");
    carret.classList.toggle("carret-on");
  }

  disableOptions(disabled) {
    if (disabled) {
      this.accordions.forEach((accordion) => accordion.classList.remove("accordion-on"));
      this.carrets.forEach((carret) => carret.classList.remove("carret-on"));
    }
    
    this.accordionButtons.forEach((btn) => (btn.disabled = disabled));
    this.editProfileOption.disabled = disabled;
    this.deleteProfileOption.disabled = disabled;
  }
}

export default Options;
