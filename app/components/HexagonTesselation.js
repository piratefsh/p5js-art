import Hexagon from './Hexagon';

export default class HexagonTesselation {
  constructor(p5) {
    this.p5 = p5;
    this.tiles = {};
    this.makeTiles();
    console.log(this.tiles);
  }

  makeTiles() {
    const p5 = this.p5;
    const hexs = [];

    let hex = new Hexagon(p5, p5.createVector(0, 0));
    this.tiles[[0, 0]] = hex;
    hexs.push(hex);


    const len = (hex.edgeLen) * Math.sqrt(3);

    while (hexs.length > 0) {
      hex = hexs.shift();
      const center = hex.center.copy();
      center.x += len;
      for (let i = 0; i < 6; i++) {
        if (center.x < p5.width + len && center.x > 0 &&
          center.y < p5.height + len && center.y > -len) {
          const neighbour = new Hexagon(p5, center.copy());
          if (!this.tiles[[center.x, center.y]]) {
            this.tiles[[center.x, center.y]] = neighbour;
            hexs.push(neighbour);
          }
        }
        center.rotate(p5.TWO_PI/6);
      }
    }
  }

  draw() {
    const p5 = this.p5;
    // p5.translate(p5.width / 2, p5.height / 2);
    for (const pos in this.tiles) {
      this.tiles[pos].draw();
    }
  }
}
