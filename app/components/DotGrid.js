import { p } from 'P5Instance';
import DotSegment from './DotSegment';

export default class DotGrid {
  constructor({
    rows=5,
    cols=5,
    numDotsPerSegment=5,
    xJitter=5,
    yJitter=5,
    dotSize=5}){
    Object.assign(this, {
      rows,
      cols,
      numDotsPerSegment,
      xJitter,
      yJitter,
      dotSize,
      segments: []
    })

    this.update({rows, cols, numDotsPerSegment})
  }

  update({
    rows=this.rows,
    cols=this.cols,
    numDotsPerSegment=this.numDotsPerSegment,
    xJitter=this.xJitter,
    yJitter=this.yJitter,
    dotSize=this.dotSize,
    } = {}){
    this.segments = [];

    const rowStep = p.height / rows;
    const colStep = p.width / cols;

    for(let j = 0; j < rows; j++){
      for(let i = 0; i < cols; i++){
        const yOffset = i % 2 === 0 ? yJitter : 0;
        const xOffset = j % 2 === 0 ? xJitter : 0;
        this.segments.push(new DotSegment({
          x: i*colStep + xOffset,
          y: j*rowStep + rowStep/2 + yOffset,
          step: colStep/numDotsPerSegment,
          numDots: numDotsPerSegment,
          dotSize: dotSize,
        }))
      }
    }
  }
  draw(){
    p.push();
    p.color(255, 10);
    p.stroke(0, 0);
    this.segments.forEach((s) => s.draw())
    p.pop();
  }
}