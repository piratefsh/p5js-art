
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
        this.len = 2;
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

    draw(state) {
        translate(width/2, height/2);
        background(255, 0);
        stroke(0);
        const validVariables = Object.keys(this.rules);
        let variable;
        for (let i = 0; i < state.length; i++) {
            variable = state[i];
            switch (variable){
                case LSystemConstants.PLUS_ANGLE:
                    rotate(radians(this.angle));
                    break;
                case LSystemConstants.MINUS_ANGLE:
                    rotate(-radians(this.angle));
                    break;
                case LSystemConstants.PUSH:
                    push();
                    break;
                case LSystemConstants.POP:
                    pop();
                    break;
                default:
                    if (validVariables.indexOf(variable) > -1) {
                        line(0, 0, 0, this.len);
                        translate(0, this.len);
                    }
                    else{
                        throw new Error('LSystem: Unknown token ' + variable)
                    }
            }
        }

    }

    run(n){
        this.draw(this.replace(n));
    }
}