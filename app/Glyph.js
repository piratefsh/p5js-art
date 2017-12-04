import { p } from 'P5Instance';

export default class Glyph {
  constructor({ letter = 'A', pos, size }) {
    this.pos = pos;
    this.size = size;
    this.letter = letter.toUpperCase();
    this.strokes = Glyph.STROKES[this.letter] || [0, 0];
  }

  draw() {
    p.push();
    p.translate(this.size / 2, this.size / 2);
    p.fill(0, 0);
    const [straights, curves] = this.strokes;
    const step = this.size / straights;
    for (let i = 0; i < straights; i++) {
      p.line(this.pos.x + (step * 0), this.pos.y + (step * i), this.pos.x + (step * (0 + 1)), this.pos.y + (step * i));
    }

    for (let i = 0; i < curves; i++) {
      p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    if (Glyph.debug) {
      p.text(this.letter, this.pos.x, this.pos.y);
    }

    p.pop();
  }

  update() {

  }
}

Glyph.debug = true;
Glyph.STROKES = {
  A: [3, 0],
  B: [1, 2],
  C: [0, 2],
  D: [1, 1],
  E: [4, 0],
  F: [3, 0],
  G: [3, 0],
  H: [3, 0],
  I: [3, 0],
  J: [1, 1],
  K: [3, 0],
  L: [1, 0],
  M: [4, 0],
  N: [3, 0],
  O: [0, 1],
  P: [1, 1],
  Q: [1, 1],
  R: [2, 1],
  S: [0, 1],
  T: [2, 0],
  U: [0, 1],
  V: [2, 0],
  W: [4, 0],
  X: [2, 0],
  Y: [3, 0],
  Z: [3, 0],
};

