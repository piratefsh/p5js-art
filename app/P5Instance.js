import p5 from 'p5';
import Util from 'components/utils/Utils';
import Sparkle from './Sparkle';

const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = window.innerWidth;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let color;
  let s;

  p.setup = () => {
    p.createCanvas(500, 500);
    p.reset();
    // p.noLoop();
    s = new Sparkle();
  };

  p.reset = () => {
    color = p.random(['red', 'mediumvioletred', 'darkred', 'firebrick', 'orange', 'chocolate']);
  };

  p.draw = () => {
    p.background(color);
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
