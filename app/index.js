import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';

const sketch = p => {

    p.setup = () => {
        p.createCanvas(100, 100);
        // p.noLoop();
        p.reset();
    };

    p.reset = () => {
    }

    p.draw = () => {
        p.ellipse(p.width/2, p.height/2, 100, 100)
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
