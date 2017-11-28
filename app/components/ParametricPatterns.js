import { p } from 'P5Instance';

export default class ParametricPatterns {

  constructor() {
    this.step = 0.02;
    this.t = 0;
    this.numLines = 10;
  }

  draw() {
    const debug = false;
    p.push();
    p.strokeWeight(0.9);
    p.fill(255, 20);
    p.translate(p.width / 2, p.height / 2);
    for (let i = 0; i < this.numLines; i += 0.1) {
      const t = this.t + i;
      p.stroke(255, p.map(i, 0, this.numLines, 0, 200));
      p.curve(this.cx1(t), this.cy1(t), this.x1(t), this.y1(t), this.x2(t), this.y2(t), this.cx2(t), this.cy2(t));

      if (debug) {
        p.ellipse(this.x1(t), this.y1(t), 10, 10);
        p.ellipse(this.cx1(t), this.cy1(t), 5, 5);
        p.ellipse(this.x2(t), this.y2(t), 10, 10);
        p.ellipse(this.cx2(t), this.cy2(t), 5, 5);
      }
    }
    p.pop();
  }

  update() {
    this.t = (this.t + this.step);
  }

  x1(t) {
    return 200 * p.sin(t / 2);
  }

  y1(t) {
    return 200 * p.cos(t / 2);
  }

  x2(t) {
    return 100 * p.cos(t / 4);
  }

  y2(t) {
    return 150 * p.sin(t / 2);
  }

  cx1(t) {
    return 100 * p.cos(t);
  }

  cy1(t) {
    return 100 * p.sin(t);
  }

  cx2(t) {
    return -100 * p.sin(t / 2);
  }

  cy2(t) {
    return -100 * p.cos(t);
  }
}


ParametricPatterns.X1_FREQ = 50;
ParametricPatterns.Y1_FREQ = 7;
ParametricPatterns.X2_FREQ = 90;
ParametricPatterns.Y2_FREQ = 5;
ParametricPatterns.X1_AMP = 20;
ParametricPatterns.Y1_AMP = 100;
ParametricPatterns.X2_AMP = 7;
ParametricPatterns.Y2_AMP = 300;
