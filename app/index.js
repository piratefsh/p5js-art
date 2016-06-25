import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Agent from './components/Agent';

const sketch = p => {
    const step = 30;
    const numAgents = p.width * p.height / (step * step)
    const agents = new Array(numAgents);
    p.setup = () => {
        p.createCanvas(500, 500);
        p.reset();
        p.frameRate(24);
    };

    p.reset = () => {
        p.background(240);
        for(let i = 0; i < p.width; i+=step){
            for(let j = 0; j < p.height; j+=step){

                const x = p.random(0, p.width)
                const y = p.random(0, p.height)
                const noiseScale = 40;
                const noiseStrength = 10; p.random(5, 10); 
                agents[i * p.width/step + j] = new Agent(p, x, y, noiseScale, noiseStrength);
            }
        }
    };

    p.draw = () =>{
        agents.forEach((a) => {
            a.draw();
        })
    }
};

// set global functions for p5
const p5Instance = new p5(sketch);
