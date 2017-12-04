/**
  @author Sher Minn Chong sherminn.chong@gmail.com
  @author Cory Dominguez corydominguez@gmail.com

  inspired by https://cloud.github.com/downloads/matthewepler/ReCode_Project/COMPUTER_GRAPHICS_AND_ART_May1978.pdf
**/

import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import Hieroglyph from './Hieroglyph';
import Glyph from './Glyph';
const sketch = p => {
  const gridX = 12;
  const gridY = 8;
  const gutter = 4;
  const canvasSize = 600;
  const textarea = document.createElement('textarea');
  const input = (`I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold`);
  let cellSize = Math.ceil(canvasSize / (gridX - 1)) - gutter;
  let longestLine = gridX;
  let hs = [];
  let a = p.createVector(gridX / 2, gridY / 2);
  let text = [];
  let gui;

  p.setupDOM = () => {
    document.body.appendChild(textarea);
    textarea.value = input;
    textarea.style.width = `${canvasSize}px`;
    textarea.addEventListener('change', p.reset);
    gui = new dat.GUI();
    gui.add(Glyph, 'debug');
    gui.add(p, 'saveImage');
  };

  p.parseInput = () => {
    text = textarea.value.split('\n')
      .map(ln => ln.trim())
      .filter(ln => ln.length > 0);
  };

  p.resizeCell = () => {
    longestLine = text.length > 0 ? Math.max.apply(null, (text.map(ln => ln.length))) : longestLine;
    cellSize = Math.ceil(canvasSize / (longestLine + 2)) - gutter;
  };

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.setupDOM();
    p.reset();
    // p.noLoop();
    p.frameRate(60);
  };

  p.update = () => {
    p.resizeCell();
    p.parseInput();
    hs = [];
    let offsetX = 0;
    let offsetY = 0;
    for (let i = 0; i < text.length; i++) {
      offsetX = i * gutter;
      for (let j = 0; j < text[i].length; j++) {
        offsetY = j * gutter;
        const b = p.createVector(i, j);
        const pos = p.createVector(j * cellSize + offsetY, i * cellSize + offsetX);
        const dist = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
        const numLines = p.constrain(dist, 0, 7);
        const h = new Glyph({
          size: cellSize,
          pos,
          numLines,
          letter: text[i][j],
        });
        hs.push(h);
      }
    }
  };

  p.reset = () => {
    p.update();
  };

  p.draw = () => {
    p.update();
    p.background(0);
    p.stroke(255);
    p.push();
    p.translate(cellSize, cellSize);
    hs.forEach(h => h.draw());
    p.pop();
  };

  p.saveImage = () => {
    p.save(`tadaaa-${Date.now()}.png`);
  };

  p.keyPressed = () => {
    switch (p.key) {
      case '=':
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
