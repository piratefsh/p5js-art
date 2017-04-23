import { p } from '../P5Instance';
import EquilateralTriangle from './EquilateralTriangle';
import SelectablePoint from './SelectablePoint';

class TesselationDrawer {
  constructor(length = 80) {
    this.points = {};
    this.length = length;
    const tri = new EquilateralTriangle(this.length, p.width / 2, p.height / 2);
    this.addPoints(tri);
  }

  addPoints(shape) {
    const newPoints = shape
      .points()
      .forEach((s) => {
        const sp = new SelectablePoint(s.x, s.y, shape);
        if (!this.points[sp.toString()]) {
          this.points[sp.toString()] = sp;
        }
      });
  }

  pointsValues() {
    return Object.keys(this.points).map(k => this.points[k]);
  }

  update() {
    this.pointsValues().forEach((pt) => {
      pt.shapes.forEach(ps => ps.blur());
      pt.update();
    });

    this.pointsValues().forEach((pt) => {
      if (pt.state === SelectablePoint.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());

        if (pt.hasSpace(30)) {
          const tri = new EquilateralTriangle(this.length, pt.x, pt.y);
          pt.addShape(tri);
          this.addPoints(tri);
        }
      }
    });
  }

  draw() {
    this.pointsValues().forEach(pt => {
      pt.draw();
      pt.shapes.forEach(sh => sh.draw());
    });
  }
}

export default TesselationDrawer;
