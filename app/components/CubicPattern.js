import Cube from './Cube';

export default class CubicPattern{
  constructor(p5){
    this.p5 = p5;
    this.cubes = [];

    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
        this.cubes.push(new Cube(p5, i * 100, j * 100))
      }
    }
  }

  update(){

  }

  draw(){
    this.cubes.forEach((c) => {
      c.draw();
    })
  }
}