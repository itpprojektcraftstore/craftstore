$(document).ready(function () { 
    var main = document.getElementsByTagName("main");

        //ladet .html-Datei vom File und pusht es ins main
        $.get('profil.html', function(data) {
            main.innerHTML=data;
        });
});