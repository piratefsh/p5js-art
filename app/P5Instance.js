import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import EyeSeeYou from 'EyeSeeYou';

const canvasHolder = document.createElement('div');
canvasHolder.id = 'canvas-holder';
document.body.appendChild(canvasHolder);

const sketch = p => {
  const canvasSize = 480;
  const canvasHeight = 360;
  const gui = new dat.GUI();
  let esy;
  p.setup = () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas-holder').children[0];
    video.style.width = `${canvasSize}px`;
    video.style.height = `${canvasHeight}px`;
    // hide video
    video.style.position = 'fixed';
    video.style.bottom = '99999px';

    p.createCanvas(canvasSize, canvasHeight);
    p.reset();
    p.noLoop();
    p.frameRate(60);

    esy = new EyeSeeYou({
      video,
      canvas,
    });
    esy.setup();
  };

  p.reset = () => {
    p.createVector(10, 0).copy();
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
const p = new p5(sketch, canvasHolder);
export { p };
