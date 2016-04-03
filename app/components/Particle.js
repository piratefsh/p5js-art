export default class Particle {
    constructor(pos, radius){
        this.pos = pos.copy();
        this.radius = radius;
        this.velocity = new p5.Vector(random(-1, 1), random(-2, 0));
        this.acceleration = new p5.Vector(0, 0.05);
        this.lifespan = 255;

        this.mass = 1;
    }

    draw(){
        noStroke();
        fill(255, this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    applyForce(force){
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);

        this.acceleration.mult(0);
        
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