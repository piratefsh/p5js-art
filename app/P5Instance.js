import p5 from 'p5';
import Util from 'components/utils/Utils';
import Sparkle from './Sparkle';

const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = window.innerHeight;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let s;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    // p.frameRate(60);
    s = new Sparkle();
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(0, 200);
    s.update();
    s.draw()
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.save(`tadaaa-${Date.now()}.png`);
        break;
      case 'R':
        p.reset();
    }
  };
};

// set global functions for p5
const p = new p5(sketch);
export { p };
