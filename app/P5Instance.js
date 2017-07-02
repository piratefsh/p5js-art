import p5 from 'p5';
import Util from 'components/utils/Utils';
import RadialDrawer from 'components/RadialDrawer';
import Bouncer from 'components/Bouncer';

const sketch = p => {
  let radial;
  let bouncer;
  const gridX = 2;
  const gridY = 1;
  const canvasSize = 800;
  const cellSize = Math.ceil(canvasSize / gridX);

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    p.background(138, 1, 196);
    radial = new RadialDrawer({
      color: p.color(188, 244, 66, 50),
    })
    bouncer = new Bouncer();
  };

  p.draw = () => {

    bouncer.update();
    radial.update(bouncer.pos.x, bouncer.pos.y);
    // bouncer.draw();
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
