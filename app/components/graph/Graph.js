import Vertex from './Vertex';

class Graph {
  constructor(pattern) {
    this.pattern = pattern;
    this.root = Vertex.get(0, 0, pattern);
    this.vertices = [this.root];
  }

  dfs(callback, curr = this.root, depth=0) {
    if (curr.visited || depth > Graph.MAX_DEPTH) {
      return;
    }

    curr.visit();

    // do thing with node
    callback(curr);
    // visit neighbours
    curr.neighbours.forEach((v) => {
      this.dfs(callback, v, depth + 1);
    });
  }

  bfs(callback, curr = this.root, depth=0) {
    if (curr.visited) {
      return;
    }

    // visit on neighbours
    curr.neighbours.forEach((v) => {
      this.bfs(callback, v, depth + 1);
    });

    curr.visit();

    // do thing with node
    callback(curr);
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
    Object.keys(Vertex.all).forEach(k => Vertex.all[k].draw());
  }
}

Graph.MAX_DEPTH = 4;

export default Graph;
