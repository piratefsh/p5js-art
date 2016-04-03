
export default class Attractpr{
    constructor(pos){
        this.pos = pos;

        this.G = 0.4;
        this.mass = 40;
        this.radius = this.mass;
    }

    draw(){
        noStroke();
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
    }

    attract(p){
        // force direction
        let force = p5.Vector.sub(this.pos, p.pos);

        // distance of particles
        let distance = force.mag();

        // normalize direction
        force.normalize();

        // constrain distance
        distance = constrain(distance, 5, 100);

        // magintude
        const strength = this.G * (this.mass * p.mass) / (distance * distance)

        // vector of direction and magnitude
        force.mult(strength);
        force.mult(p.mass);
        return force;        
    }
}