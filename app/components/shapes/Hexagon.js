import Shape from './Shape';
import { p } from 'P5Instance';

class Hexagon extends Shape {
  constructor(length=10, x=0, y=0, rotation=0, translation=p.createVector(0, 0)) {
    const point = p.createVector(x, y);
    const points = Shape.generate(Hexagon.SIDES, length);
    // position shape
    points.forEach((pt) => {
      pt.y -= Shape.radius(Hexagon.SIDES, length);
      pt.rotate(p.radians(rotation))
    })

    super(points, Hexagon.SIDES);
    this.length = length;
    this.rotation = rotation;
    this.translation = translation;
    this.point = point;
    this.angle = Hexagon.ANGLE;
    this.sides = Hexagon.SIDES
  }
}

Hexagon.SIDES = 6;
Hexagon.ANGLE = 120;

export default Hexagon;