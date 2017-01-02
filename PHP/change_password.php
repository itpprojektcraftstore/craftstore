<?php
    session_start();
    $username = $_SESSION['username'];
    $old_pw = $_POST['old_pw'];
    $new_pw = $_POST['new_pw'];

    $randomstring = 'n2c3gG?f!sXg';
    $salt = $username.$old_pw.$randomstring;
    $hash = hash('sha256', $salt);

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Username FROM user WHERE Username = '$username' AND Hash = '$hash'";
    $result = mysqli_query($db_connect, $query);
    $user = mysqli_fetch_array($result)[0];

    if($user != "") { //success
        $salt = $username.$new_pw.$randomstring;
        $hash = hash('sha256', $salt);

        $query = "UPDATE user SET Hash = '$hash' WHERE Username = '$username'";
        mysqli_query($db_connect, $query);

        echo "true";
    }
    mysqli_close($db_connect);
	exit();
?>