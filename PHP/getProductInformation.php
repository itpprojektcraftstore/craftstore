<?php
    session_start();
    $src = $_POST['src'];
    $username = $_SESSION[$src.'Username'];
    $productname = $_SESSION[$src.'Name'];
    $price = $_SESSION[$src.'Preis'];
    $description = $_SESSION[$src.'Beschreibung'];

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Name, Email, Telefonnummer, Adresse FROM user WHERE Username = '$username'";
    $result = mysqli_query($db_connect, $query);
    $result = mysqli_fetch_array($result);
    $name = $result[0];
    $email = $result[1];
    $phone = $result[2];
    $address = $result[3];
    mysqli_close($db_connect);
    
    echo $username."|".$name."|".$productname."|".$price."|".$description."|".$email."|".$phone."|".$address;

	exit();
?>