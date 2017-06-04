import { p } from 'P5Instance';
import Shape from './Shape';

export default class RecursiveShape extends Shape {
  constructor({ sides, patternFunc, centerPos, edgeLen = 50, depth = 0, maxDepth = Infinity }) {
    super({ sides, centerPos, edgeLen });
    this.depth = depth;
    this.patternFunc = patternFunc;
    this.maxDepth = maxDepth;

    this.children = [];
    const curr = p.createVector(0, edgeLen);
    for (let i = 0; i < 6; i++) {
      curr.rotate((Math.PI * 2) / sides);
      this.vertices.push(curr.copy());
    }
  }

  update() {
    if (this.depth >= this.maxDepth) {
      return;
    }
    this.children = this.patternFunc({
      patternFunc: this.patternFunc,
      edgeLen: this.edgeLen,
      centerPos: this.centerPos,
      depth: this.depth + 1,
      maxDepth: this.maxDepth });
    this.children.forEach(ch => ch.update());
  }

  draw() {
    // if this is leaf
    if (this.children.length === 0) {
      super.draw();
      return;
    }

    // draw recursive hexes
    this.children.forEach((ch) => {
      ch.draw();
    });
    return;
  }
}
