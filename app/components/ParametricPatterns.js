import { p } from 'P5Instance';

export default class ParametricPatterns {

  constructor() {
    this.step = 0.02;
    this.t = 0;
    this.numLines = 5;
  }

  draw() {
    if(this.t > p.TWO_PI * 2){
      // return
    }
    p.push();
    p.strokeWeight(3);
    p.translate(p.width/2, p.height/2)
    for(let i = 0; i < this.numLines; i+=0.1){
      const t = this.t + i;
      // p.fill(255, 0, 0)
      // p.ellipse(this.x1(t), this.y1(t), 10, 10);
      // p.fill(0, 255, 0)
      // p.ellipse(this.x2(t), this.y2(t), 10, 10);

      
      p.stroke(255, p.map(i, 0, this.numLines, 0, 200));
      p.line(this.x1(t), this.y1(t), this.x2(t), this.y2(t));
      // console.log(this.x1(i), this.y1(i), this.x2(i), this.y2(i));
    }
    p.pop();
  }

  update() {
    this.t = (this.t + this.step) 

  }

  x1(t) {
    return 200 * p.sin(t/5);
  }

  y1(t) {
    return p.sin(t/5) + p.cos(t/5) * 200;
  }

  x2(t) {
    return 100 * p.cos(t);
  }

  y2(t) {
    return 200 * p.sin(t/4) + 100 * p.sin(t/2);
  }
}


ParametricPatterns.X1_FREQ = 50;
ParametricPatterns.Y1_FREQ = 7;
ParametricPatterns.X2_FREQ = 90;
ParametricPatterns.Y2_FREQ = 5;
ParametricPatterns.X1_AMP = 20;
ParametricPatterns.Y1_AMP = 100;
ParametricPatterns.X2_AMP = 7;
ParametricPatterns.Y2_AMP = 300;
