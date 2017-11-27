import { p } from 'P5Instance';

class BouncePointer {
  constructor() {
    this.x = 10;
    this.y = 5;
    this.vel = { x: 2, y: 3 };
  }

  update() {
    p.fill(255, 0, 0)
    p.ellipse(this.x, this.y, 20, 20)
    this.x += this.vel.x;
    this.y += this.vel.y;

    if(this.x < 0 || this.x > p.width){
      this.vel.x *= -1
    }


    if(this.y < 0 || this.y > p.height){
      this.vel.y *= -1
    }

  }
}

const pointer = new BouncePointer();

export default { pointer };
