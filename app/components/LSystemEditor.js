import LSystem from './LSystem';
import LSystemExamples from './LSystemExamples';

export default class LSystemEditor{
    constructor(){
        this.initForm();
        this.initExampleList();

        // draw first example
        const firstExample = document.querySelector('#examples-list li a')
        firstExample.click();
    }

    rulesToString(rules){
        const vars = Object.keys(rules)
        return vars.reduce(function(acc, key){
            console.log('key', key)
            return `${key}=${rules[key].join(',')}\n${acc}`
        }, "")
    }

    drawCurrentSystem(){
        clear();
        background(20);
        stroke(255);
        strokeWeight(1.2);

        const rules = {}
        const allRules = document.getElementById('editor-rules').value.split('\n');
        allRules.forEach(function(rule){
            // ignore whitespace
            rule = rule.trim();
            if(rule.length < 1){
                return;
            } 

            // find rule and break
            const matches = rule.match('([A-Z])=(.*)');
            if(matches){
                const rs = matches[2].split(',');
                rules[matches[1]] = rs;
            }
            else{
                window.alert(`${rule} is not a valid rule.`)
            }
        });

        const l = new LSystem({
            angle: document.getElementById('editor-angle').value,
            axiom: document.getElementById('editor-axiom').value,
            rules: rules,
        });
        const iterations = document.getElementById('editor-iterations').value;
        push();

        l.run(iterations);
        pop();
    }

    initForm(){
        document.getElementById('editor').classList.remove('hidden')
        document.getElementById('controls').classList.add('hidden')

        createCanvas(window.innerWidth, window.innerHeight);

        // on draw
        document.getElementById('btn-draw').addEventListener('click', ()=>{
            this.drawCurrentSystem();
        });
    }

    initExampleList(){
        const exampleList = document.getElementById('examples-list')
        // add examples
        for(let example in LSystemExamples){
            let e = LSystemExamples[example];
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.classList.add('btn');
            a.classList.add('btn-default');
            a.innerHTML = e.name;
            a.addEventListener('click', () => {
                // load data
                document.getElementById('editor-angle').value = e.angle;
                document.getElementById('editor-iterations').value = e.iterations;
                document.getElementById('editor-axiom').value = e.axiom;
                document.getElementById('editor-rules').value = this.rulesToString(e.rules);
                // draw
                this.drawCurrentSystem();
            });
            li.appendChild(a);
            exampleList.appendChild(li);
        }
    }
}