
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
        
        //ladet .html-Datei vom File und pusht es ins main
        $.get('profil.html', function(data) {            
            main.innerHTML=data;
        });

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