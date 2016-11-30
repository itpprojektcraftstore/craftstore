<?php
    $email = $_POST['email'];
    $pw = $_POST['pw']; 
    $randomstring = 'n2c3gG?f!sXg';
    $salt = $email.$pw.$randomstring;
    $hash = hash('sha256', $salt);
    
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Username FROM user WHERE Email = '$email' AND Hash = '$hash'";
    $result = mysqli_query($db_connect, $query);
    $username = mysqli_fetch_array($result)[0];

    if($username == "") { // no success
        echo "false";
    }
    else { // success
        session_start();
        $_SESSION['username'] = $username;
    }
	mysqli_close($db_connect);
	exit();
?>