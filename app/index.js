import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Voronoi from './components/Voronoi'

const sketch = p => {
    let voronoi;

    p.setup = () => {
        p.createCanvas(500, 500);
        // p.noLoop();
        p.reset();
    };

    p.reset = () => {
        voronoi = new Voronoi(p);
    }

    p.draw = () => {
        voronoi.sweep();
        voronoi.draw();
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
