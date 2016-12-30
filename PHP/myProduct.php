<?php
    session_start();
    $username = $_SESSION['username'];
    $src = $_SESSION['old_source'];
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');

    $file = $_FILES["file_myproduct"]; //file ... name attribut in HTML
    $filename = $file["name"];

    if ($filename == "") { $filename = $src; }
    else {
        $deletePath = "../Uploads/".$username."/".$src;
        unlink($deletePath); //altes Produktbild löschen

        $sourcePath = $file["tmp_name"];
        echo $filename;
        $targetPath = "../Uploads/".$username."/".$filename;
        move_uploaded_file($sourcePath,$targetPath);
    }

    $name = $_POST["myproduct_name"];
    $category = $_POST["myproduct_category"];
    if ($category == "Neue Kategorie auswählen") { $category = "Sonstiges"; }
    $price = $_POST["myproduct_price"];
    $description = $_POST["myproduct_description"];
        
    $query = "UPDATE produkte SET Name='$name', Kategorie='$category', Bild='$filename', Preis='$price', Beschreibung='$description' WHERE Username='$username' AND Bild='$src'";
    mysqli_query($db_connect, $query);

        // --DELETE--
        //$query = "DELETE FROM produkte WHERE Username='$username' AND Bild='$src'";
        //mysqli_query($db_connect, $query);

    mysqli_close($db_connect);
	exit();
?>