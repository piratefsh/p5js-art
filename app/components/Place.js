import Agent from './Agent'

export default class Place{
  constructor(p5){
    this.p5 = p5;
    this.NUM_AGENTS = 40;
    this.RADIUS = 200;
    this.agents = new Array(this.NUM_AGENTS);

    let x, y, t;
    const r = this.RADIUS
    for(let i = 0; i < this.NUM_AGENTS; i++){
      t = p5.TWO_PI / this.NUM_AGENTS * i;
      x = r * p5.cos(t);
      y = r * p5.sin(t);
      this.agents[i] = new Agent(p5, p5.createVector(x, y))
    }
  }

  update(){

  }

  draw(){
    this.p5.push()
    
    this.p5.translate(this.p5.width/2, this.p5.height/2);
    this.agents.forEach((agent) => {
      agent.draw();
    })

    this.p5.pop()
  }
}