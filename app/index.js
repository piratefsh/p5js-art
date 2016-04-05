import init from 'p5init'
import Strand from './components/Strand';

let strands = [];
let i = 0;

let numStrands = 50;
const strandStep = 10;

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        background(250);
        frameRate(30);
    },

    update: function(){
        if (i < numStrands){
            const x = width/2 - numStrands*(strandStep/2) + i*strandStep;
            strands.push(new Strand(new p5.Vector(x, 0)))
            i++;
        }
    },

    draw: function() {
        update();
        strands.forEach(function(s){
            s.grow();
        })
    }.bind(this),

    keyPressed: function() {
      if (keyCode === ENTER) {
        save();
      } 
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();

