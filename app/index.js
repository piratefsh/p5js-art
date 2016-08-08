import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Place from './components/Place'

const sketch = p => {
    let place;

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.reset();
    };

    p.reset = () => {
        place = new Place(p)
    }

    p.draw = () => {
        // p.background(250);
        place.update();
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
