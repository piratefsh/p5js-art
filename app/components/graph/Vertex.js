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
    this.length = 30;

    // keep track of rotation
    this.offset = 0;
    this.oriented = false;
  }

  addNeighbour(v, patternIndex) {
    if (this.id == 1) {
      // debugger;
    }
    if (!(v instanceof Vertex)) {
      throw new Error('Vertex: adding bad neighbour');
    }

    if (patternIndex < 0 || patternIndex >= this.pattern.length) {
      throw new Error('Vertex: bad patternIndex');
    }

    if (this.neighbours[patternIndex] !== undefined) {
      // return
      // throw new Error('Vertex: patternIndex is occupied');
    }

    if (!this.oriented) {
      // add ok
      this.offset = Math.atan2(v.x - this.x, v.y - this.y);
      this.oriented = true;
    }

    if (this.neighbours.indexOf(v) < 0) {
      this.neighbours[patternIndex] = v;
    }
  }

  visit() {
    this.visited = true;
  }

  reset() {
    this.visited = false;
  }

  draw() {
    p.push();
    p.translate(this.x, this.y);
    p.ellipse(0, 0, 5, 5);
    p.fill(0, 0, 0, 100);
    p.stroke(0, 0, 0, 100);
    p.textSize(8);
    p.text(this.id, 3, 8);
    this.neighbours.forEach((n) => {
      p.pop();
      p.line(this.x, this.y, n.x, n.y);
    });
  }

  // add neighbours with pattern
  expand() {
    if(this.id == Vertex.DEBUG_ID) {
      console.log(this)
      this.neighbours.forEach((n, i) => console.log('neighbour', i , n))
    }
    const newNodes = [];
    let currAngle = this.offset;
    this.pattern.forEach((pat, i) => {
      const n = p
        .createVector(0, this.length)
        .rotate(currAngle);
      n.add(this.x, this.y);

      if (this.id == Vertex.DEBUG_ID) {
        console.log('----');
        console.log(i, n);
      }

      if (Vertex.inRange(n)) {
        const newVertex = Vertex.get(n.x, n.y, this.pattern);
        newVertex.addNeighbour(this, i);
        this.addNeighbour(newVertex, i);
        newNodes.push(newVertex);
        if (this.id == Vertex.DEBUG_ID) {
          console.log(i, newVertex, currAngle);
        }
      }

      currAngle += Shape.internalAngle(pat, this.length);
    });

    return newNodes;
  }


  toString() {
    return `${Math.round(this.x)},${Math.round(this.y)}`;
  }
}

Vertex.all = {};
Vertex.ID = 0;
Vertex.RANGE = 150;
Vertex.DEBUG_ID = 2;
Vertex.get = (x, y, pattern) => {
  const key = `${Math.round(x)},${Math.round(y)}`;
  // make new key if exists
  if (!Vertex.all[key]) {
    Vertex.all[key] = new Vertex(x, y, pattern);
  }

  return Vertex.all[key];
};

Vertex.inRange = (n) => {
  return n.x < Vertex.RANGE && n.x > -Vertex.RANGE && n.y < Vertex.RANGE && n.y > -Vertex.RANGE;
};
window.Vertex = Vertex;
export default Vertex;
