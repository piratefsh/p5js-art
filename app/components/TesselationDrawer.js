import { p } from '../P5Instance';
import Square from './shapes/Square';
import Hexagon from './shapes/Hexagon';
import EquilateralTriangle from './shapes/EquilateralTriangle';
import Vertex from './vertex/Vertex';
import Util from './utils/Utils';

class TesselationDrawer {
  constructor(pattern, length = 50) {
    this.debug = false;
    this.pattern = TesselationDrawer.parsePattern(pattern);
    this.points = {};
    this.shapes = {};
    this.length = length;
    this.patternShapes = this.pattern.map((edges) => {
      return TesselationDrawer.getShape(edges)
    });

    // add starting point
    const center = new Vertex(p.width / 2, p.height / 2, this.pattern);
    this.addPoints([center]);

    console.log('pattern', this.pattern);
    console.log('shape', this.patternShapes);
  }

  addPoints(points, shape, vertex) {
    points.forEach((s, i) => {

      let orientation = 0;
      if (shape) {
        orientation = (i * 360/shape.sides - vertex.orientation)
      }

      const sp = new Vertex(s.x, s.y, this.pattern, orientation);
      // ignore if point is outside of canvas
      if (!Util.inCanvas(sp.x, sp.y)) {
        return;
      }
      const existingPoint = this.points[sp.toString()];
      if (existingPoint) {
        // add shape to point if it exists
        // todo
      } else {
        // or create new point and add shape to it
        this.points[sp.toString()] = sp;
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
    this.getPoints().forEach((vertex) => {
      if ((this.debug && !vertex.visited)  || vertex.state === Vertex.PRESSED_STATE) {
        vertex.shapes.forEach(ps => ps.focus());
        vertex.visited = true;

        this.patternShapes.forEach((Shape) => {
          if(vertex.hasSpace(Shape.SIDES)){
            const newShape = vertex.addShape(Shape, this.length);
            const offsetPoints = newShape.points.map((opt) => {
              return opt
                .rotate(p.radians(vertex.orientation))
                .add(p.createVector(vertex.x, vertex.y))
            });
            this.addPoints(offsetPoints, newShape, vertex);
          }
        })
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
        document.getElementById('info').innerHTML = `orientation ${pt.orientation}`
        console.info(pt.x, pt.y, `has ${pt.numUnoccupied()} shapes`, pt.shapes, pt);
      }
    });
  }
}

TesselationDrawer.parsePattern = (str) => {
  if (str === undefined || str.length < 1) {
    throw new Error(`TesselationDrawer: Invalid pattern ${str}`);
  }
  return str.split('.').map(num => parseInt(num, 10));
};

TesselationDrawer.getShape = (numEdges) => {
  const key = `${numEdges}`;
  if (Object.keys(TesselationDrawer.SHAPES).indexOf(key) > -1) {
    return TesselationDrawer.SHAPES[key];
  }

  throw new Error(`TesselationDrawer: No shape for ${numEdges} edges`);
};

TesselationDrawer.SHAPES = {
  '3': EquilateralTriangle,
  '4': Square,
  '6': Hexagon,
};


export default TesselationDrawer;
