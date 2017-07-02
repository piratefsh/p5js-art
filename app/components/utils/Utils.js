import { p as p5 } from 'P5Instance';

const Util = {
  x: 0,
  y: 0,
  randomPoint() {
    const w = Math.trunc(p5.random(p5.width));
    const h = Math.trunc(p5.random(p5.height));
    return p5.createVector(w, h);
  },

  // is point x, y on canvas?
  inCanvas(x, y) {
    return x < p5.width && x > 0
      && y < p5.height && y > 0;
  },

  trigHeight(width, hypotenuse){
    return Math.sqrt((hypotenuse * hypotenuse) - (width * width))
  },

  randomise(opacity){
    return p5.random(0, 2) < 0.4;
  },

  // given len of edge, what radius to rotate at to draw shape? 
  rotationRadius(edgeLen, sides){
    const angle = Math.PI * 2 / sides;
    return edgeLen/Math.sin(angle) * Math.sin((p5.TWO_PI - angle) / 2)
  },

  distort(v){
    v.x += p5.map(p5.noise(v.x + Util.x++), 0, 1, -2, 2)
    v.y += p5.map(p5.noise(v.y + Util.x++), 0, 1, -2, 2)
    return v
  },

  midpoint(a, b) {
    return p5.createVector((a.x+b.x)/2, (a.y+b.y)/2)
  }
};

export default Util;
