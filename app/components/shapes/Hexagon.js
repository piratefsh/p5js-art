import Shape from './Shape';
import { p } from 'P5Instance';

class Hexagon extends Shape {
  constructor(length=10, x=0, y=0, rotation=0, translation=p.createVector(0, 0)) {
    const point = p.createVector(x, y);
    const points = Shape.generate(Hexagon.SIDES, length);

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
    this.angle = Hexagon.ANGLE;
  }
}

Hexagon.SIDES = 6;
Hexagon.ANGLE = 120;

export default Hexagon;