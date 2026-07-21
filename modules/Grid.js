const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

import Cell from "./Cell.js";

export default class Grid {
    #cells;

    constructor(gridElement) {
        gridElement.style.setProperty('--grid-size', GRID_SIZE);
        gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
        gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);

        this.#cells = this.#createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % GRID_SIZE,
                Math.floor(index / GRID_SIZE)
            );
        });
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null);
    }

    get cellsByColumn() {
        /**
         * @var cellGrid contains cells by colum, every array represents column in the grid
         */
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;

            return cellGrid;
        }, []);
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);

        return this.#emptyCells[randomIndex];
    }

    #createCellElements(gridElement) {
        const cells = [];
        for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cells.push(cell);
            gridElement.append(cell);
        }

        return cells;
    }
}

