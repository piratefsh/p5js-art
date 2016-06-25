export default class Agent{
    constructor(p, x, y, noiseScale=30, noiseStrength=10) {
        this.pos = new p.createVector(x, y);
        this.prevPos = new p.createVector(x, y);

        this.stepSize = p.random(1, 5);
        this.angle = 0;

        this.noiseScale = noiseScale;
        this.noiseStrength = noiseStrength;

        this.p = p;
    }

    draw(p=this.p){
        this.angle = p.noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale) * this.noiseStrength 
        // this.angle = p.map(this.angle, 0, 1, 0, p.PI) ;;
        p.strokeWeight(0.7);
        p.stroke(p.map(this.noiseStrength, 10, 20, 90, 50), 50)

        this.pos.x += Math.cos(this.angle) * this.stepSize;
        this.pos.y += Math.sin(this.angle) * this.stepSize;


        if(this.pos.x < 0 || this.pos.x > p.width || this.pos.y < 0 || this.pos.y > p.height){
            this.pos.x = p.random(10, p.width-10);
            this.pos.y = p.random(10, p.height-10);
            this.prevPos.set(this.pos);
        }
        p.line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
        this.prevPos.set(this.pos);


        this.noiseStrength += 0.1;
    }
}
