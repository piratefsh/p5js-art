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
  }

  setup() {
    const context = this.canvas.getContext('2d');
    const tracker = new tracking.ObjectTracker(['eye']);
    tracker.setInitialScale(2);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', (event) => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      context.drawImage(this.video, 0, 0, this.canvas.width / 2, this.canvas.height / 2);

      event.data.forEach((rect, i) => {
        p.stroke(255, 40 * i, 255);
        p.fill(0, 0);
        p.rect(rect.x, rect.y, rect.width, rect.height);
        p.text('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        p.text('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }
}
