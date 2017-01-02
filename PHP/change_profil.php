<?php
    session_start();
    $db_connect = mysqli_connect('localhost','root','itp2016!','craftstore');

    $username = $_SESSION['username'];
    $old_email = $_SESSION['email'];
    $src = $_SESSION['old_source'];

    $name = $_POST["profil_name"];
    $email = $_POST["profil_email"];
    $address = $_POST["profil_address"];
    $phone = $_POST["profil_phone"];
    $description = $_POST["profil_description"];
    $user = "";

    if ($email != $old_email) { //wenn email verändert wurde
        $query = "SELECT Username FROM user WHERE Email ='$email'";
        $result = mysqli_query($db_connect, $query);
        $user = mysqli_fetch_array($result)[0];
    }

    if($user == "") { // only if email is still available

        $query = "SELECT Profilbild_Nummer FROM user WHERE Username = '$username'";
        $result = mysqli_query($db_connect, $query);
        $nr = mysqli_fetch_array($result)[0]; 

        $file = $_FILES["file_profil"]; //file_profil ... name attribut in HTML
        $filename = $file["name"];

        if ($filename == "") { 
            $filename = $src;
            $dot_pos = strpos($filename, ".");
            $type = substr($filename, $dot_pos);
        }
        else {
            $sourcePath = $file["tmp_name"];
            
            $dot_pos = strpos($filename, ".");
            $type = substr($filename, $dot_pos);

            $deletePath = "../Uploads/".$username."/ProfilProfilProfilbild".$nr.$type;
            unlink($deletePath); //altes Profilbild löschen

            if ($nr == 0) { $nr = 1; } //Profilbild Counter auf 0 oder 1 setzen
            else { $nr = 0; }

            $targetPath = "../Uploads/".$username."/ProfilProfilProfilbild".$nr.$type;
            move_uploaded_file($sourcePath,$targetPath); //neues Profibild speichern
        }

        $query = "UPDATE user SET Name = '$name', Email = '$email', Adresse = '$address', Telefonnummer = '$phone', Profilbeschreibung = '$description', Profilbild = '$type', Profilbild_Nummer = '$nr' WHERE Username = '$username'";
        mysqli_query($db_connect, $query);
    }
    mysqli_close($db_connect);
    echo $filename.".".$type;
	exit();
?>