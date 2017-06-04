import { p } from 'P5Instance';
import Shape from './Shape';

export default class RecursiveShape extends Shape {
  constructor({ sides, patternFunc, centerPos, edgeLen = 50, depth = 0, maxDepth = Infinity, rotation }) {
    super({ sides, centerPos, edgeLen, rotation });
    this.depth = depth;
    this.patternFunc = patternFunc;
    this.maxDepth = maxDepth;

    this.children = [];
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
      rotation: this.rotation,
      maxDepth: this.maxDepth });
    this.children.forEach(ch => ch.update());
  }

  draw() {
      super.draw();
    // if this is leaf
    if (this.children.length === 0) {
      return;
    }

    // draw recursive hexes
    this.children.forEach((ch) => {
      ch.draw();
    });
    return;
  }
}
