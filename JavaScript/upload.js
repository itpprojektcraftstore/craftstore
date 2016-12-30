
$(document).ready(function () {

    generateMain();

    //File-Upload
    $("#form_upload").submit(function () {
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
            console.log(time + "s");
            $("#uploadinfoalert").hide();
            $("#uploadsuccessalert").show();
            setTimeout(function () {
                $("#uploadsuccessalert").hide();
                $("#uploadmodal").modal("hide");
                document.getElementById("tb_product_name").value = "";
                document.getElementById("tb_product_price").value = "";
                document.getElementById("tb_product_description").value = "";
                resetPreview();
            }, 1500);
        });
        return false;
    });

    //File-Preview
    $(" #file ").change(function () {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
    });

    //Profilbild-Upload
    $("#form_upload_profilbild").submit(function () {
        var request = $.ajax({
            url: "PHP/profilbild.php",
            type: "post",
            contentType: false,
            cache: false,
            processData: false,
            data: new FormData(this)
        });
        request.done(function (response, textStatus, jqXHR) {
            generateProfil();
            
            $("#profilbildsuccessalert").show();
            setTimeout(function () {
                $("#profilbildsuccessalert").hide();
                $("#profilbildmodal").modal("hide");
                resetPreviewProfilbild();
            }, 1500);
        });
        return false;
    });

    //Profilbild-Preview
    $(" #file_profilbild ").change(function () {
        var reader = new FileReader();
        reader.onload = imageIsLoadedProfilbild;
        reader.readAsDataURL(this.files[0]);
    });

    //Produkt aktualisieren
    $( "#form_upload_myproduct" ).submit(function () {
        var request = $.ajax({
            url: "PHP/myProduct.php",
            type: "post",
            contentType: false,
            cache: false,
            processData: false,
            data: new FormData(this)
        });
        request.done(function (response, textStatus, jqXHR) {
            generateMain();
            $("#myproductsuccessalert").show();
            setTimeout(function () {
                $("#myproductsuccessalert").hide();
                $("#meinproduktmodal").modal("hide");
                resetPreviewMyProduct();
            }, 1000);
        });
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

function imageIsLoadedProfilbild(e) {
    $(" #div_preview_profilbild ").css("border", "none");
    $(" #img_preview_profilbild ").attr('src', e.target.result);
    $(" #img_preview_profilbild ").attr('width', '250px');
    $(" #img_preview_profilbild ").attr('height', '250px');
}

function resetPreviewProfilbild() {
    $(" #div_preview_profilbild ").css("border", "1px solid");
    $(" #img_preview_profilbild ").attr('src', '');
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