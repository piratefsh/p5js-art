import init from 'p5init'
import Stream from './components/Stream'

const gridSize = {x: 5, y: 1};
const timeSpeed = 0.1;
const streams = new Array();
const cellSize = 40;

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        // frameRate(30);
        let x, y, n, radius;
        for(let i = 0; i < gridSize.x; i++){
            x = i * cellSize;
            for(let j = 0; j < gridSize.y; j++){
                y = j * cellSize;
                streams.push(new Stream(new p5.Vector(i, j), timeSpeed, new p5.Vector(x, y), new p5.Vector(x+width, y)));
            }
        }
        translate(width/2, height/2)
        // noLoop();
        background(0);
    },

    draw: function() {
        // for(let i = 0; i < 30; i++){
            streams.forEach(function(stream){
                stream.update();
                stream.draw();
            })
        // }
    },

    keyPressed: function() {
      if (keyCode === ENTER) {
        save();
      } 
    }
  
}

// set global functions for p5
Object.assign(window, p5functions)

init();

