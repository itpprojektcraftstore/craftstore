<?php
    session_start();
    $categorie = $_POST['categorie'];
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');

    if($categorie == "Alle Kategorien") {
        $query = "SELECT Username, Name, Bild, Preis, Beschreibung FROM produkte WHERE 1";
    }
    else {
        $query = "SELECT Username, Name, Bild, Preis, Beschreibung FROM produkte WHERE Kategorie = '$categorie'";
    }
    
    $result = mysqli_query($db_connect, $query);
    
    while($data = mysqli_fetch_array($result)) {
        $session_name = $data[2]."Username";
        $_SESSION[$session_name] = $data[0];

        $session_name = $data[2]."Name";
        $_SESSION[$session_name] = $data[1];

        $session_name = $data[2]."Preis"; 
        $_SESSION[$session_name] = $data[3];

        $session_name = $data[2]."Beschreibung";
        $_SESSION[$session_name] = $data[4];

        echo $data[0]."|".$data[2]."|";    
    }

    mysqli_close($db_connect);
	exit();
?>