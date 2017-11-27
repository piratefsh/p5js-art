import { p } from 'P5Instance';

export default class Sparkle {
  constructor() {
    this.rings = [];
    this.numRings = 5;
    for (let i = 0; i < this.numRings; i++) {
      this.rings.push(new Ring({ minRadius: 100, maxRadius: p.width / 2 }));
    }
    this.step = p.TWO_PI / this.numRings;
    this.radius = 150;
    this.minRadius = 150;
    this.maxRadius = p.width / 2;
  }

  draw() {
    p.push();
    p.translate(p.width / 2 - this.radius / 2, p.height / 2 - this.radius / 2);

    for (let i = 0; i < p.TWO_PI; i += this.step) {
      const tx = this.radius * Math.cos(i);
      const ty = this.radius * Math.sin(i);
      p.translate(tx, ty);
      this.rings.forEach((r) => {
        r.draw();
      });
    }
    p.pop();
  }

  update() {
    this.radius = p.map(p.mouseX, 0, p.width, this.minRadius, this.maxRadius);
    this.rings.forEach((r) => {
      r.update();
    });
  }
}

class Ring {
  constructor(props) {
    this.radius = props.minRadius;
    this.glowRadius = 6;
    this.numSteps = 36;
    this.size = 6;
    this.points = [];
  }

  draw() {
    p.noStroke();
    p.fill(255, 100);

    this.points.forEach((point) => {
      p.fill(255, 40);
      // p.ellipse(x, y, this.size, this.size);
      p.push();
      p.translate(point.x, point.y);
      p.rotate(point.angle);
      p.fill(255, 20);
      p.translate(this.glowRadius / 4, 0);
      p.ellipse(0, 0, this.size + (this.glowRadius), this.size + this.glowRadius/2);
      p.translate(this.glowRadius / 4, 0);
      p.ellipse(0, 0, this.size + (this.glowRadius * 2), this.size + this.glowRadius);
      p.pop();
    });
  }

  update() {
    this.radius = p.map(p.mouseY, 0, p.height, 150, p.height);
    this.points = [];
    const step = p.TWO_PI / this.numSteps;
    for (let i = 0; i < p.TWO_PI; i += step) {
      const x = this.radius * Math.cos(i);
      const y = this.radius * Math.sin(i);
      this.points.push({ x, y, angle: i });
    }
  }

}
