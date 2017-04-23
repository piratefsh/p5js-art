import { p } from '../P5Instance';
import EquilateralTriangle from './EquilateralTriangle';
import SelectablePoint from './SelectablePoint';

class TesselationDrawer {
  constructor(length = 80) {
    this.points = {};
    this.length = length;
    this.addPoints([new SelectablePoint(p.width/2, p.height/2)]);
  }

  addPoints(points, shape) {
    points.forEach((s) => {
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
        while (pt.hasSpace(EquilateralTriangle.ANGLE)) {
          const tri = new EquilateralTriangle(this.length);
          pt.addShape(tri);
          this.addPoints(tri.transformedPoints());
        }
      }
    });
  }

  draw() {
    this.pointsValues().forEach(pt => {
      pt.draw();
    });
  }
}

export default TesselationDrawer;
