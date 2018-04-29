import p5 from 'p5';
import Util from 'components/utils/Utils';
import DotGrid from 'components/DotGrid';
import Modulator from 'components/Modulator';
import dat from 'dat.gui/build/dat.gui';
const sketch = p => {
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 500; window.innerWidth;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  let gui = new dat.GUI();
  const m = new Modulator();
  let segGrid;
  let controllers;

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    // p.noLoop();
    p.frameRate(24);

    segGrid = new DotGrid({rows:10, cols:6, numDotsPerSegment: 6, dotSize: 10})

    controllers = [
      gui.add(segGrid, 'rows', 1, 30, 1),
      gui.add(segGrid, 'cols', 1, 30, 1),
      gui.add(segGrid, 'numDotsPerSegment', 1, 30, 1),
      gui.add(segGrid, 'xJitter', 1, 30, 0.5),
      gui.add(segGrid, 'yJitter', 1, 30, 0.5),
      gui.add(segGrid, 'dotSize', 1, 20, 0.5),
    ];

    controllers.map((c) => c.onFinishChange(() => {
      console.log(arguments)
      segGrid.update();
      m.resetInitValue(c.object, c.property, c.getValue());
    }));

    // m.add(segGrid, 'numDotsPerSegment', (t, v) => v + 3 - v * p.sin(t))
    m.add(segGrid, 'rows', (t, v) => Math.abs(p.cos(t/50)) * v)
    m.add(segGrid, 'numDotsPerSegment', (t, v) => Math.abs(p.cos(t/50)) * v)
    m.add(segGrid, 'dotSize', (t, v) => Math.abs(p.sin(t/50)) * v)
    // m.add(segGrid, 'yJitter', (t) => p.sin(t))
    // m.add(segGrid, 'cols', (t) => p.cos(t))
    // segGrid.update();
  };

  p.reset = () => {
    p.createVector(10, 0).copy()
  };

  p.draw = () => {
    m.tick();
    segGrid.update()
    p.background(20, 200);
    segGrid.draw();
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
const p = new p5(sketch);
export { p };
