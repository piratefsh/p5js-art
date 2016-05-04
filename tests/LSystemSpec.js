import LSystem from 'components/LSystem'
import install from 'jasmine-es6';
install();

describe('LSystem', () => {
    beforeEach(() => {
        // create LSystem
        this.l = new LSystem({
            axiom: 'A',
            rules: {
                'A': 'AB',
                'B': 'A'
            },
        })
    })

    describe('replace()', () => {
        expect(this.l.replace(0)).toBe('A')
        expect(this.l.replace(1)).toBe('AB')
    })
})