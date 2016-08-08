import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Place from './components/Place'

const sketch = p => {
    let place, place2, place3;

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.reset();
    };

    p.reset = () => {
        place = new Place(p)
        place2 = new Place(p)
        place3 = new Place(p)
    }

    p.draw = () => {
        p.background(250);
        place.update();
        place2.update();
        place3.update();
        place.draw()
        place2.draw()
        place3.draw()
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
