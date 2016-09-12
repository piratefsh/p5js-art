import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Bubble from 'components/Bubble';
import dat from 'dat.gui/build/dat.gui';

const NUM_BUBBLES = 2;
const ROWS = 5;
const COLS = 5;
const bubbles = new Array(ROWS * COLS);
const gui = new dat.GUI();

const sketch = p => {
  p.setupGUI = () => {
    const radius = gui.add(Bubble, 'RADIUS').min(5).max(50);
    const step = gui.add(Bubble, 'step').min(0.5).max(2).step(0.1);
    radius.onChange(() => {
        p.reset()
    })
  }

  p.setup = () => {
    p.createCanvas(500, 500);
    // p.noLoop();
    p.reset();
    p.setupGUI();
  };

  p.reset = () => {
    p.background(255)
    const rowSize = Math.floor(p.width / ROWS);
    const colSize = Math.floor(p.height / COLS);
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const pos = p.createVector(i * rowSize + Bubble.RADIUS/2, j * colSize + Bubble.RADIUS/2);
        bubbles[i * ROWS + j] = new Bubble(p, pos);
      }
    }

  };

  p.draw = () => {
    bubbles.forEach((bubble) => {
      if (bubble.isAlive()) {
        bubble.update();
        bubble.draw();
      }
    });
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.save('tadaaa.png');
        break;
      case 'R':
        p.reset();
    }
  };
};

// set global functions for p5
const p5Instance = new p5(sketch);
