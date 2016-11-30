
$(document).ready(function () {
    $("#navbarbtn1").click(function() { buttonclick(this.innerHTML); });
    $("#navbarbtn2").click(function() { buttonclick(this.innerHTML); });
});

function buttonclick(value)
{
    if(value=="Logout"){
        document.getElementById("navbarbtn1").innerHTML="Registrieren";
        document.getElementById("navbarbtn2").innerHTML="Login";        
        var request = $.ajax({
            url: "PHP/logout.php",
            type: "post"
        });
        request.done(function (response, textStatus, jqXHR) {
            generateMain();
        });
    }
    else if(value=="Profil")
    {
        var main = document.getElementsByTagName("main")[0];
        main.innerHTML = "<input type=\"image\" src=\"Images/website_img/uploadbtn.png\" onclick=\"buttonclick('Upload');\" data-toggle=\"modal\" height=\"100px\" width=\"100px\" >";
        main.innerHTML += "<button type=\"button\" class=\"btn bluewhitebutton\" onclick=\"buttonclick('Delete_Account');\" style=\"margin: 0px 0px 90px 60px;\">Account löschen</button>";
        var navb1= document.getElementById("navbarbtn1");
        navb1.innerHTML="Meine Produkte";
        navb1.style.width = "130px";
    }
    else if(value=="Meine Produkte")
    {
        generateMain();
        var navb1= document.getElementById("navbarbtn1");
        navb1.innerHTML="Profil";
        navb1.style.width = "100px"; 
    }
    else if(value=="Login")
    {        
        $("#loginmodal").modal("show");
    }
    else if(value=="Registrieren")
    {        
        $("#registrationmodal").modal("show");
    }
    else if(value=="Upload")
    {
        $("#uploadmodal").modal("show");
    }
    else if(value=="Delete_Account")
    {
        $("#deleteaccountmodal").modal("show");
    }
}

function categorieclick(value){
    //
}