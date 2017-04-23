import p5 from 'p5';
import TriangleTesselation from './components/TriangleTesselation';
import TesselationDrawer from './components/TesselationDrawer';

const sketch = p => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.noLoop();
    p.reset();
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(255);
    // const tess = new TriangleTesselation();
    const tess = new TesselationDrawer();
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

export { p };