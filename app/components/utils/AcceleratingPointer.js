import { p } from 'P5Instance';

class AcceleratingPointer {
  constructor() {
    this.x = 10;
    this.y = 5;
    this.vel = { x: 1, y: 1 };
    this.acc = { x: .1, y: .1 };
  }

  update() {
    p.fill(255, 0, 0)
    p.ellipse(this.x, this.y, 20, 20)
    this.x += this.vel.x;
    this.y += this.vel.y;

    if(this.x < 0 || this.x > p.width/2){
      this.vel.x *= -1
    }

    if(this.y < 0 || this.y > p.height/2){
      this.vel.y *= -1
    }

    this.acc.x = p.map(Math.abs(this.x - p.width), 0, p.width/2, 0.0005, 0.005)
    this.acc.y = p.map(Math.abs(this.y - p.height), 0, p.height/2, 0.0005, 0.005)

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y

    console.log('acc', this.acc)
    console.log('vel', this.vel)
  }
}

const pointer = new AcceleratingPointer();

export default { pointer };
