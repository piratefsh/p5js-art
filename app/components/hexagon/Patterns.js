import Hexagon from './Hexagon';
import Triangle from './Triangle';
import Util from 'components/utils/Utils';
import { p } from 'P5Instance';

const Patterns = {};

Patterns.t3636 = (patternFunc, parentEdgeLen, centerPos, depth, maxDepth) => {
  const children = [];
  const childLen = Math.trunc(parentEdgeLen / 3);
  const center = new Hexagon(patternFunc, centerPos, childLen, depth, maxDepth);
  children.push(center);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, childLen * 2)
        .rotate(Hexagon.ANGLE * i)
        .add(centerPos);
    const hex = new Hexagon(patternFunc, currCenter, childLen, depth, maxDepth);
    children.push(hex);
  }

  return children;
};

Patterns.t666 = (options) => {
  const children = [];
  const childLen = options.edgeLen / 3;
  const radius = Util.trigHeight(childLen / 2, childLen);
  const childOpts = Object.assign(options, { edgeLen: childLen });

  const centerPos = options.centerPos;
  const centerHex = new Hexagon(childOpts);
  children.push(centerHex);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, radius * 2)
        .rotate(Hexagon.ANGLE * i + Hexagon.ANGLE / 2)
        .add(centerPos);
    const opts = Object.assign(childOpts, { centerPos: currCenter });
    const hex = new Hexagon(opts);
    children.push(hex);
  }

  return children;
};

Patterns.t33336 = (options) => {
  const children = [];
  const childLen = options.edgeLen / 6;
  const radius = Util.trigHeight(childLen / 2, childLen);
  const centerPos = options.centerPos;

  const childOpts = Object.assign(options, { edgeLen: options.edgeLen/2 });
  const centerHex = new Hexagon(childOpts);
  children.push(centerHex);

  const triRadius = Util.rotationRadius(childLen, 3)
  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, centerHex.radius)
        .rotate((Hexagon.ANGLE * i - Hexagon.ANGLE))
    const c = p.createVector(0, triRadius).add(currCenter).add(centerPos);
    for(let j = 0; j < 4; j++){
      const r = Math.PI/3 * j + Math.PI/3 * 3.5 + Math.PI/3*i;
      const tri = new Triangle(Object.assign(childOpts, {
        centerPos: p.createVector(0, triRadius).rotate(r).add(currCenter).add(centerPos),
        rotation: Math.PI/3 + r,
        edgeLen: childLen,
        depth: 0,
        maxDepth: 0
      }));
      children.push(tri);
    }
  }
  return children;
};

export default Patterns;
