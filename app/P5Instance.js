import p5 from 'p5';
import Util from 'components/utils/Utils';
import SnezntUnit from 'components/SnezntUnit';
import SnezntCell from 'components/SnezntCell';
import SnezntGrid from 'components/SnezntGrid';
import dat from 'dat.gui-0.6.5/build/dat.gui';

let gui;

const sketch = p => {
  let gridX = Math.floor(window.innerWidth / 120);
  let gridY = Math.floor(window.innerHeight / 120);
  const padding = 40;
  let sz;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.noLoop();
    p.frameRate(60);
    p.reset();
  };

  p.reset = () => {
    if (gui) {
      gui.destroy();
    }
    gui = new dat.GUI();
    gridX = Math.floor(window.innerWidth / 120);
    gridY = Math.floor(window.innerHeight / 120);
    sz = new SnezntGrid({
      rows: gridX,
      cols: gridY,
      sizeX: (p.width - (padding * 2)) / gridX,
      sizeY: (p.height - (padding * 2)) / gridY,
      color: [p.random(210, 220), 200, p.random(10, 20)],
      lineColor: [58, 83, 105, 100],
    });

    const controllers = [
      gui.add(sz, 'jitterAmp').min(1).max(60).onChange(_ => sz.recalculatePoints()),
      gui.add(sz, 'grainWidth').min(5).max(20).onChange(_ => sz.recalculatePoints()),
      gui.addColor(sz, 'color'),
      gui.addColor(sz, 'lineColor'),
    ];

  };

  p.draw = () => {
    p.push();
    p.translate(padding, padding);
    sz.update();
    sz.draw();
    p.pop();
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

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    p.reset();
  };
};

// set global functions for p5
const p = new p5(sketch);
export { p };
