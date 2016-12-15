<?php
    session_start();
    $username = $_SESSION['username'];

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Hash FROM user WHERE Username = '$username'";
    $result = mysqli_query($db_connect, $query);
    $hash = mysqli_fetch_array($result)[0];

    $file = $_FILES["file_profilbild"]; //file_profilbild ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $filename = $file["name"];
    $dot_pos = strpos($filename, ".");
    $type = substr($filename, $dot_pos);
    $targetPath = "../Uploads/".$username."/".$hash.$type;
    move_uploaded_file($sourcePath,$targetPath);

    $query = "UPDATE user SET Profilbild = '$type' WHERE Hash = '$hash'";
    mysqli_query($db_connect, $query);

    mysqli_close($db_connect);
	exit();
?>