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

//manualfleet
    //carrier([])
    //battleship([])
    //destroyer([])
    //submarine([])
    //patrolboat([])
// const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
// const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// class PlayerTools{
//     constructor(){

//     }
// }

export class ships{
    constructor(){
        this.xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        this.yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.fleetArr = [];
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
        let xRand = getRandVal(this.xVal);
        let yRand = getRandVal(this.yVal);
        return [xRand, yRand]
    }

    drawDirection(arr, body){
        let startPoint = arr;
        let arr0Index = this.xVal.indexOf(startPoint[0]);
        let arr1Index = startPoint[1];
        let index = 0;
        let upDir = [startPoint];
        let rightDir = [startPoint];
        let downDir = [startPoint];
        let leftDir = [startPoint];
        while(index < body-1){
            upDir.push([this.xVal[arr0Index], arr1Index-(1 + index)]);
            rightDir.push([this.xVal[arr0Index+(1+index)], arr1Index]);
            downDir.push([this.xVal[arr0Index], arr1Index+(1+index)]);
            leftDir.push([this.xVal[arr0Index-(1+index)], arr1Index]);
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
                this.fleetArr.push(bodyTiles);    
            }
        }   
    }

    carrier(){
        const body = 5;  
        let bodyTiles = [];
        this.drawUniqShipTile(body, bodyTiles)
    }

    battleShip(){
        const body = 4;  
        let bodyTiles = [];

        this.drawUniqShipTile(body, bodyTiles)
    }

    destroyer(){
        const body = 3;  
        let bodyTiles = [];

        this.drawUniqShipTile(body, bodyTiles)
    }

    submarines(){
        const body = 3;  
        let bodyTiles = [];
  
        this.drawUniqShipTile(body, bodyTiles)
    }

    patrolBoat(){
        const body = 2;  
        let bodyTiles = [];
  
        this.drawUniqShipTile(body, bodyTiles)
    }

}

// function removeBoat(tileHIt){
//     //choose tile coordinate
//     //reassign adjList = [];
//     plPosition.adjList[[tileHIt]].pop();
// }

// function isUniq(shipArr){
//     const arr = shipArr
//     let index = 0;


//     for(let i = 0; i < arr.length; i++){
//         arr.forEach((V) =>{
//             if(arr[i][0] === V[0] && arr[i][1] === V[1]){
//                 index++
//             }
//         })
//         if(index > 1){
//             console.log(arr[i])
//             break;
//         }
//         index = 0;
//     }
//     if(index >1){
//         return false;
//     } else {
//         return true;
//     }
    
// }

//player stats place here
//use JSON localStorage for board and fleet position
//each player has a board, not unified.
//opposing player points to opponent board.
//get fleet arr from JSON?


export class playerStatus{
    constructor(){
        this.tileList = {};
        this.tileArr = [];
        this.health;
        this.fleet = [];
            //fl[0]= carrier fl[1]= battleship fl[2] = destroyer fl[3] = submarine fl[4] = patrolboat 

        this.boardPlacement;
    }

    makeTiles(){
        const xVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const yVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        let tilePair = [];
        let boardTiles = [];

        for(const a of xVal){
            for(const b of yVal){
                tilePair = [a, b];
                boardTiles.push(tilePair);
            }
        }
        boardTiles.forEach((pair) => {
            this.tileArr.push(pair)
            this.tileList[pair] = [];
        })
    }

    emptyBoard(){
        this.tileArr.forEach((e) => {
            this.tileList[e].pop();
        }) 
    }

    // randomShip(){
    //     let randomShips = new ships();
    //     randomShips.storeShips();
    //     let storeShips = randomShips.fleetArr;
    //     this.fleet = storeShips;
    // }

    // randomShipPlacement(){
    //     let carrier = this.fleet[0];
    //     let battleShip = this.fleet[1];
    //     let destroyer = this.fleet[2];
    //     let submarine = this.fleet[3];
    //     let patrolBoat = this.fleet[4];

    //     carrier.forEach((v) =>{
    //         this.placeShipOnBoard(v, "Crr");
    //     })

    //     battleShip.forEach((v) =>{
    //         this.placeShipOnBoard(v, "Btl");
    //     })

    //     destroyer.forEach((v) =>{
    //         this.placeShipOnBoard(v, "Dst");
    //     })

    //     submarine.forEach((v) =>{
    //         this.placeShipOnBoard(v, "Sbm");
    //     })

    //     patrolBoat.forEach((v) =>{
    //         this.placeShipOnBoard(v, "Ptb");
    //     })
    // }

    placeShipOnBoard(tile, shipType){
        this.tileList[tile].push(shipType);
    }

    healthCompute(){

    }

    getFleetandBoard(){


    }

    findHit(){

    }

    pointHit(){

    }

    printGraph(){

        for(const vertex in this.tileList){
       
            console.log(`${vertex} -> ${this.tileList[vertex].join(', ')}`)       
        }       
    }
}

let player1 = new playerStatus()
// player1.makeTiles();
// player1.randomShip();
// player1.emptyBoard();
// player1.randomShipPlacement();
// player1.printGraph();
// console.log(player1.tileList);



// module.exports = {
//     ships,
//     ship,
//     isUniq,
// }

//break 