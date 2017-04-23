import Triangle from './Triangle';
import { p } from '../P5Instance';

class EquilateralTriangle extends Triangle {
  constructor(length=50, rotation=0) {
    super();

    this.length = length;
    this.rotation = rotation;
    const x = EquilateralTriangle.heightOf(length);

    this.p1 = p.createVector(0, 0).rotate(this.rotation);
    this.p2 = p.createVector(length, 0).rotate(this.rotation);
    this.p3 = p.createVector(length / 2, -x).rotate(this.rotation);

  }
}

EquilateralTriangle.heightOf = (length) => {
  const c2 = length * length;
  const a2 = (length * length) / (2 * 2);
  const x = Math.sqrt(c2 - a2);
  return x;
}

export default EquilateralTriangle;
