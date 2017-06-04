import { p } from 'P5Instance';
import Util from 'components/utils/Utils';
import Shape from './Shape';

export default class Hexagon extends Shape {
  constructor(pattern, centerPos, edgeLen, depth, maxDepth = Infinity) {
    super(6, centerPos, edgeLen);
    this.depth = depth;
    this.pattern = pattern;
    this.maxDepth = maxDepth;

    this.vertices = [];
    this.children = [];
    const curr = p.createVector(0, edgeLen);
    for (let i = 0; i < 6; i++) {
      curr.rotate(Math.PI * 2 / 6);
      this.vertices.push(curr.copy());
    }
  }

  update() {
    if (this.depth >= this.maxDepth) {
      return;
    }
    this.children = Hexagon[this.pattern](this.pattern, this.edgeLen, this.centerPos, this.depth + 1, this.maxDepth);
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

Hexagon.t3636 = (pattern, parentEdgeLen, centerPos, depth, maxDepth) => {
  const children = [];
  const childLen = Math.trunc(parentEdgeLen / 3);
  const center = new Hexagon(pattern, centerPos, childLen, depth, maxDepth);
  children.push(center);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, childLen * 2)
        .rotate(Hexagon.ANGLE * i)
        .add(centerPos);
    const hex = new Hexagon(pattern, currCenter, childLen, depth, maxDepth);
    children.push(hex);
  }

  return children;
};

Hexagon.t666 = (pattern, parentEdgeLen, centerPos, depth, maxDepth) => {
  const children = [];
  const childLen = parentEdgeLen / 3;
  const radius = Util.trigHeight(childLen / 2, childLen);
  const center = new Hexagon(pattern, centerPos, childLen, depth, maxDepth);
  children.push(center);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, radius * 2)
        .rotate(Hexagon.ANGLE * i + Hexagon.ANGLE / 2)
        .add(centerPos);
    const hex = new Hexagon(pattern, currCenter, childLen, depth, maxDepth);
    children.push(hex);
  }

  return children;
};

Hexagon.t33336 = (pattern, parentEdgeLen, centerPos, depth, maxDepth) => {
  const children = [];
  const childLen = parentEdgeLen / 3;
  const radius = Util.trigHeight(childLen / 2, childLen);
  const center = new Hexagon(pattern, centerPos, childLen, depth, maxDepth);
  children.push(center);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, radius * 2)
        .rotate(Hexagon.ANGLE * i + Hexagon.ANGLE / 2)
        .add(centerPos);
    const tri = new Triangle(centerPos, childLen)
  }
}

Hexagon.randomise = (opacity) => {
  return p.random(0, 2) < 0.4;
};

Hexagon.ANGLE = Math.PI * 2 / 6;