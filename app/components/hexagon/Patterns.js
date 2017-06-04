import Hexagon from './Hexagon';
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

Patterns.t666 = ({ patternFunc, edgeLen, centerPos, depth, maxDepth }) => {
  const children = [];
  const childLen = edgeLen / 3;
  const radius = Util.trigHeight(childLen / 2, childLen);
  const childOpts = {
    edgeLen: childLen,
    patternFunc,
    centerPos,
    depth,
    maxDepth,
  };

  const center = new Hexagon(childOpts);
  children.push(center);

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

Patterns.t33336 = (patternFunc, parentEdgeLen, centerPos, depth, maxDepth) => {
  const children = [];
  const childLen = parentEdgeLen / 3;
  const radius = Util.trigHeight(childLen / 2, childLen);
  const center = new Hexagon({ patternFunc, centerPos, childLen, depth, maxDepth });
  children.push(center);

  // draw surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const currCenter = p.createVector(0, radius * 2)
        .rotate(Hexagon.ANGLE * i + Hexagon.ANGLE / 2)
        .add(centerPos);
    // const tri = new Triangle(centerPos, childLen)
  }
};

export default Patterns;
