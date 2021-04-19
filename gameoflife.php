<?php
	session_save_path("./");
	session_start();
	error_reporting(E_ALL ^ E_WARNING);
?>

<!DOCTYPE html>
<html>
<head>
	<title>Game of Life</title>
	<link rel="stylesheet" type="text/css" href="gamestyle.css">
	
</head>
<body>
	<h1>Game of Life</h1>
	<h2><?php echo "Welcome ".$_SESSION['Username']."!";?></h2>

	<label>Choose a grid size:</label>
	<select name="grid-size" id="grid-size">
		<option value="">---</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10">10</option>
	</select>
	
	<button type="button" id="startbutton" onclick="startGame()">Start</button>
	<button type="button" id="stopbutton" onclick="stopGame()">Stop</button>
	<button type="button" id="stepbutton" onclick="inc1()">Increment 1 Generations</button>
	<button type="button" id="step23" onclick="inc23()">Increment 23 Generations</button>
	<button type="button" id="reset" onclick="resetGame()">Reset</button>
	<button type="button" id="patternButton" onclick="cPattern()">Change pattern</button>

	<canvas id="canvas"></canvas>
	
	<br>
	
	<form method="post" name="Logout">
				<input type="submit" name="logout" value="Logout">
	</form>
	<?php 
				if (isset($_POST['logout'])) { 
					setcookie(session_name(), '', 100);
					session_unset();
					session_destroy();
					$_SESSION = array();
					header('Location: signup.php');
				}			
	?>

	<script type="text/javascript" src="gamescript.js"></script>
</body>
</html>