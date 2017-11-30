import p5 from 'p5';
import Util from 'components/utils/Utils';
import SnezntUnit from 'components/SnezntUnit';
import SnezntCell from 'components/SnezntCell';
import SnezntGrid from 'components/SnezntGrid';
const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 400;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let sz;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
    p.reset();
  };

  p.reset = () => {
    sz = new SnezntGrid({rows: 4, cols: 4});
  };

  p.draw = () => {
    // p.background('teal');
    p.background(220, 210, 20);
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
