import p5 from 'p5';
import Util from 'components/utils/Utils';
import ParametricPatterns from 'components/ParametricPatterns';
import dat from 'dat.gui-0.6.5/build/dat.gui';

const gui = new dat.GUI();

const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = window.innerHeight;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  const patterns = [];
  const BG_COLOR = [4, 31, 61];
  const COLORS = [[41, 93, 150], [110, 195, 149], [243, 211, 76], [251, 142, 79], [255, 255, 255]];
  const NUM_LAYERS = COLORS.length;
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
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
            color: COLORS[n],
            amp: (COLORS.length - n) / 2,
          });
          gui.add(pp, 'fillOpacity').min(0).max(20);
          gui.add(pp, 'strokeWeight').min(0.5).max(5);
          gui.add(pp, 'strokeOpacity').min(0).max(255);
          gui.add(pp, 'amp').min(0).max(COLORS.length);
          gui.addColor(pp, 'color');
          patterns[n] = pp;
        }
      }
    }
  };

  p.reset = () => {

    patterns.forEach((pt) => {
      pt.reset();
    })
  };

  p.draw = () => {
    p.background(...BG_COLOR);
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
