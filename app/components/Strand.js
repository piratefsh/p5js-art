export default class Strand{
    constructor(pos){
        this.angleRange = 60;
        this.len = 20;
        this.strokeWeight = Math.abs(randomGaussian(1, 3));
        this.prev = pos.copy();
        this.pos = pos;
        this.next = new p5.Vector(0, this.len);

        this.lineColor = color(randomGaussian(100, 15*this.strokeWeight), 150, 100)
    }

    grow(){
        this.update();
        this.draw();
    }

    update(){
        if(this.x > width){
            return;
        }
        this.prev = this.pos.copy()
        const deg = noise(this.pos.x) * this.angleRange - this.angleRange/2 + 90;
        this.angle = radians(deg);
        this.pos.x += cos(this.angle) * this.len
        this.pos.y += sin(this.angle) * this.len
    }

    draw(){
        stroke(this.lineColor);
        strokeWeight(this.strokeWeight);
        // translate(this.pos.x, this.pos.y);
        line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
    }
}