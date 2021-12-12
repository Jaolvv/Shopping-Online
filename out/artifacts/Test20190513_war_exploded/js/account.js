$(function () {

});

login = function () {
    var u_name1 = $("#u_name1").val();
    var u_password1 = $("#u_password1").val();

    if (u_name1 != "" && u_password1 != "") {
        $.ajax({
            url: "./UserLogin",
            type: "POST",
            dataType: " json",
            data: {"u_name1": u_name1, "u_password1": u_password1},
            async: false,
            success: function (data) {
                if (data[0] == "ok") {
                    layer.open({title: '消息提示', content: '欢迎' + u_name1 + '登录', offset: '100p×'});
                    location.href = "./index.jsp";
                } else {
                    $("#s1").html("<font color='red'>用户名或密码错误<font>");
                    return false;
                }
            }
        });
    } else {
        $("#s1").html("<font color='red'>用户名或密码不能为空<font>");
        return false;
    }

}


regUser = function () {
    var u_name = document.getElementById("u_name").value;
    var u_password = $("#u_password").val();
    var u_email = $("#u_email").val();
    var u_addr = $("#u_addr").val();
    var u_zip = $("#u_zip").val();
    var u_phone = $("#u_phone").val();

    $.ajax({
        url: "./regUser",
        type: "post",
        dataType: "json",
        data: {
            "u_name": u_name,
            "u_password": u_password,
            "u_email": u_email,
            "u_addr": u_addr,
            "u_zip": u_zip,
            "u_phone": u_phone
        },
        success: function (data) {
            if (data == 1) {
                layer.open({title: '成功提示', content: '注册成功! ', offset: '100p×'});
            } else {
                layer.open({title: '错误提示', content: '注册失败! ', offset: '100p×'});
            }
        }


    });
}




