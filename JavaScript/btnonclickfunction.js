
$(document).ready(function () {
    $("#navbarbtn1").click(function() { buttonclick(this.innerHTML); });
    $("#navbarbtn2").click(function() { buttonclick(this.innerHTML); });
    $("#navbarbtn3").click(function() { buttonclick(this.innerHTML); });
    $("#navbarbtn4").click(function() { buttonclick(this.innerHTML); });
    $("#categoriedropdown").click(function() { buttonclick("dropdown"); });
    $("#bt_change_password").click(function() { changePassword(); });
});

function buttonclick(value)
{
    if(value=="Logout"){
        logout();
    }
    else if(value=="Profil")
    {
        var main = document.getElementsByTagName("main")[0];
        
        //ladet .html-Datei vom File und pusht es ins main
        $.get('profil.html', function(data) {            
            main.innerHTML=data;
            generateProfil(function(){});
        });

        $( "#navbarbtn1" ).css('border-bottom', 'none');
        $( "#navbarbtn2" ).css('border-bottom', 'none');
        $( "#navbarbtn3" ).css('border-bottom', '2px solid rgb(51,122,183)');
        $( "#navbarbtn4" ).css('border-bottom', 'none');
    }
    else if(value=="Meine Produkte")
    {
        generateMain();
        
        $( "#navbarbtn1" ).css('border-bottom', '2px solid rgb(51,122,183)');
        $( "#navbarbtn2" ).css('border-bottom', 'none');
        $( "#navbarbtn3" ).css('border-bottom', 'none');
        $( "#navbarbtn4" ).css('border-bottom', 'none');
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
    else if(value=="Change_Profil") {
        show_change_profil();
    }
    else if(value=="Suchen") {
        generateProducts("Alle Kategorien");
        $( "#navbarbtn1" ).css('border-bottom', 'none');
        $( "#navbarbtn2" ).css('border-bottom', '2px solid rgb(51,122,183)');
        $( "#navbarbtn3" ).css('border-bottom', 'none');
        $( "#navbarbtn4" ).css('border-bottom', 'none');
    }
    else if(value=="dropdown") {
        $( "#navbarbtn1" ).css('border-bottom', '');
        $( "#navbarbtn2" ).css('border-bottom', '2px solid rgb(51,122,183)');
        $( "#navbarbtn3" ).css('border-bottom', 'none');
        $( "#navbarbtn4" ).css('border-bottom', 'none');
    }
    else if(value=='Change_Password') {
        document.getElementById("tb_change_passowrd_old").value = "";
        document.getElementById("tb_change_passowrd_new").value = "";
        document.getElementById("tb_change_passowrd_repeat").value = "";
        $("#changepasswordmodal").modal("show");
    }
}

function categorieclick(value){
    var startIndex = value.lastIndexOf(">") + 2;
    var categorie = value.substr(startIndex);
    generateProducts(categorie);
}