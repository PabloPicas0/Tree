const modal = document.querySelector(".modal");
const newTree = document.querySelector(".new-tree");
const form = document.querySelector(".file-picker");

const existingTrees = (await dialog.initTrees()).map((tree) => JSON.parse(tree));

newTree.addEventListener("click", async () => {
  modal.classList.toggle("modal-off");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(new FormData(form).get("name"));
});
