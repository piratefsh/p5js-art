import p5 from 'p5';
import TesselationDrawer from './components/TesselationDrawer';

const sketch = p => {
  let tess;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.noLoop();
    p.reset();
    tess = new TesselationDrawer();
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

  p.mouseClicked = () => {

  }
};

// set global functions for p5
const p = new p5(sketch);
window.p = p
export { p };