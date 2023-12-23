// Creating the grid

const rangeGridSize = document.querySelector("#range");

rangeGridSize.addEventListener("input", start);

function start() {
    removeGrid();
    createGrid(rangeGridSize.value);
}

function createGrid(gridSize) {
    const gridContainer = document.querySelector(".grid-container");
    let gridBoxPixelSize = calculateGridBoxPixelSize(gridSize);
    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        for (let j = 0; j < gridSize; j++) {
            const gridBox = document.createElement("div");
            gridBox.classList.add("grid-box");
            gridBox.style.backgroundColor = gridBackgroundColor.value;
            gridBox.style.height = `${gridBoxPixelSize}px`;
            gridBox.style.width = `${gridBoxPixelSize}px`;  
            gridRow.appendChild(gridBox);
        }
        gridContainer.appendChild(gridRow);
    }
}

function calculateGridBoxPixelSize(gridSize) {
    let gridContainerPixelSize = 480;
    let gridBoxPixelSize = gridContainerPixelSize / gridSize;
    return gridBoxPixelSize;
}

function removeGrid() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

// Background Color Changer

const gridBackgroundColor = document.querySelector("#bg-color-picker");

gridBackgroundColor.addEventListener("input", changeBackgroundColor);

function changeBackgroundColor() {
    const gridBoxNodes = document.querySelectorAll(".grid-box");
    gridBoxNodes.forEach((gridBox) => {
        gridBox.style.backgroundColor = gridBackgroundColor.value;
    });
}

// Hover over color changing