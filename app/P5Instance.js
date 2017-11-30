import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';

const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let gui = new dat.GUI();

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    p.createVector(10, 0).copy()
  };

  p.draw = () => {
    p.background(200);
  };

  p.saveImage = () => {
    p.save(`tadaaa-${Date.now()}.png`);
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.saveImage();
        break;
      case 'R':
        p.reset();
    }
  };
};

// set global functions for p5
const p = new p5(sketch);
export { p };
