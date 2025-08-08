import CustomEvents from "./src/Window/CustomEvents.js";
import Options from "./src/Window/OptionsFrontend.js";
import TreesEngine from "./src/Window/TreesEngine.js";

const events = new CustomEvents();
events.setEvent("reload");

const options = new Options(events);
const trees = new TreesEngine(options.state.data[0]);

const reloadTree = () => trees.reload(options.state.data[0]);
events.listener.addEventListener("reload", reloadTree);
options.treeWidthSilider.addEventListener("input", handleSlider);
options.treeHeightSilider.addEventListener("input", handleSlider);
options.addDescendant.addEventListener("click", addDescendant);

function handleSlider(e) {
  const { valueAsNumber, id } = e.target;
  trees.state[id] = valueAsNumber;
  trees.update();
}

function addDescendant() {
  const descendant = {
    name: options.newDescendant.value,
    children: [],
  };

  if (descendant.name.trim() === "") return;

  trees.state.pickedNode.data.children.push(descendant);
  options.newDescendant.value = "";

  reloadTree();
  trees.updateNode(null, trees.state.pickedNode)
}
// window.addEventListener("resize", reloadTree);
