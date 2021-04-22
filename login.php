<?php
	session_save_path("session");
	session_start();
	error_reporting(E_ALL ^ E_WARNING);
?>

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="gamestyle.css">
	<title>Login</title>
	<meta charset="utf-8">
</head>
<body>

<?php
	$Username= $_SESSION['Username'];
	$Password= $_SESSION['Password'];

	if (!empty($Username) && !empty($Password)) {
		echo "Account Created Successfully.";
	}

	$usernameErr = $passwordErr = "";
	$loginUser = $loginPass = "";
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		
		if($_POST['loginUser'] != $Username) {
			$usernameErr = "Username is incorrect";
		}
		if($_POST['loginPass'] != $Password) {
			$passwordErr = "Password is incorrect";
			}
	}		
?>

<form method="post" name="Login">
    <h1>Login</h1>
    <label class="left" for="loginUser">Username</label>
    <input name="loginUser" type="text"/>
	<span class="error"><?php echo $usernameErr;?></span>
    <br/>
    <label class="left" for="loginPass">Password</label>
    <input name="loginPass" type="password"/>
	<span class="error"><?php echo $passwordErr;?></span>
    <br/>
    <br/>
    <input name="submit" type="submit" value="Login"/>
    <br/><br/>
    <a href="signup.php" class="signup">Sign up</a>
	
	<?php 
			
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				if($_POST['loginUser']==$Username && $_POST['loginPass']==$Password ) {
					$_SESSION['Points'] = 0;
					$_SESSION['questions'] = 0;
					header('Location: gameoflife.php');
					exit();
				}
			}			
		?>
</form>
</body>
</html>