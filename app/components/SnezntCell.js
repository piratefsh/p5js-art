import { p } from 'P5Instance';
import SnezntUnit from './SnezntUnit';

export default class SnezntCell {
  constructor() {
    this.numUnits = 5;
    this.pos = { x: p.width/2, y: p.height/2 };
    this.points = [
      {
        x: -80,
        y: -50,
      },
      {
        x: 50,
        y: -50,
      },
      {
        x: 50,
        y: 50,
      }, {
        x: -90,
        y: 90,
      },
    ];
    this.bellyButton = {
      x: p.random(this.points[0].x, this.points[1].x),
      y: p.random(this.points[0].y, this.points[2].y),
    };
    this.units = [];

    for (let i = 0; i < this.numUnits; i++) {
      const points = this.points.map((pt) => {
        const x = p.lerp(pt.x, this.bellyButton.x, i / this.numUnits);
        const y = p.lerp(pt.y, this.bellyButton.y, i / this.numUnits);
        return { x, y };
      });
      console.log(points)
      const pos = Object.assign({}, this.pos);
      this.units.push(new SnezntUnit({ pos, points }));
    }
  }

  draw() {
    p.push();
    p.translate(this.pos.x, this.pos.y);
    this.units.forEach((u) => {
      u.draw();
    });
    p.pop();
  }

  update() {
    this.units.forEach(u => u.update());
  }
}
