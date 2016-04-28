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

  startShake(){
    image(this.original, 0, 0, width, height);

    this.stamp = this.getStamp(40);
    this.stamp.filter(BLUR, 1);
  }

  oneShake(coord, filter=NORMAL, opacity=255){
    const [x, y] = coord;
    blend(this.stamp, 0, 0, width, height, x, y, width, height, filter);
    this.stamp.setOpacity(255);
  }

  shake(movementFn, filter=NORMAL, step=1){
    this.startShake();
    let time = 0;
    let endTime = 1;

    let movement;
    const stamp = this.stamp || this.getStamp();
    movement = movementFn(time);

    while(time <= endTime){  
      this.oneShake(movement, filter, 255(1-time));
      time += 0.05;
      movement = movementFn(time);
    }
  }

  spiral(movementFn, filter=NORMAL, rotation=TWO_PI, offset=0){
    image(this.original, 0, 0, width, height);

    const stamp = this.getStamp(40);
    stamp.filter(BLUR, 1);
    let time = 0;
    let endTime = 1;

    let movement = movementFn(time);

    while(time <= endTime){  
      push();

      // rotate with center as origin
      translate(width/2, height/2);
      rotate(rotation*time + offset);
      
      // recenter
      translate(-width/2, -height/2);
      
      let [i, j] = movement;
      blend(stamp, 0, 0, width, height, i, j, width, height, filter);
      stamp.setOpacity(255*(1-time));

      time += 0.05;
      movement = movementFn(time);
      pop();
    }
  }
}