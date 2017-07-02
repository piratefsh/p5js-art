import { p as p5 } from 'P5Instance';

export default class Radial {
  constructor({ pos, radius = 100, len = 10, spokes = 50, color = 0, strokeWeight = 1, skewAngle = 0 } = {}) {
    this.pos = pos || p5.createVector(p5.width / 2, p5.height / 2);
    this.radiusX = radius;
    this.radiusY = radius + 20;
    this.len = len;
    this.spokes = spokes;
    this.color = color;
    this.strokeWeight = strokeWeight;
    this.skewAngle = -skewAngle;
  }

  draw() {
    p5.push();
    p5.translate(this.pos.x, this.pos.y);
    p5.rotate(this.skewAngle)
    p5.stroke(this.color);
    p5.strokeWeight(this.strokeWeight);
    const angleStep = p5.TWO_PI / this.spokes;
    const outerRadX = this.radiusX + this.len;
    const outerRadY = this.radiusY + this.len;
    const offset = p5.createVector(this.len * p5.cos(Math.PI * 1.5),
      this.len * p5.sin(Math.PI * 1.5));

    // p5.line(0, 0, offset.x, offset.y);

    for (let i = 0; i < this.spokes; i++) {
      const angle = angleStep * i;
      const x1 = this.radiusX * p5.cos(angle);
      const y1 = this.radiusY * p5.sin(angle);
      // (p5.map(angle - Math.PI, 0, Math.PI, 0, this.len));
      const x2 = (outerRadX * p5.cos(angle)) + offset.x;
      const y2 = (outerRadY * p5.sin(angle)) + offset.y;

      p5.line(x1, y1, x2, y2);
    }

    p5.pop();
  }
}
