import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';

const sketch = p => {

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.reset();
    };

    p.reset = () => {
        p.background(255);
    };
};

// set global functions for p5
const p5Instance = new p5(sketch);
