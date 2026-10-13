//ship class factory
//should include length, number of times hit, sunk or not
//hit() function
//isSunk() function

//gameBoard class factory
//do tests to confirm creation of board
//able to place ships at specific coordinates
//recieiveAttack() funciton
//track of missed attacks
//report if sunk

//player class
//two types of players real, computer


// class of ship  size
// carrier          5
// battleship       4
// destroyer        3
//submarine         3
//patrol boat       2

//board size
//      A   B   C   D   E   F   G   H   I   j
//  1   _   _   _   _   _   _   _   _   _   _
//  2   _   _   _   _   _   _   _   _   _   _
//  3   _   _   _   _   _   _   _   _   _   _
//  4   _   _   _   _   _   _   _   _   _   _
//  5   _   _   _   _   _   _   _   _   _   _   
//  6   _   _   _   _   _   _   _   _   _   _   
//  7   _   _   _   _   _   _   _   _   _   _
//  8   _   _   _   _   _   _   _   _   _   _
//  9   _   _   _   _   _   _   _   _   _   _
//  10  _   _   _   _   _   _   _   _   _   _
//

// class Node{
//     constructor(){

//     }
// }

//localstorage for shipbody, position health

const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class battleBoard{
    constructor(){
        this.adjList = {};
        this.tiles = [];
    }

    board(){
        let bx = xVal;
        let by = yVal;
        let tilePair = [];
        let boardTiles = [];

        for(const a of bx){
            for(const b of by){
                tilePair = [a, b]
                boardTiles.push(tilePair);
            } 
        }
       
        this.tiles = boardTiles;
    } 

    addVertex(){
        let tileNodes = this.tiles;
        tileNodes.forEach((pair) => {
            this.adjList[pair] = [];
        })
    }

    addEdge(ver1, ver2){
        this.adjList[ver1].push(ver2);
        // this.adjList[ver2].push(ver1);
    }

    findNeighbor(tile, letterRow, letterIndex){
        let neighbors = [];

        neighbors.push([letterRow[letterIndex], tile[1]-1])
        neighbors.push([letterRow[letterIndex + 1], tile[1]])
        neighbors.push([letterRow[letterIndex], tile[1]+1])
        neighbors.push([letterRow[letterIndex - 1], tile[1]])
        
        return neighbors;
    }

    makeVertex(){  
        const xArr = xVal;
        const tiles = this.tiles;

        for(let i = 0; i < tiles.length; i++){
            let tempNeighbor = [];
            let letterIndex = xArr.indexOf(tiles[i][0])
            let nextTiles = (this.findNeighbor(tiles[i], xArr, letterIndex))
            nextTiles.forEach((neighbor) => {
                if(neighbor[0] !== undefined && neighbor[1] >= 1 && neighbor[1] <= 10){
                    tempNeighbor.push(neighbor)
                }
            })
            tempNeighbor.forEach((newTiles) =>{
                this.addEdge(tiles[i], newTiles)
            })
            tempNeighbor = [];    
        }
    
    }

    printGraph(){

        for(const vertex in this.adjList){
       
            console.log(`${vertex} -> ${this.adjList[vertex].join(', ')}`)       
        }       
    }

}

class PlayerTools{
    constructor(){

    }
}


let shipBoard = new battleBoard();

const makeGameBoard = function(){
    shipBoard.board();
    shipBoard.addVertex();
    shipBoard.makeVertex();
    // shipBoard.printGraph();
}
makeGameBoard();


class ships{
    constructor(){
        this.fleetArr = [];
        // this.uniqTile = [['A', 1], ['B', 3], ['C', 3], ['D', 1], ['E', 8], ['F', 9], ['G', 8], ['H', 1], ['I', 10], ['J', 6], ['A', 10], ['B', 9], ['D', 1]];  
        this.uniqTile = [];     
    }

    storeShips(){
        if(this.fleetArr.length === 5){
            
            return;
        } else {
            this.carrier();
            this.battleShip();
            this.destroyer();
            this.submarines();
            this.patrolBoat();
        }
    }

    findPoint(){
        function getRandVal(a){
            let val = Math.floor(Math.random() * a.length)
            return a[val];
        }     
        let xRand = getRandVal(xVal);
        let yRand = getRandVal(yVal);
        return [xRand, yRand]
    }

