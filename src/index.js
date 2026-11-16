import _, { chain, rest } from 'lodash';
// import {ships} from './battleships.js'
// import { playerBoardAndPosition } from './battleships.js';
import {playerStatus} from './battleships.js'
import {ships} from './battleships.js'
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
element.id = "csspack"
document.body.appendChild(element);


let player1 = new playerStatus();
  player1.makeTiles();
let play1TileSet = player1.tileList;
let play1tileArr = player1.tileArr;

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

  playerBox.id = "playerBox";
  playArea.appendChild(playerBox);


for(let i = 0; i < Object.keys(play1TileSet).length; i++){
  const playerTiles = document.createElement("div")
  playerTiles.classList.add("playerTiles")    
  playerBox.appendChild(playerTiles);

}

function makePlayerTiles(makeRandom){

  let play1TileSet = makeRandom;
  let tileReverse = Object.keys(play1TileSet).reverse();
  let valReverse = Object.values(play1TileSet).reverse();
  
  for(let i = 0; i < Object.keys(play1TileSet).length; i++){
    
    const playerTiles = document.createElement("div")
    playerTiles.classList.add("playerTiles")    
    playerTiles.innerText = tileReverse[i] + "/" +valReverse[i];
    playerBox.appendChild(playerTiles);
  }
}

function fleetRandom(){
  let randomShips = new ships();
  randomShips.storeShips();

  let storeShips = randomShips.fleetArr;

  let carrier = storeShips[0];
  let battleShip = storeShips[1];
  let destroyer = storeShips[2];
  let submarine = storeShips[3];
  let patrolBoat = storeShips[4];

  player1.fleet = storeShips;

  carrier.forEach((v) => {
    player1.placeShipOnBoard(v, "Crr")
  });

  battleShip.forEach((v) => {
    player1.placeShipOnBoard(v, "Btl")
  })

  destroyer.forEach((v) => {
    player1.placeShipOnBoard(v, "Dst")
  })

  submarine.forEach((v) => {
    player1.placeShipOnBoard(v, "Sbm")
  })

  patrolBoat.forEach((v) => {
    player1.placeShipOnBoard(v, "PtB")
  })

}

function manualBoard(makeRandom){
  let play1TileSet = makeRandom;
  let tileReverse = Object.keys(play1TileSet).reverse();
  let valReverse = Object.values(play1TileSet).reverse();
  
  for(let i = 0; i < Object.keys(play1TileSet).length; i++){
    
    const playerTiles = document.createElement("div")
    playerTiles.id = tileReverse[i];
    playerTiles.classList.add("playerTiles")  
    playerTiles.innerText = tileReverse[i];
    playerBox.appendChild(playerTiles);
  
  }

btnToDrag(cVert, 5, 2, "Vert");
btnToDrag(cHorz, 5, 2, "Horz");
btnToDrag(bVert, 4, 2, "Vert");
btnToDrag(bHorz, 4, 2, "Horz");
btnToDrag(dVert, 3, 1, "Vert");
btnToDrag(dHorz, 3, 1, "Horz");
btnToDrag(sVert, 3, 1, "Vert");
btnToDrag(sHorz, 3, 1, "Horz");
btnToDrag(pVert, 2, 0, "Vert");
btnToDrag(pHorz, 2, 0, "Horz");

}

let shipBtn = document.createElement("div");
  shipBtn.style.width = "25px";
  shipBtn.style.height = "25px";
  shipBtn.style.backgroundColor = "green";

document.body.append(shipBtn);

btnToDrag(shipBtn)

