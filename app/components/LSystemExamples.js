import LSystem from './LSystem'
export default {
    binaryTree: {
        name: 'binary tree',
        angle: 30,
        axiom: 'X',
        rules: {
            'X': 'F[-X][+X]'
        },
        iterations: 4,
        length: 36
    },

    koch : {
        name: 'koch snowflake',
        angle: 60,
        axiom: 'F++F++F',
        rules: {
            'F': 'F-F++F-F'
        },
        iterations: 4
    },

    kochEdge : {
        name: 'koch edge',
        angle: 60,
        axiom: 'F',
        rules: {
            'F': 'F-F++F-F'
        },
        iterations: 1,
        length: 36
    },
    
    dragon : {
        name: 'dragon curve',
        angle: 90,
        axiom: 'FX',
        rules: {
            'X': 'X+YF+',
            'Y': '-FX-Y',
        },
        iterations: 9
    },

    sierpinksi: {
        name: "Sierpinski's triangle",
        angle: 60,
        axiom: 'A',
        rules:{
            'A': '+B-A-B+',
            'B': '-A+B+A-'
        },
        iterations: 7,
        length: 3
    },

    arrow : {
        name: 'arrow weed',
        angle: 30,
        axiom: 'X',
        rules: {
            'X': 'F[+X][-X]FX',
            'F': 'FF'
        },
        iterations: 5
    },

    weed1 : {
        name: 'fuzzy weed',
        angle: 22.5,
        axiom: 'X',
        rules: {
            'X': 'F-[[X]+X]+F[+FX]-X',
            'F': 'FF'
        },
        length: 5,
        iterations: 5
    },

    weed2 : {
        name: 'twiggy weed',
        angle: 25,
        axiom: 'X',
        rules: {
            'X': 'F[-X]F[-X]+X',
            'F': 'FF'
        },
        length: 5,
        iterations: 5
    },

    weed3 : {
        name: 'tall seaweed',
        angle: 25,
        axiom: 'F',
        rules: {
            'F': 'F[+F]F[-F]F',
        },
        length: 5,
        iterations: 4
    },

    weed4 : {
        name: 'wavy seaweed',
        angle: 22.5,
        axiom: 'F',
        rules: {
            'F': 'FF-[-F+F+F]+[+F-F-F]',
        },
        length: 5,
        iterations: 4
    },

    sWeed1 : {
        name: 'stochastic fuzzy weed',
        angle: 22.5,
        axiom: 'X',
        rules: {
            'X': ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X'],
            'F': 'FF'
        },
        iterations: 4
    },
}