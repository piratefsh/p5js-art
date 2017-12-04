import { p } from 'P5Instance';

export default class Glyph {
  constructor({ letter = 'A', pos, size }) {
    this.pos = pos.copy();
    this.size = size;
    this.letter = letter.toUpperCase();
    this.strokes = Glyph.STROKES[this.letter] || [0, 0];
  }

  draw() {
    p.push();
    p.fill(0, 0);
    p.translate(this.pos.x, this.pos.y);

    const [straights, diagonals, curves] = this.strokes;
    const step = this.size / straights;
    for (let i = 0; i < straights; i++) {
      p.line((step * 0), (step * i), (step * (0 + 1)), (step * i));
    }

    for (let i = 0; i < curves; i++) {
      p.ellipse(0, 0, this.size - (this.size / curves * (i)), this.size - (this.size / curves * (i)));
    }

    for (let i = 0; i < diagonals; i++) {
      const s = Glyph.DIAGONAL_LINES[i % 4];

      p.line(s[0] * this.size,
        s[1] * this.size * 1.1,
        s[2] * this.size,
        s[3] * this.size);
    }

    if (Glyph.debug) {
      p.text(this.letter, 0, 0);
      p.rect(0, 0, this.size, this.size);
    }

    p.pop();
  }

  update() {

  }
}

Glyph.debug = true;
Glyph.DIAGONAL_LINES = [
  [0, 0, 1, 1],
  [1, 0, 0, 1],
  [1, 0, 1, 1],
  [0, 0, 0, 1],
];
Glyph.STROKES = {
  A: [1, 2, 0],
  B: [1, 0, 2],
  C: [0, 0, 1],
  D: [1, 0, 1],
  E: [4, 0, 0],
  F: [3, 0, 0],
  G: [3, 0, 0],
  H: [3, 0, 0],
  I: [3, 0, 0],
  J: [1, 0, 1],
  K: [1, 2, 0],
  L: [1, 0, 0],
  M: [2, 2, 0],
  N: [2, 1, 0],
  O: [0, 0, 1],
  P: [1, 0, 1],
  Q: [0, 1, 1],
  R: [1, 1, 1],
  S: [0, 0, 2],
  T: [2, 0, 0],
  U: [0, 0, 1],
  V: [0, 2, 0],
  W: [0, 4, 0],
  X: [0, 2, 0],
  Y: [1, 2, 0],
  Z: [2, 1, 0],
};

