import tracking from 'tracking';
import face from 'tracking/build/data/face-module';
import eye from 'tracking/build/data/eye-module';
import { p } from './P5Instance';

tracking.ViolaJones.classifiers.face = face;
tracking.ViolaJones.classifiers.eye = eye;
export default class EyeSeeYou {
  constructor({ video, canvas }) {
    this.first = true;
    this.pause = false;
    this.drawn = false;
    this.video = video;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.videoCanvas = document.createElement('canvas');
    this.videoCanvas.id = 'video-canvas';
    this.videoCanvas.width = canvas.width / 2;
    this.videoCanvas.height = canvas.height / 2;
    this.videoCanvasContext = this.videoCanvas.getContext('2d');

    this.snapCanvas = document.createElement('canvas');
    this.snapCanvas.id = 'snap-canvas';
    this.snapCanvas.width = 200;
    this.snapCanvas.height = 200;
    document.body.appendChild(this.snapCanvas);

    this.lastBlink = Date.now();
    this.maxShots = Math.floor(window.innerWidth/200) * 4;

    this.lastFacePos = null;
    this.throttle = 0;
    // this.drawVideoCanvas()
  }

  drawVideoCanvas(){
    this.videoCanvasContext.drawImage(this.video, 0, 0, this.videoCanvas.width, this.videoCanvas.height);
    requestAnimationFrame(() => {
      this.drawVideoCanvas()
    })
  }

  trackEyes(canvas, faceRect) {
    const context = canvas.getContext('2d');
    const eyeTracker = new tracking.ObjectTracker('eye');
    eyeTracker.setInitialScale(2);
    eyeTracker.setStepSize(2);
    eyeTracker.setEdgesDensity(0.1);
    eyeTracker.on('track', (event) => {
      this.videoCanvasContext.drawImage(this.video, 0, 0, this.videoCanvas.width, this.videoCanvas.height);

      if (event.data.length > 0) {
        event.data.forEach((rect) => {
          // context.fill = 0;
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });
        this.hasEyes = true;
        this.eyesLastSeen = Date.now();
      } else {
        this.hasEyes = false;

        // dont snap too often
        if(Date.now() - this.lastBlink < this.throttle || this.first){
          this.first = false;
          return;
        } else {
          this.lastBlink = Date.now()
          const newSnapCanvas = this.makeSmallCanvas();
          this.extractRectToNewCanvas(
            this.snapCanvas,
            newSnapCanvas, {
            x: 0,
            y: 0,
            width: 200,
            height: 200,
          });
          const shotsHolder = document.getElementById('shots');

          if(shotsHolder.children.length > this.maxShots){
            shotsHolder.removeChild(shotsHolder.children[shotsHolder.children.length - 1]);
            shotsHolder.prepend(newSnapCanvas);
          } else {
            shotsHolder.prepend(newSnapCanvas);
          }
          console.log('blink');
        }
      }
    });

    tracking.track(this.snapCanvas, eyeTracker);
    // tracking.track('#myface', eyeTracker);
  }

  makeSmallCanvas(){
    const c = document.createElement('canvas');
    c.width = 200;
    c.height = 200;
    return c;
  }

  addTracker({ object, initScale, color }) {
    const tracker = new tracking.ObjectTracker(object);
    tracker.setInitialScale(initScale);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', (event) => {
      // if face, save biggest one as last face
      const biggestFace = event.data.reduce((acc, rect, i) => {
        p.stroke(...color);
        p.fill(0, 0);

        if (rect.width > acc.width) {
          return rect;
        }
        return acc;
      }, event.data[0]);

      this.lastFacePos = biggestFace || this.lastFacePos;

      if (biggestFace) {
        p.clear();
        this.drawRect(biggestFace);
        this.extractRectToNewCanvas(
          this.videoCanvas,
          this.snapCanvas,
          biggestFace,
        );
        this.trackEyes(this.snapCanvas, biggestFace);
      }
    });
  }

  extractRectToNewCanvas(sourceCanvas, destCanvas, rect) {
    const context = destCanvas.getContext('2d');
    const snapPixels = sourceCanvas
      .getContext('2d')
      .getImageData(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = 'black';
    context.rect(0, 0, destCanvas.width, destCanvas.height);
    context.fill();
    context.putImageData(snapPixels, 0, 0, 0, 0, rect.width, rect.height);
    this.drawn = true;
  }
  drawRect(rect) {
    p.rect(rect.x, rect.y, rect.width, rect.height);
    p.text(`x: ${rect.x}px`, rect.x + rect.width + 5, rect.y + 11);
    p.text(`y: ${rect.y}px`, rect.x + rect.width + 5, rect.y + 22);
  }
  setup() {
    this.addTracker({ object: 'face', initScale: 4, color: [255, 255, 0, 255] });
    // this.addTracker({ object: 'eye', initScale: 2, color: [255, 0, 255, 255] });
  }
}
