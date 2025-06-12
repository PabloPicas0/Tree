import TreesEngine from "./src/Window/OptionsEngine.js";

const modal = document.querySelector(".modal");
const newTree = document.querySelector(".new-tree");
const form = document.querySelector(".file-picker");
const exitModal = document.querySelector(".exit-modal");

const options = new TreesEngine();

function toggleModal() {
  modal.classList.toggle("modal-off");
}

async function addNewTree(e) {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name").trim();

  if (name === "") return;

  await dialog.loadFile(name);

  options.reload();
}

newTree.addEventListener("click", toggleModal);
exitModal.addEventListener("click", toggleModal);
form.addEventListener("submit", addNewTree);
