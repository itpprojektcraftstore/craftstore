
$(document).ready(function () {
    isLoggedin();
    $("#bt_login").click(function () { login(); });
    //login on enter press
    $('#tb_pw_login').on('keypress', function (e) {
            if(e.which === 13){
                login();
            }
    });
    $("#bt_register").click(function () { register(); });
    $("#bt_delete_account").click(function () { delete_account(); });
});

function register() {
    var request = $.ajax({
        url: "PHP/register.php",
        type: "post",
        data: {
            username: document.getElementById("tb_user_register").value,
            name: document.getElementById("tb_name_register").value,
            email: document.getElementById("tb_email_register").value,
            pw: document.getElementById("tb_pw_register").value,
            address: document.getElementById("tb_address_register").value,
            phone: document.getElementById("tb_phone_register").value,
            description: document.getElementById("tb_description_register").value
        }
    });
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        if (response != "true") {
            $("#registrationfailedalert").show();
            setTimeout(function () {
                $("#registrationfailedalert").hide();
            }, 3000); 
        }
        else {
            $("#registrationfailedalert").hide();
            $("#registrationsuccessalert").show()
            setTimeout(function () {
                $("#registrationmodal").modal("hide");
                $("#registrationsuccessalert").hide();
                document.getElementById("tb_user_register").value = "";
                document.getElementById("tb_name_register").value = "";
                document.getElementById("tb_email_register").value = "";
                document.getElementById("tb_pw_register").value = "";
                document.getElementById("tb_address_register").value = "";
                document.getElementById("tb_phone_register").value = "";
                document.getElementById("tb_description_register").value = "";
                document.getElementById("navbarbtn1").innerHTML = "Profil";
                document.getElementById("navbarbtn2").innerHTML = "Logout";
            }, 1000);
        }
    });
}

function login() {
    var request = $.ajax({
        url: "PHP/login.php",
        type: "post",
        data: {
            email: document.getElementById("tb_email_login").value,
            pw: document.getElementById("tb_pw_login").value
        }
    });
    request.done(function (response, textStatus, jqXHR) {
        if (response == "false") {
            $("#loginfailedalert").show();
            setTimeout(function () {
                $("#loginfailedalert").hide();
            }, 3000);
        }
        else {
            $("#loginfailedalert").hide();
            $("#loginsuccessalert").show();
            setTimeout(function () {
                $("#loginmodal").modal("hide");
                $("#loginsuccessalert").hide();
                document.getElementById("tb_pw_login").value = "";
                document.getElementById("tb_email_login").value = "";
                document.getElementById("navbarbtn1").innerHTML = "Profil";
                document.getElementById("navbarbtn2").innerHTML = "Logout";
                generateMain();
            }, 500);
        }
    });
}

function isLoggedin() {
    var request = $.ajax({
        url: "PHP/isLoggedin.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        if (response == "true") {
            document.getElementById("navbarbtn1").innerHTML = "Profil";
            document.getElementById("navbarbtn2").innerHTML = "Logout";
        }
    });
}

function delete_account() {
    var request = $.ajax({
        url: "PHP/delete.php",
        type: "post",
        data: {
            email: document.getElementById("tb_email_delete").value,
            pw: document.getElementById("tb_pw_delete").value
        }
    });
    request.done(function (response, textStatus, jqXHR) {
        console.log(response);
        if (response != "true") {
            $("#deleteaccountfailedalert").show();
            setTimeout(function () {
                $("#deleteaccountfailedalert").hide();
            }, 3000);
        }
        else {
            $("#deleteaccountfailedalert").hide();
            $("#deleteaccountsuccessalert").show();
            setTimeout(function () {
                $("#deleteaccountmodal").modal("hide");
                $("#deleteaccountsuccessalert").hide();
                document.getElementById("tb_pw_delete").value = "";
                document.getElementById("tb_email_delete").value = "";
                document.getElementById("navbarbtn1").innerHTML = "Registrieren";
                document.getElementById("navbarbtn2").innerHTML = "Login";
                generateMain();
            }, 500);
        }
    });
}