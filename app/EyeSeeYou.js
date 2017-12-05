import tracking from 'tracking';
import face from 'tracking/build/data/face-module';
import eye from 'tracking/build/data/eye-module';
import { p } from './P5Instance';

tracking.ViolaJones.classifiers.face = face;
tracking.ViolaJones.classifiers.eye = eye;
export default class EyeSeeYou {
  constructor({ video, canvas }) {
    this.video = video;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.videoCanvas = document.createElement('canvas');
    this.videoCanvas.id = 'video-canvas';
    this.videoCanvas.width = canvas.width / 2;
    this.videoCanvas.height = canvas.height / 2;
    this.videoCanvasContext = this.videoCanvas.getContext('2d');
    // document.body.appendChild(this.videoCanvas);

    this.snap = document.createElement('canvas');
    document.body.appendChild(this.snap);

    this.lastFacePos = null;
  }

  trackEyes(canvas){
    console.log('track eyes')
    const tracker = new tracking.ObjectTracker('eye');
    tracker.setInitialScale(1);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track(canvas, tracker);
    const context = canvas.getContext('2d');
    tracker.on('track', (event) => {
      console.log(event)
      event.data.forEach((rect) => {
        // context.fill = 0;
        context.drawRect(rect.x, rect.y, rect.width, rect.height)
      })
    })
  }

  addTracker({ object, initScale, color }) {
    const tracker = new tracking.ObjectTracker(object);
    tracker.setInitialScale(initScale);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });

    tracker.on('track', (event) => {
      this.videoCanvasContext.drawImage(this.video, 0, 0, this.videoCanvas.width, this.videoCanvas.height);

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
        this.snapshot(biggestFace);
        this.trackEyes(this.videoCanvas);
      } else {
        console.log('no new face');
      }

      // console.log(this.lastFacePos)
    });
  }

  snapshot(rect) {
    const snapPixels = this.videoCanvasContext.getImageData(rect.x, rect.y, rect.width, rect.height);
    const snap = this.snap;
    snap.width = rect.width;
    snap.height = 100 * rect.height;
    snap.getContext('2d').putImageData(snapPixels, 0, 0);
    document.body.appendChild(snap);
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
