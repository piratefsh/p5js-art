import EquilateralTriangle from './EquilateralTriangle';
import SelectablePoint from './SelectablePoint';
import { p } from '../P5Instance';

class TriangleTesselation {
  constructor(length = 80) {
    this.triangles = [];
    this.length = length;
    this.points = [];

    const w = Math.ceil(p.width / length) + 1;
    const h = Math.ceil(p.height / EquilateralTriangle.heightOf(length)) + 1;
    let x = 0;
    let y = 0;

    for (let i = 0; i < h; i++) {
      const row = [];
      y += EquilateralTriangle.heightOf(this.length);
      x = (-i % 2) * (length / 2);
      this.triangles.push(row);
      for (let j = 0; j < w; j++) {
        const t = new EquilateralTriangle(length, x, y);
        x += length;
        row.push(t);

        t.points().forEach((pt) => {
          this.points.push(new SelectablePoint(pt.x, pt.y));
        });
      }
    }
  }

  drawPoints() {
    this.points.forEach((pt) => {
      pt.draw();
    });
  }

  draw() {
    p.stroke(200);
    this.triangles.forEach((row, i) => {
      row.forEach((t) => {
        t.draw();
      });
    });

    this.drawPoints();
  }
}

export default TriangleTesselation;
