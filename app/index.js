import ParticleSystem from './components/ParticleSystem';
import init from 'p5init'

let particleSystems = [];

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        let center = new p5.Vector(width / 2, height / 2);
        particleSystems.push(new ParticleSystem(center))
    },

    draw: function() {
        background(20);
        particleSystems.forEach(function (ps) {
            ps.run();
        });
    },

    mousePressed: function(){
        const ps = new ParticleSystem(new p5.Vector(mouseX, mouseY));
        particleSystems.push(ps);
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();

