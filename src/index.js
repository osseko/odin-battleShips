import _, { rest } from 'lodash';
// import {ships} from './battleships.js'
// import { playerBoardAndPosition } from './battleships.js';
import {playerStatus} from './battleships.js'
import './main.css';

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack", "battleship"], " ");

  return element;
}

const element = document.createElement("h1");
element.textContent = "Hello native CSS, webpack";
document.body.appendChild(element);

let player1 = new playerStatus();
  player1.makeTiles();
  player1.randomShip();
  player1.randomShipPlacement();

let play1TileSet = player1.tileList;
let play1TileArr = player1.tileArr;
// console.log("player", player1)
// console.log(play1TileSet);
// console.log(play1TileArr);
let tilesReverse = Object.keys(play1TileSet).reverse();
let valRevevers = Object.values(play1TileSet).reverse();

console.log("ship", play1TileSet);
const gameBody = document.createElement("div");
  gameBody.id = "gameBody";

  document.body.appendChild(gameBody);
const gameTitle = document.createElement("div");
  gameTitle.id = "gameTitle";
  gameTitle.innerText = "gameTitle"

  gameBody.appendChild(gameTitle);

const playArea = document.createElement("div");
  //player name, tiles
  playArea.id = "playArea"
  playArea.style.border = "thick solid #0000ff";

  gameBody.appendChild(playArea);

const playerBox = document.createElement("div");
  //tiles area
  playerBox.id = "playerBox";
  // playerBox.innerText = "tiles area"
  // playerBox.style.display = "grid";
  // playerBox.style.gridTemplateColumns = "repeat(10, 1fr)";
  // playerBox.style.gridTemplateRows = "repeat(10, 1fr)"

  playArea.appendChild(playerBox);

// for(let i = 0; i < play1TileArr.length; i++){
//   const playerTiles = document.createElement("div")
//   playerTiles.id = "playerTiles"  
//   playerTiles.innerText = (Object.values(play1TileSet)[i] +" "+  i)
//   playerTiles.style.padding = "10px";
//   playerTiles.style.maxHeight = "10vh";
//   playerTiles.style.maxWidth = "10vh";
//   playerTiles.style.margin = "1px";
//   playerTiles.style.border = "thin solid black";
//   playerTiles.style.listStyleType = "none";


//   playerBox.appendChild(playerTiles);

// }

for(let i = 0; i < Object.keys(play1TileSet).length ; i++){

  const sampTiles = document.createElement("div");
  sampTiles.innerText = valRevevers[i];
  sampTiles.style.padding = "10px";
  sampTiles.style.maxHeight = "10vh";
  sampTiles.style.maxWidth = "10vh";
  sampTiles.style.margin = "1px";
  sampTiles.style.border = "thin solid black";
  sampTiles.style.listStyleType = "none";

  playerBox.appendChild(sampTiles)


  // for(let j = 9; j > 0; j--){
        
  //   const nexTiles = document.createElement("div");
  //           nexTiles.innerText = j
  //           nexTiles.style.padding = "10px";
  //           nexTiles.style.maxHeight = "10vh";
  //           nexTiles.style.maxWidth = "10vh";
  //           nexTiles.style.margin = "1px";
  //           nexTiles.style.border = "thin solid black";
  //           nexTiles.style.listStyleType = "none";
  
  //     sampTiles.appendChild(nexTiles);
    
    
  //   }

    
}

const resetBoard = document.createElement("button");
  resetBoard.id = "resetBoard";
  resetBoard.classList.add("gameButton");

const manualPlace = document.createElement("button");
  manualPlace.id = "manualPlace";
  manualPlace.classList.add("gameButtone");

const randPlace = document.createElement("button");
  randPlace.id = "randPlace";
  randPlace.classList.add("gameButton");


// const sampleArr = [1,2,3,4,5];

// for(let i = 0; i < sampleArr.length; i++){
//   const tileBox = document.createElement("div");
//   tileBox.id = "tile";
//   tileBox.innerText = "tilesHere";
//   tileBox.style.border = "thick solid black"
  
//   playArea.appendChild(tileBox);
// }
  


document.body.appendChild(component());

