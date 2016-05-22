import 'file?name=[name].[ext]!../public/index.html'
import 'styles/style.scss'
import init from 'p5init'

let pVectorArr = [];
const formResolution = 10;
const startRadius = 100;
// this is where center is.
const centerX = window.innerWidth/2;
const centerY = window.innerHeight/2;

const p5functions = {
    preload: function(){
    },
    
    setup: function() {
        p5functions.reset()

        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p5functions.reset()
        });

    },

    reset: () => {
        createCanvas(window.innerWidth, window.innerHeight);
        stroke(0);

        pVectorArr = [];
        // for loop to save positions of circles in an array
        
        // what is the angle of where 1 of the object would be placed at?
        const angle = radians(360/formResolution);

        for (let i=0; i<formResolution; i++){
           
            const tmpX = cos(angle*i) *startRadius;
            const tmpY = sin(angle*i) *startRadius;
            //const tmpX = random(10,-10)+cos(angle*i) *startRadius;
            //const tmpY = random(10,-10)+sin(angle*i) *startRadius;
            const pv = createVector(tmpX,tmpY);
            pVectorArr.push(pv);

        };
        
    },

    draw2: () => {
        fill(255, 0, 0)

        push();
        translate(width/2, height/2)

        // translate(50, 0)
        rotate(radians(count++))
        line(0, 0, 100, 100)
        pop();

    },

    draw: () => {
        
        // bg color
        //background(250,10);
        
        //console.log(pVectorArr);

        //
        // Start Drawing
        //

        const randRange = 1;

        beginShape();

        push();
        translate(mouseX,mouseY);

        // include '9' so we can draw '0' > '1'
        const pLast = pVectorArr.length-1; 
        curveVertex( pVectorArr[pLast].x , pVectorArr[pLast].y ); // draw

        for (let i=0; i<formResolution; i++){

            const p = pVectorArr[i];
            p.x+=random(randRange,-randRange);
            p.y+=random(randRange,-randRange);

            // draw 1 circle right in the center. with
            //fill(255,255,255);
            //ellipse(p.x,p.y,20,20);
            
            //fill(0,0,0);
            //text(i,p.x-3,p.y+4); 

            // connect a line through the dots
            curveVertex(p.x,p.y);

            
        };
        

        // include '0' so we can draw '8' > '9'
        curveVertex( pVectorArr[0].x , pVectorArr[0].y ); // draw

        // include '1' so we can draw '9' > '0'
        curveVertex( pVectorArr[1].x , pVectorArr[1].y ); // draw

        fill(random(0,255),random(0,255),random(0,255),100)
        stroke(random(0,255),random(0,255),random(0,255),100)
        //fill(255,255,100,100);
        endShape();
        pop();
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
                save('masterpiece.png');
                break;
        }
    }

}

// set global functions for p5
Object.assign(window, p5functions)

init();
