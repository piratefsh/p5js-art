import { p } from 'P5Instance';

const Util = {
  x: 0,
  y: 0,
  randomPoint() {
    const w = Math.trunc(p.random(p.width));
    const h = Math.trunc(p.random(p.height));
    return p.createVector(w, h);
  },

  // is point x, y on canvas?
  inCanvas(x, y) {
    return x < p.width && x > 0
      && y < p.height && y > 0;
  },

  trigHeight(width, hypotenuse){
    return Math.sqrt((hypotenuse * hypotenuse) - (width * width))
  },

  randomise(opacity){
    return p.random(0, 2) < 0.4;
  },

  // given len of edge, what radius to rotate at to draw shape? 
  rotationRadius(edgeLen, sides){
    const angle = Math.PI * 2 / sides;
    return edgeLen/Math.sin(angle) * Math.sin((p.TWO_PI - angle) / 2)
  },

  distort(v){
    v.x += p.map(p.noise(v.x + Util.x++), 0, 1, -2, 2)
    v.y += p.map(p.noise(v.y + Util.x++), 0, 1, -2, 2)
    return v
  }
};

export default Util;
