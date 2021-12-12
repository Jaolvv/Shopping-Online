$(function () {
    selectUserInfoAll();
});

function selectUserInfoAll() {
    selectData('../selectUserInfoAll');
}

function selectSearchUserInfo() {
    var keyWord = $("#keyWord").val();
    selectData('../selectSearchUserInfoAll?keyWord=' + keyWord);
}

function selectData(url) {
    $("#userdg").datagrid({
        title: '用户信息列表',
        iconCls: 'icon-edit',
        width: '100%',
        heigth: 'auto',
        border: true,
        url: url,
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'u_id', title: 'ID', sorttable: true, width: '10%'},
            {field: 'u_name', title: 'Name', width: '15%'},
            {field: 'u_email', title: 'Email', width: '15%'},
            {field: 'u_addr', title: 'Addr', width: '20%'},
            {field: 'u_zip', title: 'Postcode', width: '10%'},
            {field: 'u_phone', title: 'Phone', width: '10%'},
            {field: 'u_createDate', title: 'RegistrationTime', width: '10%', formatter: dateFormatter},
            {
                field: 'formatter', title: 'Edit', align: 'center',
                halign: 'center', width: '10%', formatter: selectUser
            }
        ]],
        pagination: true,
        pageSize: 5,
        pageList: [5, 10, 15, 20],
        rownumbers: true,
        nowrap: false,
        striped: true,
        onDblClickRow: onDblClick,
        method: 'get',
        sortName: 'u_id',
        sortOrder: 'desc',
        idFild: 'u_id',
        loadMsg: 'Loading...'
    });
}

function dateFormatter(value) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + month + "-" + day;
}

function selectUser(value, row, index) {
    //value值:列对象本身
    //row：当前行数据，对象点属性名
    //index：当前页第几行的索引从0开始
    return "<a href='javascript:selectUserId(" + index + ")' style='color:Blue'>详情</a>";
}

function selectUserId(index) {
    var rows = $("#userdg").datagrid("getRows");
    var row = rows[index];
    $("#uids").html(row.u_id);
    $("#uname").html(row.u_name);
    $("#uemail").html(row.u_email);
    $("#uaddr").html(row.u_addr);
    $("#uzip").html(row.u_zip);
    $("#uphone").html(row.u_phone);
    $("#ucreateDate").html(row.u_createDate);
    $('#showUserInfo').dialog({
        iconCls: 'icon-save',
        title: '用户信息',
        width: 450,
        height: 350,
        closed: false,
        cache: false,
        modal: true,
        buttons: '#aa'
    }).dialog("open").dialog("center");
}

function onDblClick(rowIndex, rowData) {
    $("#userdg").datagrid("checkRow", rowIndex);
    updateUserInfo(rowData);
}

function closeDialog() {
    $("#showUserInfo").dialog("close");
}

function updateUserInfo(rowData) {
    var selRows = $("#userdg").datagrid("getSelections");
    if (selRows.length == 1) {
        rowData = rowData == null ? selRows[0] : rowData;
        $("#usersDiv").dialog({
            iconCls: 'icon-save',
            title: '修改用户',
            closed: false,
            cache: false,
            modal: true,
            buttons: '#bb',
            onOpen: function () {
                $("#userUpdateform").form("load", rowData);
            }
        }).dialog("open").dialog("center");
    } else if (selRows.length == 0) {
        $.messager.alert("错误信息", "没有选择要修改的行数据", "error");
    } else {
        $.messager.alert("错误信息", "修改不能选择多行", "error");
    }
}

function doCancle() {
    $("#userUpdateform").form("clear");
    $("#usersDiv").dialog("close");
}

function insertUserInfo() {
    $("#usersDiv").dialog({
        iconCls: 'icon-save',
        title: '添加用户',
        closed: false,
        cache: false,
        modal: true,
        buttons: '#bb',
        onOpen: function () {
            $("#userUpdateform").form("clear");
            $("#u_id").val("0");
        }
    }).dialog("open").dialog("center");
}

function submitUserInfo() {
    var uid = $("#u_id").val();
    var newPath = "";
    if (uid == 0) {
        newPath = "../insertUserInfo";
    } else {
        newPath = "../updateUserInfo";
    }
    if ($("#userUpdateform").form("validate")) {
        $("#userUpdateform").form("submit", {
            method: "POST",
            url: newPath,
            onSubmit: function (param) {
                //处理数据
                return $(this).form("validate");
            }, success: function (data) {
                if (data == 1) {
                    $.messager.alert("消息提示", "操作成功！", "info");
                    doCancle();
                    selectUserInfoAll();
                } else {
                    $.messager.alert("消息提示", "操作失败！", "error");
                }
            }
        });
    } else {
        $.messager.alert("错误信息", "表单验证未通过", "error");
    }
}

function deleteUserInfo() {
    var selRows = $("#userdg").datagrid("getSelections");
    if (selRows.length == 1) {
        $.messager.confirm('信息提示', '确认要删除吗？', function (b) {
            if (b) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {"u_id": selRows[0].u_id},
                    url: "../deleteUserById",
                    success: function (data) {
                        if (data == 1) {
                            $.messager.alert('信息提示', '删除成功!', "info");
                            selectUserInfoAll();
                        } else {
                            $.messager.alert('信息提示', '删除失败!', "error");
                        }
                    }
                });
            }
        });
    } else if (selRows.length == 0) {
        $.messager.alert("消息提示", "没有选择要删除的用户数据", "info");
    } else {
        $.messager.alert("消息提示", "请选择一条用户数据删除", "info");
    }
}

