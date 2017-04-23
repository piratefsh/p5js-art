import { p } from '../P5Instance';

class SelectablePoint {
  constructor(x, y) {
    this.DEFAULT_COLOR = p.color(0, 128, 128, 50);
    this.DEFAULT_SIZE = 8;
    this.HOVER_COLOR = p.color(0, 128, 128, 50);
    this.HOVER_SIZE = 10;
    this.PRESSED_SIZE = 14;
    this.PRESSED_COLOR = p.color(0, 128, 128);
    this.x = x;
    this.y = y;
    this.thresh = 5;
  }

  hovered() {
    return Math.abs(p.mouseX - this.x) < this.thresh
      && Math.abs(p.mouseY - this.y) < this.thresh;
  }

  draw() {
    let color = this.DEFAULT_COLOR;
    let size = this.DEFAULT_SIZE;
    if (this.hovered()) {
      color = this.HOVER_COLOR;
      size = this.HOVER_SIZE;
      if(p.mouseIsPressed) {
        size = this.PRESSED_SIZE;
        color = this.PRESSED_COLOR;
      }
    }
    p.push();
    p.fill(color);
    p.noStroke();
    p.ellipse(this.x, this.y, size, size);
    p.pop();
  }
}


export default SelectablePoint;
