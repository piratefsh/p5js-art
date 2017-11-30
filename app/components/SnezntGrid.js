import { p } from 'P5Instance';
import SnezntCell from './SnezntCell';
import Util from 'components/utils/Utils';

export default class SnezntGrid {
  constructor({ rows, cols }) {
    this.debug = false;
    this.nr = rows;
    this.nc = cols;
    this.cells = [];
    this.size = 100;
    this.jitterAmp = 10;

    this.points = [];
    // generate points
    for (let i = 0; i < this.nr + 1; i++) {
      this.points.push(new Array(this.nc + 1));
      for (let j = 0; j < this.nc + 1; j++) {
        const vertex = p.createVector(i * this.size, j * this.size);
        this.points[i][j] = vertex;
      }
    }
    // jitter them
    this.points.forEach((row) => {
      row.forEach((pt) => {
        pt.add(Util.jitter() * this.jitterAmp, Util.jitter() * this.jitterAmp);
      });
    });

    // create squares
    const grid = this.points;
    grid.forEach((row, i) => {
      if (i === grid.length - 1) {
        return;
      }
      row.forEach((cell, j) => {
        if (j === row.length - 1) {
          return;
        }
        const quad = [
          row[j].copy(),
          row[j + 1].copy(),
          grid[i + 1][j + 1].copy(),
          grid[i + 1][j].copy(),
        ];

        this.cells.push(new SnezntCell({ points: quad }));
      });
    });
  }

  draw() {
    p.push();
    p.translate(40, 40);
    this.cells.forEach((u) => {
      u.draw();
    });

    if(this.debug){
      this.points.forEach((rows) => {
        rows.forEach((pt) => {
          p.ellipse(pt.x, pt.y, 5, 5);
        });
      });
      
    }
    p.pop();
  }

  update() {
    this.cells.forEach(u => u.update());
  }
}
