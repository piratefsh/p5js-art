import { p } from 'P5Instance';
import SnezntCell from './SnezntCell';
import Util from 'components/utils/Utils';

export default class SnezntGrid {
  constructor({ rows, cols }) {
    this.nr = rows;
    this.nc = cols;
    this.cells = [];
    this.size = 100;

    const prevX = p.createVector(0, 0);
    let prevY = p.createVector(0, 0);

    for (let i = 0; i < this.nr; i++) {
      const stepWidth = p
        .createVector(this.size, Util.jitter())

      // reset y
      prevY = p.createVector(0, 0);
      for (let j = 0; j < this.nc; j++) {
        const stepHeight = p
          .createVector(Util.jitter(), this.size)

        const points = [
          {
            x: prevX.x,
            y: prevY.y,
          },
          {
            x: prevX.x + stepWidth.x,
            y: prevY.y + stepWidth.y,
          },
          {
            x: prevX.x + stepWidth.x,
            y: prevY.y + stepHeight.y,
          },
          {
            x: prevX.x + stepHeight.x,
            y: prevY.y + stepHeight.y,
          },
        ];

        console.log(points)

        p.push();
        p.translate(20, 20);
        p.stroke(255, 0, 0)
        // p.line(prevX.x, prevX.y, prevX.x + stepWidth.x, prevX.y + stepWidth.y);
        p.pop();

        this.cells.push(new SnezntCell({ points }));
        prevY.add(stepHeight)
      }

      prevX.add(stepWidth)
    }
  }

  draw() {
    p.push();
    p.translate(40, 40);
    this.cells.forEach((u) => {
      u.draw();
    });
    p.pop();
  }

  update() {
    this.cells.forEach(u => u.update());
  }
}
