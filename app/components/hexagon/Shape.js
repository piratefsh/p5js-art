import { p } from 'P5Instance';

export default class Shape {
  constructor(sides, centerPos, edgeLen) {
    this.id = Shape.ID++;

    this.sides = sides;
    this.vertices = [];
    this.edgeLen = edgeLen;

    this.opacity = 80;// p.map(this.edgeLen, 1, 33, 200, 50);
    this.centerPos = p.createVector(centerPos.x, centerPos.y);
    this.children = [];
    const curr = p.createVector(0, edgeLen);
    for (let i = 0; i < 6; i++) {
      curr.rotate(Math.PI * 2 / sides);
      this.vertices.push(curr.copy());
    }
  }

  draw() {
    p.push();
    p.translate(this.centerPos.x, this.centerPos.y);
    p.beginShape();
    p.stroke(255, 255, 255, this.opacity + 10);
    p.strokeWeight(p.map(this.edgeLen, 5, 30, 1, 8));
    p.fill(255, 255, 255, this.opacity);
    this.vertices.forEach((v) => {
      p.vertex(v.x, v.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }
}

Shape.ID = 0;
