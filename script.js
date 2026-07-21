import Grid from "./modules/Grid.js";
import Tile from "./modules/Tile.js";

const gameBoard = document.getElementById('game-board');
const grid = new Grid(gameBoard);

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

setupInput();

function setupInput() {
    window.addEventListener('keydown', handleInput, { once: true });
}

function handleInput(e) {
    switch (e.key) {
        case 'ArrowUp':
            moveUp();
        break;
        case 'ArrowDown':
            moveDown();
        break;
        case 'ArrowLeft':
            moveLeft();
        break;
        case 'ArrowRight':
            moveRight();
        break;
        default:
            setupInput();
        return;
    }

    setupInput();
}

function moveUp() {
    return slideTiles(grid.cellsByColumn);
}

function slideTiles(cells) {
    cells.forEach(column => {
        // Loop start from 1 because 0 insex cell, top of the column, can not be moved upward.
        for(let i = 1; i < column.length; i++) {
            const cell = column[i];
            if(!cell.tile) {
                // skip cell if do not have a tail
                continue;
            }
            // last valid cell to whitch can move to
            let lastValidCell;
            // chekeing uper cell
            for(let j = i - 1; j >= 0; j--) {
                const moveToCell = column[j];
                // check if cell can be moved
                if(!moveToCell.canAccept(cell.tile)) {
                    // if cell can not be movet upward, the loop is stops
                    break;
                }

                lastValidCell = moveToCell;
            }
            // move cell
            if(lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile;
                } else {
                    lastValidCell.tile = cell.tile;
                }

                cell.tile = null;
            }
        }
    });
}