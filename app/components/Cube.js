export default class Cube{
  constructor(p5, x, y){
    this.p5 = p5;
    this.pos = p5.createVector(x, y);

  }
  draw(){
    const p5 = this.p5; 
    const line = p5.createVector(40, 0)

    p5.push();
    p5.translate(this.pos.x, this.pos.y)
    this..rotate(Math.PI/5);
    p5.line(0, 0, line.x, line.y)
    // p5.line(0, 0, line.x, line.y)
    p5.pop();
  }
}