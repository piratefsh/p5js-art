import { p } from 'P5Instance';

class MousePointer {
  constructor() {
    this.x = 10;
    this.y = 5;
    this.vel = { x: 2, y: 3 };
  }

  update() {
    this.x = p.mouseX;
    this.y = p.mouseY;
  }
}

const pointer = new MousePointer();

export default { pointer };
