import { p } from 'P5Instance';

export default class SnezntUnit {
  constructor(props = {radius: 100, center: null}) {
    this.radius = props.radius || 100;
    this.center = props.center || { x: p.width/2, y: p.height/2 };

    this.points = [];

    const vertex = p.createVector(0, 0);

    for (let i = 0; i < 4; i++) {
      const vx = vertex.copy()
        .add(this.radius, 0)
        .rotate(p.TWO_PI / 4 * i + p.PI/4);
      this.points.push(vx);
    }
  }

  draw() {
    p.push();
    p.fill(0, 0);
    p.translate(this.center.x, this.center.y);
    p.beginShape();
    this.points.forEach((pt) => {
      p.vertex(pt.x, pt.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }

  update() {
    this.center.x += 1;
    this.center.y += 1;
  }
}