    drawDirection(arr, body){
        let startPoint = arr;
        let arr0Index = xVal.indexOf(startPoint[0]);
        let arr1Index = startPoint[1];
        let index = 0;
        let upDir = [startPoint];
        let rightDir = [startPoint];
        let downDir = [startPoint];
        let leftDir = [startPoint];
        while(index < body-1){
            upDir.push([xVal[arr0Index], arr1Index-(1 + index)]);
            rightDir.push([xVal[arr0Index+(1+index)], arr1Index]);
            downDir.push([xVal[arr0Index], arr1Index+(1+index)]);
            leftDir.push([xVal[arr0Index-(1+index)], arr1Index]);
            index++
        }
        const stored = [upDir, rightDir, downDir, leftDir]
        const randFactor = Math.floor(Math.random() * stored.length);
        return stored[randFactor]
    }

    drawShipLength(point, body){
        let boardCheck;
        let shipBody = [];
        
        while(boardCheck !== true){
            const drawShip = this.drawDirection(point, body)
            for(const pair of drawShip){
            if(pair[0] === undefined || pair[1] < 1 || pair[1] > 10){
                    boardCheck = false;
                    break;
                } else {
                    boardCheck = true;
                }
            }
            if(boardCheck !== false){
                shipBody = drawShip
            }
        }
        return shipBody;
    }

    uniqCheck(arr, tileSet){
        let result;
        if(tileSet.length === 0){
            result = true;
        }else if(tileSet.length > 1){
            for(let i = 0; i < tileSet.length; i++){
                if(arr[0] === tileSet[i][0] && arr[1] === tileSet[i][1]){
                    result = false;
                    break;
                } else {
                    result = true;
                }
            }
        }
        return result;
    }

    drawUniqShipTile(body, bodyTiles){
        let isUniq;
        let stored = [];

        while(bodyTiles.length !== body){
            
            this.drawShipLength(this.findPoint(), body)
                .forEach((P) => {
                    stored.push(P)
                })

            stored.forEach((V) => {
                isUniq = this.uniqCheck(V, this.uniqTile);
                if(isUniq === false){
                    bodyTiles = [];
                    stored = [];
                } else {
                    bodyTiles.push(V);
                }
            })
           
            if(bodyTiles.length === body){
                bodyTiles.forEach((p)=>{
                    this.uniqTile.push(p);
                })    
            }
        }   
    }

    carrier(){
  
        const body = 5;  
        let bodyTiles = [];
        this.drawUniqShipTile(body, bodyTiles)

        this.fleetArr.push(bodyTiles)
            //   console.log("uniq", bodyTiles)
    }

    battleShip(){

        const body = 4;  
        let bodyTiles = [];

        this.drawUniqShipTile(body, bodyTiles)

        this.fleetArr.push(bodyTiles)
                // console.log("uniq", bodyTiles)
    }

    destroyer(){

        const body = 3;  
        let bodyTiles = [];

        this.drawUniqShipTile(body, bodyTiles)

        this.fleetArr.push(bodyTiles)
                // console.log("uniq", bodyTiles)
    }

    submarines(){

        const body = 3;  
        let bodyTiles = [];
  
        this.drawUniqShipTile(body, bodyTiles)

        this.fleetArr.push(bodyTiles)
                // console.log("uniq", bodyTiles)
    }

    patrolBoat(){

        const body = 2;  
        let bodyTiles = [];
  
        this.drawUniqShipTile(body, bodyTiles)

        this.fleetArr.push(bodyTiles)
                // console.log("uniq", bodyTiles)
    }

}

let ship = new ships();
console.log(ship)
let callShips = ship.storeShips();
let fleetArr = ship.fleetArr;
let allShipArr = ship.uniqTile;
console.log(fleetArr)
console.log(allShipArr)

function isUniq(shipArr){
    const arr = shipArr
    let index = 0;


    for(let i = 0; i < arr.length; i++){
        arr.forEach((V) =>{
            if(arr[i][0] === V[0] && arr[i][1] === V[1]){
                index++
            }
        })
        if(index > 1){
            console.log(arr[i])
            break;
        }
        index = 0;
    }
    if(index >1){
        return false;
    } else {
        return true;
    }
    
}

module.exports = {
    ship,
    callShips,
    isUniq,
}

