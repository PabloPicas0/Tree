class TreesEngine {
  constructor() {
    this.tree = d3.select(".tree");
    this.svg = this.tree.append("svg").attr("id", "tree").attr("width", "100%").attr("height", "100%");

    this.treeState = {
      ...this.getParentSize(),
      padding: 16,
    };

    this.createTreeGrid();
  }

  getParentSize() {
    const { width, height } = this.tree.node().getBoundingClientRect();
    const padding = 8 * 2;

    return { width: width - padding, height: height - padding };
  }

  createTreeGrid() {
    const x = d3.scaleLinear([0, 10], [this.treeState.padding / 2, this.treeState.width]);
    const y = d3.scaleLinear([0, 10], [this.treeState.height - this.treeState.padding, 0]);

    this.svg
      .append("g")
      .attr("transform", `translate(${-this.treeState.padding / 2}, ${this.treeState.height - this.treeState.padding})`)
      .transition()
      .duration(750)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-this.treeState.height + this.treeState.padding)
          .tickFormat((d, i) => "")
      );

    this.svg
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .transition()
      .duration(750)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-this.treeState.width + this.treeState.padding / 2)
          .tickFormat((d, i) => "")
      );
  }
}

export default TreesEngine;
