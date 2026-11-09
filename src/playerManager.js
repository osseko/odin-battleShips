//switches player 1 to player 2
//place functions for board interaction between players
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
        mouseArr.push(tempArr);
        let yCatch = [];
        let adjustedY = [];
          if(mouseArr.length === shipBody){
            mouseArr.forEach((x) => {
              yCatch.push(x[1]);
            })
          }
          if(yCatch.length === shipBody){
            let adjustF = 0;
            if(yCatch[yCatch.length-1] > 10){
              adjustF = 10 - yCatch[yCatch.length-1];
            } else if(yCatch[0] === 0){
              adjustF = 1
            } else if(yCatch[0] === -1){
              adjustF = 2
            } else {
              adjust = 0;
            }
            yCatch.forEach((p) => {
              adjustedY.push(p + adjustF);
            })
          }
          if(adjustedY.length === shipBody){
            adjustedY.forEach((L) => {
              leaveArr.push([mouseArr[j][0], L]);
              document.getElementById([mouseArr[j][0], L]).style.backgroundColor = "yellow"; 
            })
          }
      })
 
      cTile.addEventListener("mouseleave", ()=> {
        leaveArr.forEach((p) => {
            document.getElementById([p[0], p[1]]).style.backgroundColor = "blanchedAlmond"; 
        })
        mouseArr = [];
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
        mouseArr.push(tempArr);

        let xCatch = [];
        let xIndex = [];
          if(mouseArr.length === shipBody){
            mouseArr.forEach((x) => {
              xCatch.push(x[0]);
              let xNum = xVal.indexOf(x[0]);
              xIndex.push(xNum);
            })
          }
          let cFactor = 0;
          let shortArr = [];
          xIndex.forEach((r) => {
            if(r === -1){
              cFactor++;
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
              shortArr.push(shortArr[shortArr.length-1] - 1);
            }
          }
          if(xIndex.length === shipBody){
            shortArr.forEach((p) => {
              leaveArrX.push([xVal[p], tempArr[1]]);
              document.getElementById([xVal[p], tempArr[1]]).style.backgroundColor = "yellow";
            })
          }
      })
      cTile.addEventListener("mouseleave", ()=> {
        leaveArrX.forEach((p) => {
            document.getElementById([p[0], p[1]]).style.backgroundColor = "blanchedAlmond"; 
        })
        mouseArr = [];
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
