import 'styles/style.scss'
import init from 'p5init'
import LSystem from './components/LSystem';
import LSystemExamples from './components/LSystemExamples';

let ls, currLSystem;

const p5functions = {
    preload: function(){

    },
    
    setup: function() {

        // p5functions.reset()
        p5functions.editor()

        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p5functions.reset()
        })
    },

    editor: () => {
        document.getElementById('editor').classList.remove('hidden')
        document.getElementById('controls').classList.add('hidden')

        createCanvas(window.innerWidth, window.innerHeight);

        // on draw
        document.getElementById('btn-draw').addEventListener('click', ()=>{
            const rules = {}
            const allRules = document.getElementById('editor-rules').value.split('\n');
            allRules.forEach(function(rule){
                // ignore whitespace
                rule = rule.trim();
                if(rule.length < 1){
                    return;
                } 

                // find rule and break
                const matches = rule.match('([A-Z])=(.*)');
                if(matches){
                    const rs = matches[2].split(',');
                    rules[matches[1]] = rs;
                }
                else{
                    window.alert(`${rule} is not a valid rule.`)
                }
                console.log(rules)
            });

            const l = new LSystem({
                angle: document.getElementById('editor-angle').value,
                axiom: document.getElementById('editor-axiom').value,
                rules: rules,
            });
            const iterations = document.getElementById('editor-iterations').value;
            push();

            clear();
            translate(width/3, height-50);
            l.run(iterations);
            pop();
        });
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
        const systems = [ LSystemExamples.weed3, LSystemExamples.weed1, LSystemExamples.arrow, 
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