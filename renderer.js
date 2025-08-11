import CustomEvents from "./src/Window/CustomEvents.js";
import Options from "./src/Window/OptionsFrontend.js";
import TreesEngine from "./src/Window/TreesEngine.js";

const events = new CustomEvents();
events.setEvent("reload");

const options = new Options(events);
const trees = new TreesEngine(options.state.data[0]);

events.listener.addEventListener("reload", reloadTree);
options.treeWidthSilider.addEventListener("input", handleSlider);
options.treeHeightSilider.addEventListener("input", handleSlider);
options.addDescendant.addEventListener("click", addDescendant);
options.editNode.addEventListener("click", editNode);
options.deleteNode.addEventListener("click", deleteNode);

function handleSlider(e) {
  const { valueAsNumber, id } = e.target;
  trees.state[id] = valueAsNumber;
  trees.update();
}

function reloadTree() {
  const { pickedNode } = trees.state;

  if (pickedNode) trees.updateNode(null, pickedNode);

  trees.reload(options.state.data[0]);
}

function editNode() {
  const newName = options.newDescendant.value;

  if (newName === "" || !trees.state.pickedNode) return;

  trees.state.pickedNode.data.name = newName;
  options.newDescendant.value = "";
  options.newDescendant.focus();

  reloadTree();
}

function deleteNode() {
  const { pickedNode } = trees.state;
  
  if (!pickedNode) return;
  
  const userAgreed = confirm(`Do you want to delete all nodes starting from ${pickedNode.data.name} ?`)

  if (!userAgreed) return;

  pickedNode.data.children = [];
  reloadTree();
}

function addDescendant() {
  const descendant = {
    name: options.newDescendant.value,
    children: [],
  };

  if (descendant.name.trim() === "") return;

  trees.state.pickedNode.data.children.push(descendant);
  options.newDescendant.value = "";
  options.newDescendant.focus()

  reloadTree();
}
// window.addEventListener("resize", reloadTree);
