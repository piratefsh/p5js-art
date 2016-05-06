import LSystem from './LSystem'
export default {
    binaryTree: new LSystem({
        name: 'binary tree',
        angle: 30,
        axiom: 'X',
        rules: {
            'X': 'F[-X][+X]'
        },
        iterations: 4,
        length: 36
    }),

    koch : new LSystem({
        name: 'koch snowflake',
        angle: 60,
        axiom: 'F++F++F',
        rules: {
            'F': 'F-F++F-F'
        },
        iterations: 4
    }),

    kochEdge : new LSystem({
        name: 'koch edge',
        angle: 60,
        axiom: 'F',
        rules: {
            'F': 'F-F++F-F'
        },
        iterations: 1,
        length: 36
    }),
    
    dragon : new LSystem({
        name: 'dragon curve',
        angle: 90,
        axiom: 'FX',
        rules: {
            'X': 'X+YF+',
            'Y': '-FX-Y',
        },
        iterations: 9
    }),

    arrow : new LSystem({
        name: 'arrow weed',
        angle: 30,
        axiom: 'X',
        rules: {
            'X': 'F[+X][-X]FX',
            'F': 'FF'
        },
        iterations: 5
    }),

    weed1 : new LSystem({
        name: 'fuzzy weed',
        angle: 22.5,
        axiom: 'X',
        rules: {
            'X': 'F-[[X]+X]+F[+FX]-X',
            'F': 'FF'
        },
        length: 5,
        iterations: 5
    }),

    weed2 : new LSystem({
        name: 'twiggy weed',
        angle: 25,
        axiom: 'X',
        rules: {
            'X': 'F[-X]F[-X]+X',
            'F': 'FF'
        },
        length: 5,
        iterations: 5
    }),

    weed3 : new LSystem({
        name: 'tall seaweed',
        angle: 25,
        axiom: 'F',
        rules: {
            'F': 'F[+F]F[-F]F',
        },
        length: 5,
        iterations: 4
    }),

    weed4 : new LSystem({
        name: 'wavy seaweed',
        angle: 22.5,
        axiom: 'F',
        rules: {
            'F': 'FF-[-F+F+F]+[+F-F-F]',
        },
        length: 5,
        iterations: 4
    }),

    sWeed1 : new LSystem({
        name: 'stochastic fuzzy weed',
        angle: 22.5,
        axiom: 'X',
        rules: {
            'X': ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X'],
            'F': 'FF'
        },
        iterations: 4
    }),
}