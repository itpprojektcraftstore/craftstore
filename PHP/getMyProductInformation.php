<?php
    session_start();
    $src = $_POST['src'];
    $username = $_SESSION['username'];

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Name, Kategorie, Preis, Beschreibung FROM produkte WHERE Username = '$username' AND Bild = '$src'";
    $result = mysqli_query($db_connect, $query);
    $result = mysqli_fetch_array($result);
    mysqli_close($db_connect);
    
    echo $result[0]."|".$result[1]."|".$result[2]."|".$result[3]."|".$username;

	exit();
?>