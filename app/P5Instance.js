import p5 from 'p5';
import Util from 'components/utils/Utils';
import DotGrid from 'components/DotGrid';
import dat from 'dat.gui/build/dat.gui';

const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let gui = new dat.GUI();

  let segGrid;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);

    segGrid = new DotGrid({rows:18, cols:10})
  };

  p.reset = () => {
    p.createVector(10, 0).copy()
  };

  p.draw = () => {
    p.background(20);
    segGrid.draw();
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
