import Glyph from './Glyph';
import Util from 'components/utils/Utils'
import { p } from 'P5Instance';

export default class GlyphWriter {
  constructor({ input }) {
    this.updateInput(input);
    this.glyphs = [];
    this.sort = false;
  }

  parseText(text) {
    return text.split('\n')
      .map(ln => ln.trim())
      .map(ln => ln.toUpperCase())
      .map(ln => ln.split(''))
      .map(ln => (!this.sort && ln)
        || ln.sort((a, b) => Util.sum(Glyph.fetchStroke(a)) - Util.sum(Glyph.fetchStroke(b))))
  }

  draw() {
    p.push();
    p.translate(this.size, this.size);
    this.glyphs.forEach(g => g.draw());
    p.pop();
  }

  updateInput(input) {
    this.lines = this.parseText(input);
    this.updateSize();
    this.update();
  }

  updateSize() {
    const maxLineLen = this.lines.length > 0 ?
      Math.max.apply(null, (this.lines.map(ln => ln.length))) : 10;
    this.size = Math.floor(p.width / (maxLineLen + 2));
    this.gutter = this.size * 0.16;
    this.size -= this.gutter;
  }

  update() {
    this.glyphs = [];
    let offsetX = 0;
    let offsetY = 0;
    for (let i = 0; i < this.lines.length; i++) {
      offsetX = i * this.gutter;
      for (let j = 0; j < this.lines[i].length; j++) {
        offsetY = j * this.gutter;
        const pos = p.createVector(
          (j * this.size) + offsetY,
          (i * this.size) + offsetX);
        const h = new Glyph({
          pos,
          size: this.size,
          letter: this.lines[i][j],
        });
        this.glyphs.push(h);
      }
    }
  }
}
