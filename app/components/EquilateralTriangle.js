import Triangle from './Triangle';
import { p } from '../P5Instance';

class EquilateralTriangle extends Triangle {
  constructor(length = 50, x = 0, y = 0, rotation = 0) {
    super();
    this.angle = EquilateralTriangle.ANGLE;
    this.length = length;
    this.rotation = rotation;
    const h = EquilateralTriangle.heightOf(length);

    this.p1 = p.createVector(x + 0, y + 0).rotate(this.rotation);
    this.p2 = p.createVector(x + length, y + 0).rotate(this.rotation);
    this.p3 = p.createVector(x + length / 2, y - h).rotate(this.rotation);
  }
}

EquilateralTriangle.heightOf = (length) => {
  const c2 = length * length;
  const a2 = (length * length) / (2 * 2);
  const h = Math.sqrt(c2 - a2);
  return h;
};

EquilateralTriangle.SIDES = 3;
EquilateralTriangle.ANGLE = 180 / EquilateralTriangle.SIDES;

export default EquilateralTriangle;
