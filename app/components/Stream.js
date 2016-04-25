
export default class Stream{
    constructor(coord, timeSpeed, start, end){
        this.coord = coord;
        this.max = end;
        this.pos = start;
        this.step = new p5.Vector(1, 1);
        this.time = 0;
        this.timeSpeed = timeSpeed;
        this.direction = new p5.Vector(1, 1);
        this.fillColor = 255;
        this.setRadius();
        this.stepRange = {x: 2, y: 6}
    }

    setRadius(){
        const x = this.coord.x + this.time;
        const y = this.coord.y + this.time;
        this.opacity = map(noise(x, y), 0, 1, 255, 180);
        const max = map(noise(x, y), 0, 1, 2, 16);
        this.radius = map(noise(x, y), 0, 1, 2, max);
    }

    draw(){
        noStroke();
        fill(this.fillColor, this.opacity);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
    }

    update(){
        if(this.pos.x > this.max.x){
            return;
        }

        this.time += this.timeSpeed;
        const angle1 = noise(this.pos.x, this.pos.y);
        const angle2 = noise(angle1*10, angle1*4);
        const angle = map(angle2, 0, 1, -180, 180);
        const movement = new p5.Vector(cos(angle)*this.step.x, sin(angle)*this.step.y);
        // this.pos.rotate(map(angle, 0, 1, 0, 360));
        this.pos.add(movement);

        this.step.x = map(noise(this.coord.x + this.time), 0, 1, this.stepRange.x, this.stepRange.y);
        this.step.y = map(noise(this.coord.y + this.time), 0, 1, this.stepRange.x, this.stepRange.y);
        this.setRadius();
    }
}