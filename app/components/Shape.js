import { p } from '../P5Instance';

class Shape {
  constructor(points) {
    this.points = points;
    this.color = p.color(0, 10);
    this.rotation = 0;
    this.translation = p.createVector(0, 0);
  }

  draw() {
    debugger;
    if (this.drawn) {
      return;
    }
    else{
      this.drawn = true;
    }

    p.push();
    // set style
    p.fill(this.color);
    p.stroke(180);

    // draw shape
    p.beginShape()
    this.points.forEach((pt)=> {
      p.vertex(pt.x, pt.y)
    })
    p.endShape()
    p.pop();
  }

  update(){
    this.drawn = false
  }

  // highlight color when focused
  focus(){
    this.color = p.color(0, 128, 128, 50);
  }

  // default color
  blur(){
    this.color = p.color(0, 10);
  }
}

export default Shape;
