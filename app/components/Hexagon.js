import Shape from './Shape';
import { p } from '../P5Instance';

class Hexagon extends Shape {
  constructor(length=20, x=0, y=0, rotation=0, translation=p.createVector(0, 0)) {
    const point = p.createVector(x, y);
    super(Hexagon.generatePoints(length));
    this.length = length;
    this.rotation = rotation;
    this.translation = translation;
    this.point = point;
  }
}

Hexagon.generatePoints = (start, length) => {
  const start = p.createVector(start.x, start.y + length);
  const points = [];
  for(let i = 0; i < Hexagon.SIDES; i++) {
    const newPoint = start.copy().rotate(Hexagon.ANGLE * i);
    points.push(newPoint);
  }
  return points;
}

Hexagon.SIDES = 6;
Hexagon.ANGLE = 360 / Hexagon.SIDES;

export default Hexagon;