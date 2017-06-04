import { p } from 'P5Instance';
import Util from 'components/utils/Utils';
export default class Shape {
  constructor({sides, centerPos, edgeLen, rotation=0}) {
    this.id = Shape.ID++;

    this.sides = sides;
    this.vertices = [];
    this.edgeLen = edgeLen;

    this.opacity = 80;
    this.centerPos = p.createVector(centerPos.x, centerPos.y);
    this.radius = Util.rotationRadius(edgeLen, sides);
    const curr = p.createVector(0, this.radius);
    for (let i = 0; i < sides; i++) {
      curr.rotate(Math.PI * 2 / sides);
      this.vertices.push(curr.copy().rotate(rotation));
    }
  }

  draw() {
    p.push();
    p.translate(this.centerPos.x, this.centerPos.y);
    // p.strokeWeight(p.map(this.edgeLen, 5, 30, 1, 8));
    // p.fill(255, p.map(p.noise(this.centerPos.x, this.centerPos.y), 0, 1, 10, 90));
    p.stroke(22, 100);

    if(Shape.DEBUG){
      p.text(this.id, 0,0)
      p.strokeWeight(2);
      p.ellipse(this.vertices[0].x, this.vertices[0].y, 5, 5)
    }
    // p.beginShape();
    const last = this.vertices.reduce((prev, v) => {
      const d2 = Util.distort(v);
      if(prev) {
        const d1 = Util.distort(prev);
        Line.sketch(d1, d2)
      }
      return d2;
      // p.vertex(d.x, d.y);
    }, null);
    Line.sketch(last, Util.distort(this.vertices[0]))
    // p.endShape(p.CLOSE);
    p.pop();
  }
}

const Line = {
  sketch(v1, v2){
    const mag = v1.copy().sub(v2).mag();
    for(let i = 0; i < mag; i++){
      const lx = p.lerp(v1.x, v2.x, i/mag)
      const ly = p.lerp(v1.y, v2.y, i/mag)
      p.point(lx, ly)
    }
  }
}

Shape.ID = 0;
Shape.DEBUG = false;
