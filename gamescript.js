

//creates grid with selected grid size
let gridSize;
function createGrid(){
    var i=0;
	gridSize = document.getElementById("grid_size").value;
    var grid = document.createElement('table');
	grid.setAttribute('id','game_grid');
    grid.className = 'grid';
    for (var x=0;x<gridSize;x++){
        var tr = document.createElement('tr');
        for (var y=0;y<gridSize;y++){
            var cell = tr.appendChild(document.createElement('td'));
			cell.setAttribute('id', x + '_' + y);
			cell.setAttribute('class', 'dead');
			cell.addEventListener('click',cell_clicked); 
			tr.appendChild(cell);
        }
		grid.appendChild(tr);
    }
	//checks if grid is not already drawn
	if (document.getElementById("game_canvas").innerHTML.trim().length == 0) {
		document.getElementById("game_canvas").appendChild(grid);
	}	
}
//Code adapted and modified from https://javascript.plainenglish.io/the-game-of-life-using-javascript-fc1aaec8274f
let currGen =[gridSize];
let nextGen =[gridSize];

function cell_clicked() {
    let xy = this.id.split("_");
    let x = Number(xy[0]);//Get x
    let y = Number(xy[1]);//Get y
	// Toggle cell alive or dead
    if (this.className==='alive'){
        this.setAttribute('class', 'dead');
		currGen[x][y] = 0;
       
    }else{
        this.setAttribute('class', 'alive'); 
		currGen[x][y] = 1;
    }
}

function createGenArrays() {
    for (let i = 0; i < gridSize; i++) {
        currGen[i] = new Array(gridSize);
        nextGen[i] = new Array(gridSize);
    }
}
function initGenArrays() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function getNeighborCount(row, col) {
    let count = 0;
    let nrow=Number(row);
    let ncol=Number(col);
    
        // Make sure we are not at the first row
        if (nrow - 1 >= 0) {
        // Check top neighbor
        if (currGen[nrow - 1][ncol] == 1) 
            count++;
    }
        // Make sure we are not in the first cell
        // Upper left corner
        if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        //Check upper left neighbor
        if (currGen[nrow - 1][ncol - 1] == 1) 
            count++;
    }
// Make sure we are not on the first row last column
        // Upper right corner
        if (nrow - 1 >= 0 && ncol + 1 < gridSize) {
        //Check upper right neighbor
            if (currGen[nrow - 1][ncol + 1] == 1) 
                count++;
        }
// Make sure we are not on the first column
    if (ncol - 1 >= 0) {
        //Check left neighbor
        if (currGen[nrow][ncol - 1] == 1) 
            count++;
    }
    // Make sure we are not on the last column
    if (ncol + 1 < gridSize) {
        //Check right neighbor
        if (currGen[nrow][ncol + 1] == 1) 
            count++;
    }
// Make sure we are not on the bottom left corner
    if (nrow + 1 < gridSize && ncol - 1 >= 0) {
        //Check bottom left neighbor
        if (currGen[nrow + 1][ncol - 1] == 1) 
            count++;
    }
// Make sure we are not on the bottom right
    if (nrow + 1 < gridSize && ncol + 1 < gridSize) {
        //Check bottom right neighbor
        if (currGen[nrow + 1][ncol + 1] == 1) 
            count++;
    }
    
    
        // Make sure we are not on the last row
    if (nrow + 1 < gridSize) {
        //Check bottom neighbor
        if (currGen[nrow + 1][ncol] == 1) 
            count++;
    }
    
    
    return count;
}
function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
           
            let neighbors = getNeighborCount(row, col);
         
            // Check the rules
            // If Alive
            if (currGen[row][col] == 1) {
              
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] == 0) {
                // If Dead or Empty
            
                if (neighbors == 3) {
                    // Propogate the species
                    nextGen[row][col] = 1;//Birth?
                }
            }
        }
    }
    
}
function updateCurrGen() {
       
        for (row in currGen) {
            for (col in currGen[row]) {
                // Update the current generation with
                // the results of createNextGen function
                currGen[row][col] = nextGen[row][col];
                // Set nextGen back to empty
                nextGen[row][col] = 0;
            }
        }
     
    }
function updateWorld() {
        let cell='';
        for (row in currGen) {
            for (col in currGen[row]) {
                cell = document.getElementById(row + '_' + col);
                if (currGen[row][col] == 0) {
                    cell.setAttribute('class', 'dead');
                } else {
                    cell.setAttribute('class', 'alive');
                }
            }
        }
    }

let started=false;// Set to true when use clicks start
let timer;//To control evolutions
let intervalSpeed=1000;// One second between generations

function drawGrid(){
	createGrid();
	createGenArrays();
	initGenArrays();
}
function evolve(){
	
	createNextGen();//Apply the rules
    updateCurrGen();//Set Current values from new generation
    updateWorld();//Update the world view
	 if (started) {
            timer = setTimeout(evolve, intervalSpeed);
        }
}

function startGame(){
	started = true;
    evolve();
}

function stopGame() {
	started = false;
    clearTimeout(timer); 

}
//End source code

//resets game
function resetGame(){
	 document.getElementById("game_canvas").innerHTML = "";
}

function inc1(){
	evolve();
    clearTimeout(timer);
}

function inc23(){
	let a = 1;
	while(a < 24) {
		evolve();
		a++;
	}
    clearTimeout(timer);
}
/*unfinished 
function cPattern(){
    let p = document.getElementById('1_0');
    
}
*/