function btnToDrag(elem, shipBody, center, orientation){
  const tileIds = play1tileArr.reverse();
  let currentDroppable = null;
  let arrayShip = [];

  elem.onmousedown = function(event) {
    let shiftX = event.clientX - elem.getBoundingClientRect().left;
    let shiftY = event.clientY - elem.getBoundingClientRect().top;

    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;

    document.body.append(elem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      elem.style.left = pageX - shiftX + 'px';
      elem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    
      elem.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      elem.hidden = false;

      if(!elemBelow) return;

      belowId(elemBelow, tileIds);
       
    }

    document.addEventListener('mousemove', onMouseMove);

    elem.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      elem.onmouseup = null;
      // elem.hidden = true;
      };
    };

    function belowId(dropObject, arrIds){
        let droppableBelow = dropObject.closest('.playerTiles');
        if(currentDroppable != droppableBelow){
          if(currentDroppable){
            leaveDroppable(arrayShip);
            arrayShip = [];
          }
          currentDroppable = droppableBelow;
          if(currentDroppable){
            enterDroppable(currentDroppable, arrIds, arrayShip);
          }
        }
    }

    function enterDroppable(tile, tileIds, pushedArr){

      const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   
      let tileReverse = Object.keys(play1TileSet).reverse();
      let idIndex = tileReverse.indexOf(tile.id);
      let tileArr = [];
      let yCatch = [];
      let xCatch = [];
      let adjustedY = [];
      let adjust = center;

      function vertical(){
      for(let i = 0; i < shipBody;i++){

        let storedY = [tileIds[idIndex][0], (tileIds[idIndex][1]-adjust)+i];

        tileArr.push(storedY);
        if(tileArr.length === shipBody){
          tileArr.forEach((x) => {
            yCatch.push(x[1]);
          })
        }
        
        if(yCatch.length === shipBody){
          let adjustY = 0;
          if(yCatch[tileArr.length-1] > 10){
            adjustY = 10 - yCatch[tileArr.length-1];
          }else if(yCatch[0] === 0){
            adjustY = 1;
          }else if(yCatch[0] === -1){
            adjustY = 2
          }else {
            adjust = 0;
          }
          yCatch.forEach((p) => {
            adjustedY.push(p + adjustY);
          })
        }
        if(adjustedY.length === shipBody){
          adjustedY.forEach((L) => {
            pushedArr.push([tileArr[i][0], L]);
            document.getElementById([tileArr[i][0], L]).style.backgroundColor = "pink";
        
          })
        }
        
      }
  
      }
      
      function horizontal(){
        let xIndex = xVal.indexOf(tileIds[idIndex][0]);
        let xPlace = [];
        for(let j = 0; j < shipBody; j++){
          let storedX = [xVal[xIndex+adjust-j], tileIds[idIndex][1]]
        
          tileArr.push(storedX);
          if(tileArr.length === shipBody){
            tileArr.forEach((x) => {
              xCatch.push(x[0]);
              let xNum = xVal.indexOf(x[0]);
              xPlace.push(xNum);
            
            })
          }
        
          let cFactor = 0;
          let xTemp = [];
          xPlace.forEach((r) => {
            if(r === -1){
              cFactor++;
            } else {
              xTemp.push(r);
            }

          })
          if(xTemp[xTemp.length-1] === 0){
            while(xTemp.length < shipBody){
              xTemp.unshift(xTemp[0]+1);
            }
          } else if(xTemp[0] >= 9){
            while(xTemp.length < shipBody){
              xTemp.push(xTemp[xTemp.length-1]-1);
            }
          }

          if(xTemp.length === shipBody){
            xTemp.forEach((m) => {
              pushedArr.push([xVal[m], storedX[1]]);
              document.getElementById([xVal[m], storedX[1]]).style.backgroundColor = "yellow";
            })

          }
        }
      }
      
      if(orientation === "Horz"){
        horizontal();
      } else if(orientation === "Vert"){
        vertical()
      }
      console.log(pushedArr, orientation)
    }

    function leaveDroppable(pushedArr){

      for(let i = 0; i < shipBody; i++){
        let lveX = pushedArr[i][0];
        let lveY = pushedArr[i][1];
        document.getElementById([lveX, lveY]).style.backgroundColor = '';
      }
    }
    elem.ondragstart = function() {
      return false;
    };


}

//add uniqChecker
const drawShipCard = document.createElement("div");

document.body.appendChild(drawShipCard);

const emptyBoard = document.createElement("button");
  emptyBoard.id = "emptyBoard";
  emptyBoard.classList.add("gameButton");
  emptyBoard.innerText = "reset";

const manualPlace = document.createElement("button");
  manualPlace.id = "manualPlace";
  manualPlace.classList.add("gameButton");
  manualPlace.innerText = "manual";

const randPlace = document.createElement("button");
  randPlace.id = "randPlace";
  randPlace.classList.add("gameButton");
  randPlace.innerText = "random";

