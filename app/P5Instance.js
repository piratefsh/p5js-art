import p5 from 'p5';
import Util from 'components/utils/Utils';
import SnezntUnit from 'components/SnezntUnit';
const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let sz;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);
    p.reset();
  };

  p.reset = () => {
    sz = new SnezntUnit();
  };

  p.draw = () => {
    p.background(200);
    sz.update();
    sz.draw();
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
