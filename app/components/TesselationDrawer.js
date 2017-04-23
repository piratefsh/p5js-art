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
      const sp = new SelectablePoint(s.x, s.y);
      const existingPoint = this.points[sp.toString()];
      if (existingPoint) {
        existingPoint.addShape(shape);
      }
      else{
        this.points[sp.toString()] = sp;
        console.log(sp)
        sp.addShape(shape);
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
      if (pt.state === SelectablePoint.HOVER_STATE) {
        console.log(pt.shapes.toString())
      }
      if (pt.state === SelectablePoint.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());
        while (pt.hasSpace(EquilateralTriangle.ANGLE)) {
          const tri = new EquilateralTriangle(this.length);
          pt.addShape(tri);
          this.addPoints(pt.pointsFor(tri), tri);
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
