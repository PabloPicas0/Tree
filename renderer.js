import CustomEvents from "./src/Window/CustomEvents.js";
import Options from "./src/Window/OptionsFrontend.js";
import TreesEngine from "./src/Window/TreesEngine.js";

// TODO: add CRUD options to all nodes
const events = new CustomEvents();
events.setEvent("reload");

const options = new Options(events);
const trees = new TreesEngine(options.state.data[0]);

events.listener.addEventListener("reload", reloadTree);
options.treeWidthSilider.addEventListener("input", handleSlider);
options.treeHeightSilider.addEventListener("input", handleSlider);
options.addDescendant.addEventListener("click", addDescendant);
options.editNode.addEventListener("click", editnode);

function handleSlider(e) {
  const { valueAsNumber, id } = e.target;
  trees.state[id] = valueAsNumber;
  trees.update();
}

function editnode() {
  const newName = options.newDescendant.value;

  if (newName === "") return;

  trees.state.pickedNode.data.name = newName;
  options.newDescendant.value = "";

  reloadTree();
}

function reloadTree()  {
  const { pickedNode } = trees.state;

  if (pickedNode) trees.updateNode(null, pickedNode);
  
  trees.reload(options.state.data[0]);
};

function addDescendant() {
  const descendant = {
    name: options.newDescendant.value,
    children: [],
  };

  if (descendant.name.trim() === "") return;

  trees.state.pickedNode.data.children.push(descendant);
  options.newDescendant.value = "";

  reloadTree();
}
// window.addEventListener("resize", reloadTree);
