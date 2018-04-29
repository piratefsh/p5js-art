export default class Modulator {
  constructor(){
    this.time = 0;
    this.mods = []

  }

  add(obj, param, fn){
    if(typeof obj[param] !== 'number'){
      return
    }

    this.mods.push({
      obj,
      param,
      fn,
      initValue: obj[param]
    })
  }

  resetInitValue(obj, param, val){
    this.mods.map((m) => {
      if(m.obj === obj && m.param == param){
        m.initValue = val;
      }
    })
  }

  tick(){
    this.time++;

    this.mods.forEach(({obj, param, fn, initValue}) => {
      obj[param] = fn(this.time, initValue);
    })
  }
}

/**

m.mod(obj, 'param', fn)
m.tick();
**/