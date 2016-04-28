import 'styles/style.scss'
import init from 'p5init'
import UnsteadyHand from './components/UnsteadyHand';
import mbs from 'images/asm.jpg';

let hand, img, mouseInit;
let initMousePos = false;
const p5functions = {
    preload: function(){
        const url = '/' + mbs
        img = loadImage(url);
        loadPixels(img);


        p5.Image.prototype.getOpacity = function(){
            return this.opacity || 255;
        }

        p5.Image.prototype.setOpacity = function(opacity){
            // if (opacity < 0) return;

            this.loadPixels();
            let n = 0;
            while(n < this.pixels.length){
                this.pixels[n+3] = opacity;
                n+=4;
            }
            this.updatePixels();
            this.opacity = opacity;
        }

        p5.Image.prototype.copyImage = function(width, height){
            const copy = new p5.Image(width, height);
            copy.copy(img, 0, 0, img.width, img.height, 0, 0, width, height); 
            return copy;
        }

        document.querySelector('.original-img').src = mbs;


    },
    
    setup: function() {
        let w = img.width > window.innerWidth? window.innerWidth : img.width;
        let h = w/img.width * img.height;

        if(img.height > window.innerHeight){
            h = window.innerHeight;
            w = h/img.height * img.width;
        }
        createCanvas(w, h);
        background(250);

        hand = new UnsteadyHand(img);
        hand.startShake();
    },

    draw: function() {
        // hand.right(20);

        // quadratic with slight random
        // hand.shake(function(t){
        //     const r = 10;
        //     const b = 1;
        //     const a = random(0,0.4);
        //     const x = r * t;
        //     const y = a * x * x + b * x;
        //     let coord = [y, x]
        //     return coord;
        // }, LIGHTEST);

        // linear with subtle random
        // hand.spiral(function(t){
        //     const r = 18;
        //     const x = r*t
        //     const y = -r*t*random(-0.05, 0.05)
        //     return [x, y]
        // }, LIGHTEST, PI/4, -PI/8);

    },

    keyPressed: function() {
      if (keyCode === ENTER) {
        save();
      } 
    },

    mousePressed: function(){
        if(!initMousePos){
            mouseInit = {x: mouseX, y: mouseY};
            initMousePos = true;
        }
        else{
            initMousePos = false;
        }
    },

    mouseMoved: function(){
        if(initMousePos && hand != undefined){
            const coord = [mouseX - mouseInit.x, mouseY - mouseInit.y];
            hand.oneShake(coord, LIGHTEST, 0);
        }
    }
}

// set global functions for p5
Object.assign(window, p5functions)

init();