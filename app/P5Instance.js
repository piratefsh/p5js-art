/**
  @author Sher Minn Chong sherminn.chong@gmail.com
  @author Cory Dominguez corydominguez@gmail.com

  inspired by https://cloud.github.com/downloads/matthewepler/ReCode_Project/COMPUTER_GRAPHICS_AND_ART_May1978.pdf
**/

import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import GlyphWriter from './GlyphWriter';
import Glyph from './Glyph';
const sketch = p => {
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
  const canvasSize = 600;
  const canvasHeight = 600;
  const textarea = document.createElement('textarea');
  let gui;
  let writer;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasHeight);
    p.frameRate(60);
    // p.noLoop();

    // instantiate writer
    writer = new GlyphWriter({ input });

    // add event handlers
    p.setupDOM();

    // start
    p.reset();


    // init GUI
    gui = new dat.GUI();
    gui.add(Glyph, 'debug');
    gui.add(writer, 'sort');
    gui.add(p, 'saveImage');
  };

  p.setupDOM = () => {
    document.body.appendChild(textarea);
    textarea.value = input;
    textarea.style.width = `${canvasSize}px`;
    textarea.style.height = `${canvasHeight}px`;
    textarea.addEventListener('change', () => {
      p.update();
    });
  };

  p.update = () => {
    writer.updateInput(textarea.value);
  };

  p.reset = () => {
    p.update();
  };

  p.draw = () => {
    p.update();
    p.background(0);
    writer.draw();
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
};

// set global functions for p5
const p = new p5(sketch);
export { p };
