import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import FractalFlame from './components/FractalFlame'

const sketch = p => {
    let flame;

    p.setup = () => {
        p.createCanvas(600, 600);

        flame = new FractalFlame(p);

        p.smooth(8);
        p.strokeWeight(0.9);
        p.stroke(20, 15);
        p.background(250);

    };

    p.draw = () => {
        flame.draw();
    };
};

// set global functions for p5
const p5Instance = new p5(sketch);
