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
      if (this.pattern[i] === sides && this.shapes[i] === undefined) {
        return true;
      }
    }
    return false;
  }

  addShapeAtPoint(ShapeConstructor, length, i) {
    let angleSoFar = 0;

    for (let j = 0; j < i; j++) {
      angleSoFar += Shape.internalAngleFor(this.pattern[i]);
    }

    const newShape = new ShapeConstructor(length, this.x, this.y, angleSoFar);
    this.shapes[i] = newShape;
    return newShape;
  }

  addShapeInstance(instance) {
    if (instance === undefined || this.shapes.indexOf(instance) > -1) {
      return;
    }

    const emptySlot = this.emptySlot(instance.points.length - 1);
    if (emptySlot !== false) {
      this.shapes[emptySlot] = instance;
      return instance;
    }
    return false;
  }

  addShape(ShapeConstructor, length) {
    if (ShapeConstructor === undefined) return;

    const emptySlot = this.emptySlot(ShapeConstructor.SIDES);
    if (emptySlot !== false) {
      return this.addShapeAtPoint(ShapeConstructor, length, emptySlot);
    }

    return false;
  }

  emptySlot(sides) {
    for (let i = 0; i < this.shapes.length; i++) {
      const slot = this.shapes[i];
      const numSides = this.pattern[i];
      // if slot is unoccupied and num sides matches pattern
      if (numSides === sides
        && slot === undefined) {
        // return slot
        return i;
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

  numUnoccupied() {
    return this.shapes.filter(s => s !== undefined).length;
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
