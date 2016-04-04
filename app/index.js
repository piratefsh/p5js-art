import init from 'p5init'
import Mover from './components/Mover';
import Repeller from './components/Repeller';
import Attractor from './components/Attractor';

let movers = [];
let attractors = [];
let gravity, wind;
let repeller, attractor;
const moverRadius = 5;
const numMovers = 10;
const numAttractors = 5;
const frictionCoefficient = 0.06
const frictionNormal = 1
const frictionMag = frictionCoefficient * frictionNormal

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        background(20);
        let center = new p5.Vector(0, height / 2);

        for(let i = 0; i < numMovers; i++){
            const pos = center.copy();
            pos.y -= 10*numMovers;
            pos.y += 10*i;
            movers.push(new Mover(2, pos, 10))
        }

        gravity = new p5.Vector(0, 0.08);
        wind = new p5.Vector(0.05, 0);

        // repeller = new Repeller(new p5.Vector(width / 2 - 20, height / 2 + 80));
        for(let i = 0; i < numAttractors; i++){
            const x = random(0, width*0.7);
            const pos = new p5.Vector(x, height/2);
            const a = new Attractor((i+1)*5, pos);
            attractors.push(a);
            // a.draw();
        }
    },

    draw: function() {
        background(20, 0);
        movers.forEach(function (mv) {
            mv.run();
            // mv.applyForce(gravity);
            // const repellerForce = repeller.repel(mv);
            // mv.applyForce(repellerForce);
            attractors.forEach(function(a){
                const attrForce = a.attract(mv);
                mv.applyForce(attrForce);
                if(mouseIsPressed){
                    a.draw();
                }
            });

            // mv.applyForce(friction);
        });

    },

    keyPressed: function() {
      if (keyCode === ENTER) {
        save();
      } 
    }

    // mousePressed: function(){
    //     const pos = new p5.Vector(mouseX, mouseY);
    //     movers.push(new Mover(moverRadius, pos))
    // }
}

// set global functions for p5
Object.assign(window, p5functions)

init();

