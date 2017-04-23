import { p } from '../P5Instance';

class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.color = p.color(0, 10);
    this.rotation = 0;
    this.translation = p.createVector(0, 0);
  }

  draw() {
    p.push();
    p.stroke(180);
    p.triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    p.pop();
  }

  update(){
  }

  focus(){
    this.color = p.color(0, 128, 128, 50);
  }

  blur(){
    this.color = p.color(0, 10);
  }

  transformedPoints() {
    return [this.p1, this.p2, this.p3].map((pt) => {
      return pt
      .copy()
      .rotate(p.radians(this.rotation))
      .add(this.translation)
    });
  }
}

export default Triangle;
