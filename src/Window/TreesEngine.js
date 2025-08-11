// Links:
// https://observablehq.com/@d3/tree/2#data

const { select, tree, hierarchy, ascending, curveStep, link, zoom, zoomIdentity } = d3;

// NOTE: start with oldest known person
class TreesEngine {
  constructor() {
    this.tree = select(".tree");
    this.state = {
      padding: 2,
      lastTransform: null,
      pickedNode: null,
      additionalTreeHeight: 0,
      additionalTreeWidth: 500,
      ...this.getParentSize(),
    };
    this.svg = this.tree.append("svg").attr("id", "tree").attr("width", `100%`).attr("height", `100%`);
    this.zoomHandler = zoom()
      .scaleExtent([-1e100, 1e100])
      .translateExtent([
        [-1e100, -1e100],
        [1e100, 1e100],
      ])
      .on("start", this.#updateCursor)
      .on("end", this.#updateCursor)
      .on("zoom", this.zoomed.bind(this));
    this.treeConstuctor = tree();

    // translateBy on zoom handler prevents shfit to coordinates 0, 0 initially on first mouse drag
    this.svg.call(this.zoomHandler).call(this.zoomHandler.translateBy, this.state.offsetX, this.state.offsetY);
  }

  createTree(data) {
    this.root = hierarchy(data);

    const dx = 90 + this.state.additionalTreeHeight;
    const dy = (this.state.width + this.state.additionalTreeWidth) / (this.root.height + 1);

    this.treeConstuctor.nodeSize([dx, dy]);

    this.root.sort((a, b) => ascending(a.data.name, b.data.name));
    this.treeConstuctor(this.root);

    this.treeContainer = this.svg
      .append("g")
      .attr("class", "tree-container")
      // FIX: On window resize this cause a bug where tree have default position instead of last known
      .attr("transform", `translate(${this.state.offsetX}, ${this.state.offsetY})`);

    this.links = this.treeContainer
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#fafafa")
      .attr("stroke-opacity", 0.7)
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(this.root.links())
      .join("path")
      .attr(
        "d",
        link(curveStep)
          .x((d) => d.y)
          .y((d) => d.x)
      );

    this.nodes = this.treeContainer
      .append("g")
      .attr("stroke-linejoin", "miter")
      .attr("stroke-width", 3)
      .selectAll()
      .data(this.root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    this.nodes.append("circle").attr("fill", "#fff").attr("r", 15).on("click", this.updateNode.bind(this));

    this.nodes
      .append("text")
      .attr("dy", "2.31em")
      .attr("x", 0)
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .attr("stroke", "white")
      .attr("paint-order", "stroke");
  }

  update() {
    const dx = 90 + this.state.additionalTreeHeight;
    const dy = (this.state.width + this.state.additionalTreeWidth) / (this.root.height + 1);

    this.treeConstuctor.nodeSize([dx, dy]);
    this.treeConstuctor(this.root);

    this.links
      .data(this.root.links())
      .join("path")
      .attr(
        "d",
        link(curveStep)
          .x((d) => d.y)
          .y((d) => d.x)
      );

    this.nodes
      .data(this.root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);
  }

  reload(treeData) {
    const { height, width } = this.getParentSize();

    this.state.height = height;
    this.state.width = width;

    let { k, x, y } = this.state.lastTransform;

    this.svg.transition().duration(750).call(this.zoomHandler.transform, zoomIdentity.translate(x, y).scale(k));

    this.destroyGrid();
    this.createTree(treeData);
  }

  destroyGrid() {
    this.svg.selectAll("g").remove();
  }

  getParentSize() {
    const { width, height } = this.tree.node().getBoundingClientRect();
    const padding = 8 * 2;

    return { width: width - padding, height: height - padding, offsetX: 80, offsetY: height / 2 };
  }

  zoomed(event) {
    const { transform } = event;

    this.treeContainer?.attr("transform", transform);
    this.state.lastTransform = transform;
  }

  updateNode(_, d) {
    const selectedNode = select(".selected-node");
    const children = select(".children");

    this.state.pickedNode = d;

    selectedNode.text(`Selected node: ${d.data.name}`);
    children
      .selectAll("li")
      .data(d.data.children)
      .join("li")
      .text((d) => d.name)
  }

  #updateCursor(e) {
    e.sourceEvent?.type === "mousedown" ? (this.style.cursor = "grabbing") : (this.style.cursor = "grab");
  }
}

export default TreesEngine;
