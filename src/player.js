const {battleBoard} = require("./battleships")
const {ships} = require("./battleships")
// import {battleBoard} from './battleships';
// import {ships} from './battleships';

const newBoard = new battleBoard();
const drawShips = new ships();

newBoard.board();
newBoard.addVertex();
drawShips.storeShips();

console.log(newBoard)
console.log(drawShips)




//break