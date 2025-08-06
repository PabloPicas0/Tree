import CustomEvents from "./src/Window/CustomEvents.js";
import Options from "./src/Window/OptionsFrontend.js";
import TreesEngine from "./src/Window/TreesEngine.js";

const events = new CustomEvents();
events.setEvent("reload");

const options = new Options(events);
const trees = new TreesEngine(options.state.data[0]);
const reloadTree = () => trees.reload(options.state.data[0]);
const handleChange = (e) => {
  const { valueAsNumber, id } = e.target;
  trees.state[id] = valueAsNumber;
  trees.update();
};

events.listener.addEventListener("reload", reloadTree);
options.treeWidthSilider.addEventListener("input", handleChange);
options.treeHeightSilider.addEventListener("input", handleChange);
// window.addEventListener("resize", reloadTree);