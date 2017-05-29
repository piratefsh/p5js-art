import p5 from 'p5';
import Hexagon from 'components/hexagon/Hexagon';
const sketch = p => {
  let hexes;
  const pattern = 't33336';
  const len = 100;
  p.setup = () => {
    p.createCanvas(900, 500);
    p.reset();
    p.noLoop();
    p.frameRate(60);

  };

  p.reset = () => {
    hexes = [];
    const center = p.createVector(0, 0);
    const rad = Math.sqrt((len * len) - Math.pow(len / 2, 2));
    for (let i = 0; i < p.width / len; i++) {
      const offset = i % 2 == 1 ? rad : 0;
      for (let j = 0; j < p.height / len; j++) {
        const currCenter = center.copy();
        currCenter.x += rad * 2 * j + offset;
        currCenter.y += (len + Math.sqrt(len * len - rad * rad)) * i;
        const hex = new Hexagon(pattern, currCenter, len);
        hexes.push(hex);
      }
    }
  };

  p.draw = () => {
    p.background(p.color(50, p.random(120, 180), p.random(120, 190)));
    hexes.forEach((hex) => {
      // const hex = hexes[6]
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
