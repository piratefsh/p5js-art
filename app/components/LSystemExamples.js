import LSystem from './LSystem'
export default {
    koch : new LSystem({
        name: 'koch snowflake',
        angle: 60,
        axiom: 'F++F++F',
        rules: {
            'F': 'F-F++F-F'
        },
        iterations: 4
    }),

    //arrow weed
    arrow : new LSystem({
        name: 'arrow weed',
        angle: 30,
        axiom: 'X',
        rules: {
            'X': 'F[+X][-X]FX',
            'F': 'FF'
        },
        iterations: 4
    }),

    // weed 1
    weed1 : new LSystem({
        name: 'generic weed 1',
        angle: 22.5,
        axiom: 'X',
        rules: {
            'X': 'F-[[X]+X]+F[+FX]-X',
            'F': 'FF'
        },
        length: 5,
        iterations: 4
    }),

    // weed 2
    weed2 : new LSystem({
        name: 'generic weed 2',
        angle: 25,
        axiom: 'X',
        rules: {
            'X': 'F[-X]F[-X]+X',
            'F': 'FF'
        },
        length: 5,
        iterations: 4
    }),

    // weed 3
    weed3 : new LSystem({
        name: 'generic weed 3',
        angle: 25,
        axiom: 'F',
        rules: {
            'F': 'F[+F]F[-F]F',
        },
        length: 5,
        iterations: 4
    }),

    weed4 : new LSystem({
        name: 'generic weed 4',
        angle: 22.5,
        axiom: 'F',
        rules: {
            'F': 'FF-[-F+F+F]+[+F-F-F]',
        },
        length: 5,
        iterations: 4
    }),


    sWeed1 : new LSystem({
        name: 'stochastic generic weed 1',
        angle: 22.5,
        axiom: 'X',
        rules: {
            'X': ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X'],
            'F': 'FF'
        },
        iterations: 4
    }),


    dragon : new LSystem({
        name: 'dragon curve',
        angle: 90,
        axiom: 'FX',
        rules: {
            'X': 'X+YF+',
            'Y': '-FX-Y',
            'F': 'F',
        },
        iterations: 9
    }),
}