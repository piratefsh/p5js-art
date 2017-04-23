import { p } from '../P5Instance';

class SelectablePoint {
  constructor(x, y, offset) {
    this.DEFAULT_COLOR = p.color(0, 128, 128, 50);
    this.DEFAULT_SIZE = 8;
    this.HOVER_COLOR = p.color(0, 128, 128, 50);
    this.HOVER_SIZE = 12;
    this.PRESSED_SIZE = 16;
    this.PRESSED_COLOR = p.color(0, 128, 128);
    this.x = x;
    this.y = y;
    this.point = p.createVector(x, y);
    this.thresh = 5;
    this.state = SelectablePoint.DEFAULT;
    this.color = this.DEFAULT_COLOR;
    this.shapes = [];
    this.offset = offset;
    this.transforms = [];
  }

  totalAngles() {
    return this.shapes.reduce((acc, s) => {
      return acc + s.angle;
    }, 0);
  }

  hasSpace(angle) {
    const usedAngle = this.totalAngles();
    return usedAngle + angle <= 360;
  }

  addShape(shape) {
    if (shape && this.hasSpace(shape.angle) && this.shapes.indexOf(shape) < 0) {
      this.transforms.push({
        rotation: this.totalAngles(),
        translation: p.createVector(this.x, this.y),
      });

      this.shapes.push(shape);
      return true;
    }

    return false;
  }

  hovered() {
    return Math.abs(p.mouseX - this.x) < this.thresh
      && Math.abs(p.mouseY - this.y) < this.thresh;
  }

  update() {
    let color = this.DEFAULT_COLOR;
    let size = this.DEFAULT_SIZE;
    this.state = SelectablePoint.DEFAULT_STATE;

    if (this.hovered()) {
      color = this.HOVER_COLOR;
      size = this.HOVER_SIZE;
      this.state = SelectablePoint.HOVER_STATE;

      if (p.mouseIsPressed) {
        size = this.PRESSED_SIZE;
        color = this.PRESSED_COLOR;
        this.state = SelectablePoint.PRESSED_STATE;
      }
    }

    this.color = color;
    this.size = size;

    this.shapes.forEach(s => s.update());
  }

  draw() {
    p.push();
    p.fill(this.color);
    p.noStroke();
    p.translate(this.x, this.y);
    p.ellipse(0, 0, this.size, this.size);
    p.pop();

    p.push();
    let x= 200
    this.shapes.forEach((s) => {
      p.fill(x-=20, 100)
      s.draw();
    });
    p.pop();

  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

SelectablePoint.transform = function(pt, {rotation, translation}){
  const t = pt.copy();
  t.rotate(p.radians(rotation));
  t.add(translation);

  t.x = Math.round(t.x);
  t.y = Math.round(t.y);
  console.log(pt, t)
  return t;
}

SelectablePoint.DEFAULT_STATE = 'default';
SelectablePoint.HOVER_STATE = 'hover';
SelectablePoint.PRESSED_STATE = 'pressed';


export default SelectablePoint;
