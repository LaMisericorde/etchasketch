// Variables
const DEFAULT_CANVAS_SIZE = "640";
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const DEFAULT_COLOR_MODE_COLOR = "#000000";

const numberCanvasSize = document.querySelector("#number-canvas-size");
const rangeGridSize = document.querySelector("#range-grid-size");
const numberGridSize = document.querySelector("#number-grid-size");

const gridBackgroundColor = document.querySelector("#background-color-picker");
const colorModeColor = document.querySelector("#color-mode-picker");

const colorMode = document.querySelector(".color-mode-button");
const rainbowMode = document.querySelector(".rainbow-mode-button");
const increasingMode = document.querySelector(".increase-dark-mode-button");
const eraserMode = document.querySelector(".eraser-mode-button");
const clearMode = document.querySelector(".clear-mode-button");

let drawColor = DEFAULT_COLOR_MODE_COLOR;
let drawMode = 0;

const gridContainer = document.querySelector(".grid-container");

// Canvas Size - 

numberCanvasSize.value = DEFAULT_CANVAS_SIZE;
gridContainer.style.height = `${numberCanvasSize.value}px`;
gridContainer.style.width = `${numberCanvasSize.value}px`;

numberCanvasSize.addEventListener("change", () => {
    if (numberCanvasSize.value < 300) {
        numberCanvasSize.value = 300;
    }
    if (numberCanvasSize.value > 800) {
        numberCanvasSize.value = 800;
    }
    gridContainer.style.height = `${numberCanvasSize.value}px`;
    gridContainer.style.width = `${numberCanvasSize.value}px`; 
});

numberCanvasSize.addEventListener("input", start);

// Creating the grid

rangeGridSize.value = DEFAULT_GRID_SIZE;
numberGridSize.value = DEFAULT_GRID_SIZE;

rangeGridSize.addEventListener("input", () => {
    numberGridSize.value = rangeGridSize.value;
});

numberGridSize.addEventListener("input", () => {
    rangeGridSize.value = numberGridSize.value;
});

numberGridSize.addEventListener("change", () => {
    if (numberGridSize.value < 1) {
        numberGridSize.value = 1;
    }
    if (numberGridSize.value > 100) {
        numberGridSize.value = 100;
    }
});

rangeGridSize.addEventListener("input", start);
numberGridSize.addEventListener("input", start);

function start() {
    removeGrid();
    createGrid(rangeGridSize.value);
}

function createGrid(gridSize) {
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
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

// Hover over color changing

function setGridBoxAttributes(gridBox) {
    gridBox.classList.add("grid-box");
    gridBox.style.backgroundColor = gridBackgroundColor.value;
    gridBox.addEventListener("mouseover", (event) => {
        applyColor(event, gridBox);
    });
    gridBox.addEventListener("mousedown", (event) => {
        applyColor(event, gridBox);
    });
}

function applyColor(event, gridBox) {
    if (detectLeftButton(event)) {
        drawColor = returnColorBasedOnMode();
        gridBox.style.backgroundColor = drawColor;
    }
}

function detectLeftButton(event) {
        return event.buttons == 1;
}

// Background Color Changer

gridBackgroundColor.value = DEFAULT_BACKGROUND_COLOR;

gridBackgroundColor.addEventListener("input", changeBackgroundColor);

function changeBackgroundColor() {
    const gridBoxNodes = document.querySelectorAll(".grid-box");
    gridBoxNodes.forEach((gridBox) => {
        gridBox.style.backgroundColor = gridBackgroundColor.value;
    });
}

// Draw Color Changer

colorModeColor.value = DEFAULT_COLOR_MODE_COLOR;

colorModeColor.addEventListener("click", changeDrawColor);

function changeDrawColor() {
    drawMode = 0;
    drawColor = colorModeColor.value;
    removeOldActiveButton();
    colorMode.classList.add("active-button");
}

colorMode.addEventListener("click", () => {
    drawMode = 0;
    removeOldActiveButton();
    colorMode.classList.add("active-button");
});

// Rainbow Draw Mode

rainbowMode.addEventListener("click", () => {
    drawMode = 1;
    removeOldActiveButton();
    rainbowMode.classList.add("active-button");
});

function createRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let randomColor = `rgb(${red}, ${green}, ${blue})`;
    return randomColor;
}

// Eraser Mode

eraserMode.addEventListener("click", () => {
    drawMode = 2;
    removeOldActiveButton();
    eraserMode.classList.add("active-button");
});

// Clear All

clearMode.addEventListener("click", changeBackgroundColor);

// Remove active button from non active buttons

function removeOldActiveButton() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove("active-button");
    });
    }

// Color mode = 0; rainbow mode = 1; eraser mode = 2;
function returnColorBasedOnMode() {
    let color;
    if (drawMode == 0) {
        color = colorModeColor.value;
        return color;
    } else if (drawMode == 1) {
        color = createRandomColor();
        return color;
    } else if (drawMode == 2) {
        color = gridBackgroundColor.value;
        return color;
    }
}

// This start creates the initial grid with the default settings of 16x16 480px canvas white background and black color mode;
start();
