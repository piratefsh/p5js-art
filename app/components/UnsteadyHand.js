export default class UnsteadyHand{
  constructor(img){
    this.img = img;
    // save original
    this.original = img.copyImage(width, height);
  }

  getStamp(){
    const img = this.original.copyImage(width, height);

    // get pixels
    img.loadPixels()

    // set opacity for pixels
    let n = 0;
    while(n < img.pixels.length){
        const brightness = (img.pixels[n] + img.pixels[n+1] + img.pixels[n+2])/3;
        img.pixels[n+3] = 80;
        n+=4;
    }

    img.updatePixels();

    return img;
  }

  spiral(center){


  }

  right(movement=10){
    const img = this.getStamp();

    // draw original
    image(this.original, 0, 0, width, height);

    // blur
    // img.filter(BLUR, 3);

    // shift 
    let i = 0;
    while(i < movement){
        blend(img, 0, 0, width, height, i, 0, width, height, LIGHTEST);
        img.setOpacity(img.getOpacity() - i*10);
        i++;
    }
  }
}