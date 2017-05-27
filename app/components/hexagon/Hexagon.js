import { p } from 'P5Instance';

export default class Hexagon {
  constructor(centerPos, edgeLen) {
    this.vertices = [];
    this.edgeLen = edgeLen;
    this.centerPos = centerPos;

    const curr = p.createVector(0, edgeLen);
    for (let i = 0; i < 6; i++) {
      curr.rotate(Math.PI * 2 / 6);
      this.vertices.push(curr.copy());
    }
  }
  update() {

  }

  draw() {
    p.push();
    p.translate(this.centerPos.x, this.centerPos.y);
    p.beginShape();
    this.vertices.forEach((v) => {
      p.vertex(v.x, v.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }
}
