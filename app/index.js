import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';

const sketch = p => {
    let stop = false;
    const NUM_LINES = 10;
    const x1 =  -3;
    const y1 = -3;
    const x2 = 3;
    const y2 = 3;
    let y = y1;
    let step = 0;

    p.setup = () => {
        p.createCanvas(600, 600);
        step = (x2 - x1) / (2.321 * p.width);
        p.smooth(8);
        p.strokeWeight(0.9);
        p.stroke(20, 15);
        p.background(250);

        console.log(step);
    };

    p.draw = () => {
        if (stop) return;

        for (let i = 0; i < NUM_LINES & !stop; i++) {

            for (let x = x1; x <= x2; x += step) {
                p.drawVariation(x, y);
            }

            y += step;
            if (y > y2) {
                stop = true;
            }
        }
    };

    p.drawVariation = (x, y) => {
        const offsetx = 0.003 * p.randomGaussian();
        const offsety = 0.003 * p.randomGaussian();
        let xx = p.map(x + offsetx, x1, x2, NUM_LINES, p.width - NUM_LINES);
        let yy = p.map(y + offsety, y1, y2, NUM_LINES, p.height - NUM_LINES);
        p.point(xx, yy);
    };
};

// set global functions for p5
const p5Instance = new p5(sketch);
