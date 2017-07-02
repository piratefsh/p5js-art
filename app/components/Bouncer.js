import Util from './utils/Utils';
import { p as p5 } from 'P5Instance';

export default class Bouncer{
  constructor(){
    this.pos = p5.createVector(1, p5.height/2)
    this.velocity = p5.createVector(4, 4);
    this.acceleration = p5.createVector(0, 0.4);
  }

  update(){

    if(this.pos.x >= p5.width ){
      return;
    }
    this.pos.add(this.velocity);
    this.velocity.add(this.acceleration)

    if(this.pos.x <= 0 || this.pos.x >= p5.width){
      this.velocity.x -= 0.3
      this.velocity.x *= -1;
    }
    if(this.pos.y <= 0 || this.pos.y >= p5.height){
      this.velocity.y -= 1
      this.velocity.y *= -1;
    }

  }

  draw(){
    p5.push();
    p5.fill(255);
    p5.translate(this.pos.x, this.pos.y)
    p5.ellipse(0, 0, 10, 10);
    p5.pop();
  }
}