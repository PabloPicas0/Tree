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
                name: "Grandmother (Mom's side)",
                children: [
                  {
                    name: "Great-Grandmother",
                    children: [
                      {
                        name: "2x Great-Grandmother",
                        children: [
                          {
                            name: "3x Great-Grandmother",
                            children: [
                              {
                                name: "4x Great-Grandmother",
                                children: [
                                  { name: "5x Great-Grandmother", children: null },
                                  { name: "5x Great-Grandfather", children: null },
                                ],
                              },
                              {
                                name: "4x Great-Grandfather",
                                children: [
                                  { name: "5x Great-Grandmother", children: null },
                                  { name: "5x Great-Grandfather", children: null },
                                ],
                              },
                            ],
                          },
                          {
                            name: "3x Great-Grandfather",
                            children: [
                              { name: "4x Great-Grandmother", children: null },
                              { name: "4x Great-Grandfather", children: null },
                            ],
                          },
                        ],
                      },
                      {
                        name: "2x Great-Grandfather",
                        children: [
                          { name: "3x Great-Grandmother", children: null },
                          { name: "3x Great-Grandfather", children: null },
                        ],
                      },
                    ],
                  },
                  {
                    name: "Great-Grandfather",
                    children: [
                      { name: "2x Great-Grandmother", children: null },
                      { name: "2x Great-Grandfather", children: null },
                    ],
                  },
                ],
              },
              {
                name: "Grandfather (Mom's side)",
                children: [
                  { name: "Great-Grandmother", children: null },
                  { name: "Great-Grandfather", children: null },
                ],
              },
            ],
          },
          {
            name: "Dad",
            children: [
              {
                name: "Grandmother (Dad's side)",
                children: [
                  {
                    name: "Great-Grandmother",
                    children: [
                      {
                        name: "2x Great-Grandmother",
                        children: [
                          {
                            name: "3x Great-Grandmother",
                            children: [
                              { name: "4x Great-Grandmother", children: null },
                              { name: "4x Great-Grandfather", children: null },
                            ],
                          },
                          {
                            name: "3x Great-Grandfather",
                            children: [
                              { name: "4x Great-Grandmother", children: null },
                              { name: "4x Great-Grandfather", children: null },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Grandfather (Dad's side)",
                children: [
                  {
                    name: "Great-Grandmother",
                    children: [
                      {
                        name: "2x Great-Grandmother",
                        children: [
                          { name: "3x Great-Grandmother", children: null },
                          { name: "3x Great-Grandfather", children: null },
                        ],
                      },
                    ],
                  },
                  {
                    name: "Great-Grandfather",
                    children: [
                      { name: "2x Great-Grandmother", children: null },
                      { name: "2x Great-Grandfather", children: null },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    };

    this.createGrid();
    this.createTree();

    window.addEventListener("resize", this.resizeGrid.bind(this));
  }

  createTree() {
    const root = hierarchy(this.treeState.data);

    const dx = 35;
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

    const height = x1 - x0 + dx * 2;
    const width = x1 - x0 + dy * 2
    // this.svg.attr("viewBox", [0, 0, this.treeState.width + 500, height]);
    const [xMid, yMid] = [this.treeState.width / 2, this.treeState.height / 2];
    const container = this.svg.append("g").attr("transform", `translate(${80}, ${yMid})`);

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
    this.svg.selectAll("g").remove()
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
