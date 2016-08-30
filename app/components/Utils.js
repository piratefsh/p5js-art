export default class Util {
  constructor(p5){
    this.p5 = p5;

    this.p5.randomSeed(6);
  }

  randomPoint() {
    const w = Math.trunc(this.p5.random(this.p5.width))
    const h = Math.trunc(this.p5.random(this.p5.height))
    return this.p5.createVector(w, h)
  }
}