import p5 from 'p5';
import Hexagon from 'components/hexagon/Hexagon';
const sketch = p => {
  let hexes;
  const pattern = 't33336';
  const grid = 3;
  const canvasSize = 800;
  const cellSize = canvasSize / grid;
  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize);
    p.reset();
    p.noLoop();
    p.frameRate(60);
  };

  p.reset = () => {
    hexes = [];

    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const center = p.createVector(cellSize / 2 + cellSize * i, cellSize / 2 + cellSize * j);
        const hex = new Hexagon(pattern, center, cellSize / 2 - 20);
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
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const x = cellSize * i;
        const y = cellSize * j;
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
