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
      const v = this.pdj(p.createVector(x, y), 1, [0.1, 1.9, -0.8, -1.2]);

      let xx = p.map(v.x + offsetx, this.x1, this.x2, this.NUM_LINES, p.width - this.NUM_LINES);
      let yy = p.map(v.y + offsety, this.y1, this.y2, this.NUM_LINES, p.height - this.NUM_LINES);

      p.point(xx, yy);
    };

    sinusoidal(point, scale) {
        return this.p.createVector(scale * Math.sin(point.x), scale * Math.sin(point.y))
    };

    hyperbolic(point, scale){
      const r = point.mag() + 1.0e-10;
      const theta = Math.atan2(point.x, point.y);
      const x = scale * Math.sin(theta) / r;
      const y = scale * Math.cos(theta) * r;
      return this.p.createVector(x, y);
    };

    pdj(point, scale, params){
      const x = scale * (Math.sin(params[0] * point.y) - Math.cos(params[1] * point.x))
      const y = scale * (Math.sin(params[2] * point.x) - Math.cos(params[3] * point.y))
      return this.p.createVector(x, y);
    }
}