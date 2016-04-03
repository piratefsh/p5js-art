import ParticleSystem from './components/ParticleSystem';
import Repeller from './components/Repeller';
import init from 'p5init'

let particleSystems = [];
let gravity, wind;
let repeller;

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        let center = new p5.Vector(width / 2, height / 2);
        particleSystems.push(new ParticleSystem(center))
        gravity = new p5.Vector(0, 0.08);
        wind = new p5.Vector(0.05, 0);

        repeller = new Repeller(new p5.Vector(width / 2 - 20, height / 2 + 80));
    },

    draw: function() {
        background(20);
        particleSystems.forEach(function (ps) {
            ps.run();
            ps.applyForce(gravity);
            if(mouseIsPressed){
                ps.applyForce(wind);
            }
            ps.applyRepeller(repeller);
        });

        repeller.draw();
    },

    mousePressed: function(){
        // const ps = new ParticleSystem(new p5.Vector(mouseX, mouseY));
        // particleSystems.push(ps);
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();

