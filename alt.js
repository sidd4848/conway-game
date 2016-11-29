window.onload=function(){
	var gridHeight = 400;
	var gridWidth = 400;
	var dx=1;
	var theGrid = createArray(gridWidth);
	var mirrorGrid = createArray(gridWidth);
    var canvas = document.getElementById("conway");
	var ctx = canvas.getContext("2d");
	    ctx.fillStyle="#0095DD";

	fillRandom(); 

	tick(); //call main loop

	function tick() { //main loop
	    drawGrid();
	    updateGrid();
	    requestAnimationFrame(tick);
	}

	function createArray(rows) { 
	    var arr = [];
	    for (var i = 0; i < rows; i++) {
	        arr[i] = [];
	    }
	    return arr;
	}

	function fillRandom() { //fill the grid randomly
	    for (var j = 100; j < gridHeight - 100; j++) { 
	        for (var k = 100; k < gridWidth - 100; k++) { 
	            theGrid[j][k] = Math.round(Math.random());
	        }
	    }
	}

	function drawGrid() { 
var liveCount = 0;
	    ctx.clearRect(0, 0, gridHeight, gridWidth); 
	    for (var j = 1; j < gridHeight; j++) { 
	        for (var k = 1; k < gridWidth; k++) { 
	            if (theGrid[j][k] === 1) {
	                ctx.fillRect(j, k, dx, dx);
                    liveCount++;
                    
	            }
	        }
	    }
        console.log(liveCount/100);
	}

	function updateGrid() { 
       
	    for (var j = 1; j < gridHeight - 1; j+=dx) { 
	        for (var k = 1; k < gridWidth - 1; k+=dx) { 
	            var totalCells = 0;
	            totalCells += theGrid[j - dx][k - dx];
	            totalCells += theGrid[j - dx][k]; 
	            totalCells += theGrid[j - dx][k + dx]; 
				totalCells += theGrid[j][k - dx]; 
	            totalCells += theGrid[j][k + dx];
				totalCells += theGrid[j + dx][k - dx]; 
	            totalCells += theGrid[j + dx][k]; 
	            totalCells += theGrid[j + dx][k + dx];

	            switch (totalCells) {
	                case 2:
	                    mirrorGrid[j][k] = theGrid[j][k];
                       
	                    break;
	                case 3:
	                    mirrorGrid[j][k] = 1; //live
                        
	                    break;
	                default:
	                    mirrorGrid[j][k] = 0; //
	            }
	        }
	    }

	    for (var l = 1; l < gridHeight - 1; l++) {
	        
	        mirrorGrid[l][0] = mirrorGrid[l][gridHeight - 3];
	        mirrorGrid[l][gridHeight - 2] = mirrorGrid[l][1];
	        mirrorGrid[0][l] = mirrorGrid[gridHeight - 3][l];
	        mirrorGrid[gridHeight - 2][l] = mirrorGrid[1][l];

	    }
		
	    var temp = theGrid;
	    theGrid = mirrorGrid;
	    mirrorGrid = temp;
	}
}