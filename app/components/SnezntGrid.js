import { p } from 'P5Instance';
import SnezntCell from './SnezntCell';

export default class SnezntGrid {
  constructor({ rows, cols }) {
    this.nr = rows;
    this.nc = cols;
    this.cells = [];
    this.size = 100;

    for (let i = 0; i < this.nr; i++) {
      for (let j = 0; j < this.nc; j++) {
        const points = [
          {
            x: i * this.size,
            y: j * this.size,
          },
          {
            x: (i + 1) * this.size,
            y: j * this.size,
          },
          {
            x: (i + 1) * this.size,
            y: (j + 1) * this.size,
          },
          {
            x: i * this.size,
            y: (j + 1) * this.size,
          },
        ];
        this.cells.push(new SnezntCell({ points }));
      }
    }
  }

  draw() {
    p.push();
    p.translate(0, 0);
    this.cells.forEach((u) => {
      u.draw();
    });
    p.pop();
  }

  update() {
    this.cells.forEach(u => u.update());
  }
}
