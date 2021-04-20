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

function startGame(){
	drawGrid();
}

//resets game
function resetGame(){
	 document.getElementById("game_canvas").innerHTML = "";
}