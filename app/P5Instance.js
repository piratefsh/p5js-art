import p5 from 'p5';
import Util from 'components/utils/Utils';
import ParametricPatterns from 'components/ParametricPatterns';
import dat from 'dat.gui-0.6.5/build/dat.gui';

const gui = new dat.GUI();

const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  const patterns = [];
  const COLORS = [[110, 195, 149], [41, 93, 150], [251, 142, 79], [243, 211, 76]]
  const NUM_LAYERS = COLORS.length;
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
    for (let n = 0; n < NUM_LAYERS; n++) {
      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
          const pp = new ParametricPatterns({
            x: i * cellSize,
            y: j * cellSize,
            width: cellSize,
            height: cellSize,
            seed: n,
            color: COLORS[n]
          });
          gui.add(pp, 'fillOpacity').min(0).max(20);
          gui.add(pp, 'strokeWeight').min(0.5).max(5);
          gui.add(pp, 'strokeOpacity').min(0).max(255);
          gui.addColor(pp, 'color');
          patterns.push(pp);
        }
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
    });
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
