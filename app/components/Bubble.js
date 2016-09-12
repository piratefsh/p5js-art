import Util from './Utils';
export default class Bubble {
  constructor(p5, pos) {
    this.Util = new Util(p5)
    this.p5 = p5;
    this.NUM_POINTS = 7;
    this.pos = pos || this.Util.randomPoint();

    this.points = new Array(this.NUM_POINTS);
    
    this.step = 1.2;
    this.dead = false;
    const angleDelta = p5.TWO_PI / this.NUM_POINTS;

    for (let i = 0; i < this.NUM_POINTS; i++) {
      const offsetX = p5.randomGaussian(0, 1) / 10;
      const offsetY = p5.randomGaussian(0, 1) / 10;
      const x = p5.cos(angleDelta * i + offsetX) * Bubble.RADIUS;
      const y = p5.sin(angleDelta * i + offsetY) * Bubble.RADIUS;
      this.points[i] = this.p5.createVector(x, y);
    }

    this.velocity = p5.createVector(p5.random(-0.8, 0.8) + 0.2, p5.random(-0.8, 0.8) + 0.2);
  }

  randStep() {
    return this.p5.randomGaussian() * Bubble.step;
  }

  isAlive(){
    return !this.dead;
  }

  update() {
    this.pos.add(this.velocity);
    this.points.forEach((point) => {
      const offset = this.p5.createVector(this.randStep(), this.randStep());
      point.add(offset);
    });

    this.dead = this.pos.x < -Bubble.RADIUS || this.pos.x > this.p5.width + Bubble.RADIUS||
      this.pos.y < -Bubble.RADIUS || this.pos.y > this.p5.height + Bubble.RADIUS
  }

  draw() {
    const p5 = this.p5;
    p5.push();
    p5.translate(this.pos.x, this.pos.y);

    p5.beginShape();
    const last = this.points[this.points.length - 1];
    p5.curveVertex(last.x, last.y);

    this.points.forEach((point) => {
      p5.curveVertex(point.x, point.y);
    });

    const first = this.points[0];
    const second = this.points[1];
    p5.curveVertex(first.x, first.y);
    p5.curveVertex(second.x, second.y);

    p5.endShape();
    p5.stroke(50);
    p5.pop();
  }
}

Bubble.RADIUS = 60;
Bubble.step = 1.2;