const okPlace = document.createElement("button");
  okPlace.id = "okPlace";
  okPlace.classList.add("gameButton");
  okPlace.innerText ="ok";

drawShipCard.appendChild(emptyBoard);
drawShipCard.appendChild(manualPlace);
drawShipCard.appendChild(randPlace);
drawShipCard.appendChild(okPlace);

emptyBoard.addEventListener("click", () => {
  while(playerBox.hasChildNodes()){
    playerBox.removeChild(playerBox.firstChild);
  }
  player1.emptyBoard();
  makePlayerTiles(player1.tileList);

})

manualPlace.addEventListener("click", () => {
  while(playerBox.hasChildNodes()){
    playerBox.removeChild(playerBox.firstChild);
  }
  player1.emptyBoard();
  manualBoard(player1.tileList);
})

randPlace.addEventListener("click", () =>{
  while(playerBox.hasChildNodes()){
    playerBox.removeChild(playerBox.firstChild);
  }
  player1.emptyBoard();
  fleetRandom();
  makePlayerTiles(player1.tileList);
  console.log(player1.tileList);

  console.log(player1.fleet);
})


okPlace.addEventListener("click", () => {

})

const manualShips = document.createElement("div");

const mnlCarrier = document.createElement("div");
  mnlCarrier.id = "mnlCarrier";
  mnlCarrier.innerText = "Carrier";

  const cVert = document.createElement("button");
    cVert.innerText = "CarrVert";
    cVert.classList.add("shipDrag");
  
  const cHorz = document.createElement("button");
    cHorz.innerText = "CarrHors";
    cHorz.classList.add("shipDrag");

  mnlCarrier.appendChild(cVert);
  mnlCarrier.appendChild(cHorz);

const mnlBattleShip = document.createElement("div");
  mnlBattleShip.id = "mnlBattleShip";
  mnlBattleShip.innerText = "BattleShip";

  const bVert = document.createElement("button");
    bVert.innerText = "BttlVert";
    bVert.classList.add("shipDrag");

  const bHorz = document.createElement("button");
    bHorz.innerText = "BttlHors";
    bHorz.classList.add("shipDrag");

  mnlBattleShip.appendChild(bVert);
  mnlBattleShip.appendChild(bHorz);

const mnlDestroyer = document.createElement("div");
  mnlDestroyer.id = "mnlDestoryer";
  mnlDestroyer.innerText = "Destroyer";

  const dVert = document.createElement("button");
    dVert.innerText = "DestVert";
    dVert.classList.add("shipDrag");

  const dHorz = document.createElement("button");
    dHorz.innerText = "DestHors";
    dHorz.classList.add("shipDrag");

  mnlDestroyer.appendChild(dVert);
  mnlDestroyer.appendChild(dHorz);

const mnlSubmarine = document.createElement("div");
  mnlSubmarine.id = "mnlSubmarine";
  mnlSubmarine.innerText = "Submarine";

  const sVert = document.createElement("button");
    sVert.innerText = "SubmVert";
    sVert.classList.add("shipDrag");

  const sHorz = document.createElement("button");
    sHorz.innerText = "SubmHors";
    sHorz.classList.add("shipDrag");

  mnlSubmarine.appendChild(sVert);
  mnlSubmarine.appendChild(sHorz);

const mnlPatrolBoat = document.createElement("div");
  mnlPatrolBoat.id = "mnlPatrolBoat";
  mnlPatrolBoat.innerText = "Patrol Boat";

  const pVert = document.createElement("button");
    pVert.innerText = "PtrlVert";
    pVert.classList.add("shipDrag");

  const pHorz = document.createElement("button");
    pHorz.innerText = "PtrlHors";
    pHorz.classList.add("shipDrag");

  mnlPatrolBoat.appendChild(pVert);
  mnlPatrolBoat.appendChild(pHorz);

manualShips.appendChild(mnlCarrier);
manualShips.appendChild(mnlBattleShip);
manualShips.appendChild(mnlDestroyer);
manualShips.appendChild(mnlSubmarine);
manualShips.appendChild(mnlPatrolBoat);

drawShipCard.appendChild(manualShips);

document.body.appendChild(component());
