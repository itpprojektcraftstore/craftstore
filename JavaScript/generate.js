function generateMain() {
    var request = $.ajax({
        url: "PHP/getMyProducts.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        var repeat = (dataArray.length - 1) / 2;
        
        var content = " <div class=\"container\">";          
        content += "<div class=\"vertical-center-row\">";
        content += "<div align=\"center\">";
        content += "<div class=\"col-xs-12 col-sm-6 col-md-4\">";
        content += "<input class=\"pics_main\" type=\"image\" src=\"Images/website_img/uploadbtn.png\" onclick=\"buttonclick('Upload');\" id=\"bt_new_product\" data-toggle=\"modal\" >";
        content += "</div>"

            for (i = 0; i < repeat; i++) {
                content += "<div class=\"col-xs-12 col-sm-6 col-md-4\">";
                content += ("<img src=\"Uploads/" + (dataArray[i * 2]) + "/" + (dataArray[i * 2 + 1]) + "\" onclick=\"showMyProduct(this.src)\" class=\"pics_main\">");
                content += "</div>"
            }
        content += "</div>"       
        content += "</div>"    
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
        document.getElementById("username").innerHTML = "Username: "+dataArray[0];
        document.getElementById("name").innerHTML = "Name: "+dataArray[1];
        document.getElementById("email").innerHTML = "E-Mail : "+dataArray[2];
        document.getElementById("adresse").innerHTML = "Adresse: "+dataArray[3];
        document.getElementById("telefonnummer").innerHTML = "Telefonnummer: "+dataArray[4];
        document.getElementById("profilbeschreibung").innerHTML = "Profilbeschreibung: "+dataArray[5];
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
        var userArray = [ ], srcArray = [ ];
        var repeat = (dataArray.length-1)/2;
        for (i = 0; i < repeat; i++) {
            userArray[i] = dataArray[i * 2];
            srcArray[i] = dataArray[i * 2 + 1];
        }

        //shuffle
        var index, tmp, counter = userArray.length;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter); // Pick a random index
            counter--;

            //swaps the elements
            tmp = userArray[counter];
            userArray[counter] = userArray[index];
            userArray[index] = tmp;

            tmp = srcArray[counter];
            srcArray[counter] = srcArray[index];
            srcArray[index] = tmp;
        }

        content = " <div class=\"container\">";          
        content += "<div class=\"vertical-center-row\">";
        content += " <div align=\"center\">";
        for (i = 0; i < userArray.length; i++) {
            content += "<div class=\"col-xs-12 col-sm-6 col-md-4\">";
            content += ("<img src=\"Uploads/" + userArray[i] + "/" + srcArray[i] + "\" onclick=\"showProduct(this.src)\" class=\"pics_main\">");
            content += "</div>";
        } 
        content += "</div>";
        content += "</div>";
        content += "</div>";
        document.getElementsByTagName("main")[0].innerHTML = content;
    });
}

function showProduct(src_complete) {
    var startIndex = src_complete.lastIndexOf("/") + 1;
    src = src_complete.substr(startIndex);

    var request = $.ajax({
        url: "PHP/getProductInformation.php",
        type: "post",
        data: { src: src }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        document.getElementById("div_show_product_username").innerHTML = dataArray[0];
        document.getElementById("show_product_name").innerHTML = dataArray[1];
        document.getElementById("show_product_productname").innerHTML = dataArray[2];
        document.getElementById("div_show_product_price").innerHTML = dataArray[3]; 
        document.getElementById("div_show_product_description").innerHTML = dataArray[4];
        $(" #img_show_product ").attr('src', src_complete);
        $("#produktmodal").modal("show");
    });
}

function showMyProduct(src) {
    $(" #tb_myproduct_name ").css("border", "1px solid #ccc");
    var startIndex = src.lastIndexOf("/") + 1;
    src = src.substr(startIndex);

    var request = $.ajax({
        url: "PHP/getMyProductInformation.php",
        type: "post",
        data: { src: src }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        document.getElementById("tb_myproduct_name").value = dataArray[0];
        document.getElementById("tb_myproduct_category_old").value = dataArray[1];
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

function show_change_profil() {
    var src = document.getElementById("profilbild").src;
    var startIndex = src.lastIndexOf("/") + 1;
    src = src.substr(startIndex);

    var request = $.ajax({
        url: "PHP/getProfilInformation.php",
        type: "post",
        data: { src: src }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        document.getElementById("tb_profil_name").value = dataArray[1];
        document.getElementById("tb_profil_email").value = dataArray[2];
        document.getElementById("tb_profil_address").value = dataArray[3];
        document.getElementById("tb_profil_phone").value = dataArray[4];
        document.getElementById("tb_profil_description").innerHTML = dataArray[5];
        setlength('profil');
        
        var src = 'Uploads/'+dataArray[0]+'/ProfilProfilProfilbild'+dataArray[7]+dataArray[6];

        $(" #div_preview_profil ").css("border", "none");
        $(" #img_preview_profil ").attr('src', src);
        $(" #img_preview_profil ").attr('width', '250px');
        $(" #img_preview_profil ").attr('height', '250px');

        $("#profilmodal").modal("show");
    });
}

function show_profile() {
    var username = document.getElementById("div_show_product_username").innerHTML;
    var request = $.ajax({
        url: "PHP/getMoreProfilInformation.php",
        type: "post",
        data: { username: username }
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        document.getElementById("show_profile_username").innerHTML = dataArray[0];
        document.getElementById("show_profil_name").innerHTML = dataArray[1];
        document.getElementById("show_profil_email").innerHTML = dataArray[2];
        document.getElementById("show_profil_adresse").innerHTML = dataArray[3];
        document.getElementById("show_profil_phone").innerHTML = dataArray[4];
        document.getElementById("show_profil_description").innerHTML = dataArray[5];
        var src = 'Uploads/'+dataArray[0]+'/ProfilProfilProfilbild'+dataArray[7]+dataArray[6];
        $(" #img_show_profil ").attr('src', src);
        $("#showprofilmodal").modal("show");
    });
}
