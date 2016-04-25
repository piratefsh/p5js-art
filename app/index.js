import init from 'p5init'

const gridSize = { x: 20, y: 20 }
const cellSize = 36;
const sizeRange = {x: 4, y: 32}
let time = 0;
const color = {bg: 0, fg: 255}
const colorVector = {bg: 5, fg: -5}

const p5functions = {
    setup: function() {
        createCanvas(window.innerWidth, window.innerHeight);
        frameRate(10);
    },

    draw: function() {
        background(color.bg, 200);
        time += 0.05;
        // color.bg += colorVector.bg;
        // color.fg += colorVector.fg;
        if(color.bg > 255 || color.bg < 0){
            colorVector.bg *= -1;
            colorVector.fg *= -1;
        }

        let x, y, n, radius;
        for(let i = 0; i < gridSize.x; i++){
            x = i * cellSize;
            for(let j = 0; j < gridSize.y; j++){
                y = j * cellSize;
                n = noise(i+time, j+time);
                radius = map(n, 0, 1, sizeRange.x, sizeRange.y);
                fill(color.fg, 200);
                ellipse(x, y, radius, radius);
            }
        }
        
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

