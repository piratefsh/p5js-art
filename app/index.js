import 'styles/style.scss'
import init from 'p5init'
import LSystem from './components/LSystem';

let l;

const p5functions = {
    preload: function(){

    },
    
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        background(250);

        l = new LSystem({
            angle: 60,
            axiom: 'F++F++F',
            rules: {
                'F': 'F-F++F-F'
            }
        });
        l.run(5);
    },

    draw: function() {
    },

    keyPressed: function() {
        if (keyCode === ENTER) {
            save('cool.jpg');
        } 
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();