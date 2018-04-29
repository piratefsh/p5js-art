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
    p.ellipse(x, y, size, size)
  }
}

export default class DotSegment {
  constructor({
    x,
    y,
    step=10,
    numDots=10,
    dotSize=5 }){
    Object.assign(this, {
      x,
      y,
      step,
      numDots,
      dotSize,
      dots: [],
    })

    for(let i = 0; i < this.numDots; i++){
      this.dots.push(new Dot(i * this.step, 0, dotSize));
    }

    this.width = this.step * this.numDots;
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