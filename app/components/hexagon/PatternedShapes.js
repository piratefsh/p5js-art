import Shape from './Shape';
import Util from '../utils/Utils';
import { p } from 'P5Instance';

class PatternedShape extends Shape {
  constructor(options) {
    super(options);


    // get midpoints of each edge
    this.midpoints = [];
    let prevV = null;
    for (let i = 0; i < this.vertices.length; i++) {
      const currV = this.vertices[i];

      if (prevV) {
        this.midpoints.push(Util.midpoint(prevV, currV));
      }
      prevV = currV;
    }

    this.midpoints.push(prevV, this.vertices[0]);

    if (!(this.sides in PatternedShape.store)) {
      PatternedShape.store[this.sides] = PatternedShape.generatePattern(this.midpoints);
    }

    this.curves = PatternedShape.store[this.sides];
  }

  draw() {
    // super.draw();
    p.push();
    p.translate(this.centerPos.x, this.centerPos.y);
    p.rotate(this.rotation);
    p.fill(0, 0);
    this.curves.forEach((c) => {
      // p.stroke('red');
      // p.strokeWeight(0);
      // p.line(c[0], c[1], c[2], c[3])
      // p.line(c[4], c[5], c[6], c[7])
      p.stroke('teal');
      p.strokeWeight(2);
      p.bezier(...c);
    });
    p.pop();
  }
}

PatternedShape.generatePattern = (midpoints) => {
  // get midpoint of each line
  // randomly pick another midpoint
  // connect with curve
  return midpoints.map((start, i) => {
    const indices = midpoints.map((m, j) => j);
    const endIndex = p.random(indices);
    indices.splice(endIndex, 1);
    const controlAIndex = p.random(indices);
    indices.splice(controlAIndex, 1);
    const controlBIndex = p.random(indices);

    // if(controlAIndex > controlBIndex){
    //   const temp = controlAIndex;
    //   controlAIndex = controlBIndex
    //   controlBIndex = temp
    // }

    const end = midpoints[endIndex];
    const controlA = midpoints[controlAIndex];
    const controlB = midpoints[controlBIndex];
    return [start.x, start.y, controlA.x, controlA.y, controlB.x, controlB.y, end.x, end.y];
  });
};

PatternedShape.store = {};

class PatternedHexagon extends PatternedShape {
  constructor(options) {
    options.sides = 6;
    options.rotation = p.random(PatternedHexagon.rotations);
    super(options);
  }
}

PatternedHexagon.rotations = (() => {
  const rots = [];
  for (let i = 0; i < 6; i++) {
    rots.push(Math.PI / 3 * i);
  }
  return rots;
})();


export default {
  PatternedHexagon,
};
