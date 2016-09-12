import 'file?name=[name].[ext]!../public/index.html';
import 'styles/style.scss';
import p5 from 'p5';
import Bubble from 'components/Bubble';
import dat from 'dat.gui/build/dat.gui';

const NUM_BUBBLES = 2;
const gui = new dat.GUI();
let bubbles;

const sketch = p => {
  p.rows = 5;
  p.cols = 5;
  bubbles = new Array(p.rows * p.cols);

  p.setupGUI = () => {
    const radius = gui.add(Bubble, 'radius').min(5).max(100).step(1);
    const numPoints = gui.add(Bubble, 'numPoints').min(5).max(12).step(1);
    const velocityMultiplier = gui.add(Bubble, 'velocityMultiplier').min(0.5).max(5).step(0.1);
    const step = gui.add(Bubble, 'step').min(0.5).max(2).step(0.1);
    const rows = gui.add(p, 'rows').min(3).max(10).step(1);
    const cols = gui.add(p, 'cols').min(3).max(10).step(1);

    [radius, numPoints, rows, cols].forEach((thing) => {
      thing.onChange(() => {
        p.reset();
      });
    });
  };

  p.setup = () => {
    p.createCanvas(500, 500);
    // p.noLoop();
    p.reset();
    p.setupGUI();
  };

  p.reset = () => {
    p.background(255);
    const rowSize = Math.floor(p.width / p.rows);
    const colSize = Math.floor(p.height / p.cols);
    for (let i = 0; i < p.rows; i++) {
      for (let j = 0; j < p.cols; j++) {
        const pos = p.createVector(i * rowSize + Bubble.radius / 2, j * colSize + Bubble.radius / 2);
        bubbles[i * p.rows + j] = new Bubble(p, pos);
      }
    }
  };

  p.draw = () => {
    bubbles.forEach((bubble, i) => {
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
