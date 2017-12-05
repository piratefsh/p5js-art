import p5 from 'p5';
import Util from 'components/utils/Utils';
import dat from 'dat.gui-0.6.5/build/dat.gui';
import EyeSeeYou from 'EyeSeeYou';

const sketch = p => {
  const canvasSize = 480;
  const canvasHeight = 360;
  // const gui = new dat.GUI();
  let esy;
  p.setup = () => {
    const video = document.getElementById('video');
    const canvas = document.querySelector('#canvas-holder canvas');
    video.style.width = `${canvasSize}px`;
    video.style.height = `${canvasHeight}px`;
    // hide video
    video.style.position = 'fixed';
    video.style.zIndex = -1;
    video.style.top = '0px';

    p.createCanvas(canvasSize, canvasHeight);
    p.reset();
    p.noLoop();

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
    p.background(0, 0);
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
const p = new p5(sketch, document.getElementById('canvas-holder'));
export { p };
