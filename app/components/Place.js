import Agent from './Agent'

export default class Place{
  constructor(p5){
    this.p5 = p5;
    this.NUM_AGENTS = 70;
    this.RADIUS = 180;
    this.agents = new Array(this.NUM_AGENTS);
    this.types = new Array(5);

    this.changeTypes();

    let x, y, t, type;
    const r = this.RADIUS
    for(let i = 0; i < this.NUM_AGENTS; i++){
      t = p5.TWO_PI / this.NUM_AGENTS * i;
      x = r * p5.cos(t);
      y = r * p5.sin(t);
      type = this.types[Math.floor(p5.random(this.types.length))];
      this.agents[i] = new Agent(p5, p5.createVector(x, y), type)
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

      for(let j = i + 1; j < this.agents.length; j++){
        const other = this.agents[j];
        if (other === agent) return;
        // if is friend, find out how close
        if(other.type === agent.type){
          // draw line to friend
          if(other.distance(agent) < nearestDistance){
            nearestFriend = other;
          }
          if(other.distance(agent) > furthestDistance){
            furthestFriend = other;
          }
        }
      };

      if(furthestFriend) agent.headTowards(furthestFriend);
      // if(nearestFriend) agent.headTowards(nearestFriend);
      agent.update();

      // birth new agent
      if(agent.dead){
        this.agents[i] = new Agent(this.p5, agent.originalPos, agent.type + 1)
      }
    });

  }

  draw(){
    this.p5.push()
    
    this.p5.translate(this.p5.width/2, this.p5.height/2);
    this.agents.forEach((agent, i) => {
      agent.draw();
      for(let j =0; j < this.agents.length; j++){
        const other = this.agents[j];
        if(agent.friend(other)){
          agent.connect(other);
        }
      }
    })

    this.p5.pop()
  }
}