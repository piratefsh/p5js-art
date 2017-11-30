import { p } from 'P5Instance';
import SnezntCell from './SnezntCell';
import Util from 'components/utils/Utils';

export default class SnezntGrid {
  constructor({ rows, cols, sizeX = 150, sizeY = 100, color, lineColor }) {
    this.debug = false;
    this.color = color;
    this.lineColor = lineColor;
    this.nr = rows;
    this.nc = cols;
    this.cells = [];
    this.grid = [];
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.jitterAmp = sizeX * 0.3;
    this.grainWidth = Math.floor(p.random(5, 13));
    this.recalculatePoints();
  }

  recalculatePoints() {
    // create grid
    if (this.grid.length > 0) {
      this.genGrid(0).forEach((row, i) => {
        row.forEach((cell, j) => {
          const curr = this.grid[i][j];
          const step = p.createVector(p.lerp(curr.x, cell.x, 0.01), p.lerp(curr.y, cell.y, 0.01));
          curr
            .add(Util.jitter() * this.jitterAmp*0.1, Util.jitter() * this.jitterAmp*0.1);
        });
      });
    } else {
      this.grid = this.genGrid();
    }

    if (this.cells.length > 0) {
      // update cells if already exist
      const newCells = this.genCells();
      newCells.forEach((props, i) => {
        this.cells[i].setProps(props);
      });
    } else {
      // create new cells
      this.cells = this.genCells().map(props => new SnezntCell(props));
    }
  }

  genGrid(amp = this.jitterAmp) {
    const grid = [];
    // generate points
    for (let i = 0; i < this.nr + 1; i++) {
      grid.push(new Array(this.nc + 1));
      for (let j = 0; j < this.nc + 1; j++) {
        const vertex = p.createVector(i * this.sizeX, j * this.sizeY);
        grid[i][j] = vertex;
      }
    }
    // jitter them
    grid.forEach((row) => {
      row.forEach((pt) => {
        pt.jitter = pt.jitter || Util.jitter();
        pt.add(pt.jitter * amp, pt.jitter * this.jitterAmp);
      });
    });

    return grid;
  }

  // greate Sneznt cells out of points
  genCells() {
    const cells = [];
    // create squares
    const grid = this.grid;
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
          grainWidth: this.grainWidth,
          jitterAmp: Math.max(this.sizeX, this.sizeY) * p.random(0.1, 0.3) });
      });
    });

    return cells;
  }


  draw() {
    p.push();
    p.background(this.color);
    p.fill(this.color);
    p.stroke(...this.lineColor);
    p.strokeWeight(1.5);
    this.cells.forEach((u) => {
      u.draw();
    });

    if (this.debug) {
      this.grid.forEach((rows) => {
        rows.forEach((pt) => {
          p.ellipse(pt.x, pt.y, 5, 5);
        });
      });
    }
    p.pop();
  }

  update() {
    // this.grainWidth += Util.jitter();
    // this.recalculatePoints();
    this.cells.forEach(u => u.update());
  }
}
