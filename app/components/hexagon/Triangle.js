import { p } from 'P5Instance';
import RecursiveShape from './RecursiveShape';

export default class Triangle extends RecursiveShape {
  constructor(options) {
    options.sides = 3;
    super(options);
  }
}

Triangle.ANGLE = Math.PI * 2 / 3;