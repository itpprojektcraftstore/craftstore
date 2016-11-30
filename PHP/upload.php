<?php
    session_start();
    $username = $_SESSION['username'];
    $file = $_FILES["file"]; //file ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $filename = $file["name"];
    $targetPath = "../Uploads/".$username."/".$filename;
    move_uploaded_file($sourcePath,$targetPath);

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "INSERT INTO produkte(Username, Bild) VALUES ('$username','$filename')";
    mysqli_query($db_connect, $query);
    mysqli_close($db_connect);
	exit();
?>