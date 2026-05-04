/**
 * patterns.js
 * Contains iconic Game of Life patterns and educational information
 */

const PATTERNS = [
    {
        name: "Glider",
        description: "A small pattern that travels diagonally across the grid.",
        cells: [
            [0, 1],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2]
        ]
    },
    {
        name: "Blinker",
        description: "The simplest oscillator. Flips between horizontal and vertical.",
        cells: [
            [0, 0],
            [0, 1],
            [0, 2]
        ]
    },
    {
        name: "Block",
        description: "A still life. A 2x2 square that never changes.",
        cells: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1]
        ]
    },
    {
        name: "Tub",
        description: "A still life. A small, stable structure.",
        cells: [
            [0, 1],
            [1, 0],
            [1, 2],
            [2, 1]
        ]
    },
    {
        name: "Pulsar",
        description: "A period-3 oscillator with a symmetrical, beautiful pattern.",
        cells: [
            [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
            [2, 0], [2, 5], [2, 7], [2, 12],
            [3, 0], [3, 5], [3, 7], [3, 12],
            [4, 0], [4, 5], [4, 7], [4, 12],
            [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
            [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
            [8, 0], [8, 5], [8, 7], [8, 12],
            [9, 0], [9, 5], [9, 7], [9, 12],
            [10, 0], [10, 5], [10, 7], [10, 12],
            [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10]
        ]
    },
    {
        name: "Beacon",
        description: "A period-2 oscillator. Flips in a diagonal pattern.",
        cells: [
            [0, 0],
            [0, 1],
            [1, 0],
            [2, 2],
            [2, 3],
            [3, 2],
            [3, 3]
        ]
    },
    {
        name: "Acorn",
        description: "A methuselah that takes many generations to stabilize.",
        cells: [
            [0, 1],
            [1, 3],
            [2, 0],
            [2, 1],
            [2, 4],
            [2, 5],
            [2, 6]
        ]
    },
    {
        name: "Gosper Glider Gun",
        description: "A spaceship gun! Produces gliders at regular intervals.",
        cells: [
            [0, 24],
            [1, 22], [1, 24],
            [2, 12], [2, 13], [2, 20], [2, 21], [2, 34], [2, 35],
            [3, 11], [3, 15], [3, 20], [3, 21], [3, 34], [3, 35],
            [4, 0], [4, 1], [4, 11], [4, 16], [4, 20], [4, 21],
            [5, 0], [5, 1], [5, 11], [5, 15], [5, 22], [5, 24],
            [6, 12], [6, 13]
        ]
    },
    {
        name: "Toad",
        description: "A period-2 oscillator. Simple and elegant.",
        cells: [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 0],
            [1, 1],
            [1, 2]
        ]
    },
    {
        name: "Loaf",
        description: "A still life. A bread-shaped stable structure.",
        cells: [
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 3],
            [2, 1],
            [2, 3],
            [3, 2]
        ]
    },
    {
        name: "The Power Set Pyramid",
        description: "A beautiful self-similar fractal pyramid with recursive structure.",
        cells: [
            [1, 7],
            [2, 6], [2, 7], [2, 8],
            [4, 5], [4, 9],
            [5, 4], [5, 10],
            [6, 2], [6, 4], [6, 5], [6, 6], [6, 8], [6, 9], [6, 10], [6, 12],
            [7, 1], [7, 2], [7, 12], [7, 13],
            [8, 2], [8, 4], [8, 5], [8, 6], [8, 8], [8, 9], [8, 10], [8, 12],
            [9, 4], [9, 10],
            [10, 5], [10, 9],
            [12, 6], [12, 7], [12, 8],
            [13, 7]
        ]
    }
];

/**
 * Educational information about pattern types
 * Data inspired by playgameoflife.com
 */
const PATTERNS_INFO = {
    "still-life": {
        title: "Still Lifes",
        content: `Still lifes are patterns that don't change at all. They remain stable forever. Examples include the <span style="color: var(--cell-alive); font-weight: bold;">Block</span> (a 2x2 square), the <span style="color: var(--cell-alive); font-weight: bold;">Loaf</span>, and the <span style="color: var(--cell-alive); font-weight: bold;">Tub</span>. These are the simplest stable structures in Conway's Game of Life.`
    },
    "oscillators": {
        title: "Oscillators",
        content: `Oscillators are patterns that repeat themselves after a certain number of generations, called the period. The <span style="color: var(--cell-alive); font-weight: bold;">Blinker</span> has period 2 (flips back and forth every generation). The <span style="color: var(--cell-alive); font-weight: bold;">Pulsar</span> has period 3, creating a beautiful symmetrical pattern. Oscillators are fundamental building blocks in Game of Life.`
    },
    "spaceships": {
        title: "Spaceships",
        content: `Spaceships are patterns that travel across the grid while maintaining their shape. The <span style="color: var(--cell-alive); font-weight: bold;">Glider</span> is the simplest and most famous spaceship, moving diagonally. Spaceships are important for transferring signals and information across the grid in complex patterns.`
    },
    "guns": {
        title: "Guns & Methuselahs",
        content: `Guns are devices that emit spaceships (typically gliders) in a regular pattern. The <span style="color: var(--cell-alive); font-weight: bold;">Gosper Glider Gun</span> is the first-ever discovered gun. Methuselahs are small patterns that take a very long time to reach a stable state, like the <span style="color: var(--cell-alive); font-weight: bold;">Acorn</span> which takes 5,206 generations to settle.`
    }
};
