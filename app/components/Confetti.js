import Particle from './Particle'

export default class Confetti extends Particle{
    constructor(origin, radius){
        super(origin, radius);
    }

    draw(){
        const theta = map(this.pos.x, 0, width, 0, TWO_PI);
        rectMode(CENTER);
        noStroke();
        fill(255, this.lifespan);
        console.log()
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        rect(0, 0, this.radius, this.radius);
        pop();
    }
}