<?php
    session_start();
    $username = $_SESSION['username'];
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Username, Name, Email, Adresse, Telefonnummer, Profilbeschreibung, Profilbild, Profilbild_Nummer FROM user WHERE Username = '$username'";
    $result = mysqli_query($db_connect, $query);
    
    while($data = mysqli_fetch_array($result))
        for($i = 0; $i < 8; $i++) { echo $data[$i]."|"; }

    mysqli_close($db_connect);
	exit();
?>