/**
 * game.js
 * Core Game of Life logic, rendering, and interaction
 */

// ============================================================================
// STATE & CONFIGURATION
// ============================================================================

let canvas, ctx;
let currentGrid, nextGrid, initialGrid;
let rows = 50, cols = 50;
let cellSize = 12;
let isRunning = false;
let generation = 0;
let speed = 150;
let animationTimer = null;
let isDrawing = false;
let hasDragged = false;
let currentPatternIndex = 0;
let currentPatternName = "Empty";
let zoomLevel = 1.0;
let offsetX = 0, offsetY = 0;

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', init);

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    setupCanvasSize();
    createEmptyGrid();
    attachEventListeners();
    render();
}

function setupCanvasSize() {
    const wrapper = document.querySelector('.canvas-wrapper');
    const maxWidth = Math.min(window.innerWidth - 40, 800);
    const maxHeight = window.innerHeight * 0.5;

    canvas.width = maxWidth;
    canvas.height = Math.min(maxHeight, maxWidth * 0.75);

    // Recalculate grid dimensions based on canvas size
    rows = Math.floor(canvas.height / cellSize);
    cols = Math.floor(canvas.width / cellSize);
}

function createEmptyGrid() {
    currentGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    nextGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    initialGrid = cloneGrid(currentGrid);
}

function cloneGrid(grid) {
    return grid.map(row => [...row]);
}

// ============================================================================
// CONWAY'S GAME OF LIFE LOGIC
// ============================================================================

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const r = (row + i + rows) % rows;
            const c = (col + j + cols) % cols;
            count += currentGrid[r][c];
        }
    }
    return count;
}

function computeNextGeneration() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const neighbors = countNeighbors(r, c);
            const alive = currentGrid[r][c];

            if (alive && (neighbors === 2 || neighbors === 3)) {
                nextGrid[r][c] = 1; // Survives
            } else if (!alive && neighbors === 3) {
                nextGrid[r][c] = 1; // Birth
            } else {
                nextGrid[r][c] = 0; // Dies
            }
        }
    }

    [currentGrid, nextGrid] = [nextGrid, currentGrid];
    generation++;
    updateGenerationLabel();
}

function step() {
    if (!isRunning) {
        computeNextGeneration();
        render();
    }
}

// ============================================================================
// SIMULATION CONTROL
// ============================================================================

function start() {
    if (isRunning) return;
    isRunning = true;
    updatePlayButton();
    animate();
}

function pause() {
    isRunning = false;
    updatePlayButton();
    if (animationTimer) clearTimeout(animationTimer);
}

function animate() {
    if (!isRunning) return;
    computeNextGeneration();
    render();
    const interval = Math.max(10, 500 - speed);
    animationTimer = setTimeout(animate, interval);
}

function restart() {
    pause();
    currentGrid = cloneGrid(initialGrid);
    generation = 0;
    updateGenerationLabel();
    render();
}

function clear() {
    pause();
    createEmptyGrid();
    generation = 0;
    currentPatternName = "Empty";
    updateGenerationLabel();
    updatePatternNameLabel();
    render();
}

function loadRandomPattern() {
    pause();
    createEmptyGrid();
    
    // Fill ~20% of cells randomly
    const density = 0.2;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            currentGrid[r][c] = Math.random() < density ? 1 : 0;
        }
    }
    
    currentPatternName = "Random";
    generation = 0;
    saveInitialState();
    updateGenerationLabel();
    updatePatternNameLabel();
    render();
}

function loadNextPattern() {
    pause();
    createEmptyGrid();

    if (PATTERNS.length === 0) return;

    const pattern = PATTERNS[currentPatternIndex % PATTERNS.length];
    currentPatternName = pattern.name;
    currentPatternIndex = (currentPatternIndex + 1) % PATTERNS.length;

    // Center pattern on grid
    centerPattern(pattern.cells);
    
    generation = 0;
    saveInitialState();
    updateGenerationLabel();
    updatePatternNameLabel();
    render();
}

