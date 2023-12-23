// Creating the grid

const rangeGridSize = document.querySelector("#range-grid-size");
const numberGridSize = document.querySelector("#number-grid-size");

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
            setGridBoxAttributes(gridSize, gridBox)
            gridRow.appendChild(gridBox);
        }
        gridContainer.appendChild(gridRow);
    }
}

// function calculateGridBoxPixelSize(gridSize) {
//     let gridContainerPixelSize = 480;
//     let gridBoxPixelSize = gridContainerPixelSize / gridSize;
//     return gridBoxPixelSize;
// }

function removeGrid() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

// Background Color Changer

const gridBackgroundColor = document.querySelector("#background-color-picker");

gridBackgroundColor.addEventListener("input", changeBackgroundColor);

function changeBackgroundColor() {
    const gridBoxNodes = document.querySelectorAll(".grid-box");
    gridBoxNodes.forEach((gridBox) => {
        gridBox.style.backgroundColor = gridBackgroundColor.value;
    });
}

// Hover over color changing

function setGridBoxAttributes(gridSize, gridBox) {
    // let gridBoxPixelSize = calculateGridBoxPixelSize(gridSize);
    gridBox.classList.add("grid-box");
    gridBox.style.backgroundColor = gridBackgroundColor.value;
    // gridBox.style.height = `${gridBoxPixelSize}px`;
    // gridBox.style.width = `${gridBoxPixelSize}px`; 
    gridBox.addEventListener("mouseover", (e) => {
        gridBox.style.backgroundColor = "red";
    });
    gridBox.addEventListener("mousedown", () => {
        gridBox.style.backgroundColor = "red";
    });
}

