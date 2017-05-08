// Shape superclass. Draws shape given coordinates

import { p } from 'P5Instance';

class Shape {
  constructor(points, sides) {
    this.sides = sides;
    this.points = points;
    this.rotation = 0;
    this.translation = p.createVector(0, 0);
    this.state = 'default';
    this.id = Shape.idCounter++;
  }

  getColor() {
    switch (this.state) {
      case 'focus':
        return Shape.HIGHLIGHT_COLOR;
      default:
        return Shape.FILL_COLOR;
    }
  }

  draw() {
    if (this.drawn) {
      return;
    }
    else {
      this.drawn = true;
    }

    p.push();
    // set style
    p.fill(this.getColor());
    p.stroke(Shape.STROKE_COLOR);

    // draw shape
    p.beginShape();
    this.points.forEach((pt) => {
      p.vertex(pt.x, pt.y);
    });
    p.endShape();
    p.pop();
  }

  update() {
    this.drawn = false;
  }

  // highlight color when focused
  focus() {
    this.state = 'focus';
  }

  // default color
  blur() {
    this.state = 'default';
  }

}

Shape.internalAngleFor = (sides) => {
  return (180 + (sides - 3) * 180) / sides;
};

Shape.internalAngle = (sides) => {
  return (Math.PI + (sides - 3) * Math.PI) / sides;
};
 
Shape.radius = (sides, length) => {
  return (length / 2) / Math.sin(Math.PI / sides);
}

Shape.generate = (sides, length) => {
  const radius = Shape.radius(sides, length);
  const start = p.createVector(0, radius);
  const points = [];
  for (let i = 0; i < sides + 1; i++) {
    const newPoint = start.copy().rotate(p.radians(360 / sides * i));
    points.push(newPoint);
  }
  return points;
};

Shape.STROKE_COLOR = 'rgba(0, 128, 128, 0.5)';
Shape.FILL_COLOR = 'rgba(0, 0, 0, 0.05)';
Shape.HIGHLIGHT_COLOR = 'rgba(0, 128, 128, 0.2)';
Shape.idCounter = 0;
export default Shape;
