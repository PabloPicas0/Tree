import CustomEvents from "./src/Window/CustomEvents.js";
import Options from "./src/Window/OptionsFrontend.js";
import TreesEngine from "./src/Window/TreesEngine.js";

const events = new CustomEvents();
events.setEvent("reload");

const options = new Options(events.listener, events.getEvenet("reload"));
const trees = new TreesEngine(options.state.data[0]);
const reloadTree = () => trees.reload(options.state.data[0]);

events.listener.addEventListener("reload", reloadTree);
window.addEventListener("resize", reloadTree);

