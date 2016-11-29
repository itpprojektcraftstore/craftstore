var timestamp_start, timestamp_end, time;

$(document).ready(function() {

    $("#form_upload").submit(function() {

        $("#uploadinfoalert").show();
        timestamp_start = new Date();

        var request = $.ajax({
            url: "PHP/upload.php",
            type: "post",
            contentType: false,
            cache: false,
            processData:false,
            data: new FormData(this)
        });
        request.done(function (response, textStatus, jqXHR) {
            timestamp_end = new Date();
            time = (timestamp_end - timestamp_start) / 1000;
            console.log(response);
            console.log(time+"s");
            $("#uploadinfoalert").hide();
            $("#uploadsuccessalert").show();
            setTimeout(function () {
                $("#uploadsuccessalert").hide();
            }, 3000);
        });
        return false;
    });

    $("#file").change(function() {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
    });
});

function imageIsLoaded(e) {
    $("#div_preview").css("border","none");
    $('#img_preview').attr('src', e.target.result);
    $('#img_preview').attr('width', '250px');
    $('#img_preview').attr('height', '230px');
}