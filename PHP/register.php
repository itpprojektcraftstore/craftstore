<?php
    $username = $_POST['username'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pw = $_POST['pw'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $description = $_POST['description'];

	$db_connect = mysqli_connect("localhost","root","itp2016!",'craftstore');
    $query = "SELECT Username FROM user WHERE Username = '$username' OR Email ='$email'";
    $result = mysqli_query($db_connect, $query);
    $user = mysqli_fetch_array($result)[0];

    if($user == "") { // only if username & email are still available

        if ($phone == "") { $phone = "---"; }
        if ($description == "") { $description = "---"; }

        $randomstring = 'n2c3gG?f!sXg';
        $salt = $username.$pw.$randomstring;
        $hash = hash('sha256', $salt);

        $query = "INSERT INTO user(Username, Name, Email, Adresse, Telefonnummer, Profilbeschreibung, Hash, Profilbild) 
                VALUES ('$username','$name','$email','$address','$phone','$description','$hash', '.jpg')";
        mysqli_query($db_connect, $query);

        mkdir("../Uploads/".$username);

        $sourcePath = "../Images/standard_profilbild.jpg";
        $targetPath = "../Uploads/".$username."/ProfilProfilProfilbild0.jpg";
        copy($sourcePath,$targetPath); //Standard Profibild speichern

        session_start();
        $_SESSION['username'] = $username;

        echo "true";
    }
    
	mysqli_close($db_connect);
	exit();
?>
