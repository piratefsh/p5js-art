import { p } from '../P5Instance';
import Square from './shapes/Square';
import Hexagon from './shapes/Hexagon';
import EquilateralTriangle from './shapes/EquilateralTriangle';
import Vertex from './vertex/Vertex';
import Util from './utils/Utils';

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
      if (!Util.inCanvas(sp.x, sp.y)) {
        return;
      }

      const existingPoint = this.points[sp.toString()];
      if (existingPoint) {
        // add shape to point if it exists
        existingPoint.addShape(shape);
      } else {
        // or create new point and add shape to it
        this.points[sp.toString()] = sp;
        sp.addShape(shape);
      }
    });
  }

  getPoints() {
    return Object.keys(this.points).map(k => this.points[k]);
  }

  update() {
    // update all
    this.getPoints().forEach((pt) => {
      pt.shapes.forEach(ps => ps.blur());
      pt.update();
    });

    // add new shapes to point if point is clicked on
    this.getPoints().forEach((pt) => {
      if (this.debug || pt.state === Vertex.PRESSED_STATE) {
        pt.shapes.forEach(ps => ps.focus());
        pt.visited = true;

        while (pt.hasSpace(Shape.ANGLE)){
          const angle = pt.totalAngles();
          const tri = new Shape(this.length, pt.x, pt.y, angle);
          pt.addShape(tri);
          this.addPoints(tri.points, tri);
        }
      }
    });
  }

  draw() {
    this.getPoints().forEach(pt => {
      pt.draw();
    });

    this.printDebug();
  }

  printDebug() {
    // print debug info if point is hovered on
    this.getPoints().forEach((pt) => {
      if (pt.state === Vertex.HOVER_STATE) {
        console.info(pt.x, pt.y, `has ${pt.shapes.length} shapes`);
      }
    });
  }
}

export default TesselationDrawer;
