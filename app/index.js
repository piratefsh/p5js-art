import 'styles/style.scss'
import init from 'p5init'
import UnsteadyHand from './components/UnsteadyHand';
import mbs from 'images/mbs.jpg';

let hand, img ;
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
            copy.copy(img, 0, 0, width, height, 0, 0, width, height); 
            return copy;
        }

        document.querySelector('.original-img').src = mbs;


    },
    
    setup: function() {
        const w = img.width > window.innerWidth? window.innerWidth : img.width;
        const h = w/img.width * img.height;
        createCanvas(w, h);
        background(250);
        noLoop();

        hand = new UnsteadyHand(img);
    },

    draw: function() {
        hand.right(20);
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