
export default class Attractpr{
    constructor(m, pos){
        this.pos = pos;

        this.G = 0.4;
        this.mass = m;
        this.radius = this.mass;
    }

    draw(){
        noStroke();
        fill(255, 50);
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
        distance = constrain(distance, this.radius, 200);

        // magintude
        const strength = this.G * (this.mass * p.mass) / (distance * distance)

        // vector of direction and magnitude
        force.mult(strength);
        force.mult(p.mass);
        return force;        
    }
}