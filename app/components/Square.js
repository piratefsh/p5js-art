import Shape from './Shape';
import { p } from '../P5Instance';

class Square extends Shape {
  constructor(length=10, x=0, y=0, rotation=0, translation=p.createVector(0, 0)) {
    const point = p.createVector(x, y);
    const points = Shape.generate(Square.SIDES, length);

    // position shape
    points.forEach((pt) => {
      pt.y -= length;
      pt.rotate(p.radians(rotation))
        .add(point);
    })

    super(points);
    this.length = length;
    this.rotation = rotation;
    this.translation = translation;
    this.point = point;
    this.angle = Square.ANGLE;
  }
}

Square.SIDES = 4;
Square.ANGLE = 90;

export default Square;