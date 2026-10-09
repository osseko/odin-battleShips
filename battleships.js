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
        // this.x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        // this.y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
        // console.log(tileNodes)

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
        this.health;
        this.fleetArr = [];
        // this.uniqTile = [['A', 1], ['B', 3], ['C', 3], ['D', 1]];  
        this.uniqTile = [];     

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
                // console.log(pair)
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
                
        // for(const pair of shipBody){
        //     console.log(pair)
        // }

        return shipBody;

    }

    uniqCheck(){

    }
    //ifuniq push
    layOutShips(){
        const shipCount = 5;
        const countArr = [5, 4, 3, 3, 2]
        let shipArr = new Array(shipCount).fill(null);
        let start = this.findPoint();
        let isUniq;
        let uniqStore = [];
        // for(let i = 0; i < shipCount; i++){
        //  
        //     shipArr[i] = this.drawShipLength(start, countArr[i])
        //     // shipArr[i] = i+"ship"
        // }

        let carrier = this.drawShipLength(this.findPoint(), 5);
        let battleShip = this.drawShipLength(this.findPoint(), 4);
        let destroyer = this.drawShipLength(this.findPoint(), 3);
        let submarine = this.drawShipLength(this.findPoint(), 3);
        let patrolBoat = this.drawShipLength(this.findPoint(), 2);

        // shipArr[0] = carrier;
        // // shipArr[1] = battleShip;
        // // shipArr[2] = destroyer;
        // // shipArr[3] = submarine;
        // // shipArr[4] = patrolBoat;
        
        // for(const pair of battleShip){
        //     for(const pair of)
        //     console.log(pair)
        // }

        // for(const pair of destroyer){
        //     console.log(pair)
        // }
        // console.log(carrier)
        // console.log(battleShip)
        // console.log(destroyer)
        // console.log(submarine)
        // console.log(patrolBoat)

        // console.log(shipArr)

    }
    layShipLength(){

    }
    //ships [[0carrier][1battleship][2destroyer][3submarines][4patrolboat]]
    //change structure
    carrier(){
        let start = this.findPoint()
        const body = 5;
        let uniq = this.uniqTile;
        let check;
        // let parts = this.drawShipLength(start, body);
        let bodyTiles = [];
        let tempArr = [];
        
        while(check !== false){
            let parts = this.drawShipLength(start, body);
            let tempArr = [];
            if(uniq.length === 0){
                console.log("noUniq")
                parts.forEach((V) =>{
                    uniq.push(V)
                    bodyTiles.push(V)
                })
                check = false;
            } else {
                console.log("uniqmore")
                //checks if tileValue is not unique
                for(const U of parts){
                // console.log("U", U)
                uniq.forEach((x) => {
                    // console.log("x", x)
                    if(x[0] === U[0] && x[1] === U[1]){
                        // console.log("break here")
                        check = true;
                        bodyTiles = [];
                    } else {
                        check = false;
                    }
                    })
                }

                 if(check === false){
                    parts.forEach((V) =>{
                        uniq.push(V)
                        bodyTiles.push(V)
                    })
                }
            }
        }
        console.log(bodyTiles)
        this.fleetArr.push(bodyTiles)
    }

    battleShip(){
        let start = this.findPoint()
        const body = 4;
        let uniq = this.uniqTile;
        let check;
        // let parts = this.drawShipLength(start, body);
        let bodyTiles = [];
        let tempArr = [];
        
        while(check !== false){
            let parts = this.drawShipLength(start, body);
            let tempArr = [];
            if(uniq.length === 0){
                console.log("noUniq")
                parts.forEach((V) =>{
                    uniq.push(V)
                    bodyTiles.push(V)
                })
                check = false;
            } else {
                console.log("uniqmore")
                //checks if tileValue is not unique
                for(const U of parts){
                // console.log("U", U)
                uniq.forEach((x) => {
                    // console.log("x", x)
                    if(x[0] === U[0] && x[1] === U[1]){
                        // console.log("break here")
                        check = true;
                        bodyTiles = [];
                    } else {
                        check = false;
                    }
                    })
                }

                 if(check === false){
                    parts.forEach((V) =>{
                        uniq.push(V)
                        bodyTiles.push(V)
                    })
                }
            }
        }
        console.log(bodyTiles)
        this.fleetArr.push(bodyTiles)
    }

    destroyer(){
        let start = this.findPoint()
        const body = 3;
        let uniq = this.uniqTile;
        let check;
        // let parts = this.drawShipLength(start, body);
        let bodyTiles = [];
        let tempArr = [];
        
        while(check !== false){
            let parts = this.drawShipLength(start, body);
            let tempArr = [];
            if(uniq.length === 0){
                console.log("noUniq")
                parts.forEach((V) =>{
                    uniq.push(V)
                    bodyTiles.push(V)
                })
                check = false;
            } else {
                console.log("uniqmore")
                //checks if tileValue is not unique
                for(const U of parts){
                // console.log("U", U)
                uniq.forEach((x) => {
                    // console.log("x", x)
                    if(x[0] === U[0] && x[1] === U[1]){
                        // console.log("break here")
                        check = true;
                        bodyTiles = [];
                    } else {
                        check = false;
                    }
                    })
                }

                 if(check === false){
                    parts.forEach((V) =>{
                        uniq.push(V)
                        bodyTiles.push(V)
                    })
                }
            }
        }
        console.log(bodyTiles)
        this.fleetArr.push(bodyTiles)
    }

    submarines(){
        let start = this.findPoint()
        const body = 3;
        let uniq = this.uniqTile;
        let check;
        // let parts = this.drawShipLength(start, body);
        let bodyTiles = [];
        let tempArr = [];
        
        while(check !== false){
            let parts = this.drawShipLength(start, body);
            let tempArr = [];
            if(uniq.length === 0){
                console.log("noUniq")
                parts.forEach((V) =>{
                    uniq.push(V)
                    bodyTiles.push(V)
                })
                check = false;
            } else {
                console.log("uniqmore")
                //checks if tileValue is not unique
                for(const U of parts){
                // console.log("U", U)
                uniq.forEach((x) => {
                    // console.log("x", x)
                    if(x[0] === U[0] && x[1] === U[1]){
                        // console.log("break here")
                        check = true;
                        bodyTiles = [];
                    } else {
                        check = false;
                    }
                    })
                }

                 if(check === false){
                    parts.forEach((V) =>{
                        uniq.push(V)
                        bodyTiles.push(V)
                    })
                }
            }
        }
        console.log(bodyTiles)
        this.fleetArr.push(bodyTiles)
    }

    patrolBoat(){
        let start = this.findPoint()
        const body = 2;
        let uniq = this.uniqTile;
        let check;
        // let parts = this.drawShipLength(start, body);
        let bodyTiles = [];
        let tempArr = [];
        
        while(check !== false){
            let parts = this.drawShipLength(start, body);
            let tempArr = [];
            if(uniq.length === 0){
                console.log("noUniq")
                parts.forEach((V) =>{
                    uniq.push(V)
                    bodyTiles.push(V)
                })
                check = false;
            } else {
                console.log("uniqmore")
                //checks if tileValue is not unique
                for(const U of parts){
                // console.log("U", U)
                uniq.forEach((x) => {
                    // console.log("x", x)
                    if(x[0] === U[0] && x[1] === U[1]){
                        // console.log("break here")
                        check = true;
                        bodyTiles = [];
                    } else {
                        check = false;
                    }
                    })
                }

                 if(check === false){
                    parts.forEach((V) =>{
                        uniq.push(V)
                        bodyTiles.push(V)
                    })
                }
            }
        }
        console.log(bodyTiles)
        this.fleetArr.push(bodyTiles)
    }

    // battleShip(){
    //     let start = this.findPoint()
    //     const body = 4;
    //     let uniq = this.uniqTile;
    //     let check;
    //     // let parts = this.drawShipLength(start, body);
    //     let bodyTiles = [];
    //     let tempArr = [];
        
    //     while(check !== false){
    //         let parts = this.drawShipLength(start, body);
    //         let tempArr = [];
    //         if(uniq.length < 1){
    //             parts.forEach((V) =>{
    //                 uniq.push(V)
    //                 bodyTiles.push(V)
    //             })
    //         } else {
    //             //checks if tileValue is not unique
    //             for(const U of parts){
    //             // console.log("U", U)
    //             uniq.forEach((x) => {
    //                 // console.log("x", x)
    //                 if(x[0] === U[0] && x[1] === U[1]){
    //                     // console.log("break here")
    //                     bodyTiles = [];
    //                 } else {
    //                     check = false;
    //                 }
    //             })

    //         }

    //             if(check === false){
    //                 parts.forEach((V) =>{
    //                     uniq.push(V)
    //                     bodyTiles.push(V)
    //                 })
    //             }
    //         }
    //     }
    //     console.log(bodyTiles)
    //     this.fleetArr.push(bodyTiles)
    // }

    // destroyer(){
    //     let start = this.findPoint()
    //     const body = 3;
    //     let uniq = this.uniqTile;
    //     let check;
    //     // let parts = this.drawShipLength(start, body);
    //     let bodyTiles = [];
    //     let tempArr = [];
        
    //     while(check !== false){
    //         let parts = this.drawShipLength(start, body);
    //         let tempArr = [];
    //         if(uniq.length < 1){
    //             parts.forEach((V) =>{
    //                 uniq.push(V)
    //                 bodyTiles.push(V)
    //             })
    //         } else {
    //             //checks if tileValue is not unique
    //             for(const U of parts){
    //             // console.log("U", U)
    //             uniq.forEach((x) => {
    //                 // console.log("x", x)
    //                 if(x[0] === U[0] && x[1] === U[1]){
    //                     // console.log("break here")
    //                     bodyTiles = [];
    //                 } else {
    //                     check = false;
    //                 }
    //             })

    //         }

    //             if(check === false){
    //                 parts.forEach((V) =>{
    //                     uniq.push(V)
    //                     bodyTiles.push(V)
    //                 })
    //             }
    //         }
    //     }
    //     console.log(bodyTiles)
    //     this.fleetArr.push(bodyTiles)
    // }


    // battleShip(){
    //     let start = this.findPoint()
    //     const body = 4;

    //      this.drawShipLength(start, body)

    // }

    // destroyer(){
    //     let start = this.findPoint()
    //     const body = 3;

    //      this.drawShipLength(start, body)

    // }

    // submarines(){
    //     let start = this.findPoint()
    //     const body =3;

    //      this.drawShipLength(start, body)
        
    // }

    // patrolBoat(){
    //     let start = this.findPoint()
    //     const body =2;

    //     this.drawShipLength(start, body)

    // }
      //carrier 5 nodes battleship 4 nodes destroyer 3 nodes submarines 3 nodes patrolbaot 2 nodes
}

let ship = new ships();
console.log(ship)
console.log(ship.carrier());
console.log(ship.battleShip());
console.log(ship.destroyer());
console.log(ship.submarines());
console.log(ship.patrolBoat());
// console.log(ship.layOutShips());

console.log(ship.uniqTile);
// function sum(a, b){
//     return a + b;
// }
// module.exports = sum;