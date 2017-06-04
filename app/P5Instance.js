import p5 from 'p5';
import Hexagon from 'components/hexagon/Hexagon';
import Patterns from 'components/hexagon/Patterns';
const sketch = p => {
  let hexes;
  const patternFunc = Patterns.t33336;
  const gridX = 1;
  const gridY = 1;
  const canvasSize = 600;
  const cellSize = Math.ceil(canvasSize / gridX);
  const edgeLen = cellSize / 2;
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize/gridX * gridY);
    p.reset();
    p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    hexes = [];
    const depth = 0;
    const maxDepth = 3;

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const centerPos = p.createVector(cellSize / 2 + cellSize * i, cellSize / 2 + cellSize * j);
        const hex = new Hexagon({
          patternFunc,
          centerPos,
          edgeLen,
          depth,
          maxDepth});
        hexes.push(hex);
      }
    }
    // const center = p.createVector(0, 0);
    // const rad = Math.sqrt((len * len) - Math.pow(len / 2, 2));
    // for (let i = 0; i < p.width / len; i++) {
    //   const offset = i % 2 == 1 ? rad : 0;
    //   for (let j = 0; j < p.height / len; j++) {
    //     const currCenter = center.copy();
    //     currCenter.x += rad * 2 * j + offset;
    //     currCenter.y += (len + Math.sqrt(len * len - rad * rad)) * i;
    //     const hex = new Hexagon(pattern, currCenter, len);
    //     hexes.push(hex);
    //   }
    // }
  };

  p.draw = () => {
    p.background(0)
    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const x = cellSize * i;
        const y = cellSize * j;
        // const color = p.color(p.random(120, 180), 40, p.random(120, 190));
        const color = p.color(40, p.random(120, 180), p.random(120, 190));
        p.fill(color);
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
