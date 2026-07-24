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
            if(!canMoveUp()) {
                setupInput();
                return;
            }

            moveUp();
        break;
        case 'ArrowDown':
            if(!canMoveDown()) {
                setupInput();
                return;
            }

            moveDown();
        break;
        case 'ArrowLeft':
            if(!canMoveLeft()) {
                setupInput();
                return;
            }

            moveLeft();
        break;
        case 'ArrowRight':
            if(!canMoveRight()) {
                setupInput();
                return;
            }

            moveRight();
        break;
        default:
            setupInput();
        return;
    }

    const scoreElement = document.getElementById('score');
    let score = parseInt(scoreElement.getAttribute('data-score'));
    grid.cells.forEach(cell => {
        score += cell.mergeTiles();
    });

    scoreElement.setAttribute('data-score', score);
    scoreElement.textContent = score;

    const newTile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = newTile;

    if(!canMoveUp && !canMoveDown && !canMoveLeft && !canMoveRight) {
        alert('Game End!');

        return;
    }

    setupInput();
}

function moveUp() {
    return slideTiles(grid.cellsByColumn);
}

function moveDown() {
    // spred opsrator (...) is used for not changing the instance grid.cellsByColumn array and make new one which is reversed
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()));
}   

function moveLeft() {
    return slideTiles(grid.cellsByRow);
}

function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

function canMoveUp() {
    return canMove(grid.cellsByColumn);
}

function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
}

function canMoveLeft() {
    return canMove(grid.cellsByRow);
}

function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()));
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if(index === 0 || !cell.tile) {

                return false;
            }

            const moveToCell = group[index - 1];

            return moveToCell.canAccept(cell.tile);
        })
    })
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