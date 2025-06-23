const { select, scaleLinear, axisBottom, axisLeft, tree } = d3;

class TreesEngine {
  constructor() {
    this.tree = select(".tree");
    this.svg = this.tree.append("svg").attr("id", "tree").attr("width", "100%").attr("height", "100%");

    this.treeState = {
      ...this.getParentSize(),
      padding: 16,
      data: {
        name: "test",
        children: [
          { name: "test2", children: [] },
          { name: "test3", children: [] },
          { name: "test4", children: [] },
          { name: "test5", children: [] },
        ],
      },
    };

    this.createGrid();

    window.addEventListener("resize", this.resizeGrid.bind(this));
  }

  resizeGrid() {
    const { height, width } = this.getParentSize();

    this.treeState.height = height;
    this.treeState.width = width;

    this.destroyGrid();
    this.createGrid();
  }

  destroyGrid() {
    this.svg.selectAll("g").each(function () {
      this.remove();
    });
  }

  getParentSize() {
    const { width, height } = this.tree.node().getBoundingClientRect();
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
      .transition()
      .duration(750)
      .call(
        axisBottom(x)
          .tickSize(-height + padding)
          .tickFormat((d, i) => "")
      )
      .call(setColor);

    this.svg
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .transition()
      .duration(750)
      .call(
        axisLeft(y)
          .tickSize(-width + padding / 2)
          .tickFormat((d, i) => "")
      )
      .call(setColor);
  }
}

export default TreesEngine;
