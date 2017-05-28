import p5 from 'p5';
import Hexagon from 'components/hexagon/Hexagon';
const sketch = p => {
  const hexes = [];
  const len = 100;
  p.setup = () => {
    p.createCanvas(500, 500);
    p.reset();
    p.noLoop();
    p.frameRate(60);

    const center = p.createVector(0, 0);
    const rad = Math.sqrt((len * len) - Math.pow(len/2, 2))
    for (let i = 0; i < p.width/len; i++) {
      const offset = i % 2 == 1 ? rad : 0;
      for (let j = 0; j < p.height/len; j++) {
        const currCenter = center.copy()
        currCenter.x += rad*2 * j + offset;
        currCenter.y += (len + Math.sqrt(len * len - rad * rad)) * i
        const hex = new Hexagon(currCenter, len, 10);
        hexes.push(hex);
      }
    }
  };

  p.reset = () => {

  };

  p.draw = () => {
    p.background('skyblue');
    hexes.forEach((hex) => {
      // const hex = hexes[6]
      hex.draw();
      if (hex.minLen >= 10) {
        hex.update(hex.minLen - 2);
      }
      // console.log(hex.minLen)
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
