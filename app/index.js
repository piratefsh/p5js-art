import 'styles/style.scss'
import init from 'p5init'
import LSystem from './components/LSystem';

let ls;

const p5functions = {
    preload: function(){

    },
    
    setup: () => {

        p5functions.reset()

        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p5functions.reset()
        })
    },

    reset: () => {
        // createCanvas(window.innerWidth, window.innerHeight);
        createCanvas(1260, 480);
        // background(250);

        //koch
        const koch = new LSystem({
            name: 'koch snowflake',
            angle: 60,
            axiom: 'F++F++F',
            rules: {
                'F': 'F-F++F-F'
            }
        });
        //arrow weed
        const arrow = new LSystem({
            name: 'arrow weed',
            angle: 30,
            axiom: 'X',
            rules: {
                'X': 'F[+X][-X]FX',
                'F': 'FF'
            }
        });

        // weed 1
        const weed1 = new LSystem({
            name: 'generic weed 1',
            angle: 22.5,
            axiom: 'X',
            rules: {
                'X': 'F-[[X]+X]+F[+FX]-X',
                'F': 'FF'
            },
            length: 5
        });
        
        // weed 2
        const weed2 = new LSystem({
            name: 'generic weed 2',
            angle: 25,
            axiom: 'X',
            rules: {
                'X': 'F[-X]F[-X]+X',
                'F': 'FF'
            },
            length: 5
        });

        // weed 3
        const weed3 = new LSystem({
            name: 'generic weed 3',
            angle: 25,
            axiom: 'F',
            rules: {
                'F': 'F[+F]F[-F]F',
            },
            length: 5
        });

        const weed4 = new LSystem({
            name: 'generic weed 4',
            angle: 22.5,
            axiom: 'F',
            rules: {
                'F': 'FF-[-F+F+F]+[+F-F-F]',
            },
            length: 5
        });


        const sWeed1 = new LSystem({
            name: 'stochastic generic weed 1',
            angle: 22.5,
            axiom: 'X',
            rules: {
                '0.5X': ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X',],
                'F': 'FF'
            }
        });
        clear();
        strokeWeight(1.5);
        stroke(255);
        const distanceX = 200;

        // l systems to draw
        const systems = [ weed3, weed1, arrow, weed2, weed4];
        const iterations = [4, 5, 5, 5, 4];

        translate(0, height-50);
        // stroke(random(100,200),random(100,200),0)

        for(let i = 0; i < systems.length; i++){
            const l = systems[i];
            translate(distanceX, 0)
            l.run(iterations[i]);
        }
    },

    draw: function() {
    },

    keyPressed: function() {
        if (keyCode === ENTER) {
            const name = 'l-systems'
            save(`${name}${new Date()}.png`);
        } 
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();