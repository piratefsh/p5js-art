import { p } from '../P5Instance';

class SelectablePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    p.fill(250);
    p.ellipse(this.x, this.y, 5, 5);
  }

  mouseClicked() {
    p.fill(250, 0, 0);
    p.ellipse(this.x, this.y, 5, 5);
  }
}

export default SelectablePoint;
