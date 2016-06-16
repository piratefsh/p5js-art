import 'file?name=[name].[ext]!../public/index.html'
import 'styles/style.scss'
import p5 from 'p5'
import LSystem from './components/LSystem';
import LSystemEditor from './components/LSystemEditor';
import LSystemExamples from './components/LSystemExamples';


const sketch = p => {
    
    let ls, currLSystem, editor;
    
    p.editor = () => {
       editor = new LSystemEditor(p);
    }

    p.setup = () => {
        // p5functions.reset()
        p.editor()

        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p.reset()
        });
    }


    p.reset = () => {
        document.getElementById('editor').classList.add('hidden');
        document.getElementById('controls').classList.remove('hidden');

        p.createCanvas(1260, 480);

        p.clear();
        p.strokeWeight(1.5);
        p.background(20);
        p.stroke(255);
        const distanceX = 200;

        // l systems to draw
        const systems = [LSystemExamples.weed3, LSystemExamples.weed1, LSystemExamples.arrow, 
            LSystemExamples.weed2, LSystemExamples.weed4];
        const iterations = [4, 5, 5, 5, 4];

        p.translate(0, height-50);
        // stroke(random(100,200),random(100,200),0)

        for(let i = 0; i < systems.length; i++){
            const options = systems[i];
            options.p = p;
            console.log(options)
            const l = new LSystem(options);
            p.translate(distanceX, 0)
            l.run(iterations[i]);
        }
    }
}

// set global functions for p5
const p5Instance = new p5(sketch)
