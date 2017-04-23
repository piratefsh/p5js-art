import { p } from '../P5Instance';

class SelectablePoint {
  constructor(x, y, shape) {
    this.DEFAULT_COLOR = p.color(0, 128, 128, 50);
    this.DEFAULT_SIZE = 8;
    this.HOVER_COLOR = p.color(0, 128, 128, 50);
    this.HOVER_SIZE = 12;
    this.PRESSED_SIZE = 16;
    this.PRESSED_COLOR = p.color(0, 128, 128);
    this.x = x;
    this.y = y;
    this.thresh = 5;
    this.state = SelectablePoint.DEFAULT;
    this.color = this.DEFAULT_COLOR;
    this.shapes = [];
    if (shape) {
      this.shapes.push(shape);
    }
  }

  hasSpace(angle) {
    return this.shapes.reduce((acc, s) => {
      return acc + s.angle();
    }, 0) + angle < 360;
  }

  addShape(shape) {
    if (this.hasSpace(shape.angle())) {
      this.shapes.push(shape);
      return true;
    }

    return false;
  }

  hovered() {
    return Math.abs(p.mouseX - this.x) < this.thresh
      && Math.abs(p.mouseY - this.y) < this.thresh;
  }

  update() {
    let color = this.DEFAULT_COLOR;
    let size = this.DEFAULT_SIZE;
    this.state = SelectablePoint.DEFAULT_STATE;

    if (this.hovered()) {
      color = this.HOVER_COLOR;
      size = this.HOVER_SIZE;
      this.state = SelectablePoint.HOVER_STATE;

      if (p.mouseIsPressed) {
        size = this.PRESSED_SIZE;
        color = this.PRESSED_COLOR;
        this.state = SelectablePoint.PRESSED_STATE;
      }
    }

    this.color = color;
    this.size = size;
  }

  draw() {
    p.push();
    p.fill(this.color);
    p.noStroke();
    p.ellipse(this.x, this.y, this.size, this.size);
    p.pop();
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

SelectablePoint.DEFAULT_STATE = 'default';
SelectablePoint.HOVER_STATE = 'hover';
SelectablePoint.PRESSED_STATE = 'pressed';


export default SelectablePoint;
