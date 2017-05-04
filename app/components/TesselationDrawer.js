import { p } from '../P5Instance';
import Square from './Square';
import Hexagon from './Hexagon';
import EquilateralTriangle from './EquilateralTriangle';
import Vertex from './Vertex';

const Shape = Square;

class TesselationDrawer {
  constructor(length = 50) {
    this.debug = false;
    this.points = {};
    this.length = length;
    this.addPoints([new Vertex(p.width / 2, p.height / 2)]);
  }

  addPoints(points, shape) {
    points.forEach((s) => {

      const sp = new Vertex(s.x, s.y);
      // ignore if point is outside of canvas
      if(!sp.inCanvas()){
        return;
      }
      const existingPoint = this.points[sp.toString()];
      if (existingPoint) {
        existingPoint.addShape(shape);
      }
      else {
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
      if (pt.state === Vertex.HOVER_STATE) {
        console.log(pt.x, pt.y, pt.shapes.length);
      }
      if (this.debug || pt.state === Vertex.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());
        pt.visited = true;
        while (pt.hasSpace(Shape.ANGLE))
        {
          const angle = pt.totalAngles();
          const tri = new Shape(this.length, pt.x, pt.y, angle);
          pt.addShape(tri);
          this.addPoints(tri.points, tri);
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
