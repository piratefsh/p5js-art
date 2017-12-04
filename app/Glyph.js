import { p } from 'P5Instance';

export default class Glyph {
  constructor({ letter = 'A', pos, size, strokeWeight=1, strokeOpacity=255 }) {
    this.pos = pos.copy();
    this.size = size;
    this.letter = letter;
    this.strokes = Glyph.STROKES[this.letter] || [0, 0];
    this.strokeOpacity = strokeOpacity;
    this.strokeWeight = strokeWeight;
  }

  draw() {
    p.push();
    p.fill(0, 0);
    p.stroke(255, this.strokeOpacity);
    p.strokeWeight(this.strokeWeight);
    p.translate(this.pos.x, this.pos.y);

    const [straights, diagonals, curves, dots] = this.strokes;
    const step = this.size / straights;

    for (let i = 0; i < straights; i++) {
      p.line(step * 0, step * i, step, step * i);
    }

    for (let i = 0; i < curves; i++) {
      p.ellipse(0, 0,
        this.size - (this.size / curves * (i)),
        this.size - (this.size / curves * (i)));
    }

    p.push();
      p.fill(255);
      p.stroke(0, 0);
      for (let i = 0; i < dots; i++) {
        p.ellipse(this.size/2 - this.size/dots * i,
          0,
          this.size * 0.3,
          this.size * 0.3);
      }
    p.pop();

    for (let i = 0; i < diagonals; i++) {
      const s = Glyph.DIAGONAL_LINES[i % 4];

      p.line(s[0] * this.size,
        s[1] * this.size * 1.1,
        s[2] * this.size,
        s[3] * this.size);
    }

    if (Glyph.debug) {
      p.push()
      p.stroke(255, 0);
      p.fill(255);
      p.text(this.letter, 0, 0);
      // p.rect(0, 0, this.size, this.size);
      p.pop()
    }

    p.pop();
  }

  update() {

  }
}

Glyph.fetchStroke = (char) => {
  return Glyph.STROKES[char] || [0, 0, 0, 0]
}
Glyph.debug = true;
Glyph.DIAGONAL_LINES = [
  [0, 0, 1, 1],
  [1, 0, 0, 1],
  [1, 0, 1, 1],
  [0, 0, 0, 1],
];
Glyph.STROKES = {
  A: [1, 2, 0, 0],
  B: [1, 0, 2, 0],
  C: [0, 0, 1, 0],
  D: [1, 0, 1, 0],
  E: [4, 0, 0, 0],
  F: [3, 0, 0, 0],
  G: [2, 0, 1, 0],
  H: [3, 0, 0, 0],
  I: [3, 0, 0, 0],
  J: [1, 0, 1, 0],
  K: [1, 2, 0, 0],
  L: [1, 0, 0, 0],
  M: [2, 2, 0, 0],
  N: [2, 1, 0, 0],
  O: [0, 0, 1, 0],
  P: [1, 0, 1, 0],
  Q: [0, 1, 1, 0],
  R: [1, 1, 1, 0],
  S: [0, 0, 2, 0],
  T: [2, 0, 0, 0],
  U: [0, 0, 1, 0],
  V: [0, 2, 0, 0],
  W: [0, 4, 0, 0],
  X: [0, 2, 0, 0],
  Y: [1, 2, 0, 0],
  Z: [2, 1, 0, 0],
  a: [1, 0, 1, 0],
  b: [1, 0, 1, 0],
  c: [0, 0, 1, 0],
  d: [1, 0, 1, 0],
  e: [0, 0, 2, 0],
  f: [1, 0, 1, 0],
  g: [0, 0, 3, 0],
  h: [1, 0, 1, 0],
  i: [1, 0, 0, 1],
  j: [0, 0, 1, 1],
  k: [1, 2, 0, 0],
  l: [1, 0, 0, 0],
  m: [1, 0, 2, 0],
  n: [1, 0, 1, 0],
  o: [0, 0, 1, 0],
  p: [1, 0, 1, 0],
  q: [1, 0, 2, 0],
  r: [1, 0, 1, 0],
  s: [0, 0, 2, 0],
  t: [2, 0, 0, 0],
  u: [0, 0, 1, 0],
  v: [0, 0, 1, 0],
  w: [0, 0, 2, 0],
  x: [0, 2, 0, 0],
  y: [0, 2, 0, 0],
  z: [2, 1, 0, 0],
  '.': [0, 0, 0, 1],
  ':': [0, 0, 0, 2],
  ')': [0, 0, 0.5, 0],
  '(': [0, 0, 0.5, 0],
};

