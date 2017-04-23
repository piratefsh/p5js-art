import EquilateralTriangle from './EquilateralTriangle';
import { p } from '../P5Instance';

class TriangleTesselation {
  constructor(length = 80) {
    this.triangles = [];
    this.length = length;

    const w = Math.ceil(p.width / length);
    const h = Math.ceil(p.height / EquilateralTriangle.heightOf(length));
    for (let i = 0; i < w; i++) {
      const row = [];
      this.triangles.push(row);
      for (let j = 0; j < h; j++) {
        const t = new EquilateralTriangle(length);
        row.push(t);
      }
    }
  }

  draw() {
    p.stroke(200);
    p.push();
    this.triangles.forEach((row, i) => {
      p.translate(0, EquilateralTriangle.heightOf(this.length))
      p.push();
      p.translate(- i % 2 * this.length / 2, 0)
      row.forEach((t) => {
        t.draw();
        p.translate(this.length, 0);
      });
      p.pop();
    });
    p.pop();
  }
}

export default TriangleTesselation;
