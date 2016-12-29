<?php
    session_start();
    $username = $_SESSION['username'];

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Profilbild_Nummer FROM user WHERE Username = '$username'";
    $result = mysqli_query($db_connect, $query);
    $nr = mysqli_fetch_array($result)[0];

    $file = $_FILES["file_profilbild"]; //file_profilbild ... name attribut in HTML
    $sourcePath = $file["tmp_name"];
    $filename = $file["name"];
    $dot_pos = strpos($filename, ".");
    $type = substr($filename, $dot_pos);

    $deletePath = "../Uploads/".$username."/ProfilProfilProfilbild".$nr.$type;
    unlink($deletePath); //altes Profilbild löschen

    if ($nr == 0) { $nr = 1; } //Profilbild Counter auf 0 oder 1 setzen
    else { $nr = 0; }

    $targetPath = "../Uploads/".$username."/ProfilProfilProfilbild".$nr.$type;
    move_uploaded_file($sourcePath,$targetPath); //neues Profibild speichern

    $query = "UPDATE user SET Profilbild = '$type', Profilbild_Nummer = '$nr' WHERE Username = '$username'";
    mysqli_query($db_connect, $query);

    mysqli_close($db_connect);
	exit();
?>