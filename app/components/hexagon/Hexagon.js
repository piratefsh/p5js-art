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
    const children = [];
    const childLen = this.edgeLen / 3;

    const center = new Hexagon(this.centerPos, childLen, this.minLen);
    children.push(center);

    // draw surrounding hexagons
    for (let i = 0; i < 6; i++) {
      const currCenter = Hexagon.t3636(childLen, i, this.centerPos);
      const hex = new Hexagon(currCenter, childLen, this.minLen);
      children.push(hex);
    }

    children.forEach((ch) => ch.draw());
    return;
  }
}

Hexagon.t3636 = (len, i, centerPos) => {
  return p.createVector(0, len * 2)
    .rotate(Hexagon.ANGLE * i)
    .add(centerPos);
};

Hexagon.ANGLE = Math.PI * 2 / 6;
Hexagon.ID = 0;
