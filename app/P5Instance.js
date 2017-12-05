import p5 from 'p5';
import thing from 'p5/lib/addons/p5.dom';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import EyeSeeYou from 'EyeSeeYou';
console.log('thing', thing)
console.log('thing', p5.createVideo)
// Object.assign(p5, p5dom);
const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let gui = new dat.GUI();
  let esy = new EyeSeeYou();

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);
    esy.setup();
  };

  p.reset = () => {
    p.createVector(10, 0).copy()
  };

  p.draw = () => {
    p.background(200);
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
