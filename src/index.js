import _, { rest } from 'lodash';
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

  //place dragndrop function here
   
}

function verticalSelect(shipBody, center){
  const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let arrPairs = play1tileArr.reverse();
  let cTile; 
  
  for(let i = 0; i < play1tileArr.length; i++){
    let xTile = arrPairs[i][0];
    let yTile = arrPairs[i][1];
    let xPlace = xVal.indexOf(xTile);
    let yPlace = yVal.indexOf(yTile);
    let mouseArr = [];
    let adjust = center;
    let leaveArr = [];
    cTile = document.getElementById([arrPairs[i]]);
    for(let j = 0; j < shipBody; j++){
      
      let tempArr = [xVal[xPlace], (yVal[yPlace] - adjust) + j];
  
      cTile.addEventListener("mouseover", () => {
        vertHighlight(mouseArr, tempArr, shipBody, leaveArr, adjust, j);
       
      })
 
      cTile.addEventListener("mouseleave", ()=> {
        noHightlight(leaveArr, mouseArr);

      })

     
    } 
     cTile.addEventListener("click", () => {
        leaveArr.forEach((p) => {
          document.getElementById([p[0], p[1]]).style.backgroundColor = "blue"; 
        })
        console.log(leaveArr);
        mouseArr = [];
        leaveArr = [];
      }) 
  }   
}

function horizonSelect(shipBody, center){
  const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let arrPairs = play1tileArr.reverse();
  let cTile; 

  for(let i = 0; i < play1tileArr.length; i++){
    let xTile = arrPairs[i][0];
    let yTile = arrPairs[i][1];
    let xPlace = xVal.indexOf(xTile);
    let yPlace = yVal.indexOf(yTile);
    let mouseArr = [];
    let adjust = center;
    let leaveArrX = [];
    cTile = document.getElementById([arrPairs[i]]);
    for(let j = 0; j < shipBody; j++){
      
      let tempArr = [xVal[xPlace+adjust-j], (yVal[yPlace])];
  
      cTile.addEventListener("mouseover", () => { 
        horzHightlight(mouseArr, tempArr, shipBody, leaveArrX, xVal)
      })
      cTile.addEventListener("mouseleave", ()=> {
        noHightlight(leaveArrX, mouseArr);
      })
    } 
    cTile.addEventListener("click", () => {
     
        leaveArrX.forEach((p) => {
          document.getElementById([p[0], p[1]]).style.backgroundColor = "blue"; 
        })
        console.log(leaveArrX);
        leaveArrX = [];
      })  
  }   
}

function manualSelect(shipBody, center){
  const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let arrPairs = play1tileArr.reverse();
  let cTile; 
  
  for(let i = 0; i < play1tileArr.length; i++){
    let xTile = arrPairs[i][0];
    let yTile = arrPairs[i][1];
    let xPlace = xVal.indexOf(xTile);
    let yPlace = yVal.indexOf(yTile);
    let mouseArr = [];
    let adjust = center;
    let leaveArr = [];
    cTile = document.getElementById([arrPairs[i]]);
  }


}

function vertHighlight(pointedArr, bodyArr, shipBody, adjustedArr, adj, index){
  pointedArr.push(bodyArr);

  let yCatch = [];
  let adjustedY = [];

    if(pointedArr.length === shipBody){
      pointedArr.forEach((x) => {
        yCatch.push(x[1])
      })
    }
    if(yCatch.length === shipBody){
      let adjustF = 0;
      if(yCatch[yCatch.length-1] > 10){
        adjustF = 10 - yCatch[yCatch.length-1];
      }else if(yCatch[0] === 0){
        adjustF = 1;
      }else if(yCatch[0] === -1){
        adjustF = 2
      }else {
        adj = 0;
      }
      yCatch.forEach((p) => {
        adjustedY.push(p + adjustF);
      })
    }
    if(adjustedY.length === shipBody){
      adjustedY.forEach((L) => {
        adjustedArr.push([pointedArr[index][0], L]);
        document.getElementById([pointedArr[index][0], L]).style.backgroundColor = "yellow"
      })
    }
}

function horzHightlight(pointedArr, bodyArr, shipBody, adjustedArr, xArr,){
  pointedArr.push(bodyArr);

  let xCatch = [];
  let xIndex = [];
    if(pointedArr.length === shipBody){
      pointedArr.forEach((x) => {
        xCatch.push(x[0]);
        let xNum = xArr.indexOf(x[0]);
        xIndex.push(xNum);
      })
    }

    let cFactor = 0;
    let shortArr = [];
    xIndex.forEach((r) => {
      if(r === -1){
        cFactor++
      } else {
        shortArr.push(r);
      }
    })

    if(shortArr[shortArr.length-1] === 0){
      while(shortArr.length < shipBody){
        shortArr.unshift(shortArr[0]+1);
      }
    } else if(shortArr[0] >= 9){
      while(shortArr.length < shipBody){
        shortArr.push(shortArr[shortArr.length -1] -1);
      }
    }

    if(xIndex.length === shipBody){
      shortArr.forEach((p) => {
        adjustedArr.push([xArr[p], bodyArr[1]]);
        document.getElementById([xArr[p], bodyArr[1]]).style.backgroundColor = "yellow";
      })
    }
}

