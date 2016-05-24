import 'file?name=[name].[ext]!../public/index.html'
import 'styles/style.scss'
import init from 'p5init'

let grid;
let gridCellSize;
let colorA, colorB;

const p5functions = {
    preload: function(){
    },
    
    setup: function() {
        p5functions.reset()
        frameRate(10);

        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p5functions.reset()
        });

    },

    reset: () => {
        createCanvas(window.innerWidth, window.innerHeight);

        // create grid, and save
        const randR = random(100, 250)
        const randG = random(100, 250)
        colorA = color(randR, 255-randR, 150);
        colorB = color(255-randG, randG, 150);

        const size = Math.floor(random(5, 10) * 5);
        gridCellSize = new p5.Vector(size, size);
        const gridSize = new p5.Vector(Math.ceil(width/gridCellSize.x), Math.ceil(height/gridCellSize.y));
        grid = new Array(gridSize.x);

        for(let i = 0; i < gridSize.x; i++){
            grid[i] = new Array(gridSize.y);
            for(let j = 0; j < gridSize.y; j++){
                grid[i][j] = Math.trunc(random(0, 2));
            }
        }
    },

    draw: () => {
        background('#224');

        // noStroke();

        // translate(gridCellSize.x/2, gridCellSize.y/2);

        // draw grid from saved
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++){
                fill(random(100, 255),0,0);
                const x = i * gridCellSize.x;
                const y = j * gridCellSize.y;

                if(grid[i][j] == 0){
                    // type a
                    strokeWeight(mouseY/30 || 1);
                    stroke(colorA);
                    line(x, y, x+gridCellSize.x, y+gridCellSize.y);
                }
                else{
                    // type b
                    stroke(colorB);
                    strokeWeight(mouseX/30 || 1);
                    line(x + gridCellSize.y, y, x, y+gridCellSize.y);
                    
                }
            }
        }
    },

    keyReleased: () => {
        switch(key){
            case '1':
                strokeCap(ROUND)
                break;
            case '2':
                strokeCap(SQUARE)
                break;
            case '3':
                strokeCap(PROJECT)
                break;
            case 's':
            case 'S':
                save('masterpiece.csv');
                break;
        }
    }

}

// set global functions for p5
Object.assign(window, p5functions)

init();
