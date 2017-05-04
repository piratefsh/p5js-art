import { p } from '../P5Instance';

const Util = {
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
};

export default Util;
