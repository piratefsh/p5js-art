import { p } from 'P5Instance';
import DotSegment from './DotSegment';

export default class DotGrid {
  constructor({rows=5, cols=5}){
    Object.assign(this, {
      rows,
      cols,
      segments: []
    })

    this.update({rows, cols})
  }

  update({rows, cols}){
    this.segments = [];

    const rowStep = p.height / rows;
    const colStep = p.width / cols;

    for(let j = 0; j < rows; j++){
      for(let i = 0; i < cols; i++){
        const yOffset = i % 2 === 0 ? 5 : 0;
        const xOffset = j % 2 === 0 ? 5 : 0;
        this.segments.push(new DotSegment(i*colStep + xOffset, j*rowStep + rowStep/2 + yOffset))
      }
    }
  }
  draw(){
    this.segments.forEach((s) => s.draw())
  }
}