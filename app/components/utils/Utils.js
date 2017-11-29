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

  trigHeight(width, hypotenuse) {
    return Math.sqrt((hypotenuse * hypotenuse) - (width * width));
  },

  randomise(opacity) {
    return p.random(0, 2) < 0.4;
  },

  // given len of edge, what radius to rotate at to draw shape?
  rotationRadius(edgeLen, sides) {
    const angle = Math.PI * 2 / sides;
    return edgeLen / Math.sin(angle) * Math.sin((p.TWO_PI - angle) / 2);
  },

  distort(v) {
    v.x += p.map(p.noise(v.x + Util.x++), 0, 1, -2, 2);
    v.y += p.map(p.noise(v.y + Util.x++), 0, 1, -2, 2);
    return v;
  },

  midpoint(a, b) {
    return p.createVector((a.x + b.x) / 2, (a.y + b.y) / 2);
  },

  generateParametricEqn(amp = 1, maxFreqDenom = 5) {
    const trigFuncs = ['Math.sin', 'Math.cos'];
    const numTerms = 1 + Math.floor(Math.random() * 2);
    const expressions = [];
    for (let i = 0; i < numTerms; i++) {
      const trig = p.random(trigFuncs);
      const freq = 1 + Math.random() * (maxFreqDenom - 1);
      const expr = `${amp} * ${trig}(t/${freq})`;
      expressions.push(expr);
    }
    const params = ['t'];
    const body = `return (${expressions.join('+')});`;
    return new Function(...params, body);
  },
};

export default Util;
