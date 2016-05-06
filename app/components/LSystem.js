
const LSystemConstants = {};
LSystemConstants.PLUS_ANGLE = '+';
LSystemConstants.MINUS_ANGLE = '-';
LSystemConstants.PUSH = '[';
LSystemConstants.POP = ']';
LSystemConstants.STOCHASTIC_PTN = new RegExp("([\.0-9]+)([a-zA-Z])")
LSystemConstants.VALID_VAR_PTN = new RegExp("[a-zA-Z]")

export default class LSystems{
    constructor(options) {
        this.setAngle(options.angle);
        this.setAxiom(options.axiom);
        this.rules = {};
        this.addRules(options.rules);
        this.len = options.length || 5;
        this.name = options.name || 'l-system'
        this.iterations = options.iterations || 4;
    }

    setAngle(an) {
        if (!an) throw new Error('LSystem: missing angle');
        this.angle = an;
    }

    setAxiom(ax) {
        if (!ax) throw new Error('LSystem: missing axiom');
        this.axiom = ax;
    }

    addRules(rules){
        const newRules = {};
        Object.keys(rules).forEach(function(key){
            const val = rules[key]
            if(typeof val == 'string'){
                newRules[key] = [rules[key].trim()]
            }
            else{
                newRules[key] = rules[key].map((str) => str.trim())
            }
        });

        Object.assign(this.rules, newRules);
    }

    addRule(variable, replacement) {
        if (!variable || !replacement) throw new Error('LSystem: missing rule variable/replacement');
        this.rules[variable] = replacement.trim();
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
                    // pick random rule
                    const rules = this.rules[v];
                    const randIdx = Math.floor(random(rules.length)) 
                    replaced += rules[randIdx];
                }
                else{
                    replaced += v;
                }
            }

            result = replaced;
        }
        return result;
    }

    draw(state, offset, drawLines) {
        // track min-max coords
        push();
        const min = new p5.Vector(Infinity, Infinity);
        const max = new p5.Vector(-Infinity, -Infinity);
        let coord = new p5.Vector(0, 0);
        let theta = 0;
        let pad = 30;
        // apply offset to align drawing to top left
        if(offset){
            translate(-offset.min.x + pad, -offset.min.y + pad)
        }

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
                    if (validVariables.indexOf(variable) > -1 || variable.match(LSystemConstants.VALID_VAR_PTN)) {
                        if(drawLines){
                            line(coord.x, coord.y, coord.x+turtle.x, coord.y+turtle.y);
                        }
                        coord.add(turtle);
                    }
                    else{
                        throw new Error('LSystem: Unknown token ' + variable)
                    }
            }
        }
        if(!offset){
            // redraw with offset
            this.draw(state, {min: min, max: max}, true)
        }
        pop();
    }

    run(n){
        this.draw(this.replace(n || this.iterations));
    }
}