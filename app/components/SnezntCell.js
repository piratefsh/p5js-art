import { p } from 'P5Instance';
import SnezntUnit from './SnezntUnit';
import Util from 'components/utils/Utils';

export default class SnezntCell {
  constructor({ pos, points, jitterAmp, grainWidth }) {
    this.pos = { x: 0, y: 0 } || pos;
    this.points = points;
    this.grainWidth = grainWidth;
    this.jitterAmp = jitterAmp;
    this.width = this.points[2].x - this.points[1].x;
    this.height = this.points[0].y - this.points[1].y;
    this.numUnits = Math.max(this.width, this.height) / this.grainWidth;
    this.bellyButton = {
      x: p.random(this.points[1].x, this.points[2].x) + (Util.jitter() * this.jitterAmp),
      y: p.random(this.points[0].y, this.points[1].y) + (Util.jitter() * this.jitterAmp),
    };
    this.setup();
  }

  setup() {
    this.units = [];
    for (let i = 0; i < this.numUnits; i++) {
      const points = this.points.map((pt) => {
        const x = p.lerp(pt.x, this.bellyButton.x, i / this.numUnits);
        const y = p.lerp(pt.y, this.bellyButton.y, i / this.numUnits);
        return { x, y };
      });
      this.units.push(new SnezntUnit({ points }));
    }
  }

  setPoints(points) {
    this.points = points;
    this.setup();
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
