import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Agent from './components/Agent';

const sketch = p => {
    const step = 30;
    const numAgents = p.width * p.height / (step * step)
    const agents = new Array(numAgents);
    let zoom = 50;
    p.setup = () => {
        p.createCanvas(600, 600, p.WEBGL);
        p.reset();
        p.frameRate(24);
    };

    p.reset = () => {

        p.background(240);
        p.ambientLight(255, 0, 0);
        p.normalMaterial()
        for(let i = 0; i < p.width; i+=step){
            for(let j = 0; j < p.height; j+=step){

                const x = p.random(0, p.width)
                const y = p.random(0, p.height)
                const z = p.random(-10, 10)
                const noiseScale = 50;
                const noiseStrength = 10; p.random(5, 10); 
                agents[i * p.width/step + j] = new Agent(p, x, y, z, noiseScale, noiseStrength);
            }
        }
    };

    p.draw = () =>{
        p.background(0)
        p.translate(0, 0, zoom);
        p.strokeWeight(0.7);
        // p.fill(255, 200, 10);
        p.rotateX(p.map(p.mouseY, 0, p.width, 0, p.PI))
        p.rotateY(p.map(p.mouseX, 0, p.width, 0, p.PI))
        // p.camera(p.mouseX, p.height/2, (p.height/2) / Math.tan(p.PI/6), p.mouseX, p.height/2, 0, 0, 1, 0);
        agents.forEach((a) => {
            a.draw();
        })

    }

    p.keyPressed = () => {
        if(p.key == 'Q'){
            zoom += 50;
            console.log(zoom)
        }
        if(p.key == 'W'){
            zoom -= 50;
            console.log(zoom)
        }

        if(p.key == 'S'){
            p.save('omg.png')
        }
    }
};

// set global functions for p5
const p5Instance = new p5(sketch);
