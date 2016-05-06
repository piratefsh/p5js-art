import 'styles/style.scss'
import init from 'p5init'
import LSystem from './components/LSystem';
import LSystemEditor from './components/LSystemEditor';
import LSystemExamples from './components/LSystemExamples';

let ls, currLSystem, editor;

const p5functions = {
    preload: function(){

    },
    
    setup: function() {
        // p5functions.reset()
        p5functions.editor()

        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p5functions.reset()
        });
    },

    editor: () => {
       editor = new LSystemEditor();
    },

    reset: () => {
        document.getElementById('editor').classList.add('hidden');
        document.getElementById('controls').classList.remove('hidden');

        createCanvas(1260, 480);

        clear();
        strokeWeight(1.5);
        background(20);
        stroke(255);
        const distanceX = 200;

        // l systems to draw
        const systems = [LSystemExamples.weed3, LSystemExamples.weed1, LSystemExamples.arrow, 
            LSystemExamples.weed2, LSystemExamples.weed4];
        const iterations = [4, 5, 5, 5, 4];

        translate(0, height-50);
        // stroke(random(100,200),random(100,200),0)

        for(let i = 0; i < systems.length; i++){
            const l = systems[i];
            translate(distanceX, 0)
            l.run(iterations[i]);
        }
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