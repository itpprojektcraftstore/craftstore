<?php
    session_start();
    $username = $_SESSION['username'];
    $src = $_SESSION['old_source'];
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');

    $file = $_FILES["file_myproduct"]; //file ... name attribut in HTML
    $filename = $file["name"];

    if ($filename == "") { $filename = $src; }
    else {
        $filename = str_replace(" ", "_", $filename);
        $query = "SELECT Bild FROM produkte WHERE Username = '$username' AND Bild = '$filename'";
        $result = mysqli_query($db_connect, $query);
        $image = mysqli_fetch_array($result)[0];
        if ($image == "") {
            $dot_pos = strrpos($filename, ".");
            $type = substr($filename, $dot_pos);
            if($type == ".jpg" || $type == ".jpeg" || $type == ".png" || $type == ".svg") {
                $deletePath = "../Uploads/".$username."/".$src;
                unlink($deletePath); //altes Produktbild löschen

                $sourcePath = $file["tmp_name"];
                $targetPath = "../Uploads/".$username."/".$filename;
                move_uploaded_file($sourcePath,$targetPath);
            }
            else {
                mysqli_close($db_connect);
                echo "error1";
                exit();
            }
        }
        else {
            mysqli_close($db_connect);
            echo "error2";
	        exit();
        }
    }

    $name = $_POST["myproduct_name"];
    $category = $_POST["myproduct_category"];
    if ($category == "Neue Kategorie auswählen") { $category = "Sonstiges"; }
    $price = $_POST["myproduct_price"];
    if ($price == "") { $price = "---"; }
    $description = $_POST["myproduct_description"];
    if ($description == "") { $description = "---"; }
        
    $query = "UPDATE produkte SET Name='$name', Kategorie='$category', Bild='$filename', Preis='$price', Beschreibung='$description' WHERE Username='$username' AND Bild='$src'";
    mysqli_query($db_connect, $query);

    mysqli_close($db_connect);
    echo "true";
	exit();
?>