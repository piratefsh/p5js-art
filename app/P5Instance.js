import p5 from 'p5';
import TesselationDrawer from './components/TesselationDrawer';

const sketch = p => {
  let tess;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.noLoop();
    p.reset();
    tess = new TesselationDrawer('3.4.6.4');
    // tess = new TesselationDrawer('3.6.');
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(255);
    tess.update();
    tess.draw();
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.save('tadaaa.png');
        break;
      case 'R':
        p.reset();
    }
  };
};

// set global functions for p5
const p = new p5(sketch);
export { p };
