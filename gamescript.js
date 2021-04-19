window.onload = function() {
	canvas.addEventListener('mousedown', onDown, false);
}
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function onDown(event) {
	cx = event.pageX;
	cy = event.pageY;
	//Check if cell is toggled "dead"
	//if dead, mousedown event will fill rectangle and make "alive"
	//if alive mousedown event will fill rectangle and make it "dead"
	context.fillStyle ='black';
	context.fillRect(cx,cy, 50,50);
	
	alert("X,Y="+cx+","+cy);
}
