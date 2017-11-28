import { p } from 'P5Instance';

export default class ParametricPatterns {

  constructor(props) {
    this.props = props;
    this.padding = 20;
    this.width = (props.width || p.width) - this.padding;
    this.height = (props.height || p.height) - this.padding;
    this.step = 0.03;
    this.t = 0;
    this.numLines = 60;
  }

  draw() {
    const debug = false;
    p.push();
    p.translate(this.props.x + this.padding/2, this.props.y + this.padding/2)
    p.strokeWeight(0.9);
    const count = this.numLines * 0.1;
    // p.fill(255, p.map(p.mouseY, 0, this.height, 0, 8));
    p.fill(255, 10);
    p.translate(this.width / 2, this.height / 2);
    p.curveTightness(2);
    for (let i = 0; i < count; i += 0.1) {
      const t = this.t + i;
      p.stroke(255, p.map(i, 0, count, 0, 200));
      // p.stroke(255, 100);
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
    return this.width/2 * p.sin(t / 2);
  }

  y1(t) {
    return this.height/2 * p.cos(t / 2);
  }

  x2(t) {
    return this.width/3 * p.cos(t / 4);
  }

  y2(t) {
    return this.height/2 * p.sin(t / 2);
  }

  cx1(t) {
    return this.width/2 * p.cos(t);
  }

  cy1(t) {
    return this.height/2 * p.sin(t);
  }

  cx2(t) {
    return -this.width/2 * p.sin(t / 2);
  }

  cy2(t) {
    return -this.height/2 * p.cos(t);
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
