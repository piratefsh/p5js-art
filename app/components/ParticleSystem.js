import Particle from './Particle';

export default class ParticleSystem{
    constructor(origin) {
        this.particles = [];
        this.origin = origin.copy();
    }

    setOrigin(origin){
        this.origin = origin.copy();
    }

    addParticle() {
        this.particles.push(new Particle(this.origin, 10));
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
