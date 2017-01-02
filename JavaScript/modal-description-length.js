function setlength(what) {
    /* get length of description field --> length/250 --> html(max length 250)*/
    if (what == 'register') {
        var l = document.getElementById("tb_description_register").value.length;
        document.getElementById("descr_length_register").innerHTML = l+"/250";
    }
    else if (what == 'upload') {
        var l = document.getElementById("tb_product_description").value.length;
        document.getElementById("descr_length_upload").innerHTML = l+"/250";
    }
    else if (what == 'myproduct') {
        var l = document.getElementById("tb_myproduct_description").value.length;
        document.getElementById("descr_length_myproduct").innerHTML = l+"/250";
    }
    else if (what == 'profil') {
        var l = document.getElementById("tb_profil_description").value.length;
        document.getElementById("descr_length_profil").innerHTML = l+"/250";
    }
}