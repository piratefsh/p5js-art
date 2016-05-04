
const LSystemConstants = {};
LSystemConstants.PLUS_ANGLE = '+';
LSystemConstants.MINUS_ANGLE = '-';
LSystemConstants.PUSH = '[';
LSystemConstants.POP = ']';


export default class LSystems{
    constructor(options) {
        this.setAngle(options.angle);
        this.setAxiom(options.axiom);
        this.rules = options.rules || {};
        this.len = 5;
    }

    setAngle(an) {
        if (!an) throw new Error('LSystem: missing angle');
        this.angle = an;
    }

    setAxiom(ax) {
        if (!ax) throw new Error('LSystem: missing axiom');
        this.axiom = ax;
    }

    addRule(variable, replacement) {
        if (!variable || !replacement) throw new Error('LSystem: missing rule variable/replacement');
        this.rules[variable] = replacement;
    }

    replace(iterations) {
        // copy axiom
        const variables = Object.keys(this.rules);
        let result = this.axiom.toString();
        let variable, rule, replaced, v;

        // for each iteration
        for (let i = 0; i < iterations; i++) {
            replaced = '';

            // for each variable, replace with rule
            for (let j = 0; j < result.length; j++) {
                v = result[j]
                if(variables.indexOf(v) > -1){
                    replaced += this.rules[v];
                }
                else{
                    replaced += v;
                }
            }

            result = replaced;
        }
        return result;
    }

    draw(state, offset) {
        // track min-max coords
        const min = new p5.Vector(Infinity, Infinity);
        const max = new p5.Vector(-Infinity, -Infinity);
        let coord = new p5.Vector(0, 0);
        let theta = 0;

        // apply offset to center drawing
        if(offset){
            const translateOffset = new p5.Vector(width/2, height/2);
            const drawingSize = offset.max.sub(offset.min)
            drawingSize.div(2)
            drawingSize.rotate(-PI/2)
            translateOffset.sub(drawingSize);
            translate(translateOffset.x, translateOffset.y);
        }

        clear();
        stroke(0);
        const validVariables = Object.keys(this.rules);
        let variable;
        let turtle = new p5.Vector(0, -this.len);
        let states = new Array();

        for (let i = 0; i < state.length; i++) {
            min.x = (coord.x < min.x) ? coord.x : min.x
            min.y = (coord.y < min.y) ? coord.y : min.y
            max.x = (coord.x > max.x) ? coord.x : max.x
            max.y = (coord.y > max.y) ? coord.y : max.y

            variable = state[i];

            switch (variable){
                case LSystemConstants.PLUS_ANGLE:
                    theta = radians(this.angle);
                    turtle.rotate(theta)
                    break;
                case LSystemConstants.MINUS_ANGLE:
                    theta = -radians(this.angle);
                    turtle.rotate(theta)
                    break;
                case LSystemConstants.PUSH:
                    states.push([coord.copy(), turtle.copy()]);
                    break;
                case LSystemConstants.POP:
                    let [c, t] = states.pop();
                    coord = c;
                    turtle = t;
                    break;
                default:
                    if (validVariables.indexOf(variable) > -1) {
                        line(coord.x, coord.y, coord.x+turtle.x, coord.y+turtle.y);
                        coord.add(turtle);
                    }
                    else{
                        throw new Error('LSystem: Unknown token ' + variable)
                    }
            }
        }
        if(!offset){
            // console.log(min, max)
            // redraw with offset
            this.draw(state, {min: min, max: max})
        }
    }

    run(n){
        this.draw(this.replace(n));
    }
}