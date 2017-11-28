import p5 from 'p5';
import Util from 'components/utils/Utils';
import ParametricPatterns from 'components/ParametricPatterns';
import dat from 'dat.gui/build/dat.gui';

const gui = new dat.GUI();

const sketch = p => {
  const gridX = 2;
  const gridY = 2;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  const patterns = [];
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
    for(let i = 0; i < gridX; i++){
      for(let j = 0; j < gridY; j++){
        const pp = new ParametricPatterns({
          x: i * cellSize,
          y: j * cellSize,
          width: cellSize,
          height: cellSize,
        });
        patterns.push(pp);
      }
    }
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(0);

    patterns.forEach((pp) => {
      pp.update();
      pp.draw();
    })
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
