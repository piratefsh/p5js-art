export default class Hexagon {
  constructor(p5, center) {
    this.p5 = p5;
    this.edgeLen = 50;
    this.SIDES = 6;
    this.center = center;

    this.edges = [];
    this.getEdges();
  }

  getEdges() {
    const p5 = this.p5;
    const point = p5.createVector(0, this.edgeLen);
    for (let i = 0; i < this.SIDES + 1; i++) {
      this.edges.push(point.copy());
      point.rotate(p5.PI / 3);
    }
  }

  draw() {
    const p5 = this.p5;
    p5.push()
    p5.stroke(0, 0);
    p5.fill(150, p5.random(150, 200), p5.random(150, 200));

    p5.translate(this.center.x, this.center.y);

    p5.beginShape();
    this.edges.forEach((e) => {
      p5.vertex(e.x, e.y);
    });
    p5.endShape();
    p5.pop()
  }
}
