import Agent from './Agent'

export default class Place{
  constructor(p5){
    this.p5 = p5;
    this.NUM_AGENTS = 30;
    this.RADIUS = 180;
    this.agents = new Array(this.NUM_AGENTS);
    this.types = new Array(5);
    this.rotation = p5.random(this.p5.PI);
    this.changeTypes();
    this.groups = {};

    let x, y, t, type;
    const r = this.RADIUS
    for(let i = 0; i < this.NUM_AGENTS; i++){
      t = p5.TWO_PI / this.NUM_AGENTS * i;
      x = r * p5.cos(t);
      y = r * p5.sin(t);
      type = this.types[Math.floor(p5.random(this.types.length))];
      this.agents[i] = new Agent(p5, p5.createVector(x, y), type)
      this.addToGroup(this.agents[i]);
    }

    console.log(this.groups)
  }

  addToGroup(agent){
    const type = agent.type
    if(Array.isArray(this.groups[type])){
      this.groups[type].push(agent)
    }
    else{
      this.groups[type] = [agent]
    }
  }

  changeTypes(){
    for(let i = 0; i < 5; i++){
      this.types[i] = Math.floor(this.p5.random(0, 100));
    }
  }


  update(){
    // find other type, gravitate towards nearest type
    this.agents.forEach((agent, i) => {
      let nearestDistance = Infinity;
      let furthestDistance = -Infinity;
      let nearestFriend = null;
      let furthestFriend = null;

      // iterate through friends
      this.groups[agent.type].forEach((other) => {
        if (other === agent) return;

        // draw line to friend
        const dist = other.distance(agent)
        if(dist < nearestDistance){
          nearestFriend = other;
        }
        if(dist > furthestDistance){
          furthestFriend = other;
        }
      })

      if(furthestFriend) agent.headTowards(furthestFriend);
      // if(nearestFriend) agent.headTowards(nearestFriend);
      agent.update();

      // birth new agent
      if(agent.dead){
        this.agents[i] = new Agent(this.p5, agent.originalPos, agent.type + 1)
        this.addToGroup(this.agents[i])
      }
    });

  }

  draw(){
    this.p5.push()
    
    this.p5.translate(this.p5.width/2, this.p5.height/2);
    this.p5.rotate(this.rotation);
    this.agents.forEach((agent, i) => {
      agent.draw();
      this.groups[agent.type].forEach((other) => {
        if(agent.friend(other)){
          agent.connect(other);
        }
      });
    })

    this.p5.pop()
  }
}