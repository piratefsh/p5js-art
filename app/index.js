import init from 'p5init'
import mbs from 'images/mbs.jpg';

let img;
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


    },
    
    setup: function() {
        const w = img.width > window.innerWidth? window.innerWidth : img.width;
        const h = w/img.width * img.height;
        createCanvas(w, h);
        background(250);
        // frameRate(30);
        noLoop();
    },

    draw: function() {
        background(0)
        const originalImg = new p5.Image(width, height);
        originalImg.copy(img, 0, 0, width, height, 0, 0, width, height); 
        originalImg.filter(BLUR, 3);
        image(originalImg, 0, 0, width, height);

        //get pixels
        img.loadPixels()

        let n = 0;
        while(n < img.pixels.length){
            const brightness = (img.pixels[n] + img.pixels[n+1] + img.pixels[n+2])/3;
            img.pixels[n+3] = 80;
            n+=4;
        }

        img.updatePixels();

        // blur
        // img.filter(BLUR, 3);

        let left = 10;
        let bottom = 0;
        let i = 0;
        let j = 0;
        while(i < left){
            blend(img, 0, 0, width, height, i, j, width, height, LIGHTEST);
            i += 1;
            img.setOpacity(img.getOpacity() - i*10)
            // j -= 2;
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