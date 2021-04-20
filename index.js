const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const size = 800;
const scale = 8;
const resolution = size / scale;
const intervalID = setInterval(step, 500);


let cells;


console.log(getNeighbors(1,1));

	

function initialize() {
	canvas.width = size;
	canvas.height = size;
	context.scale(scale, scale);
	context.fillStyle = "black";
	context.fillRect(50, 50, 1, 1);
	cells = createCells();

}

function randomCells() {
	for(let y=0; y < resolution; y++){
		for(let x=0; x < resolution; x++){
			if(Math.random() < 0.5) {
				cells[x][y] = true;
			}
			
		}
	}
}


function createCells() {
	let arr = new Array(resolution);
	for (let x = 0; x < resolution; x++) {
		let columns = new Array(resolution);
		for (let y = 0; y < resolution; y++) {
			columns[y] = false;
		}
		arr[x] = columns;
	}
	return arr;
}

function drawCells() {
	context.fillStyle = "white";
	context.fillRect(0, 0, resolution, resolution);
	context.fillStyle = "blue"
	for (let y = 0; y < resolution; y++) {
		for (let x = 0; x < resolution; x++) {
			if (cells[x][y]) {
				context.fillRect(x, y, 1, 1);
			}
		}
	}
}


function step() {
	let newCells = createCells();
	for (let y = 0; y < resolution; y++) {
		for (let x = 0; x < resolution; x++) {
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
	drawCells();
}

function getNeighbors(x ,y) {
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
}

function startGame() {
	initialize();
	randomCells();
	drawCells();
	//setInterval(step, 500);
}

function stopGame() {
	clearInterval(intervalID);
}

function stepTT() {
	let a = 1;
	while(a < 24) {
		step();
		a++;
	}
}

function resetGame() {
	console.log("init.js: clear_canvas_rectangle()"); 
	context.clearRect (0, 0, 620, 495);
	shapes = []; 
	console.log('init.js: clear_canvas_rectangle(): shapes.length: ' + shapes.length);
}

function cPattern() {
	context.scale(2, 2);
}