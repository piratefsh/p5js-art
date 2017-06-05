import p5 from 'p5';
import PatternedShapes from 'components/hexagon/PatternedShapes';
import Patterns from 'components/hexagon/Patterns';
import Util from 'components/utils/Utils';
const sketch = p => {
  let hexes;
  const tile = true;
  const patternFunc = Patterns.t33336;
  const gridX = 2;
  const gridY = 2;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize / gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    hexes = [];
    const depth = 0;
    const maxDepth = 0;

    if (!tile) {
      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
          const centerPos = p.createVector(cellSize / 2 + cellSize * i, cellSize / 2 + cellSize * j);
          const hex = new Hexagon({
            patternFunc,
            centerPos,
            edgeLen,
            depth,
            maxDepth });
          hexes.push(hex);
        }
      }
    }
    else {
      const center = p.createVector(0, 0);
      const rad = Util.trigHeight(edgeLen / 2, edgeLen);
      for (let i = 0; i < p.width / edgeLen + 2; i++) {
        const offset = i % 2 == 1 ? edgeLen / 2 : 0;
        for (let j = 0; j < p.height / edgeLen + 2; j++) {
          const centerPos = center.copy();
          centerPos.x += (edgeLen * j + offset);
          centerPos.y += (rad * i);
          const hex = new PatternedShapes.PatternedHexagon({
            patternFunc,
            centerPos,
            edgeLen,
            depth,
            maxDepth });
          hexes.push(hex);
        }
      }
    }
  };

  p.draw = () => {
    p.background(200);
    // const color = p.color(p.random(120, 180), 50, p.random(100, 200));
    const color = p.color(40, p.random(120, 180), p.random(120, 190));
    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const x = cellSize * i;
        const y = cellSize * j;
        // p.fill(color);
        p.stroke(0, 0, 0, 0);
        p.rect(x, y, x + cellSize, y + cellSize);
      }
    }
    hexes.forEach((hex) => {
      hex.update();
      hex.draw();
    });
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
