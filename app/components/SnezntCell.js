import { p } from 'P5Instance';
import SnezntUnit from './SnezntUnit';

export default class SnezntCell {
  constructor({ pos, points }) {
    this.numUnits = 5;
    this.pos = { x: 0, y: 0 } || pos;
    this.points = points;
    this.bellyButton = {
      x: p.random(this.points[0].x, this.points[1].x),
      y: p.random(this.points[0].y, this.points[2].y),
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
