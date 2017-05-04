import Shape from './Shape';
import { p } from 'P5Instance';

class EquilateralTriangle extends Shape {
  constructor(length = 10, x = 0, y = 0, rotation = 0, translation = p.createVector(0, 0)) {
    const point = p.createVector(x, y);
    const points = Shape.generate(EquilateralTriangle.SIDES, length);
    // position shape
    points.forEach((pt) => {
      pt.y -= length;
      pt.rotate(p.radians(rotation));
    });

    super(points, EquilateralTriangle.SIDES);

    this.angle = EquilateralTriangle.ANGLE;
    this.length = length;
    this.rotation = rotation;
    this.translation = translation;
    this.point = point;
  }
}

EquilateralTriangle.SIDES = 3;
EquilateralTriangle.ANGLE = 180 / EquilateralTriangle.SIDES;

export default EquilateralTriangle;
