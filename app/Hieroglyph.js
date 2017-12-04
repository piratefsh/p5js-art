import { p } from 'P5Instance';

export default class Hieroglyph {
  constructor({ pos, size, numLines }) {
    this.pos = pos;
    this.size = size || 50;
    this.numLines = numLines;
    this.setup();
  }

  setup() {
    const a = this.pos.copy();
    const b = this.pos.copy().add(this.size / 2, 0);
    const c = this.pos.copy().add(this.size, 0);
    const d = this.pos.copy().add(this.size, this.size / 2);
    const e = this.pos.copy().add(this.size, this.size);
    const f = this.pos.copy().add(this.size / 2, this.size);
    const g = this.pos.copy().add(0, this.size);
    const h = this.pos.copy().add(0, this.size / 2);

    this.outline = [[c.x, c.y, a.x, a.y],
      [c.x, c.y, e.x, e.y],
      [e.x, e.y, g.x, g.y],
      [g.x, g.y, a.x, a.y]];

    const innerLines = [[c.x, c.y, g.x, g.y],
      [a.x, a.y, e.x, e.y],
      [b.x, b.y, f.x, f.y],
      [h.x, h.y, d.x, d.y],
      [b.x, b.y, d.x, d.y],
      [d.x, d.y, f.x, f.y],
      [h.x, h.y, f.x, f.y],
      [h.x, h.y, b.x, b.y]];

    this.selectedLines = new Set();

    while (this.selectedLines.size < this.numLines) {
      this.selectedLines.add(p.random(innerLines));
    }
  }

  draw() {
    // p.strokeWeight(this.numLines / 2);
    this.drawLines(this.outline);
    this.drawLines(this.selectedLines);
  }

  drawLines(lineCoord) {
    lineCoord.forEach((ln) => p.line(...ln));
  }
}
