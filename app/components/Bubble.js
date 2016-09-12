import Util from './Utils';
export default class Bubble {
  constructor(p5, pos) {
    this.Util = new Util(p5);
    this.p5 = p5;
    this.numPoints = 7;
    this.pos = pos || this.Util.randomPoint();
    this.startLifespan = new Date();
    this.points = new Array(this.numPoints);

    this.step = 1.2;
    this.dead = false;
    const angleDelta = p5.TWO_PI / this.numPoints;

    for (let i = 0; i < this.numPoints; i++) {
      const offsetX = p5.randomGaussian(0, 1) / 10;
      const offsetY = p5.randomGaussian(0, 1) / 10;
      const x = p5.cos(angleDelta * i + offsetX) * Bubble.radius;
      const y = p5.sin(angleDelta * i + offsetY) * Bubble.radius;
      this.points[i] = this.p5.createVector(x, y);
    }

    this.velocity = p5.createVector(p5.random(-Bubble.velocityRange, Bubble.velocityRange) + 0.2, p5.random(-Bubble.velocityRange, Bubble.velocityRange) + 0.2);
  }

  randStep() {
    return this.p5.randomGaussian() * Bubble.step;
  }

  isAlive() {
    return !this.dead;
  }

  checkLifespan() {
    // if nearing end of life, make smaller
    const now = new Date();
    if (now - this.startLifespan > Bubble.lifespan) {
      this.points.forEach((point) => {
        const dir = this.pos.copy().sub(point);
        dir.normalize();
        point.add(dir);
      });
    }
  }

  update() {
    this.checkLifespan();
    this.pos.add(this.velocity.copy().mult(Bubble.velocityMultiplier));
    this.points.forEach((point) => {
      const offset = this.p5.createVector(this.randStep(), this.randStep());
      point.add(offset);
    });

    this.dead = this.pos.x < -Bubble.radius || this.pos.x > this.p5.width + Bubble.radius ||
      this.pos.y < -Bubble.radius || this.pos.y > this.p5.height + Bubble.radius;
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
    p5.pop();
  }
}

Bubble.radius = 60;
Bubble.numPoints = 7;
Bubble.step = 1.2;
Bubble.velocityRange = 0.8;
Bubble.velocityMultiplier = 1.4;
Bubble.lifespan = 1000;
