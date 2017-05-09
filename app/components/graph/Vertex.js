import { p } from 'P5Instance';
import Utils from 'components/utils/Utils';
import Shape from 'components/shapes/Shape';

class Vertex {
  constructor(x, y, pattern) {
    this.id = Vertex.ID++;
    this.x = x;
    this.y = y;
    this.pattern = pattern;
    this.neighbours = new Array(pattern.length);
    this.visited = false;
    this.length = 20;
  }

  addNeighbour(v, patternIndex) {
    if (!(v instanceof Vertex)) {
      throw new Error('Vertex: adding bad neighbour');
    }

    if (patternIndex < 0 || patternIndex >= this.pattern.length) {
      throw new Error('Vertex: bad patternIndex');
    }

    if (this.neighbours[patternIndex] !== undefined) {
      throw new Error('Vertex: patternIndex is occupied');
    }

    // add ok
    this.neighbours[patternIndex] = v;
  }

  visit() {
    this.visited = true;
  }

  reset() {
    this.visited = false;
  }

  draw() {
    p.push()
    p.translate(this.x, this.y);
    p.ellipse(0, 0, 5, 5);
    p.text(this.id, 0, 0)
    this.neighbours.forEach((n) => {
      p.line(this.x, this.y, n.x, n.y);
    })
    p.pop()
  }

  // add neighbours with pattern
  expand() {
    const newNodes = [];
    let currAngle = 0;
    this.pattern.forEach((pat, i) => {
      if (this.neighbours[i] !== undefined) {
        return;
      }

      const n = p
        .createVector(0, this.length)
        .rotate(currAngle);
      n.add(this.x, this.y);

      if (Vertex.inRange(n)) {
        const newVertex = new Vertex(n.x, n.y, this.pattern);
        newVertex.addNeighbour(this, i);
        this.addNeighbour(newVertex, i);
        newNodes.push(newVertex);
      }

      currAngle += Shape.internalAngle(pat, this.length);
    });

    return newNodes;
  }
}

Vertex.ID = 0;
Vertex.RANGE = 500;
Vertex.inRange = (n) => {
  return n.x < Vertex.RANGE && n.x > -Vertex.RANGE && n.y < Vertex.RANGE && n.y > -Vertex.RANGE
}

export default Vertex;
