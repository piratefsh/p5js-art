import { p } from 'P5Instance';

export default class SnezntUnit {
  constructor(props = {points: []}) {
    this.points = props.points;
  }

  draw() {
    p.push();
    p.beginShape();
    this.points.forEach((pt) => {
      p.vertex(pt.x, pt.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }

  update() {
  }
}
