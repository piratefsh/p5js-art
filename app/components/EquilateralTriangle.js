import Shape from './Shape';
import { p } from '../P5Instance';

class EquilateralTriangle extends Shape {
  constructor(length = 50, x = 0, y = 0, rotation = 0, translation = p.createVector(0, 0)) {
    super();
    this.angle = EquilateralTriangle.ANGLE;
    this.length = length;
    this.rotation = rotation;
    this.translation = translation;
    this.point = p.createVector(x, y);
    const h = EquilateralTriangle.heightOf(length);
    this.p1 = p.createVector(0, 0).rotate(p.radians(rotation)).add(this.point)
    this.p2 = p.createVector(length, 0).rotate(p.radians(rotation)).add(this.point)
    this.p3 = p.createVector(length / 2, -h).rotate(p.radians(rotation)).add(this.point)
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
