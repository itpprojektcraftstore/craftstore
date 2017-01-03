
$(document).ready(function () {

    generateMain();

    //File-Upload
    $("#form_upload").submit(function () {
        $(" #tb_product_name ").css("border", "1px solid #ccc");
        if(document.getElementById("tb_product_name").value == "") {
            $(" #tb_product_name ").css("border", "1px solid red");
        }
        else {
            $("#uploadinfoalert").show();
            var timestamp_start, timestamp_end, time;
            timestamp_start = new Date();

            var request = $.ajax({
                url: "PHP/upload.php",
                type: "post",
                contentType: false,
                cache: false,
                processData: false,
                data: new FormData(this)
            });
            request.done(function (response, textStatus, jqXHR) {
                timestamp_end = new Date();
                time = (timestamp_end - timestamp_start) / 1000;
                //console.log(time + "s");
                $("#uploadinfoalert").hide();
                if (response == "true") {
                    generateMain();
                    $("#uploadsuccessalert").show();
                    setTimeout(function () {
                        $("#uploadsuccessalert").hide();
                        $("#uploadmodal").modal("hide");
                        document.getElementById("tb_product_name").value = "";
                        document.getElementById("tb_product_price").value = "";
                        document.getElementById("tb_product_description").value = "";
                        resetPreview();
                    }, 1500);
                }
                else if (response == "error1") {
                    $("#uploadfailedalert1").show();
                    setTimeout(function () {
                        $("#uploadfailedalert1").hide();
                    }, 2000);
                }
                else if (response == "error2"){
                    $("#uploadfailedalert2").show();
                    setTimeout(function () {
                        $("#uploadfailedalert2").hide();
                    }, 2000);
                }
                else if (response == "error3"){
                    $("#uploadfailedalert3").show();
                    setTimeout(function () {
                        $("#uploadfailedalert3").hide();
                    }, 2000);
                }
            });
        }
        return false;
    });

    //File-Preview
    $(" #file ").change(function () {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
    });

    //Profil bearbeiten
    $("#form_change_profil").submit(function () {
        $(" #tb_profil_name ").css("border", "1px solid #ccc");
        $(" #tb_profil_email ").css("border", "1px solid #ccc");
        $(" #tb_profil_address ").css("border", "1px solid #ccc");
        var check = 0;
        if(document.getElementById("tb_profil_name").value == "") {
            $(" #tb_profil_name ").css("border", "1px solid red");
            check++;
        }
        if(document.getElementById("tb_profil_email").value == "") {
            $(" #tb_profil_email ").css("border", "1px solid red");
            check++;
        }
        if(document.getElementById("tb_profil_address").value == "") {
            $(" #tb_profil_address ").css("border", "1px solid red");
            check++;
        }
        if (check == 0) {
            var request = $.ajax({
                url: "PHP/change_profil.php",
                type: "post",
                contentType: false,
                cache: false,
                processData: false,
                data: new FormData(this)
            });
            request.done(function (response, textStatus, jqXHR) {
                if (response == "true") {
                    $("#profilsuccessalert").show();
                    setTimeout(function () {
                        $("#profilsuccessalert").hide();
                        $("#profilmodal").modal("hide");
                        resetPreviewProfil();
                    }, 1000);
                    generateProfil();
                }
                else if (response == "error1") {
                    $("#profilfailedalert1").show();
                    setTimeout(function () {
                        $("#profilfailedalert1").hide();
                    }, 2000);
                }
                else if (response == "error2") {
                    $("#profilfailedalert2").show();
                    setTimeout(function () {
                        $("#profilfailedalert2").hide();
                    }, 2000);
                }
            });
        }
        return false;
    });

    //Profilbild-Preview
    $(" #file_profil ").change(function () {
        var reader = new FileReader();
        reader.onload = imageIsLoadedProfil;
        reader.readAsDataURL(this.files[0]);
    });

    //Produkt aktualisieren
    $( "#form_upload_myproduct" ).submit(function () {
        $(" #tb_myproduct_name ").css("border", "1px solid #ccc");
        if(document.getElementById("tb_myproduct_name").value == "") {
            $(" #tb_myproduct_name ").css("border", "1px solid red");
        }
        else {
            var request = $.ajax({
                url: "PHP/change_myProduct.php",
                type: "post",
                contentType: false,
                cache: false,
                processData: false,
                data: new FormData(this)
            });
            request.done(function (response, textStatus, jqXHR) {
                if (response == "true") {
                    generateMain();
                    $("#myproductsuccessalert").show();
                    setTimeout(function () {
                        $("#myproductsuccessalert").hide();
                        $("#meinproduktmodal").modal("hide");
                        resetPreviewMyProduct();
                    }, 1000);
                }
                else if (response = "error1") {
                    $("#myproductfailedalert1").show();
                    setTimeout(function () {
                        $("#myproductfailedalert1").hide();
                    }, 2000);
                }
                else if (response = "error2") {
                    $("#myproductfailedalert2").show();
                    setTimeout(function () {
                        $("#myproductfailedalert2").hide();
                    }, 2000);
                }
            });
        }
        return false;
    });

    //Produkt aktualisieren Preview
    $(" #file_myproduct ").change(function () {
        var reader = new FileReader();
        reader.onload = imageIsLoadedMyProduct;
        reader.readAsDataURL(this.files[0]);
    });
});

function imageIsLoaded(e) {
    $(" #div_preview ").css("border", "none");
    $(" #img_preview ").attr('src', e.target.result);
    $(" #img_preview ").attr('width', '250px');
    $(" #img_preview ").attr('height', '250px');
}

function resetPreview() {
    $(" #div_preview ").css("border", "1px solid");
    $(" #img_preview ").attr('src', '');
}

function imageIsLoadedProfil(e) {
    $(" #div_preview_profil ").css("border", "none");
    $(" #img_preview_profil ").attr('src', e.target.result);
    $(" #img_preview_profil ").attr('width', '250px');
    $(" #img_preview_profil ").attr('height', '250px');
}

function resetPreviewProfil() {
    $(" #div_preview_profil ").css("border", "1px solid");
    $(" #img_preview_profil ").attr('src', '');
}

function imageIsLoadedMyProduct(e) {
    $(" #div_preview_myproduct ").css("border", "none");
    $(" #img_preview_myproduct ").attr('src', e.target.result);
    $(" #img_preview_myproduct ").attr('width', '250px');
    $(" #img_preview_myproduct ").attr('height', '250px');
}

function resetPreviewMyProduct() {
    $(" #div_preview_myproduct ").css("border", "1px solid");
    $(" #img_preview_myproduct ").attr('src', '');
}