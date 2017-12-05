import tracking from 'tracking';
import face from 'tracking/build/data/face-module';
import eye from 'tracking/build/data/eye-module';
import { p } from './P5Instance';

tracking.ViolaJones.classifiers.face = face;
tracking.ViolaJones.classifiers.eye = eye;
export default class EyeSeeYou {
  constructor() {
    console.log(tracking)
    this.video = document.getElementById('video');
    this.canvas = document.getElementById('canvas');
  }

  setup() {
    const context = this.canvas.getContext('2d');
    const tracker = new tracking.ObjectTracker("face");
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', (event) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      p.image(new p.MediaElement(this.video), 0, 0, p.width, p.height, 0, 0, this.canvas.width, this.canvas.height);
      event.data.forEach( (rect) => {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = '#fff';
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }
}
