import { p as p5} from 'P5Instance';

export default class Radial {
  constructor({ pos, radius = 100, len = 10, spokes = 50, color=0, strokeWeight=2 } = {}) {
    this.pos = pos || p5.createVector(p5.width / 2, p5.height / 2);
    this.radius = radius;
    this.len = len;
    this.spokes = spokes;
    this.color = color;
    this.strokeWeight = strokeWeight
  }

  draw() {
    p5.push();
    p5.translate(this.pos.x, this.pos.y);
    p5.stroke(this.color);
    p5.strokeWeight(this.strokeWeight)
    const angleStep = p5.TWO_PI/this.spokes;
    for(let i = 0; i < this.spokes; i++){
      const x1 = this.radius * p5.cos(angleStep * i)
      const y1 = this.radius * p5.sin(angleStep * i)

      const x2 = (this.radius + this.len) * p5.cos(angleStep * i)
      const y2 = (this.radius + this.len) * p5.sin(angleStep * i)

      p5.line(x1, y1, x2, y2);
    }

    p5.pop();
  }
}
