import init from 'p5init'
import Mover from './components/Mover';
import Repeller from './components/Repeller';
import Attractor from './components/Attractor';

let movers = [];
let attractors = [];
let gravity, wind;
let repeller, attractor;
const moverRadius = 5;
const numMovers = 16;
const frictionCoefficient = 0.06
const frictionNormal = 1
const frictionMag = frictionCoefficient * frictionNormal

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        background(20);
        let center = new p5.Vector(width / 2, height / 2);

        for(let i = 0; i < numMovers; i++){
            movers.push(new Mover(5, center.copy(), i+1))
        }

        gravity = new p5.Vector(0, 0.08);
        wind = new p5.Vector(0.05, 0);

        // repeller = new Repeller(new p5.Vector(width / 2 - 20, height / 2 + 80));
        attractors.push(new Attractor(new p5.Vector(random(0, width), random(0, height))));
        attractors.push(new Attractor(new p5.Vector(random(0, width), random(0, height))));
    },

    draw: function() {
        background(20, 0);
        movers.forEach(function (mv) {
            mv.run();
            // mv.applyForce(gravity);
            if(keyIsPressed){
                mv.applyForce(wind);
            }
            // const repellerForce = repeller.repel(mv);
            // mv.applyForce(repellerForce);
            attractors.forEach(function(a){
                const attrForce = a.attract(mv);
                mv.applyForce(attrForce);
                a.draw();
            });

            const friction = mv.velocity.copy()
            friction.mult(-1);
            friction.normalize();
            friction.mult(frictionMag);

            // mv.applyForce(friction);
        });

    },

    mousePressed: function(){
        const pos = new p5.Vector(mouseX, mouseY);
        movers.push(new Mover(moverRadius, pos))
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();

