import 'file?name=[name].[ext]!../public/index.html'
import 'styles/style.scss'
import init from 'p5init'

let pVectorArr = [];
const formResolution = 10;
const startRadius = 90;
// this is where center is.
const centerX = window.innerWidth/2;
const centerY = window.innerHeight/2;
let mic;

let prevIntensity = 0;

const p5functions = {
    preload: function(){
    },
    
    setup: function() {
        p5functions.reset()
        frameRate(24);
        document.getElementById('btn-reset').addEventListener('click', ()=>{
            p5functions.reset()
        });

        mic = new p5.AudioIn();
        mic.start();

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
        
        background(2);
    },

    draw: () => {
        push();
        
        // bg color
        blendMode(BLEND);
        background(2, 20);
        
        //
        // Start Drawing
        //
        let level = mic.getLevel();
        const randRange = map(level, 0, 0.5, 0, startRadius);

        beginShape();

        translate(mouseX || centerX,mouseY || centerY);
        // translate(centerX, centerY)

        const randomness = new Array(formResolution);
        for (let i=0; i < formResolution; i++){
            randomness[i] = pVectorArr[i].copy();
            randomness[i].add(createVector(random(-randRange, randRange), random(-randRange, randRange)));
        }
        
        // include '9' so we can draw '0' > '1'
        const pLast = randomness[pVectorArr.length-1]; 
        curveVertex(pLast.x , pLast.y); // draw

        for (let i=0; i < formResolution; i++){

            const p = randomness[i];

            // connect a line through the dots
            curveVertex(p.x,p.y);
        };
        

        // include '0' so we can draw '8' > '9'
        curveVertex( randomness[0].x , randomness[0].y ); // draw

        // include '1' so we can draw '9' > '0'
        curveVertex( randomness[1].x , randomness[1].y ); // draw

        const minColor = 180;
        const colorIntensity = map(level, 0, 0.3, 0, 255) ;

        if(Math.abs(colorIntensity - prevIntensity) > 0.2){
            fill(minColor, random(minColor,colorIntensity), random(minColor,colorIntensity))
            stroke(minColor, random(minColor,colorIntensity), random(minColor,colorIntensity))
            prevIntensity = colorIntensity;
        }
        else{
            fill(minColor, 100, 100)
            stroke(minColor, 90, 90)
        }

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
