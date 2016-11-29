function buttonclick(value)
{
    if(value=="Logout"){
        document.getElementById("navbarbtn1").innerHTML="Registrieren";
        document.getElementById("navbarbtn2").innerHTML="Login";
    }
    else if(value=="Profil")
    {
        console.log("test");
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
}

function categorieclick(value){
    //
}