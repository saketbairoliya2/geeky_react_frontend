function callAction(url, type, json, dataType, successFunction, errorFunction) {
    
    var data = json;
    if (type == "POST") {
        data = JSON.stringify(json);
    }
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        success: successFunction,
        error: errorFunction,
        timeout: 60000,
        contentType: 'application/json; charset=utf-8'
    });
}

$(document).ready(function(){
    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
    });
    $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
    });
});
