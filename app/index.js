import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import HexagonTesselation from './components/HexagonTesselation';

const sketch = p => {

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.noLoop();
        p.reset();
    };

    p.reset = () => {
    }

    p.draw = () => {
        const hex = new HexagonTesselation(p);
        hex.draw();
    }

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
