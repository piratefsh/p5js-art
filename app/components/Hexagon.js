export default class Hexagon {
  constructor(p5, center, rotation) {
    this.p5 = p5;
    this.edgeLen = 50;
    this.SIDES = 6;
    this.center = center;
    this.rotation = rotation;
    this.edges = [];
    this.getEdges();
  }

  getEdges() {
    const p5 = this.p5;
    const point = p5.createVector(5, this.edgeLen);
    for (let i = 0; i < this.SIDES + 1; i++) {
      this.edges.push(point.copy());
      point.rotate(p5.PI / 3);
    }
  }

  getEscherEdges() {
    const p5 = this.p5;

    const point = p5.createVector(0, this.edgeLen);
    point.rotate(p5.TWO_PI / 3);
    const APrime = point.copy();
    point.rotate(p5.TWO_PI / 3);
    const BPrime = point.copy();
    point.rotate(p5.TWO_PI / 3);
    const CPrime = point.copy();
    // p5.push();
    // p5.translate(this.center.x, this.center.y);
    // p5.beginShape();
    // p5.vertex(APrime.x, APrime.y);
    // p5.vertex(BPrime.x, BPrime.y);
    // p5.vertex(CPrime.x, CPrime.y);
    // p5.vertex(APrime.x, APrime.y);
    // p5.endShape();
    // p5.pop();

    const randomPoint = p5.createVector(-40, 28);
    const B = APrime.copy().add(randomPoint);
    randomPoint.rotate(-p5.TWO_PI / 3);
    const C = APrime.copy().add(randomPoint);

    const AB = C.copy().sub(BPrime);
    AB.rotate(-p5.TWO_PI / 3);
    const A = BPrime.copy().add(AB);

    this.edges = [APrime, C, BPrime, A, CPrime, B, APrime];
  }

  width() {
    const x = this.edges.map(e => e.x);
    const w = Math.max.apply(null, x) - Math.min.apply(null, x);
    return w;
  }

  reflect(normal) {
    const reflected = this.edges.map((e) => {
      const dotP = e.dot(normal)
      const multP = normal.mult(dotP * 2);
      const res = e.copy().sub(multP)
      return res;
    });
  }

  draw() {
    const p5 = this.p5;
    p5.push();
    p5.stroke(0, 255);
    p5.fill(150, p5.random(150, 200), p5.random(150, 200), 100);
    p5.translate(this.center.x, this.center.y);
    p5.rotate(this.rotation);

    p5.beginShape();
    this.edges.forEach((e) => {
      p5.vertex(e.x, e.y);
    });
    p5.endShape();
    p5.pop();
  }
}
