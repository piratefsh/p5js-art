/**
  @author Sher Minn Chong sherminn.chong@gmail.com
  @author Cory Dominguez corydominguez@gmail.com

  inspired by https://cloud.github.com/downloads/matthewepler/ReCode_Project/COMPUTER_GRAPHICS_AND_ART_May1978.pdf
**/

import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import Hieroglyph from './Hieroglyph';
const sketch = p => {
  const gridX = 10;
  const gridY = 10;
  const gutter = 8;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX) - gutter*2;
  const edgeLen = cellSize / 2;
  const gui = new dat.GUI();
  let hs = [];
  let a = p.createVector(gridX / 2, gridY / 2);

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    hs = [];
    let offsetX = 0;
    let offsetY = 0;
    for (let i = 0; i < gridX; i++) {
      offsetX = i * gutter;
      for (let j = 0; j < gridY; j++) {
        offsetY = j * gutter;
        const b = p.createVector(i, j);
        const pos = p.createVector(i * cellSize + offsetX, j * cellSize + offsetY);
        const dist = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
        const numLines = 8 - p.constrain(dist, 0, 7);
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

  p.mouseMoved = () => {
    a = p.createVector(Math.floor(p.mouseX / cellSize), Math.floor(p.mouseY / cellSize));
    p.reset();
  };
};

// set global functions for p5
const p = new p5(sketch);
export { p };
