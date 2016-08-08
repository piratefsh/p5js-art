export default class Agent{
  constructor(p5, pos){
    this.p5 = p5;
    this.pos = pos;
  }

  draw(){
    this.p5.push()
    this.p5.translate(this.pos.x, this.pos.y)
    this.p5.ellipse(0, 0, 2, 2);
    this.p5.pop()
  }
}