import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import FractalFlame from './components/FractalFlame'

const sketch = p => {
    let flame;

    p.setup = () => {
        p.createCanvas(600, 600);
        p.reset();
    };

    p.reset = () => {
        flame = new FractalFlame(p);
        flame.setType('ex');

        p.smooth(8);
        p.strokeWeight(0.9);
        p.stroke(20, 15);
        p.background(250);
    }

    p.draw = () => {

        flame.draw();
    };

    p.keyPressed = () => {
        switch(p.key){
            case 'S':
                p.save('tadaaa.png');
                break;
            case 'R':
                p.reset();
        }
    }        
};

// set global functions for p5
const p5Instance = new p5(sketch);
