<?php
	session_start();
    $email = $_POST['email'];
	$pw = $_POST['pw'];
	$randomstring = 'n2c3gG?f!sXg';
    $salt = $email.$pw.$randomstring;
    $hash = hash('sha256', $salt);

	$db_connect = mysqli_connect("localhost","root","itp2016!",'craftstore');
	$query = "SELECT Username FROM user WHERE Email = '$email' AND Hash = '$hash'";
	$result = mysqli_query($db_connect, $query);
    $username = mysqli_fetch_array($result)[0];

	if($username != "") { // if input data are correct
        $query = "DELETE FROM user WHERE Email = '$email'";
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
