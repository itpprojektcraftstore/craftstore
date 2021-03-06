
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
    
    document.getElementById("navbarbtn1").style.display = "none";
});

function register() {
    $(" #tb_user_register ").css("border", "1px solid #ccc");
    $(" #tb_name_register ").css("border", "1px solid #ccc");
    $(" #tb_email_register ").css("border", "1px solid #ccc");
    $(" #tb_pw_register ").css("border", "1px solid #ccc");
    $(" #tb_address_register ").css("border", "1px solid #ccc");

    var check = 0;
    if(document.getElementById("tb_user_register").value == "") {
        $(" #tb_user_register ").css("border", "1px solid red");
        check++;
    }
    if(document.getElementById("tb_name_register").value == "") {
        $(" #tb_name_register ").css("border", "1px solid red");
        check++;
    }
    if(document.getElementById("tb_email_register").value == "") {
        $(" #tb_email_register ").css("border", "1px solid red");
        check++;
    } 
    if(document.getElementById("tb_pw_register").value == "") {
        $(" #tb_pw_register ").css("border", "1px solid red");
        check++;
    }
    if(document.getElementById("tb_address_register").value == "") {
        $(" #tb_address_register ").css("border", "1px solid red");
        check++;
    } 
    if (check == 0) {
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
                    document.getElementById("navbarbtn1").innerHTML = "Meine Produkte";
                    document.getElementById("navbarbtn1").style.display = "inline-block";
                    document.getElementById("navbarbtn3").innerHTML = "Profil";
                    document.getElementById("navbarbtn4").innerHTML = "Logout";
                    buttonclick("Profil");
                }, 1000);
            }
        });
    }
}

function login() {
    var request = $.ajax({
        url: "PHP/login.php",
        type: "post",
        data: {
            username: document.getElementById("tb_username_login").value,
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
                document.getElementById("tb_username_login").value = "";
                document.getElementById("navbarbtn1").innerHTML = "Meine Produkte"; 
                document.getElementById("navbarbtn1").style.display = "inline-block";
                document.getElementById("navbarbtn3").innerHTML = "Profil";
                document.getElementById("navbarbtn4").innerHTML = "Logout";
                buttonclick("Profil");
            }, 500);
        }
    });
}

function logout() {
    var request = $.ajax({
        url: "PHP/logout.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        document.getElementById("navbarbtn1").innerHTML = "";  
            document.getElementById("navbarbtn1").style.display = "none";
        document.getElementById("navbarbtn3").innerHTML = "Registrieren";
        document.getElementById("navbarbtn4").innerHTML = "Login";
        $( "#navbarbtn1" ).css('border-bottom', 'none');
        $( "#navbarbtn2" ).css('border-bottom', 'none');
        $( "#navbarbtn3" ).css('border-bottom', 'none');
        $( "#navbarbtn4" ).css('border-bottom', 'none'); 
        generateProducts("Alle Kategorien");
    });
}

function isLoggedin() {
    var request = $.ajax({
        url: "PHP/isLoggedin.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        if (response == "true") {
            document.getElementById("navbarbtn1").innerHTML = "Meine Produkte"; 
            document.getElementById("navbarbtn1").style.display = "inline-block";
            document.getElementById("navbarbtn3").innerHTML = "Profil";
            document.getElementById("navbarbtn4").innerHTML = "Logout";
            generateProducts("Alle Kategorien");
        }
    });
}

function delete_account() {
    var request = $.ajax({
        url: "PHP/delete_account.php",
        type: "post",
        data: {
            username: document.getElementById("tb_username_delete").value,
            pw: document.getElementById("tb_pw_delete").value
        }
    });
    request.done(function (response, textStatus, jqXHR) {
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
                document.getElementById("tb_username_delete").value = "";
                document.getElementById("navbarbtn1").innerHTML = "";
                document.getElementById("navbarbtn1").style.display="none";
                document.getElementById("navbarbtn3").innerHTML = "Registrieren";
                document.getElementById("navbarbtn4").innerHTML = "Login";
                $( "#navbarbtn1" ).css('border-bottom', 'none');
                $( "#navbarbtn2" ).css('border-bottom', '2px solid rgb(51,122,183)');
                $( "#navbarbtn3" ).css('border-bottom', 'none');
                $( "#navbarbtn4" ).css('border-bottom', 'none');
                generateProducts("Alle Kategorien");
            }, 500);
        }
    });
}

function changePassword() {
    var old_pw = document.getElementById("tb_change_passowrd_old").value;
    var new_pw = document.getElementById("tb_change_passowrd_new").value;
    var repeat_pw = document.getElementById("tb_change_passowrd_repeat").value;

    if(new_pw != repeat_pw) {
        $("#newpasswordfailedalert").show();
        setTimeout(function () {
            $("#newpasswordfailedalert").hide();
        }, 2000);
    }
    else if ((new_pw == "") || (repeat_pw == "")) {
        $("#emptypasswordfailedalert").show();
        setTimeout(function () {
            $("#emptypasswordfailedalert").hide();
        }, 2000);
    }
    else {
        var request = $.ajax({
            url: "PHP/change_password.php",
            type: "post",
            data: {
                old_pw: old_pw,
                new_pw: new_pw
            }
        });
        request.done(function (response, textStatus, jqXHR) {
            if (response == "true") {
                $("#changepasswordsuccessalert").show();
                setTimeout(function () {
                    $("#changepasswordmodal").modal("hide");
                    $("#changepasswordsuccessalert").hide();
                }, 1000);
            }
            else {
                $("#oldpasswordfailedalert").show();
                setTimeout(function () {
                    $("#oldpasswordfailedalert").hide();
                }, 2000);
            }
        });
    }
}