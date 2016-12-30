<?php
    session_start();
    $username = $_SESSION['username'];

    $file = $_FILES["file"]; //file ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $filename = $file["name"];
    $targetPath = "../Uploads/".$username."/".$filename;
    move_uploaded_file($sourcePath,$targetPath);

    $name = $_POST["product_name"];
    $category = $_POST["product_category"];
    if ($category == "Kategorie auswählen") { $category = "Sonstiges"; }
    $price = $_POST["product_price"];
    $description = $_POST["product_description"];

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "INSERT INTO produkte(Username, Name, Kategorie, Bild, Preis, Beschreibung) VALUES ('$username','$name','$category','$filename','$price','$description')";
    mysqli_query($db_connect, $query);
    mysqli_close($db_connect);
	exit();
?>