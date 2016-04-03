
export default class Repeller{
    constructor(pos){
        this.pos = pos;
        this.radius = 30;

        this.G = 1;
        this.mass = 100;
    }

    draw(){
        noStroke();
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
    }

    repel(p){
        // force direction
        let direction = p5.Vector.sub(this.pos, p.pos);

        // distance of particles
        let distance = direction.mag();
        direction.normalize();
        distance = constrain(distance, 5, 100);
        // magintude
        const force = -1 * this.G * (this.mass * p.mass) / (distance * distance)

        // vector of direction and magnitude
        direction.mult(force);
        return direction;        
    }
}