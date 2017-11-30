import { p } from 'P5Instance';
import SnezntUnit from './SnezntUnit';
import Util from 'components/utils/Utils';

export default class SnezntCell {
  constructor({ pos, points }) {
    this.pos = { x: 0, y: 0 } || pos;
    this.points = points;
    this.grainWidth = Math.floor(p.random(5, 16));
    this.width = this.points[2].x - this.points[1].x;
    this.height = this.points[0].y - this.points[1].y;
    this.numUnits = Math.max(this.width, this.height) / this.grainWidth;
    this.jitterAmp = Math.max(this.width, this.height) * p.random(0.1, 0.3);
    this.bellyButton = {
      x: p.random(this.points[1].x, this.points[2].x) + (Util.jitter() * this.jitterAmp),
      y: p.random(this.points[0].y, this.points[1].y) + (Util.jitter() * this.jitterAmp),
    };
    this.units = [];
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.numUnits; i++) {
      const points = this.points.map((pt) => {
        const x = p.lerp(pt.x, this.bellyButton.x, i / this.numUnits);
        const y = p.lerp(pt.y, this.bellyButton.y, i / this.numUnits);
        return { x, y };
      });
      const pos = Object.assign({}, this.pos);
      this.units.push(new SnezntUnit({ pos, points }));
    }
  }

  draw() {
    p.push();
    // p.translate(this.pos.x, this.pos.y);
    this.units.forEach((u) => {
      u.draw();
    });
    p.pop();
  }

  update() {
    this.units.forEach(u => u.update());
  }
}
