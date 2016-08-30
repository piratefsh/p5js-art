import Util from './Utils';
import BinaryTree from './Tree';

export default class Voronoi{
  constructor(p5){
    this.p5 = p5;
    this.util = new Util(this.p5);

    this.state = {
      sweepLinePos: p5.createVector(0,0),
      beachLineTree: new BinaryTree(),
      done: false,
    }

    // get random sites
    this.numSites = 15;
    this.sites = new Array(this.numSites);
    for(let i = 0; i < this.numSites; i++){
      this.sites[i] = this.util.randomPoint();
    }

    // sort by y coordinate
    this.sites.sort((a, b) => {
      return a.y - b.y;
    });
  }

  sweep() {
    // if reached the end of canvas, stop sweeping
    if(this.state.sweepLinePos.y > this.p5.height){
      this.state.done = true;
      return;
    }

    // else, sweep one pixel down
    this.state.sweepLinePos.add(0, 1);

    // is there a point on this line
    const numIntersects = this.numSitesOnSweep();
    if(numIntersects > 0){
      for(let i = 0; i < numIntersects; i++){
        const s = this.sites.shift();
        this.addArc(s);
      }
    }
  }

  addArc(site){
    const beach = this.state.beachLineTree;
    
    beach.insert(site.x);
    let str = "";
    beach.traverse(beach.root, node => str = `${str} ${node.value}`);
    console.log(str)
  }

  numSitesOnSweep() {
    const sweepY = this.state.sweepLinePos.y;
    let numIntersects = 0;
    for(let i = 0; i < this.sites.length; i++) {
      const s = this.sites[i];
      if (s.y > sweepY){
        return numIntersects;
      }
      else if(s.y == sweepY){
        numIntersects++;
      }
    }
    return numIntersects;
  }

  draw(){
    // this.p5.background(250);

    // draw random points
    this.p5.fill(0);
    this.sites.forEach((s) => {
      this.p5.ellipse(s.x, s.y, 2, 2)
    });

    const sweep = this.state.sweepLinePos;
    this.p5.stroke(100, 10);
    this.p5.line(sweep.x, sweep.y, sweep.x + this.p5.width, sweep.y);
  }
 }
