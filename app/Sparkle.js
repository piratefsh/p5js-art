import { p } from 'P5Instance';
import { pointer } from 'components/utils/MousePointer';

export default class Sparkle {
  constructor() {
    this.rings = [];
    this.numRings = 5;
    for (let i = 0; i < this.numRings; i++) {
      this.rings.push(new Ring({ minRadius: 150, maxRadius: p.width / 2 }));
    }
    this.step = p.TWO_PI / this.numRings;
    this.radius = 100;
    this.minRadius = 100;
    this.maxRadius = 200;
  }

  draw() {
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(this.angle);
    p.translate(-this.radius / 2, -this.radius / 2);
    p.fill(255, 190);
    this.drawRings();

    p.push();
    p.fill(255, 10);
    p.scale(1.5);
    this.drawRings();
    p.pop();
    p.pop();
  }

  drawRings() {
    this.rings.forEach((r, i) => {
      const tx = this.radius * Math.cos(i * this.step);
      const ty = this.radius * Math.sin(i * this.step);
      p.translate(tx, ty);
      r.draw();
    });
  }

  update() {
    this.angle = p.map(pointer.x, 0, p.width, 0, p.PI / 2);
    pointer.update();
    this.radius = p.map(pointer.x, p.width, 0, this.minRadius, this.maxRadius);
    this.rings.forEach((r) => {
      r.update();
    });
  }
}

class Ring {
  constructor(props) {
    this.minRadius = props.minRadius;
    this.maxRadius = props.maxRadius;
    this.radius = props.minRadius;
    this.glowRadius = 5 + Math.floor(p.random(7));
    this.size = 2 + Math.floor(p.random(15));

    this.numSteps = 24;
    this.points = [];
    const step = p.TWO_PI / this.numSteps;
    for (let i = 0; i < p.TWO_PI; i += step) {
      const x = this.radius * Math.cos(i);
      const y = this.radius * Math.sin(i);
      this.points.push({ x, y, angle: i });
    }
  }

  draw() {
    p.noStroke();
    this.points.forEach((point) => {
      p.push();
      p.translate(point.x, point.y);
      p.rotate(point.angle);
      p.ellipse(0, 0, this.size + this.glowRadius, this.size);
      p.pop();
    });
  }

  update() {
    this.radius = p.map(pointer.y, 0, p.height, this.minRadius, this.maxRadius);

    this.points.forEach((pt) => {
      pt.x = this.radius * Math.cos(pt.angle);
      pt.y = this.radius * Math.sin(pt.angle);
    });
  }

}
