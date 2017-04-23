import { p } from '../P5Instance';
import EquilateralTriangle from './EquilateralTriangle';
import SelectablePoint from './SelectablePoint';

class TesselationDrawer {
  constructor(length = 80) {
    this.points = [];
    this.length = length;
    const tri = new EquilateralTriangle(this.length, p.width / 2, p.height / 2);
    this.shapes = [tri];
    this.shapes.forEach((shape) => {
      shape.points().forEach((pt) => {
        const point = new SelectablePoint(pt.x, pt.y);
        point.addShape(shape);
        this.points.push(point);
      });
    });
  }

  update(){
    this.shapes.forEach(sh => sh.blur());
    this.points.forEach((pt) => {
      if(pt.state === SelectablePoint.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());
      }
      pt.update()
    });
  }

  draw() {
    this.shapes.forEach(sh => sh.draw());
    this.points.forEach(pt => pt.draw());
  }
}

export default TesselationDrawer;
