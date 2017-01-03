<?php
    session_start();
    $username = $_SESSION['username'];
    $src = $_SESSION['old_source'];
    
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "DELETE FROM produkte WHERE Username='$username' AND Bild='$src'";
    mysqli_query($db_connect, $query);
    mysqli_close($db_connect);

    $deletePath = "../Uploads/".$username."/".$src;
    unlink($deletePath);

	exit();
?>