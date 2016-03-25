import Particle from './Particle';
import Confetti from './Confetti';

export default class ParticleSystem{
    constructor(origin) {
        this.particles = [];
        this.origin = origin.copy();
    }

    setOrigin(origin){
        this.origin = origin.copy();
    }

    addParticle() {
        let p;
        if(random(1) < 0.5){
            p = new Particle(this.origin, 10);
        }
        else{
            p = new Confetti(this.origin, 10);
        }

        this.particles.push(p);
    }

    update() {
        //  remove dead particles
        this.particles = this.particles.filter(function(p) {
            return !p.isDead();
        });

        this.addParticle();
    }

    draw() {
        this.particles.forEach(function(p) {
            p.run();
        });
    }

    run() {
        this.update();
        this.draw();
    }
}
