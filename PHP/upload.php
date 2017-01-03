<?php
    session_start();
    $username = $_SESSION['username'];

    $file = $_FILES["file"]; //file ... name attribut in HTML
    $filename = $file["name"];

    if ($filename != "") {
        $filename = str_replace(" ", "_", $filename);
        $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
        $query = "SELECT Bild FROM produkte WHERE Username = '$username' AND Bild = '$filename'";
        $result = mysqli_query($db_connect, $query);
        $image = mysqli_fetch_array($result)[0];
        if ($image == "") {
            $dot_pos = strrpos($filename, ".");
            $type = substr($filename, $dot_pos);
            if($type == ".jpg" || $type == ".jpeg" || $type == ".png" || $type == ".svg") {
                $sourcePath = $file["tmp_name"];
                $targetPath = "../Uploads/".$username."/".$filename;
                move_uploaded_file($sourcePath,$targetPath);

                $name = $_POST["product_name"];
                $category = $_POST["product_category"];
                if ($category == "Kategorie auswählen") { $category = "Sonstiges"; }
                $price = $_POST["product_price"];
                if ($price == "") { $price = "---"; }
                $description = $_POST["product_description"];
                if ($description == "") { $description = "---"; }

                $query = "INSERT INTO produkte(Username, Name, Kategorie, Bild, Preis, Beschreibung) VALUES ('$username','$name','$category','$filename','$price','$description')";
                mysqli_query($db_connect, $query);
                mysqli_close($db_connect);
                echo "true";
                exit();
            }
            mysqli_close($db_connect);
            echo "error1";
	        exit();
        }
        mysqli_close($db_connect);
        echo "error2";
	    exit();
    }
    echo "error3";
	exit();
?>