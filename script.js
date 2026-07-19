import Grid from "./modules/Grid.js";
import Tile from "./modules/Tile.js";

const gameBoard = document.getElementById('game-board');
const grid = new Grid(gameBoard);

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
