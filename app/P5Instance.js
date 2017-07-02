import p5 from 'p5';
import Util from 'components/utils/Utils';
import Radial from 'components/Radial';

const sketch = p => {
  let radial;
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    radial = new Radial({
      color: p.color(229, 240, 108),
    })
  };

  p.draw = () => {
    p.background(4, 165, 201);
    radial.draw();
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'S':
        p.save(`tadaaa-${Date.now()}.png`);
        break;
      case 'R':
        p.reset();
    }
  };
};

// set global functions for p5
const p = new p5(sketch);
export { p };
