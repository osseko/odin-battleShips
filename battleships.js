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

class battleBoard{
    constructor(){
        this.adjList = {};
        this.tiles = [];
        this.x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        this.y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    }

    board(){
        let bx = this.x;
        let by = this.y;
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
        const xArr = this.x;
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
    shipBoard.printGraph();
}
makeGameBoard();


class ships{
    constructor(){
        this.health;
        this.shipLength;
    }


      //carrier 5 nodes battleship 4 nodes destroyer 3 nodes submarines 3 nodes patrolbaot 2 nodes
}


// function sum(a, b){
//     return a + b;
// }
// module.exports = sum;