export default class Particle {
    constructor(pos, radius){
        this.pos = pos.copy();
        this.radius = radius;
        this.velocity = new p5.Vector(random(-1, 1), random(-2, 0));
        this.acceleration = new p5.Vector(0, 0.05);
        this.lifespan = 255;
    }

    draw(){
        noStroke();
        fill(255, this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.lifespan -= 2;
    }

    run(){
        this.update();
        this.draw();
    }

    isDead(){
        return this.lifespan <= 0;
    }
}