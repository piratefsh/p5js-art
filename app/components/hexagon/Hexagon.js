import { p } from 'P5Instance';

export default class Hexagon {
  constructor(centerPos, edgeLen, minLen = 10) {
    this.minLen = minLen < 0 ? 5 : minLen;
    this.id = Hexagon.ID++;
    this.vertices = [];
    this.edgeLen = edgeLen;
    this.centerPos = p.createVector(centerPos.x, centerPos.y);

    const curr = p.createVector(0, edgeLen);
    for (let i = 0; i < 6; i++) {
      curr.rotate(Math.PI * 2 / 6);
      this.vertices.push(curr.copy());
    }
  }
  update(minLen) {
    this.minLen = minLen;
  }

  draw() {
    if (this.edgeLen <= this.minLen) {
      p.push();
      p.translate(this.centerPos.x, this.centerPos.y);
    // p.text(this.id, 0, 0)
      p.beginShape();
      p.stroke(255, 255, 255, 0);
      p.fill(255, 255, 255);
      this.vertices.forEach((v) => {
        p.vertex(v.x, v.y);
      });
      p.endShape(p.CLOSE);
      p.pop();
      // draw a hex
      return;
    }

    // draw recursive hexes
    const children = Hexagon.t3636(this.edgeLen, this.centerPos, this.minLen);
    children.forEach((ch) => ch.draw());
    return;
  }
}

Hexagon.t3636 = (parentEdgeLen, centerPos, minLen) => {
  const children = [];
  const childLen = parentEdgeLen / 3;
  const center = new Hexagon(centerPos, childLen, minLen);
  children.push(center);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, childLen * 2)
        .rotate(Hexagon.ANGLE * i)
        .add(centerPos);
    const hex = new Hexagon(currCenter, childLen, minLen);
    children.push(hex);
  }

  return children;
};

Hexagon.t33336 = (parentEdgeLen, i, centerPos) => {
  return p.createVector(0, len * 2)
    .rotate(Hexagon.ANGLE * i + Hexagon.ANGLE / 2)
    .add(centerPos);
};

Hexagon.ANGLE = Math.PI * 2 / 6;
Hexagon.ID = 0;
