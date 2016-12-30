
$(document).ready(function () {

    generateMain();

    //File-Upload
    $("#form_upload").submit(function () {
        console.log("submit");
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
            console.log(response);
            timestamp_end = new Date();
            time = (timestamp_end - timestamp_start) / 1000;
            console.log(time + "s");
            $("#uploadinfoalert").hide();
            $("#uploadsuccessalert").show();
            setTimeout(function () {
                $("#uploadsuccessalert").hide();
                $("#uploadmodal").modal("hide");
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
        console.log("submit");

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
                resetPreview();
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
    $("#form_upload_myproduct").submit(function () {
        console.log("submit");

        var request = $.ajax({
            url: "PHP/myproduct.php",
            type: "post",
            contentType: false,
            cache: false,
            processData: false,
            data: new FormData(this)
        });
        request.done(function (response, textStatus, jqXHR) {
            generateMain();
            /*  ---HIER---   (PHP File erstellen nicht vergessen) */
            $("#profilbildsuccessalert").show();
            setTimeout(function () {
                $("#profilbildsuccessalert").hide();
                $("#profilbildmodal").modal("hide");
                resetPreview();
            }, 1500);
        });
        return false;
    });

    //Produkt aktualisieren Preview
    $(" #file_profilbild ").change(function () {
        var reader = new FileReader();
        reader.onload = imageIsLoadedProfilbild;
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

function generateMain() {
    var request = $.ajax({
        url: "PHP/getMyProducts.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        var repeat = (dataArray.length - 1) / 2;
        
        var content = "<div class=\"row\">";
        for (i = 0; i < repeat; i++) {
            content += "<div class=\"col-xs-12 col-sm-6 col-md-4\">";
            content += ("<img src=\"Uploads/" + (dataArray[i * 2]) + "/" + (dataArray[i * 2 + 1]) + "\" onclick=\"showMyProduct(this.src)\" class=\"pics_main\">");
            content += "</div>"
        }
        content += "</div>"
        document.getElementsByTagName("main")[0].innerHTML = content;
    });
}

function generateProfil() {
    var request = $.ajax({
        url: "PHP/getUserData.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        console.log(response);
        document.getElementById("username").innerHTML = "Username: "+dataArray[0];
        document.getElementById("name").innerHTML = "Name: "+dataArray[1];
        document.getElementById("email").innerHTML = "E-Mail : "+dataArray[2];
        document.getElementById("adresse").innerHTML = "Adresse: "+dataArray[3];
        document.getElementById("telefonnummer").innerHTML = "Telefonnummer: "+dataArray[4];
        document.getElementById("profilbeschreibung").innerHTML = "Profilbeschreibung: "+dataArray[5];
        console.log("hallo");
        $(" #profilbild ").attr('src', 'Uploads/'+dataArray[0]+'/ProfilProfilProfilbild'+dataArray[7]+dataArray[6]);       
    });
}

function generateProducts(categorie) {
    var request = $.ajax({
        url: "PHP/getProductsByCategorie.php",
        type: "post",
        data: { categorie: categorie }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        var repeat = (dataArray.length - 1) / 2;
        console.log(response);
        content = "<div class=\"row\">";
        for (i = 0; i < repeat; i++) {
            content += "<div class=\"col-xs-12 col-sm-6 col-md-4\">";
            content += ("<img src=\"Uploads/" + (dataArray[i * 2]) + "/" + (dataArray[i * 2 + 1]) + "\" onclick=\"showProduct(this.src)\" class=\"pics_main\">");
            content += "</div>"
        }
        content += "</div>"
        document.getElementsByTagName("main")[0].innerHTML = content;
    });
}

function showProduct(src) {
    var startIndex = src.lastIndexOf("/") + 1;
    src = src.substr(startIndex);

    var request = $.ajax({
        url: "PHP/getProductInformations.php",
        type: "post",
        data: { src: src }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        console.log(response);
        document.getElementById("div_show_product_name").innerHTML = dataArray[0];
        document.getElementById("show_product_productname").innerHTML = dataArray[1];
        document.getElementById("div_show_product_price").innerHTML = dataArray[2];
        document.getElementById("div_show_product_description").innerHTML = dataArray[3];
        document.getElementById("div_show_product_email").innerHTML = dataArray[4];
        if (dataArray[5] == "") { dataArray[5] = "---"; }
        document.getElementById("div_show_product_phone").innerHTML = dataArray[5];
        $("#produktmodal").modal("show");
    });
}

function showMyProduct(src) {
    var startIndex = src.lastIndexOf("/") + 1;
    src = src.substr(startIndex);

    var request = $.ajax({
        url: "PHP/getMyProductInformation.php",
        type: "post",
        data: { src: src }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        console.log(dataArray[0]);
        document.getElementById("tb_myproduct_name").value = dataArray[0];
        document.getElementById("tb_myproduct_category").value = dataArray[1];
        document.getElementById("tb_myproduct_price").value = dataArray[2];
        document.getElementById("tb_myproduct_description").innerHTML = dataArray[3];
        setlength('myproduct');

        $(" #div_preview_myproduct ").css("border", "none");
        $(" #img_preview_myproduct ").attr('src', "Uploads/"+dataArray[4]+"/"+src);
        $(" #img_preview_myproduct ").attr('width', '250px');
        $(" #img_preview_myproduct ").attr('height', '250px');

        $("#meinproduktmodal").modal("show");
    });
}