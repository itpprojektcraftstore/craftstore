<?php
    session_start();
    $old_username = $_SESSION['username'];
    $username = $_POST["profil_username"];
    $name = $_POST["profil_name"];
    $email = $_POST["profil_email"];
    $address = $_POST["profil_address"];
    $phone = $_POST["profil_phone"];
    $description = $_POST["profil_description"];

    rename(("../Uploads/".$old_username), ("../Uploads/".$username));
    $_SESSION['username'] = $username;

    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');
    $query = "SELECT Profilbild_Nummer FROM user WHERE Username = '$old_username'";
    $result = mysqli_query($db_connect, $query);
    $nr = mysqli_fetch_array($result)[0];

    $file = $_FILES["file_profil"]; //file_profil ... name attribut in HTML
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

    $query = "UPDATE user SET Username = '$username', Name = '$name', Email = '$email', Adresse = '$address', Telefonnummer = '$phone', Profilbeschreibung = '$description', Profilbild = '$type', Profilbild_Nummer = '$nr' WHERE Username = '$old_username'";
    mysqli_query($db_connect, $query);

    mysqli_close($db_connect);
    echo $username;
	exit();
?>