<?php
    $username = $_POST['username'];

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Name, Email, Adresse, Telefonnummer, Profilbeschreibung, Profilbild, Profilbild_Nummer FROM user WHERE Username = '$username'";
    $result = mysqli_query($db_connect, $query);
    $result = mysqli_fetch_array($result);
    mysqli_close($db_connect);
    
    echo $username."|".$result[0]."|".$result[1]."|".$result[2]."|".$result[3]."|".$result[4]."|".$result[5]."|".$result[6];

	exit();
?>