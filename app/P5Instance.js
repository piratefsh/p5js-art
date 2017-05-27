import p5 from 'p5';

const sketch = p => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noLoop();
    p.reset();
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(255);
    p.translate(p.width/2, p.height/2);
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
