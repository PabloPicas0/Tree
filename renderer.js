import CustomEvents from "./src/Window/CustomEvents.js";
import Options from "./src/Window/OptionsFrontend.js";
import TreesEngine from "./src/Window/TreesEngine.js";

const events = new CustomEvents();
events.setEvent("reload");

const options = new Options(events);
const trees = new TreesEngine();

events.listener.addEventListener("reload", reloadTree);
options.treeWidthSilider.addEventListener("input", handleSlider);
options.treeHeightSilider.addEventListener("input", handleSlider);
options.addDescendant.addEventListener("click", addDescendant);
options.newDescendant.addEventListener("keypress", (e) => (e.key === "Enter" ? addDescendant(e) : null));
options.editNode.addEventListener("click", editNode);
options.deleteNode.addEventListener("click", deleteNode);

function handleSlider(e) {
  const { valueAsNumber, id } = e.target;
  trees.state[id] = valueAsNumber;
  trees.update();
}

function reloadTree() {
  const { currentTree } = options.state;
  const isNoData = Object.keys(currentTree).length === 0;

  if (isNoData) {
    trees.destroy();
    options.disableOptions(true);
    return;
  }

  const { pickedNode } = trees.state;

  if (pickedNode) {
    options.updateTreeFromDisc({ tree: currentTree });
    trees.updateNode(null, pickedNode);
  }

  trees.reload(currentTree);
  options.disableOptions(false);
}

function editNode() {
  const newName = options.newDescendant.value;
  const isRoot = trees.state.pickedNode.data.name === "root";

  if (newName === "" || isRoot || !trees.state.pickedNode) return;

  trees.state.pickedNode.data.name = newName;
  options.newDescendant.value = "";
  options.newDescendant.focus();

  reloadTree();
}

function deleteNode() {
  const { pickedNode } = trees.state;

  if (!pickedNode) return;

  const userAgreed = confirm(`Do you want to delete all nodes starting from ${pickedNode.data.name} ?`);

  if (!userAgreed) return;

  pickedNode.data.children = [];
  reloadTree();
}

function addDescendant(e) {
  const descendant = {
    name: options.newDescendant.value,
    children: [],
  };

  if (descendant.name.trim() === "" || !trees.state.pickedNode) return;

  const { children } = trees.state.pickedNode.data;

  if (e.type === "click" && children.length) {
    descendant.children = children.splice(0, Infinity)
  }

  children.push(descendant);
  options.newDescendant.value = "";
  options.newDescendant.focus();

  reloadTree();
}
// window.addEventListener("resize", reloadTree);
