import LSystem from '../app/components/LSystem'
import install from 'jasmine-es6';
// install();

describe('LSystem', ()=>{
    let l;

    beforeEach(() => {
        // create LSystem
        l = new LSystem({
            axiom: 'A',
            rules: {
                'A': 'AB',
                'B': 'A'
            },
            angle: 30,
        })
    })

    it('replace()', () => {
        expect(l).not.toBe(null);
        expect(l.replace(0)).toBe('A')
        expect(l.replace(1)).toBe('AB')
        // expect('a').toBe(false)
    })
})