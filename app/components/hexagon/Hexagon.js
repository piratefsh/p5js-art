import { p } from 'P5Instance';
import RecursiveShape from './RecursiveShape';

export default class Hexagon extends RecursiveShape {
  constructor(options) {
    super(options);
  }
}

Hexagon.randomise = (opacity) => {
  return p.random(0, 2) < 0.4;
};

Hexagon.ANGLE = Math.PI * 2 / 6;