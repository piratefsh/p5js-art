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

        //koch
        l = new LSystem({
            name: 'koch snowflake',
            angle: 60,
            axiom: 'F++F++F',
            rules: {
                'F': 'F-F++F-F'
            }
        });
        //arrow weed
        l = new LSystem({
            name: 'arrow weed',
            angle: 30,
            axiom: 'X',
            rules: {
                'X': 'F[+X][-X]FX',
                'F': 'FF'
            }
        });

        // weed 1
        l = new LSystem({
            name: 'generic weed',
            angle: 30,
            axiom: 'X',
            rules: {
                'X': 'F-[[X]+X]+F[+FX]-X',
                'F': 'FF'
            },
            length: 5
        });

        l = new LSystem({
            name: 'stochastic generic weed',
            angle: 45,
            axiom: 'X',
            rules: {
                '0.33X': ['F-[[X]+X]+F[+FX]-X', 'F[X]+X', 'F[X]-X'],
                'F': 'FF'
            }
        });
        clear();
        translate(150, height*3/4);
        strokeWeight(2);
        stroke(random(100,200),random(100,200),0)
        l.run(5);

        for(let i = 0; i < 4; i++){
            translate(150, 0)
            stroke(random(100,200),random(100,200),0)
            l.run(5);
        }
    },

    draw: function() {
    },

    keyPressed: function() {
        if (keyCode === ENTER) {
            save(`${l.name}.png`);
        } 
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();