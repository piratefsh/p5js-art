export default class UnsteadyHand{
  constructor(img){
    this.img = img;
    // save original
    this.original = img.copyImage(width, height);
  }

  getStamp(opacity=80){
    const img = this.original.copyImage(width, height);

    // get pixels
    img.loadPixels()

    // set opacity for pixels
    let n = 0;
    while(n < img.pixels.length){
        const brightness = (img.pixels[n] + img.pixels[n+1] + img.pixels[n+2])/3;
        img.pixels[n+3] = opacity;
        n+=4;
    }

    img.updatePixels();

    return img;
  }

  shake(movementFn, filter=NORMAL){
    image(this.original, 0, 0, width, height);

    const stamp = this.getStamp(40);
    stamp.filter(BLUR, 1);
    let time = 0;
    let endTime = 1;

    let movement = movementFn(time);

    while(time <= endTime){  
      let [i, j] = movement;
      blend(stamp, 0, 0, width, height, i, j, width, height, filter);
      stamp.setOpacity(255*(1-time));

      time += 0.05;
      movement = movementFn(time);
    }
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