
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

var cells;
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

function step() {

}

/*function getNeighbors(x, y){
	let count = 0;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if(i === 0 && j === 0) {
				continue;
			}
			if(x+i < 0 || x+i > resolution - 1){
				continue;
			}

			if(y+j < 0 || y+j > resolution - 1){
				continue;
			}
			if (cells[x+i][y+j]) {
				count++;
			}
		}
	}
	return count;
}*/

function startGame(){
	drawGrid();
	createCells();
}

//resets game
function resetGame(){
	 document.getElementById("game_canvas").innerHTML = "";
}

