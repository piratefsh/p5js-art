import LSystem from './LSystem';
import LSystemExamples from './LSystemExamples';

export default class LSystemEditor{
    constructor(sketch){
        this.p = sketch;
        this.elem = document.getElementById('editor')
        this.initForm();
        this.initExampleList();
        this.curr = null;

        const hasDraw = window.location.search.indexOf('d') > -1;
        const example = document.getElementById(window.location.search.split('=')[1]);
        
        if(example){
            // draw pattern if exists
            example.click();
        }
        else{
            // else draw first example
            const firstExample = document.querySelector('#examples-list li a')
            firstExample.click();
        }
    }

    save(){
        const name = this.curr.name;
        save(`${name}-${new Date()}.png`);
    }

    rulesToString(rules){
        const vars = Object.keys(rules)
        return vars.reduce(function(acc, key){
            const stringified = typeof rules[key] == 'string' ? rules[key] : rules[key].join(',')
            return `${key}=${stringified}\n${acc}`
        }, "")
    }

    drawCurrentSystem(){
        const p  = this.p;

        p.clear();
        // background(20);
        p.stroke(255);
        p.strokeWeight(1.2);

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
            p: this.p,
            angle: document.getElementById('editor-angle').value,
            axiom: document.getElementById('editor-axiom').value,
            length: document.getElementById('editor-length').value,
            rules: rules,
        });
        const iterations = document.getElementById('editor-iterations').value;
        p.push();

        l.run(iterations);
        p.pop();

        document.getElementById('string').innerHTML = l.getString();

        this.curr = l;
    }

    initForm(){
        this.elem.classList.remove('hidden')
        const status = document.getElementById('status')
        document.getElementById('controls').classList.add('hidden')

        this.p.createCanvas(window.innerWidth - this.elem.getBoundingClientRect().width, window.innerHeight - status.getBoundingClientRect().height);


        // on draw
        document.getElementById('lsystem-form').addEventListener('submit', (e)=>{
            e.preventDefault();
            this.drawCurrentSystem();
        });

        // on save
        document.getElementById('btn-save').addEventListener('click', ()=>{
            this.save();
        });    
    }

    initExampleList(){
        const exampleList = document.getElementById('examples-list')
        // add examples
        for(let example in LSystemExamples){
            let e = LSystemExamples[example];
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.id = e.name.split(' ').join('-');
            a.classList.add('btn');
            a.classList.add('btn-default');
            a.classList.add('btn-sm');
            a.innerHTML = e.name;
            a.addEventListener('click', () => {
                // load data
                document.getElementById('editor-angle').value = e.angle;
                document.getElementById('editor-iterations').value = e.iterations;
                document.getElementById('editor-axiom').value = e.axiom;
                document.getElementById('editor-rules').value = this.rulesToString(e.rules);
                document.getElementById('editor-length').value = e.length;
                // draw
                this.drawCurrentSystem();
            });
            li.appendChild(a);
            exampleList.appendChild(li);
        }
    }
}