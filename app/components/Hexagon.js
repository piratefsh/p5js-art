import Shape from './Shape';
import { p } from '../P5Instance';

class Hexagon extends Shape {
  constructor(length=20, x=0, y=0, rotation=0, translation=p.createVector(0, 0)) {
    const point = p.createVector(x, y);
    super(Hexagon.generatePoints(point, length, rotation));
    this.length = length;
    this.rotation = rotation;
    this.translation = translation;
    this.point = point;
    this.angle = Hexagon.ANGLE;
  }
}

Hexagon.generatePoints = (pos, length, rotation) => {
  const start = p.createVector(0, length);
  const points = [];
  for(let i = 0; i < Hexagon.SIDES + 1; i++) {
    const newPoint = start.copy()
    newPoint
      .rotate(p.radians(Hexagon.ANGLE * i/2))

    points.push(newPoint);
  }

  points.forEach((pt) => {
    pt.y -= length;
    pt.rotate(p.radians(rotation))
      .add(pos);
  })
  return points;
}

Hexagon.SIDES = 6;
Hexagon.ANGLE = 120;

export default Hexagon;