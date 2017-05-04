// Tessellation vertex. Has shapes attached to it

import { p } from 'P5Instance';
import SelectablePoint from './SelectablePoint';
import Util from 'components/utils/Utils';
import Shape from 'components/shapes/Shape';

class Vertex extends SelectablePoint {
  constructor(x, y, pattern) {
    super(x, y);
    this.pattern = pattern;
    this.shapes = new Array(this.pattern.length);
  }

  totalAngles() {
    return this.shapes.reduce((acc, s) => {
      return acc + s.angle;
    }, 0);
  }

  hasSpace(sides) {
    for (let i = 0; i < this.pattern.length; i++) {
      if(this.pattern[i] === sides && this.shapes[i] === undefined) {
        return true;
      }
    }
    return false;
  }

  addShape(ShapeConstructor, length) {
    if (ShapeConstructor === undefined) {
      return;
    }

    let angleSoFar = 0;
    for (let i = 0; i < this.shapes.length; i++) {
      const slot = this.shapes[i];
      const numSides = this.pattern[i];
      angleSoFar += Shape.internalAngleFor(numSides)
      // if slot is unoccupied and num sides matches pattern
      if (numSides === ShapeConstructor.SIDES
        && slot === undefined) {
        // fill up slot
        const newShape = new ShapeConstructor(length, this.x, this.y, angleSoFar);
        this.shapes[i] = newShape;
        return newShape;
      }
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
