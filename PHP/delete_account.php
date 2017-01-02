<?php
	session_start();
    $username = $_POST['username'];
	$pw = $_POST['pw'];
	$randomstring = 'n2c3gG?f!sXg';
    $salt = $username.$pw.$randomstring;
    $hash = hash('sha256', $salt);

	$db_connect = mysqli_connect("localhost","root","itp2016!",'craftstore');
	$query = "SELECT Username FROM user WHERE Username = '$username' AND Hash = '$hash'";
	$result = mysqli_query($db_connect, $query);
    $user = mysqli_fetch_array($result)[0];

	if($user != "") { // if input data are correct
        $query = "DELETE FROM user WHERE Username = '$username'";
		mysqli_query($db_connect, $query);
		$query = "DELETE FROM produkte WHERE Username = '$username'";
		mysqli_query($db_connect, $query);

		del_dir();
		
		session_destroy();

		echo "true";
    }

	mysqli_close($db_connect);
	exit();

	function del_dir() {
		$path = "../Uploads/".$_SESSION['username'];
		$dir = opendir($path);
		while($file = readdir($dir)) {
			if($file != "." && $file != "..") {
				unlink($path."/".$file);
			}
		}
		closedir($dir);
		rmdir($path);
	}
?>