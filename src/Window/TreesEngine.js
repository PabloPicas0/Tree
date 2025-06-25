// Links:
// https://observablehq.com/@d3/tree/2#data

const { select, scaleLinear, axisBottom, axisLeft, tree, hierarchy, ascending, curveStep, link } = d3;

// NOTE: start with oldest known person 
// TODO: resize don't work on tree
// TODO: trees need to be adjusted to svg
class TreesEngine {
  constructor() {
    this.treeElem = select(".tree");
    this.svg = this.treeElem.append("svg").attr("id", "tree").attr("width", "100%").attr("height", "100%");

    this.treeState = {
      ...this.getParentSize(),
      padding: 16,
      data: {
        name: "Me",
        children: [
          {
            name: "Mom",
            children: [
              {
                name: "grandmother",
                children: [
                  { name: "grandpa2x", children: null },
                  { name: "grandmother2x", children: null },
                ],
              },
              {
                name: "grandpa",
                children: [
                  { name: "grandpa2x", children: null },
                  { name: "grandmother2x", children: null },
                ],
              },
            ],
          },
          {
            name: "Dad",
            children: [
              {
                name: "grandmother",
                children: [
                  { name: "grandpa2x", children: null },
                  { name: "grandmother2x", children: null },
                ],
              },
              {
                name: "grandpa2x",
                children: [
                  { name: "grandpa2x", children: null },
                  { name: "grandmother2x", children: null },
                ],
              },
            ],
          },
        ],
      },
    };

    this.root = hierarchy(this.treeState.data);

    this.dx = 35;
    this.dy = this.treeState.width / (this.root.height + 1);
    this.x0 = Infinity;
    this.x1 = -Infinity;

    this.tree = tree().nodeSize([this.dx, this.dy]);

    this.root.sort((a, b) => ascending(a.data.name, b.data.name));

    this.tree(this.root);

    this.root.each((descendant) => {
      if (descendant.x > this.x1) this.x1 = descendant.x;
      if (descendant.x < this.x0) this.x0 = descendant.x;
    });

    this.height = this.x1 - this.x0 + this.dx * 2;

    this.createGrid();
    this.createTree();

    window.addEventListener("resize", this.resizeGrid.bind(this));
  }

  createTree() {
    // this.svg.attr("viewBox", [-this.dy / 3, this.x0 - this.dx, this.treeState.width, this.height]);
    const [xMid, yMid] = [this.treeState.width / 2, this.treeState.height / 2];
    const container = this.svg.append("g").attr("transform", `translate(${83}, ${yMid})`);

    container
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

    const node = container
      .append("g")
      .attr("stroke-linejoin", "miter")
      .attr("stroke-width", 3)
      .selectAll()
      .data(this.root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)

    node
      .append("circle")
      .attr("fill", "#fff")
      .attr("r", 2.5);

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
    this.createTree()
  }

  destroyGrid() {
    this.svg.selectAll("g").each(function () {
      this.remove();
    });
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

    function setColor(g) {
      const color = "#757575";
      g.select(".domain").attr("stroke", color);
      g.selectAll(".tick").select("line").attr("stroke", color);
    }

    this.svg
      .append("g")
      .attr("transform", `translate(${-padding / 2}, ${height - padding})`)
      .call(
        axisBottom(x)
          .tickSize(-height + padding)
          .tickFormat((d, i) => "")
      )
      .call(setColor);

    this.svg
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .call(
        axisLeft(y)
          .tickSize(-width + padding / 2)
          .tickFormat((d, i) => "")
      )
      .call(setColor);
  }
}

export default TreesEngine;
