import Util from './Utils';

export default class Voronoi{
  constructor(p5){
    this.p5 = p5;
    this.util = new Util(this.p5);

    this.state = {
      sweepLinePos: p5.createVector(0,0),
      done: false
    }

    // get random sites
    this.numSites = 15;
    this.sites = new Array(this.numSites);
    for(let i = 0; i < this.numSites; i++){
      this.sites[i] = this.util.randomPoint();
    }
  }

  sweep() {
    // if reached the end of canvas, stop sweeping
    if(this.state.sweepLinePos.y > this.p5.height){
      this.state.done = true;
      return;
    }

    // else, sweep one pixel down
    this.state.sweepLinePos.add(0, 1);
  }

  draw(){
    this.p5.background(250);

    // draw random points
    this.p5.fill(0);
    this.sites.forEach((s) => {
      this.p5.ellipse(s.x, s.y, 2, 2)
    });

    const sweep = this.state.sweepLinePos;
    this.p5.stroke(100);
    this.p5.line(sweep.x, sweep.y, sweep.x + this.p5.width, sweep.y);
  }
 }