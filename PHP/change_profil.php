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

        if ($phone == "") { $phone = "---"; }
        if ($description == "") { $description = "---"; }

        $query = "SELECT Profilbild_Nummer, Profilbild FROM user WHERE Username = '$username'";
        $result = mysqli_query($db_connect, $query);
        $result = mysqli_fetch_array($result);
        $nr = $result[0];
        $type = $result[1];

        $file = $_FILES["file_profil"]; //file_profil ... name attribut in HTML
        $filename = $file["name"];

        if ($filename == "") {
            mysqli_close($db_connect);
            echo "true";
	        exit();
        }
        else {
            $filename = str_replace(" ", "_", $filename);
            $dot_pos = strrpos($filename, ".");
            $type = substr($filename, $dot_pos);
            if(!($type == ".jpg" || $type == ".jpeg" || $type == ".png" || $type == ".svg")) {
                mysqli_close($db_connect);
                echo "error1";
                exit();
            }
        }
        $sourcePath = $file["tmp_name"];
            
        $deletePath = "../Uploads/".$username."/ProfilProfilProfilbild".$nr.$type;
        unlink($deletePath); //altes Profilbild löschen

        $dot_pos = strrpos($filename, ".");
        $type = substr($filename, $dot_pos);

        if ($nr == 0) { $nr = 1; } //Profilbild Counter auf 0 oder 1 setzen
        else { $nr = 0; }

        $targetPath = "../Uploads/".$username."/ProfilProfilProfilbild".$nr.$type;
        move_uploaded_file($sourcePath,$targetPath); //neues Profibild speichern

        $query = "UPDATE user SET Name = '$name', Email = '$email', Adresse = '$address', Telefonnummer = '$phone', Profilbeschreibung = '$description', Profilbild = '$type', Profilbild_Nummer = '$nr' WHERE Username = '$username'";
        mysqli_query($db_connect, $query);

        mysqli_close($db_connect);
        echo "true";
	    exit();
    }
    mysqli_close($db_connect);
    echo "error2";
	exit();
?>