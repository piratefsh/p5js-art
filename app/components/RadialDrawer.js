import Radial from './Radial';
import { p as p5} from 'P5Instance';

export default class RadialDrawer{
  constructor(options){
    this.options = options;
    this.speed = 5;
    this.prevPos = p5.createVector(p5.width/2, p5.height/2);
    this.maxSpeed = 20;
  }

  update(){
    this.currPos = p5.createVector(p5.mouseX, p5.mouseY);
    this.speed = Math.abs((this.currPos
      .copy()
      .sub(this.prevPos)
      .mag()));
    debugger;
    this.prevPos = this.currPos;
  }

  draw(){
    const options = {
      pos: p5.createVector(p5.mouseX, p5.mouseY),
      len: p5.map(this.speed, 0, this.maxSpeed, RadialDrawer.MIN_LEN, RadialDrawer.MAX_LEN),
      spokes: p5.map(this.speed, 0, this.maxSpeed, RadialDrawer.MIN_SPOKES, RadialDrawer.MAX_SPOKES),
      radius: p5.map(this.speed, 0, this.maxSpeed, RadialDrawer.MAX_RADIUS, RadialDrawer.MIN_RADIUS),
    }
    const r = new Radial(Object.assign(options, this.options));
    r.draw();
  }
}

RadialDrawer.MIN_RADIUS = 5;
RadialDrawer.MAX_RADIUS = 30;

RadialDrawer.MIN_LEN = 5;
RadialDrawer.MAX_LEN = 20;

RadialDrawer.MIN_SPOKES = 10;
RadialDrawer.MAX_SPOKES = 70;