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
    p.beginShape();
    // p.strokeWeight(p.map(this.edgeLen, 5, 30, 1, 8));
    p.fill(255, p.random(100,255), 255, this.opacity);
    // p.fill(255, p.map(p.noise(this.centerPos.x, this.centerPos.y), 0, 1, 10, 90));

    if(Shape.DEBUG){
    p.stroke(255, 255, 255, 20);
      p.text(this.id, 0,0)
      p.strokeWeight(2);
      p.ellipse(this.vertices[0].x, this.vertices[0].y, 5, 5)
    }
    this.vertices.forEach((v) => {
      p.vertex(v.x, v.y);
    });
    p.endShape(p.CLOSE);
    p.pop();
  }
}

Shape.ID = 0;
Shape.DEBUG = false;
