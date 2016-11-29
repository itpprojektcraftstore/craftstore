<?php
    $file = $_FILES["file"]; //file ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $targetPath = "../Uploads/".$file["name"];
    $r = move_uploaded_file($sourcePath,$targetPath);
    echo getcwd()."|".$r."|".$sourcePath."|".$targetPath;
?>