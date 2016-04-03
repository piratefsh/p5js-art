export default class Mover{
    constructor(r, l, m=1){
        this.radius = r;
        this.mass = m;
        this.pos = l;
        this.velocity = new p5.Vector(0, 1); 
        this.acceleration = new p5.Vector(0, 0);
    }

    applyForce(f){
        const force = f.copy();
        force.div(this.mass);
        this.acceleration.add(force);
    }

    applyAttractor(f){
        this.acceleration.add(f);
    }

    checkEdges(){
        if(this.pos.x < 0 || this.pos.x > width){
            this.velocity.x *= -1;

        }
        if(this.pos.y < 0 || this.pos.y > height){
            this.velocity.y *= -1;
        }
    }
    update(){
        // this.checkEdges();
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0);
    }

    draw(){
        noStroke();
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    run(){
        this.update();
        this.draw();
    }
}