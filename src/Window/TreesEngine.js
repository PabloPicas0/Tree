// Links:
// https://observablehq.com/@d3/tree/2#data

import { BigTree, smallTree } from "./dummyData.js";

const { select, scaleLinear, axisBottom, axisLeft, tree, hierarchy, ascending, curveStep, link, zoom } = d3;

// NOTE: start with oldest known person
// TODO: on resize scale is reseted
class TreesEngine {
  constructor() {
    this.treeElem = select(".tree");

    this.treeState = {
      ...this.getParentSize(),
      padding: 2,
      data: BigTree,
    };

    this.svg = this.treeElem.append("svg").attr("id", "tree").attr("width", `100%`).attr("height", `100%`);

    this.createGrid();
    this.createTree();

    // This need to be set after function calls
    // Because functions create elements that are selectable 
    this.treeContainer = select(".tree-container");

    window.addEventListener("resize", this.resizeGrid.bind(this));
  }

  createTree() {
    const root = hierarchy(this.treeState.data);

    const dx = 50;
    const dy = this.treeState.width / (root.height + 1);
    let x0 = Infinity;
    let x1 = -Infinity;

    const treeConstuctor = tree().nodeSize([dx, dy]);

    root.sort((a, b) => ascending(a.data.name, b.data.name));

    treeConstuctor(root);

    root.each((descendant) => {
      if (descendant.x > x1) x1 = descendant.x;
      if (descendant.x < x0) x0 = descendant.x;
    });

    // const height = x1 - x0 + dx * 2;
    // const width = x1 - x0 + dy * 2;
    // this.svg.attr("viewBox", [0, 0, this.treeState.width + 500, height]);
    const [xMid, yMid] = [this.treeState.width / 2, this.treeState.height / 2];
    const container = this.svg.append("g").attr("class", "tree-container").attr("transform", `translate(${80}, ${yMid})`);

    container
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#fafafa")
      .attr("stroke-opacity", 0.7)
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr(
        "d",
        link(curveStep)
          .x((d) => d.y)
          .y((d) => d.x)
      );

    const node = container
      .append("g")
      .attr("stroke-linejoin", "miter")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle").attr("fill", "#fff").attr("r", 2.5);

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -6 : 6))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .attr("stroke", "white")
      .attr("paint-order", "stroke");
  }

  resizeGrid() {
    const { height, width } = this.getParentSize();

    this.treeState.height = height;
    this.treeState.width = width;

    this.destroyGrid();
    this.createGrid();
    this.createTree();

    // After redraw node needs to be updated 
    // To this currently on screen
    this.treeContainer = select(".tree-container");
  }

  destroyGrid() {
    this.svg.selectAll("g").remove();
  }

  getParentSize() {
    const { width, height } = this.treeElem.node().getBoundingClientRect();
    const padding = 8 * 2;

    return { width: width - padding, height: height - padding };
  }

  createGrid() {
    const { padding, height, width } = this.treeState;

    const x = scaleLinear([0, 10], [padding / 2, width]);
    const y = scaleLinear([0, 10], [height - padding, 0]);

    const xAxis = axisBottom(x)
      .tickSize(-height + padding)
      .tickFormat((d, i) => "");

    const yAxis = axisLeft(y)
      .tickSize(-width + padding / 2)
      .tickFormat((d, i) => "");

    const gx = this.svg
      .append("g")
      .attr("transform", `translate(${-padding / 2}, ${height - padding})`)
      .call(xAxis)
      .call(setColor);

    const gy = this.svg.append("g").attr("transform", `translate(0, 0)`).call(yAxis).call(setColor);

    const zoomHandler = zoom()
      .scaleExtent([-1e100, 1e100])
      .translateExtent([
        [-1e100, -1e100],
        [1e100, 1e100],
      ])
      .on("zoom", zoomed.bind(this));

    this.svg.call(zoomHandler);

    const yMid = this.treeState.height / 2;
 
    function zoomed(event) {
      const t = event.transform;
      const sx = t.rescaleX(x);
      const sy = t.rescaleY(y);
      console.log(event)
      this.treeContainer.attr("transform", `translate(${80 + t.x}, ${yMid + t.y}), scale(${t.k})`);
      gx.call(xAxis.scale(sx)).call(setColor);
      gy.call(yAxis.scale(sy)).call(setColor);
    }

    function setColor(g) {
      const color = "#757575";
      g.select(".domain").attr("stroke", color);
      g.selectAll(".tick").select("line").attr("stroke", color);
    }
  }
}

export default TreesEngine;
