import { p } from 'P5Instance';
import Util from 'components/utils/Utils';

export default class ParametricPatterns {

  constructor(props) {
    this.fillOpacity = 15;
    this.props = props;
    this.padding = 100;
    this.seed = props.seed;
    this.strokeWeight = 1;
    this.strokeOpacity = 0;
    this.width = (props.width || p.width) - this.padding;
    this.height = (props.height || p.height) - this.padding;
    this.speed = 0.01;
    this.t = 0;
    this.numLines = 80;
    this.color = props.color || [100, 100, 100];
    this.color2 = props.color2 || props.color;
    this.randVar = p.random(0, this.seed);
    this.spacing = 0.02;
    this.amp = props.amp || 1;
    this.dir = Math.pow(-1, props.amp * 10);

    this.fillColors = [];

    this.reset();
  }

  genFillColors() {
    for (let i = 0; i < this.numLines; i++) {
      const col = [
        p.map(i, 0, this.numLines, this.color2[0], this.color[0]),
        p.map(i, 0, this.numLines, this.color2[1], this.color[1]),
        p.map(i, 0, this.numLines, this.color2[2], this.color[2]),
      ];
      this.fillColors.push(p.color(...col, this.fillOpacity));
    }
  }

  reset() {
    this.t = Math.floor(p.random(8)) * p.PI / 2;
    this.randVar = p.random(0, this.seed);
    this.x2 = Util.generateParametricEqn(this.width / 4);
    this.y2 = Util.generateParametricEqn(this.height / 4);
  }

  draw() {
    if (this.fillColors.length < 1) {
      this.genFillColors();
    }
    const debug = false;
    p.push();
    p.strokeWeight(this.strokeWeight);
    p.curveTightness(4);
    p.stroke(0, 0);

    p.translate(this.props.x + this.padding / 2, this.props.y + this.padding / 2);
    p.translate(this.width / 2, this.height / 2);
    const count = this.numLines * this.spacing;
    let n = 0;
    for (let i = 0; i < count; i += this.spacing) {
      const t = this.t + i;
      const color = this.fillColors[n];
      p.fill(color);

      if (this.strokeOpacity > 0) {
        p.stroke(color, p.map(i, 0, count, 0, this.strokeOpacity));
      }
      const points = [this.cx1(t), this.cy1(t), this.x1(t), this.y1(t), this.x2(t), this.y2(t), this.cx2(t), this.cy2(t)]
        .map(pt => pt * this.amp);
      p.curve(...points);
      // console.log('calc', this.x2(t), this.y2(t));

      if (debug) {
        p.ellipse(this.x1(t), this.y1(t), 10, 10);
        p.ellipse(this.cx1(t), this.cy1(t), 5, 5);
        p.ellipse(this.x2(t), this.y2(t), 10, 10);
        p.ellipse(this.cx2(t), this.cy2(t), 5, 5);
      }

      n++;
    }
    p.pop();
  }

  update() {
    this.t = (this.t + this.speed);
  }

  x1(t) {
    return this.width / 2 * p.sin(t / 2);
  }

  y1(t) {
    return this.height / 2 * p.cos(t / 2);
  }

  // x2(t) {
  //   return this.amp * Math.pow(-1, Math.floor(this.randVar)) * this.width * p.cos(t / 3);
  // }

  // y2(t) {
  //   return this.dir * this.amp * this.randVar * this.height/3 * p.sin(t / 2);
  // }

  cx1(t) {
    return this.width / 2 * p.cos(t);
  }

  cy1(t) {
    return this.height / 2 * p.sin(t);
  }

  cx2(t) {
    return -this.width / 2 * p.sin(t / 2);
  }

  cy2(t) {
    return -this.height / 2 * p.cos(t);
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
