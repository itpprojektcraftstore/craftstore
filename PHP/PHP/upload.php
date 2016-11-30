<?php
    session_start();
    $file = $_FILES["file"]; //file ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $targetPath = "../Uploads/".$_SESSION['username']."/".$file["name"];
    move_uploaded_file($sourcePath,$targetPath);
?>