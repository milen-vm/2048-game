export default class Tile {
    #tileElement;
    #x;
    #y;
    #value;

    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this.#tileElement = document.createElement('div');
        this.#tileElement.classList.add('tile');
        tileContainer.append(this.#tileElement);
        this.value = value;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#tileElement.textContent = value;

        const power = Math.log2(value);     // how many times the value is raised by power of 2
        const backgroundLightness = 100 - power * 9;    // power goes up, bl goes down

        this.#tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`);
        this.#tileElement.style.setProperty('--text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    set x(value) {
        this.#x = value;
        this.#tileElement.style.setProperty('--x', value);
    }

    set y(value) {
        this.#y = value;
        this.#tileElement.style.setProperty('--y', value);
    }

    remove() {
        this.#tileElement.remove();
    }
}