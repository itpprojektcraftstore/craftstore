 $(document).ready(function(){
    $("#bt_login").click(function(){ login(); });
    $("#bt_delete").click(function(){ deleteUser(); });
    $("#bt_register").click(function(){ register(); });
});

function register() {
    var request = $.ajax({
        url: "PHP/register.php",
        type: "post",
        data: { username: document.getElementById("tb_user_register").value,
                name: document.getElementById("tb_name_register").value,
                email: document.getElementById("tb_email_register").value,
                pw: document.getElementById("tb_pw_register").value,
                address: document.getElementById("tb_address_register").value,
                phone: document.getElementById("tb_phone_register").value,
                description: document.getElementById("tb_description_register").value}
    });
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
       if (response == "true") {
           document.getElementById("output_register").innerHTML = "Sie haben sich erfolgreich registriert!";
       }
       else {
           document.getElementById("output_register").innerHTML = "Registrierung fehlgeschlagen!<br>Username und/oder Email ist leider schon vergeben!";
       }
       document.getElementById("output_login").innerHTML = "";
    });
}

function login() {
    var request = $.ajax({
        url: "PHP/login.php",
        type: "post",
        data: { email: document.getElementById("tb_email_login").value,
                pw: document.getElementById("tb_pw_login").value}
    });
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
       if (response == "false") {
           document.getElementById("output_login").innerHTML = "Login fehlgeschlagen!";
       }
       else {
           document.getElementById("output_login").innerHTML = "Login erfolgreich!";
       }
       document.getElementById("output_register").innerHTML = "";        
    });
}

function deleteUser() {
    var request = $.ajax({
        url: "PHP/delete.php",
        type: "post",
        data: { email: document.getElementById("tb_email_register").value }
    });
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        document.getElementById("output_register").innerHTML = "Löschen abgeschlossen!";
        document.getElementById("output_login").innerHTML = "";     
    });
}
