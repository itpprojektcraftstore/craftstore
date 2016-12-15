
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
            timestamp_end = new Date();
            time = (timestamp_end - timestamp_start) / 1000;
            console.log(time + "s");
            $("#uploadinfoalert").hide();
            $("#uploadsuccessalert").show();
            setTimeout(function () {
                $("#uploadsuccessalert").hide();
                $("#uploadmodal").modal("hide");
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
});

function imageIsLoaded(e) {
    $(" #div_preview ").css("border", "none");
    $(" #img_preview ").attr('src', e.target.result);
    $(" #img_preview ").attr('width', '250px');
    $(" #img_preview ").attr('height', '250px');
}

function generateMain() {
    var request = $.ajax({
        url: "PHP/getProducts.php",
        type: "post"
    });
    request.done(function (response, textStatus, jqXHR) {
        var dataArray = response.split('|');
        var repeat = (dataArray.length - 1) / 2;

        content = "<div class=\"row\">";
        for (i = 0; i < repeat; i++) {
            content += "<div class=\"col-xs-12 col-sm-6 col-md-4\">";
            content += ("<img src=\"Uploads/" + (dataArray[i * 2]) + "/" + (dataArray[i * 2 + 1]) + "\" class=\"pics_main\">");
            content += "</div>"
        }
        content += "</div>"
        document.getElementsByTagName("main")[0].innerHTML = content;
    });
}