function noHightlight(adjustedArr, pointedArr){
  adjustedArr.forEach((p) => {
    document.getElementById([p[0], p[1]]).style.backgroundColor = "blanchedAlmond";
  })
  pointedArr = [];
}

let shipBtn = document.createElement("div");
  shipBtn.style.width = "25px";
  shipBtn.style.height = "25px";
  shipBtn.style.backgroundColor = "green";

document.body.appendChild(shipBtn);

shipBtn.addEventListener('mousedown', (event) => {
  let shiftX = event.clientX - shipBtn.getBoundingClientRect().left;
  let shiftY = event.clientY - shipBtn.getBoundingClientRect().top;

  let currentDroppable = null;

  shipBtn.style.position = 'absolute';
  shipBtn.style.zIndex = 1000;

  document.body.append(dragButton);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY){
    shipBtn.style.left = pageX - shiftX + 'px';
    shipBtn.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event){
    moveAt(event.pageX, event.pageY);

    shipBtn.hidden = true;
    let shipTile = document.elementFromPoint(event.clientX, event.clientY);
    shipBtn.hidden = false;

    if(!shipTile) return;

    let droppableBelow = shipTile.closest(".playerTiles");
    if(currentDroppable != droppableBelow){
      if(currentDroppable){
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if(currentDroppable){
        enterDroppable(currentDroppable);
      }
    }
  }
  document.addEventListener('mousemove', onMouseMove);

  shipBtn.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
    shipBtn.onmouseup = null;
  })

})
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

cVert.addEventListener("click", () => {
  verticalSelect(5, 2);
})
cHorz.addEventListener("click", () => {
  horizonSelect(5, 2);
})

bVert.addEventListener("click", () => {
  verticalSelect(4, 2);
})

bHorz.addEventListener("click", () => {
  horizonSelect(4, 2)
})

dVert.addEventListener("click", () => {
  verticalSelect(3, 1);
})

dHorz.addEventListener("click", () => {
  horizonSelect(3, 1);
})

sVert.addEventListener("click", () => {
  verticalSelect(3, 1);
})

sHorz.addEventListener("click", () => {
  horizonSelect(3, 1);
})

pVert.addEventListener("click", () => {
  verticalSelect(2, 0);
})

pHorz.addEventListener("click", () => {
  horizonSelect(2, 0);
})

document.body.appendChild(component());


const dragShip = document.createElement("button");
  dragShip.style.width = "20px";
  dragShip.style.height ="20px";
  dragShip.innerText = "dragtoboard";
  dragShip.id = "draggable"
  dragShip.classList.add("dragtoboard")

document.body.appendChild(dragShip);

const dragButton = document.getElementById("draggable")



dragButton.onmousedown = function(event){
  let shiftX = event.clientX - dragButton.getBoundingClientRect().left;
  let shiftY = event.clientY - dragButton.getBoundingClientRect().top;
  let currentDroppable = null;

  dragButton.style.position = 'absolute';
  dragButton.style.zIndex = 1000;

  document.body.append(dragButton);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY){
    dragButton.style.left = pageX - shiftX + 'px';
    dragButton.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event){
    moveAt(event.pageX, event.pageY);

    dragButton.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    dragButton.hidden = false;

    if(!elemBelow) return;

    let droppableBelow = elemBelow.closest('.playerTiles');
    if(currentDroppable != droppableBelow){
      if(currentDroppable){
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if(currentDroppable){
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  dragButton.onmouseup = function(){
    document.removeEventListener('mousemove', onMouseMove);
    dragButton.onmouseup =null;
    // dragButton.hidden = true;
  }

}

function enterDroppable(elem){
    elem.style.backgroundColor = 'pink';
  }

  function leaveDroppable(elem) {
    elem.style.backgroundColor = '';
  }


  dragButton.ondragstart = function(){
    return false;
  };


const drop = document.createElement("div");
  drop.style.border =  "thick solid black";
  drop.style.width = "150px";
  drop.style.height = "150px";
  drop.style.backgroundColor = "green";
  drop.classList.add('droppable')

  const space = document.createElement("div");
  space.style.border =  "thick solid black";
  space.style.width = "50px";
  space.style.height = "50px";
  space.style.backgroundColor = "yellow";

    document.body.appendChild(drop);
