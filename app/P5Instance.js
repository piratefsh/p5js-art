import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import Hieroglyph from './Hieroglyph';
const sketch = p => {
  const gridX = 15;
  const gridY = 15;
  const canvasSize = 700;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  const gui = new dat.GUI();
  let hs = [];

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    p.frameRate(2);
  };

  p.reset = () => {
    hs = [];
    const a = p.createVector(gridX / 2, gridY / 2);
    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const b = p.createVector(i, j);
        const pos = p.createVector(i * cellSize, j * cellSize);
        const dist = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
        const numLines = 8 - p.constrain(dist, 0,  8);
        console.log(numLines);
        const h = new Hieroglyph({
          size: cellSize,
          pos,
          numLines,
        });
        hs.push(h);
      }
    }
  };

  p.draw = () => {
    p.background(255);
    hs.forEach(h => h.draw());
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
