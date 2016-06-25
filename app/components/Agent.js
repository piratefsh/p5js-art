export default class Agent{
    constructor(p, x, y, z, noiseScale=30, noiseStrength=10) {
        this.pos = new p.createVector(x, y, z);
        this.prevPos = new p.createVector(x, y, z);

        this.stepSize = p.random(1, 5);
        this.angle = 0;

        this.noiseScale = noiseScale;
        this.noiseStrength = noiseStrength;

        this.p = p;

        this.segments = [];
    }

    draw(p=this.p){
        p.push();
        p.translate(-p.width/2, p.height/2, 0)
        this.angle = p.noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale) * this.noiseStrength 
        this.angleZ = p.noise(this.pos.z/this.noiseScale) * this.noiseStrength;
        // this.angle = p.map(this.angle, 0, 1, 0, p.PI) ;;
        // p.stroke(p.map(this.noiseStrength, 10, 20, 250, 100), 50)

        this.pos.x += Math.cos(this.angleZ) * Math.cos(this.angle) * this.stepSize;
        this.pos.y += Math.sin(this.angle) * this.stepSize;
        this.pos.z += Math.sin(this.angleZ) *  Math.cos(this.angle) * 20;

        // p.background(0)
        // p.fill(255)
        // if(this.pos.x < 0 || this.pos.x > p.width || this.pos.y < 0 || this.pos.y > p.height){
        //     this.pos.x = p.random(10, p.width-10);
        //     this.pos.y = p.random(10, p.height-10);
        //     this.prevPos.set(this.pos);
        // }

        // p.line(this.prevPos.x, this.prevPos.y, this.prevPos.z, this.pos.x, this.pos.y, this.pos.z);

        p.ambientMaterial(255, 0, 0);

        this.prevPos.set(this.pos);
        this.noiseStrength += 0.05;
        p.strokeWeight(p.map(this.noiseStrength, 10, 50, 1, 10));

        this.segments.push(this.pos.copy());

        p.beginShape();
        this.segments.forEach((s) => {
            p.vertex(s.x, s.y, s.z);
        })
        p.endShape();

        // p.translate(this.pos.x, this.pos.y, this.pos.z);
        // p.sphere(10, 10);

        p.pop();
    }
}
