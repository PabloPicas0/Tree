const modal = document.querySelector(".modal");
const newTree = document.querySelector(".new-tree");
const form = document.querySelector(".file-picker");

const existingTrees = (await dialog.initTrees()).map((tree) => JSON.parse(tree));

newTree.addEventListener("click", async () => {
  modal.classList.toggle("modal-off");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name").trim();

  if (name === "") return;

  dialog.loadFile(name);
});
