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
      const offset = shape ? 360 - shape.rotation : 0;
      const sp = new SelectablePoint(s.x, s.y, offset);
      const existingPoint = this.points[sp.toString()];
      if (existingPoint) {
        existingPoint.addShape(shape);
      }
      else{
        this.points[sp.toString()] = sp;
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
        // console.log(pt, pt.shapes)
      }
      if (pt.state === SelectablePoint.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());
        while (pt.hasSpace(EquilateralTriangle.ANGLE)) {
          const tri = new EquilateralTriangle(this.length, pt.x, pt.y, pt.totalAngles());
          pt.addShape(tri);
          this.addPoints(tri.points(), tri);
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
