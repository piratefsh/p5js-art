import Vertex from './Vertex';

class Graph {
  constructor(pattern) {
    this.pattern = pattern;
    this.root = new Vertex(0, 0, pattern);
    this.vertices = [this.root];
  }

  dfs(callback, curr = this.root, depth=0) {
    if (curr.visited || depth > 2) {
      return;
    }

    curr.visit();

    // do thing with node
    callback(curr);
    // dfs on neighbours
    curr.neighbours.forEach((v) => {
      console.log('neigh', v)
      this.dfs(callback, v, depth + 1);
    });
  }

  reset() {
    this.vertices.forEach((v) => v.reset())
  }

  draw() {
    this.dfs(v => {
      const newVertices = v.expand();
      Array.prototype.push.apply(this.vertices, newVertices);
    });
    this.reset();
    this.dfs(v => v.draw());
  }
}

export default Graph;
