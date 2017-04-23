import p5 from 'p5';
import TriangleTesselation from './components/TriangleTesselation';
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
    // const tess = new TriangleTesselation();
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