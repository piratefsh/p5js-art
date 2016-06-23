export default class FractalFlame{
  constructor(p){
    this.p = p;
    this.NUM_LINES = 10;
    this.stop = false;
    this.x1 =  -3;
    this.y1 = -3;
    this.x2 = 3;
    this.y2 = 3;
    this.y = this.y1;
    this.step = (this.x2 - this.x1) / (2.321 * p.width);;
  }

   draw() {
      const p = this.p;

      if (this.stop) return;

      for (let i = 0; i < this.NUM_LINES & !this.stop; i++) {

          for (let x = this.x1; x <= this.x2; x += this.step) {
              this.drawVariation(x, this.y);
          }

          this.y += this.step;
          if (this.y > this.y2) {
              this.stop = true;
          }
      }
    };

    drawVariation(x, y) {
      const p = this.p;
      const offsetx = 0.003 * p.randomGaussian();
      const offsety = 0.003 * p.randomGaussian();
      const v = this.sinusoidal(p.createVector(x, y), 3);

      let xx = p.map(v.x + offsetx, this.x1, this.x2, this.NUM_LINES, p.width - this.NUM_LINES);
      let yy = p.map(v.y + offsety, this.y1, this.y2, this.NUM_LINES, p.height - this.NUM_LINES);

      p.point(xx, yy);
    };

    sinusoidal(point, r) {
        return this.p.createVector(r * Math.sin(point.x), r * Math.sin(point.y))
    }
}