import Radial from './Radial';
import { p as p5 } from 'P5Instance';

export default class RadialDrawer {
  constructor(options) {
    this.options = options;
    this.speed = 5;
    this.prevPos = p5.createVector(p5.width / 2, p5.height / 2);
    this.currPos = p5.createVector(p5.width / 2, p5.height / 2);
    this.currVector = p5.createVector(0, 0);
    this.maxSpeed = 20;
    this.varX = 0;
    this.varY = 0;
  }

  update(varX, varY) {
    // variances to modify based on
    this.varX = varX;
    this.varY = varY;

    this.currPos = p5.createVector(varX - (p5.width / 2), varY - (p5.height / 2));
    const vector = this.currPos.copy().sub(this.prevPos);
    this.speed = p5.constrain(0, p5.abs(vector.mag()), this.maxSpeed);

    // update currvector if its not empty
    if (vector.x !== 0 && vector.y !== 0) {
      this.currVector = vector;
    }
    this.prevPos = this.currPos;
  }

  draw(varX=this.varX, varY=this.varY) {
    const options = {
      skewAngle: p5.atan2(this.currVector.x, this.currVector.y),
      pos: p5.createVector(varX, p5.height/2),
      len: p5.map(varY, 0, p5.height, RadialDrawer.MAX_LEN, RadialDrawer.MIN_LEN),
      spokes: p5.map(this.speed, 0, this.maxSpeed, RadialDrawer.MIN_SPOKES, RadialDrawer.MAX_SPOKES),
      radius: p5.map(this.speed, 0, this.maxSpeed, RadialDrawer.MAX_RADIUS, RadialDrawer.MIN_RADIUS),
    };
    const r = new Radial(Object.assign(options, this.options));
    r.draw();
  }
}

RadialDrawer.MIN_RADIUS = 0;
RadialDrawer.MAX_RADIUS = 100;

RadialDrawer.MIN_LEN = 10;
RadialDrawer.MAX_LEN = 15;

RadialDrawer.MIN_SPOKES = 90;
RadialDrawer.MAX_SPOKES = 190;
