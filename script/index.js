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
    gridBox.classList.add("grid-box");
    gridBox.style.backgroundColor = gridBackgroundColor.value;
    gridBox.addEventListener("mouseover", () => {
        if (detectLeftButton()) {
            gridBox.style.backgroundColor = "red";
        }
    });
    // gridBox.addEventListener("keydown", () => {
    //     gridBox.style.backgroundColor = "red";
    // });
}

function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        return evt.buttons == 1;
    }
    let button = evt.which || evt.button;
    return button == 1;
}

