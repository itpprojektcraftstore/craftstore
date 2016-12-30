<?php
    session_start();
    $username = $_SESSION['username'];
    $src = $_SESSION['old_source'];

    $deletePath = "../Uploads/".$username."/".$src;
    unlink($deletePath); //altes Produktbild löschen

    $file = $_FILES["file_myproduct"]; //file ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $filename = $file["name"];
    $targetPath = "../Uploads/".$username."/".$filename;
    move_uploaded_file($sourcePath,$targetPath);

    $name = $_POST["myproduct_name"];
    $category = $_POST["myproduct_category"];
    if ($category == "Neue Kategorie auswählen") { $category = "Sonstiges"; }
    $price = $_POST["myproduct_price"];
    $description = $_POST["myproduct_description"];
    
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "UPDATE produkte SET Name='$name', Kategorie='$category', Bild='$filename', Preis='$price', Beschreibung='$description' WHERE Username='$username' AND Bild='$src'";
    mysqli_query($db_connect, $query);
    mysqli_close($db_connect);
	exit();
?>