function centerPattern(cells) {
    if (cells.length === 0) return;

    const minRow = Math.min(...cells.map(c => c[0]));
    const maxRow = Math.max(...cells.map(c => c[0]));
    const minCol = Math.min(...cells.map(c => c[1]));
    const maxCol = Math.max(...cells.map(c => c[1]));

    const patternHeight = maxRow - minRow + 1;
    const patternWidth = maxCol - minCol + 1;

    const startRow = Math.max(0, Math.floor((rows - patternHeight) / 2));
    const startCol = Math.max(0, Math.floor((cols - patternWidth) / 2));

    cells.forEach(([r, c]) => {
        const gridRow = startRow + (r - minRow);
        const gridCol = startCol + (c - minCol);
        if (gridRow < rows && gridCol < cols) {
            currentGrid[gridRow][gridCol] = 1;
        }
    });
}

function saveInitialState() {
    initialGrid = cloneGrid(currentGrid);
}

// ============================================================================
// RENDERING
// ============================================================================

function render() {
    ctx.fillStyle = '#07110c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawCells();
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(124, 255, 138, 0.12)';
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let c = 0; c <= cols; c++) {
        const x = c * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let r = 0; r <= rows; r++) {
        const y = r * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawCells() {
    ctx.fillStyle = '#7CFF8A';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (currentGrid[r][c] === 1) {
                ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            }
        }
    }
}

// ============================================================================
// USER INTERACTION
// ============================================================================

function getCellFromPointerEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        return [row, col];
    }
    return null;
}

function toggleCell(row, col) {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        currentGrid[row][col] = currentGrid[row][col] === 1 ? 0 : 1;
    }
}

function handlePointerDown(event) {
    if (event.button !== 0) return; // Only left mouse button or primary touch
    
    isDrawing = true;
    hasDragged = false;

    // Auto-pause if running
    if (isRunning) {
        pause();
    }

    const cell = getCellFromPointerEvent(event);
    if (cell) {
        toggleCell(cell[0], cell[1]);
        render();
    }
}

function handlePointerMove(event) {
    if (!isDrawing) return;

    hasDragged = true;
    const cell = getCellFromPointerEvent(event);
    if (cell) {
        if (currentGrid[cell[0]][cell[1]] === 0) {
            currentGrid[cell[0]][cell[1]] = 1;
            render();
        }
    }
}

function handlePointerUp(event) {
    isDrawing = false;
    hasDragged = false;
}

// ============================================================================
// UI UPDATES
// ============================================================================

function updateGenerationLabel() {
    document.getElementById('generationCount').textContent = generation;
}

function updatePlayButton() {
    const btn = document.getElementById('playBtn');
    btn.textContent = isRunning ? 'Pause' : 'Play';
}

function updatePatternNameLabel() {
    document.getElementById('currentPatternName').textContent = currentPatternName;
}

function updateSpeed() {
    speed = parseInt(document.getElementById('speedSlider').value);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function attachEventListeners() {
    // Simulation controls
    document.getElementById('playBtn').addEventListener('click', () => {
        if (isRunning) pause();
        else start();
    });

    document.getElementById('stepBtn').addEventListener('click', step);
    document.getElementById('restartBtn').addEventListener('click', restart);
    document.getElementById('clearBtn').addEventListener('click', clear);

    // Pattern controls
    document.getElementById('generatePatternBtn').addEventListener('click', loadNextPattern);
    document.getElementById('randomBtn').addEventListener('click', loadRandomPattern);

    // Speed slider
    document.getElementById('speedSlider').addEventListener('input', updateSpeed);

    // Canvas interaction
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    // Info dropdown
    document.getElementById('infoDropdown').addEventListener('change', (e) => {
        const category = e.target.value;
        const infoBox = document.getElementById('infoBox');

        if (category && PATTERNS_INFO[category]) {
            const info = PATTERNS_INFO[category];
            infoBox.innerHTML = `<strong>${info.title}</strong><br>${info.content}`;
            infoBox.classList.remove('hidden');
        } else {
            infoBox.classList.add('hidden');
        }
    });

    // Window resize
    window.addEventListener('resize', () => {
        setupCanvasSize();
        createEmptyGrid();
        render();
    });
}
