$(function () {

});

function selectUserinfo() {
    var u_id = $("#u_id").val();
    if (/^\d+/.test(u_id)) {
        $.ajax({
            url: "../selectUserInfoById",
            type: "POST",
            dataType: "json",
            data: {"u_id": u_id},
            success: function (data) {
                if (data != "no") {
                    $("#u_ids").html(data.u_id);
                    $("#u_name").html(data.u_name);
                    $("#u_email").html(data.u_email);
                    $("#u_addr").html(data.u_addr);
                    $("#u_zip").html(data.u_zip);
                    $("#u_phone").html(data.u_phone);
                    $("#u_createDate").html(data.u_createDate);
                    $('#showUserInfo').dialog({
                        iconCls: ' icon-save',
                        title: '用户信息',
                        width: 450,
                        height: 350,
                        closed: false,
                        cache: false,
                        modal: true,
                        buttons: '#bb'
                    }).dialog("open").dialog("center");
                } else {
                    $.messager.alert("error", '用户不存在!');
                }
            }
        });
    } else {
        $.messager.alert("error", '不能为空或字符!');
    }
}

function closeDialog() {
    $("#showUserInfo").dialog("close");
}

function deleteUserById() {
    var u_id = $("#u_id").val();
    if (/^\d+$/.test(u_id)) {
        $.messager.confirm('信息提示', '确认要删除吗? ', function (b) {
            if (b) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {"u_id": u_id},
                    url: "../UserServlet?type=deleteUserById",
                    success: function (data) {
                        if (data == "ok") {
                            $.messager.alert('信息提示', '删除成功!', " info");
                        } else {
                            $.messager.alert('信息提示', '删除失败!', "error");
                        }
                    }
                });
            }
        });
    } else {
        $.messager.alert('错误提示', ' id不能为字符串!');
    }
}