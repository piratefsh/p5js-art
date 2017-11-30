import { p } from 'P5Instance';
import SnezntCell from './SnezntCell';
import Util from 'components/utils/Utils';

export default class SnezntGrid {
  constructor({ rows, cols, sizeX = 150, sizeY = 100, color }) {
    this.debug = false;
    this.color = color;
    this.nr = rows;
    this.nc = cols;
    this.cells = [];
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.jitterAmp = sizeX * 0.3;

    this.recalculatePoints();
  }

  recalculatePoints() {
    this.points = [];
    // generate points
    for (let i = 0; i < this.nr + 1; i++) {
      this.points.push(new Array(this.nc + 1));
      for (let j = 0; j < this.nc + 1; j++) {
        const vertex = p.createVector(i * this.sizeX, j * this.sizeY);
        this.points[i][j] = vertex;
      }
    }
    // jitter them
    this.points.forEach((row) => {
      row.forEach((pt) => {
        pt.jitter = pt.jitter || Util.jitter();
        pt.add(pt.jitter * this.jitterAmp, pt.jitter * this.jitterAmp);
      });
    });

    if (this.cells.length > 0) {
      // update cells
      // this.cells = this.genCells().map(props => new SnezntCell(props));
      const newCells = this.genCells();
      newCells.forEach((props, i) => {
        console.log(props.points)
        this.cells[i].setPoints(props.points);
      });
    }
    else {
      // create new cells
      this.cells = this.genCells().map(props => new SnezntCell(props));
    }
  }

  genCells() {
    const cells = [];
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
        cells.push({
          points: quad,
          grainWidth: Math.floor(p.random(5, 16)),
          jitterAmp: Math.max(this.sizeX, this.sizeY) * p.random(0.1, 0.3) });
      });
    });

    return cells;
  }


  draw() {
    p.push();
    // p.fill(0, 0);
    p.fill(this.color);
    p.stroke(20, 120);
    p.strokeWeight(1.5);
    this.cells.forEach((u) => {
      u.draw();
    });

    if (this.debug) {
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
