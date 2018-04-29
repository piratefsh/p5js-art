import { p } from 'P5Instance';

class Dot{
  constructor(x=0, y=0, size=5){
    Object.assign(this, {
      x,
      y,
      size
    });
  }

  draw(){
    const { x, y, size } = this;
    p.push();
    p.color(255, 10);
    p.ellipse(x, y, size, size)
    p.pop();
  }
}

export default class DotSegment {
  constructor(x, y){
    Object.assign(this, {
      x,
      y,
      dots: [],
      step: 12,
      numDots: 5,
    })

    for(let i = 0; i < this.numDots; i++){
      this.dots.push(new Dot(i * this.step, 0));
    }

    this.width = this.step * this.numDots;
  }

  update(){

  }

  draw(){
    p.push()
    const {x, y} = this;
    p.translate(x, y);
    this.dots.forEach((d) => {
      d.draw();
    })
    p.pop();
  }
}