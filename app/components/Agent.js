export default class Agent{
  constructor(p5, pos, type){
    this.id = Agent.ID_COUNTER++;
    this.STEP_SIZE = 1;
    this.originalPos = pos.copy()
    this.p5 = p5;
    this.pos = pos;
    this.type = type;
    this.dead = false;
    this.acceleration = p5.createVector(p5.random(-0.001, 0.001), p5.random(-0.001, 0.001))
    this.vector = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
  }

  headTowards(other){
    const direction = other.pos.copy().sub(this.pos).normalize();

    this.vector.set(direction);
    this.vector.mult(this.STEP_SIZE)

    if(this.dying()){
      this.die()
    }
  }

  dying(){
    return (this.pos.x > (this.p5.width/2) || this.pos.x < (-this.p5.width/2)) || 
    (this.pos.y > (this.p5.height/2) || this.pos.y < (-this.p5.height/2))
  }

  die(){
    this.dead = true;
  }

  distance(other){
    return this.pos.mag(other.pos);
  }

  update(){
    this.vector.add(this.acceleration);
    this.pos.add(this.vector);
  }

  friend(other){
    return this.type == other.type
  }

  connect(other){
    this.p5.push();
    this.p5.stroke(0, 15);
    this.p5.line(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
    this.p5.pop();
  }

  draw(){
    // this.p5.push();
    // // this.p5.translate(this.pos.x, this.pos.y);
    // this.p5.stroke(100, 10*this.type, 10*this.type, 20);
    // this.p5.fill(0, 0);
    // // this.p5.ellipse(this.pos.x, this.pos.y, 1, 1);
    // this.p5.pop();
  }
}
Agent.ID_COUNTER = 0;