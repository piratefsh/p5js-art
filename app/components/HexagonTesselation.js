import Hexagon from './Hexagon';

export default class HexagonTesselation {
  constructor(p5) {
    this.p5 = p5;
    this.tiles = [];
    this.makeTiles();
    console.log(this.tiles);
  }

  makeTiles() {
    const p5 = this.p5;
    const hexs = [];

    let hex = new Hexagon(p5, p5.createVector(0, 0));
    this.tiles.push(hex)
    hexs.push(hex);

    let go = true;
    while (go && hexs.length > 0) {
      hex = hexs.shift();
      for (let i = 1; i < hex.edges.length; i++) {
        const curr = hex.edges[i];
        const prev = hex.edges[i - 1];
        const normal = curr.sub(prev).normalize();

        const neighbour = new Hexagon(p5, hex.center);
        neighbour.reflect(normal);
        const center = neighbour.edges[0];
        if (center.x > 0 && center.x < p5.width &&
          center.y > 0 && center.y < p5.height) {
          hexs.push(neighbour);
          this.tiles.push(neighbour);
        }
      }
      go = false;
    }
  }

  draw() {
    const p5 = this.p5;
    p5.translate(p5.width / 2, p5.height / 2);
    // this.tiles.forEach(t => t.draw())
    this.tiles[0].draw()
  }
}
