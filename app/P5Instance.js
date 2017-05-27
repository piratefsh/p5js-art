import p5 from 'p5';
import Hexagon from 'components/hexagon/Hexagon'
const sketch = p => {
  let hex;
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noLoop();
    p.reset();
    hex = new Hexagon({x: p.width/2, y: p.height/2}, 100)
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(255);
    hex.draw();
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
