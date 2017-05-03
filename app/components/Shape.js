import { p } from '../P5Instance';

class Shape {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.color = p.color(0, 10);
    this.rotation = 0;
    this.translation = p.createVector(0, 0);
  }

  draw() {
    if (this.drawn) {
      return;
    }
    this.drawn = true;
    p.push();
    p.fill(this.color);
    p.stroke(180);
    p.triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    p.pop();
  }

  update(){
    this.drawn = false
  }

  focus(){
    this.color = p.color(0, 128, 128, 50);
  }

  blur(){
    this.color = p.color(0, 10);
  }
  points(){
    return [this.p1, this.p2, this.p3]
  }
}

export default Shape;
