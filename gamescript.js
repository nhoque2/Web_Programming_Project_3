const intervalID = setInterval(step, 500);

//draws grid with selected grid size
function drawGrid(){
	var lastClicked;
	var gridSize = document.getElementById("grid_size").value;
	var grid = createGrid(gridSize,gridSize,function(el,row,col,i){

		el.className='clicked';
		if (lastClicked) lastClicked.className='';
		lastClicked = el;
	});
	//checks if grid is not already drawn
	if (document.getElementById("game_canvas").innerHTML.trim().length == 0) {
		document.getElementById("game_canvas").appendChild(grid);
	}	
		 
	
}

//creates grid  
function createGrid(rows, cols, callback){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var x=0;x<rows;x++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var y=0;y<cols;y++){
            var cell = tr.appendChild(document.createElement('td'));
            cell.addEventListener('click',(function(el,x,y,i){
                return function(){
                    callback(el,x,y,i);
                }
            })(cell,x,y,i),false);
        }
    }
    return grid;
}

let cells;
function createCells(){
	var gridSize = document.getElementById("grid_size").value;
	//console.log(gridSize);
	//array size may need adjustment
	let arr = new Array(gridSize*gridSize);
	for(let x = 0; x < gridSize*gridSize; x++){
		let columns = new Array(gridSize*gridSize);
		for (let y = 0; y < gridSize*gridSize; y++) {
			columns[y] = false;
		}
		arr[x] = columns;
	}
	return arr;
}
function randomCells(){

}

function drawCells() {

}
//grid size may need adjustment
//drawCells needs to be added to see results
function step() {
	var gridSize = document.getElementById('grid_size').value;
	//console.log(gridSize);
	let newCells = createCells();
		for (let y = 0; y < gridSize*gridSize; y++) {
			for (let x = 0; x < gridSize*gridSize; x++) {
				const neighbors = getNeighbors(x,y);
				//Rule 1 and 2 applied
				if (cells[x][y] && neighbors >= 2 && neighbors <= 3) {
					newCells[x][y] = true;
					//Rule 3 and 4  applied
				} else if(!cells[x][y] && neighbors === 3) {
					newCells[x][y] = true;
				}
			}
		}
		cells = newCells;
		//drawCells();
}
//grid size may need adjustment
//
function getNeighbors(x, y){
	var gs = document.getElementById('grid_size').value;
	let count = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if(i === 0 && j === 0) {
				continue;
			}
			if(x+i < 0 || x+i > gs*gs - 1){
				continue;
			}

			if(y+j < 0 || y+j > gs*gs - 1){
				continue;
			}
			if (cells[x+i][y+j]) {
				count++;
			}
		}
	}
	console.log(count);
	return count;
}

function startGame(){
	drawGrid();
	cells = createCells();
	console.log('cells' + cells);
	step();
}

function stopGame() {
	clearInterval(intervalID);
}

//resets game
function resetGame(){
	 document.getElementById("game_canvas").innerHTML = "";
}

function inc1(){
	step();
}

function inc23(){
	let a = 1;
	while(a < 24) {
		step();
		a++;
	}
}
