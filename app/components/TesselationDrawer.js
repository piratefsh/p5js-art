import { p } from '../P5Instance';
import EquilateralTriangle from './EquilateralTriangle';
import SelectablePoint from './SelectablePoint';

class TesselationDrawer {
  constructor(length = 80) {
    this.points = [];
    this.length = length;
    const tri = new EquilateralTriangle(this.length, p.width / 2, p.height / 2);
    this.shapes = [];
    this.addShape(tri);
  }

  addShape(shape) {
    this.shapes.push(shape);
    shape.points().forEach((pt) => {
      const point = new SelectablePoint(pt.x, pt.y);
      point.addShape(shape);
      if(this.points.indexOf(point) < 0){
        this.points.push(point);
      }
    });
  }

  update() {
    this.shapes.forEach(sh => sh.blur());
    this.points.forEach((pt) => {
      pt.update();

      if (pt.state === SelectablePoint.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());

        if (pt.hasSpace(30)) {
          const tri = new EquilateralTriangle(this.length, pt.x, pt.y);
          this.addShape(tri);
        }
      }
    });
  }

  draw() {
    this.shapes.forEach(sh => sh.draw());
    this.points.forEach(pt => pt.draw());
  }
}

export default TesselationDrawer;
