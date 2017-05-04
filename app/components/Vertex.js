// Tessellation vertex. Has shapes attached to it

import { p } from '../P5Instance';
import SelectablePoint from './SelectablePoint';
import Util from './Utils';

class Vertex extends SelectablePoint {
  constructor(x, y) {
    super(x, y);
    this.shapes = [];
  }

  totalAngles() {
    return this.shapes.reduce((acc, s) => {
      return acc + s.angle;
    }, 0);
  }

  hasSpace(angle) {
    const usedAngle = this.totalAngles();
    return usedAngle + angle <= 360;
  }

  addShape(shape) {
    if (shape && this.hasSpace(shape.angle) && this.shapes.indexOf(shape) < 0) {
      this.shapes.push(shape);
      return true;
    }

    return false;
  }

  update() {
    super.update();

    // update shapes
    this.shapes.forEach(s => s.update());
  }

  draw() {
    super.draw();

    // draw shapes
    p.push();
    this.shapes.forEach((s) => {
      s.draw();
    });
    p.pop();
  }
}

Vertex.DEFAULT_STATE = 'default';
Vertex.HOVER_STATE = 'hover';
Vertex.PRESSED_STATE = 'pressed';
Vertex.DEFAULT_COLOR = 'rgba(0, 128, 128, 0.5)';
Vertex.DEFAULT_SIZE = 8;
Vertex.HOVER_COLOR = 'rgba(0, 128, 128, 0.5)';
Vertex.HOVER_SIZE = 12;
Vertex.PRESSED_SIZE = 16;
Vertex.PRESSED_COLOR = 'rgba(0, 128, 128)';

export default Vertex;
