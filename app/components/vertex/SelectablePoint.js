// Hoverable and clickable point

import { p } from 'P5Instance';

class SelectablePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = SelectablePoint.DEFAULT;
    this.color = SelectablePoint.DEFAULT_COLOR;

    // hover hit area threshold
    this.thresh = 5;
  }

  hovered() {
    return Math.abs(p.mouseX - this.x) < this.thresh
      && Math.abs(p.mouseY - this.y) < this.thresh;
  }

  update() {
    let color = SelectablePoint.DEFAULT_COLOR;
    let size = SelectablePoint.DEFAULT_SIZE;
    this.state = SelectablePoint.DEFAULT_STATE;

    if (this.hovered()) {
      color = SelectablePoint.HOVER_COLOR;
      size = SelectablePoint.HOVER_SIZE;
      this.state = SelectablePoint.HOVER_STATE;

      if (p.mouseIsPressed) {
        size = SelectablePoint.PRESSED_SIZE;
        color = SelectablePoint.PRESSED_COLOR;
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
    p.translate(this.x, this.y);
    p.ellipse(0, 0, this.size, this.size);
    p.pop();
  }

  toString() {
    return `${Math.round(this.x)},${Math.round(this.y)}`;
  }
}

SelectablePoint.DEFAULT_STATE = 'default';
SelectablePoint.HOVER_STATE = 'hover';
SelectablePoint.PRESSED_STATE = 'pressed';
SelectablePoint.DEFAULT_COLOR = 'rgba(0, 128, 128, 0.5)';
SelectablePoint.DEFAULT_SIZE = 8;
SelectablePoint.HOVER_COLOR = 'rgba(0, 128, 128, 0.5)';
SelectablePoint.HOVER_SIZE = 12;
SelectablePoint.PRESSED_SIZE = 16;
SelectablePoint.PRESSED_COLOR = 'rgba(0, 128, 128)';

export default SelectablePoint;
