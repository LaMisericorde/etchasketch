function calculateGridBoxPixelSize(gridSize) {
    let gridContainerPixelSize = 480;
    let gridBoxPixelSize = gridContainerPixelSize / gridSize;
    return gridBoxPixelSize;
}

function createGrid(gridSize) {
    const gridContainer = document.querySelector(".grid-container");
    let gridBoxPixelSize = calculateGridBoxPixelSize(gridSize);
    for (let i = 0; i < gridSize; i++) {
        const rowGridContainer = document.createElement("div");
        rowGridContainer.classList.add("grid-row");
        for (let j = 0; j < gridSize; j++) {
            const box = document.createElement("div");
            box.classList.add("grid-box");
            box.style.height = `${gridBoxPixelSize}px`;
            box.style.width = `${gridBoxPixelSize}px`;  
            rowGridContainer.appendChild(box);
        }
        gridContainer.appendChild(rowGridContainer);
    }
}

function removeGrid() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

const rangeGridSize = document.querySelector("#range");
function start() {
    removeGrid();
    createGrid(rangeGridSize.value);
}

rangeGridSize.addEventListener("input", start);
