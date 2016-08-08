import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Place from './components/Place'

const sketch = p => {
    let place;

    p.setup = () => {
        p.createCanvas(600, 600);
        p.reset();
    };

    p.reset = () => {
        p.background(250);
        place = new Place(p)
    }

    p.draw = () => {
        place.draw()
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
