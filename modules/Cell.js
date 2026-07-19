export default class Cell {
    #cellElement;
    #x;
    #y;
    #tile;

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get tile() {
        return this.#tile;
    }

    set tile(value) {
        this.#tile = value;
        if(value === null) {

            return;
        }

        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }
}