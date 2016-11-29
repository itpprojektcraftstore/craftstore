function buttonclick(value)
{
    if(value=="Logout"){
        document.getElementById("navbarbtn1").innerHTML="Registrieren";
        document.getElementById("navbarbtn2").innerHTML="Login";
    }
    else if(value=="Einstellungen")
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
}

function categorieclick(value){
    //
}