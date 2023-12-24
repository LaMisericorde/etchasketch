// Creating the grid

const rangeGridSize = document.querySelector("#range-grid-size");
const numberGridSize = document.querySelector("#number-grid-size");
const DEFAULT_GRID_SIZE = 16;

rangeGridSize.value = DEFAULT_GRID_SIZE;
numberGridSize.value = DEFAULT_GRID_SIZE;

rangeGridSize.addEventListener("input", () => {
    numberGridSize.value = rangeGridSize.value;
});

numberGridSize.addEventListener("input", () => {
    rangeGridSize.value = numberGridSize.value;
    
});

rangeGridSize.addEventListener("input", start);
numberGridSize.addEventListener("input", start);

function start() {
    removeGrid();
    createGrid(rangeGridSize.value);
}

function createGrid(gridSize) {
    const gridContainer = document.querySelector(".grid-container");
    
    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        for (let j = 0; j < gridSize; j++) {
            const gridBox = document.createElement("div");
            setGridBoxAttributes(gridBox)
            gridRow.appendChild(gridBox);
        }
        gridContainer.appendChild(gridRow);
    }
}

function removeGrid() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

// Hover over color changing

function setGridBoxAttributes(gridBox) {
    gridBox.classList.add("grid-box");
    gridBox.style.backgroundColor = gridBackgroundColor.value;
    gridBox.addEventListener("mouseover", (e) => {
        if (detectLeftButton(e)) {
            drawColor = returnColorBasedOnMode();
            gridBox.style.backgroundColor = drawColor;
            }
    });
    gridBox.addEventListener("mousedown", (e) => {
        if (detectLeftButton(e)) {
            drawColor = returnColorBasedOnMode();
            gridBox.style.backgroundColor = drawColor;
        }
    });
}

function detectLeftButton(event) {
        return event.buttons == 1;
}

// Canvas Size

const numberCanvasSize = document.querySelector("#number-canvas-size");
const gridContainer = document.querySelector(".grid-container");
const DEFAULT_CANVAS_SIZE = "480px";
gridContainer.style.height = DEFAULT_CANVAS_SIZE;
gridContainer.style.width = DEFAULT_CANVAS_SIZE;

numberCanvasSize.addEventListener("input", () => {
    gridContainer.style.height = `${numberCanvasSize.value}px`;
    gridContainer.style.width = `${numberCanvasSize.value}px`; 
});

numberCanvasSize.addEventListener("input", start);

// Background Color Changer

const gridBackgroundColor = document.querySelector("#background-color-picker");
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
gridBackgroundColor.value = DEFAULT_BACKGROUND_COLOR;

gridBackgroundColor.addEventListener("input", changeBackgroundColor);

function changeBackgroundColor() {
    const gridBoxNodes = document.querySelectorAll(".grid-box");
    gridBoxNodes.forEach((gridBox) => {
        gridBox.style.backgroundColor = gridBackgroundColor.value;
    });
}

// Draw Color Changer

const gridDrawColor = document.querySelector("#draw-color-picker");
const DEFAULT_DRAW_COLOR = "#000000";
let drawColor = DEFAULT_DRAW_COLOR;
gridDrawColor.value = DEFAULT_DRAW_COLOR;

gridDrawColor.addEventListener("input", changeDrawColor);

function changeDrawColor() {
    drawColor = gridDrawColor.value;
}

// Rainbow Draw Mode

let drawMode = 0;

const rainbowMode = document.querySelector(".rainbow-mode-button");
const colorMode = document.querySelector(".color-mode-button");

rainbowMode.addEventListener("click", () => {
    drawMode = 1;
});

colorMode.addEventListener("click", () => {
    drawMode = 0;
});

function returnColorBasedOnMode() {
    let color;
    if (drawMode == 0) {
        color = gridDrawColor.value;
        return color;
    } else if (drawMode == 1) {
        color = createRandomColor();
        return color;
    }
}

function createRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let randomColor = `rgb(${red}, ${green}, ${blue})`;
    return randomColor;
}


// This start creates the initial grid with the default settings of 16x16;
start();
