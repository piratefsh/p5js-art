import p5 from 'p5';
import Graph from 'components/graph/Graph';

const sketch = p => {
  let graph;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noLoop();
    p.reset();
    const pattern = '3.4.6.4';
    graph = new Graph(pattern.split('.').map(num => parseInt(num, 10)));
  };

  p.reset = () => {
  };

  p.draw = () => {
    p.background(255);
    p.translate(p.width/2, p.height/2);
    graph.draw();
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
