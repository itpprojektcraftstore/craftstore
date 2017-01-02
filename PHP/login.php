<?php
    $username = $_POST['username'];
    $pw = $_POST['pw']; 
    $randomstring = 'n2c3gG?f!sXg';
    $salt = $username.$pw.$randomstring;
    $hash = hash('sha256', $salt);
    
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Username FROM user WHERE Username = '$username' AND Hash = '$hash'";
    $result = mysqli_query($db_connect, $query);
    $user = mysqli_fetch_array($result)[0];

    if($user == "") { // no success
        echo "false";
    }
    else { // success
        session_start();
        $_SESSION['username'] = $username;
    }
	mysqli_close($db_connect);
	exit();
?>