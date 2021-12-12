$(function () {
    selectNorderAll();
    selectUserInfoAll();
});

function selectNorderAll() {
    setDataGrid("../selectNorderAll");
}

//用户下拉列表的数据填充的方法
function selectUserInfoAll() {
    $("#uIds").combobox({
        url: "../selectUserInfoAllToNorder",
        method: "post",
        valueField: 'u_id',
        textField: 'u_name',
        loadFilter: function (data) {
            var first = {u_id: -1, u_name: "UserList"};
            data.unshift(first);
            return data;
        },
        onSelect: function (record) {
            if (record.u_id == -1) {
                selectNorderAll();
            } else {
                var u_id = record.u_id;
                selectNorderByUid(u_id);
            }
        }
    });
    $("#uIds").combobox("setValue", "-1");
}

//相据用户id查询该用户下所有订单的方法
function selectNorderByUid(u_id) {
    setDataGrid("../selectNorderByUid?u_id=" + u_id);
}

//查询所有订单的方法
function setDataGrid(url) {
    $("#norderdg").datagrid({
        titie: 'OrderInformationList',
        iconCls: "icon-edit",
        width: '100%',
        height: 'auto',
        border: true,
        url: url,
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'no_id', title: 'OrderID', sorttable: true, width: '15%'},
            {field: 'u_id', title: 'User', width: '15%', formatter: selectUserInfo},
            {field: 'no_orderdate', title: 'OrderTime', width: '20%', formatter: dateInfo},
            {field: 'no_addr', title: 'OrderAddr', sorttable: true, width: '15%'},
            {field: 'no_sumprice', title: 'TotalPrice', width: '20%'},
            {field: 'formatter', title: 'Edit', width: '8%', formatter: orderdetailInfo}
        ]],
        singleSelect: true,
        checkOnSelect: true,
        pagination: true,
        pageSize: 5,
        pageList: [5, 10, 15, 20],
        rownumbers: true,
        onDblClickRow: onDblClickRow,
        nowrap: false,
        striped: true,
        methond: 'get',
        sortName: 'p_id',
        sortOrder: "desc",
        idFild: 'p_id',
        loadMsg: 'Loading...'
    });
}

//datagrid的行数据双击事件
function onDblClickRow(rowIndex, rowData) {
    updateNorder(rowData);
}

//显示订单所属用户
function selectUserInfo(value, row, index) {
    return row.uId.u_name;
}

//下单时间的格式化
function dateInfo(value, row, index) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + month + "-" + day;
}

//在datagrid中的详情按钮
function orderdetailInfo(value, row, index) {
    return "<a href='javascript:selectOrderdetail(" + row.no_id + ")'style='color:red'>Detail</a>";
}

//修改订单数据的方法
function updateNorder(rowData) {
    var selRows = $("#norderdg").datagrid("getSelected");
    if (selRows != null) {
        rowData = rowData == null ? selRows : rowData;
        $("#NorderDiv").dialog({
            iconCls: 'icon-save',
            title: 'ChangeOrder',
            closed: false,
            cache: false,
            modal: true,
            buttons: '#pp',
            onBeforeOpen: function () {
                selectUser();
                $("#Norderform").form("load", rowData);
                $("#u_id").combobox("select", rowData.uId.u_name);
            }
        }).dialog("open").dialog("center");
    } else {
        $.messager.alert("ErrorMessage", "No row data selected to be modified", "error");
    }
}

//关闭弹窗和清空表单的方法
function doCancle() {
    $("#Norderform").form("clear");
    $("#NorderDiv").dialog("close");
    $("#no_id"), val("0");
}

//查询用户地址（由于之前填充在下拉列表中的用户信息只有ID和用户名
//因此在需要使用到地址数据时需要重新查询)
function selectUser() {
    $("#u_id").combobox({
        url: "../selectUserInfoAllToNorder",
        method: "post",
        valueField: 'u_id',
        textField: 'u_name',
        loadFilter: function (data) {
            var first = {u_id: -1, u_name: "UserList"};
            data.unshift(first);
            return data;
        },
        onSelect: function (record) {
            var u_id = record.u_id;
            var u_addr = selectUserAddr(u_id);
            $('#no_addr').textbox('setValue', u_addr);
        }
    });
    $("#u_id").combobox("setValue", "-1");
}

function selectUserAddr(u_id) {
    var u_addr = "";
    $.ajax({
        type: "get",
        dataType: "json",
        data: {"u_id": u_id},
        async: false,
        url: "../selectUserAddr",
        success: function (data) {
            u_addr = data[0];
        }
    });
    return u_addr;
}


//删除一张订单的方法
function deleteNorder() {
    var selRows = $("norderdg").datagrid("getSelected");
    if (selRows != null) {
        $.messager.confirm("DeleteReminder", "Are you sure you want to delete this data？", function (f) {
            if (f) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {"no_id": selRows.no_id},
                    url: "../daleteNorderById",
                    success: function (data) {
                        if (data == 1) {
                            $.messager.alert("Notification", "successfully deleted！", "info");
                            $("#norderdg").datagrid("reload");
                        } else {
                            $.messager.alert("Notification", "Failed to delete", "info");
                        }
                    }
                });
            }
        });
    } else {
        $.messager.alert("ErrorMessage", "No row data selected to be deleted", "error");
    }
}

//新增订单数据的方法其中调用了查询所有用户的方法
function insertNorder() {
    $("#NorderDiv").dialog({
        iconCls: 'icon-save',
        title: 'AddNewOrder',
        closed: false,
        cache: false,
        modal: true,
        buttons: '#pp',
        onBeforeOpen: function () {
            selectUser();
        }
    }).dialog("open").dialog("center");
}

//新增或修改数据的提交
function submitNorderInfo() {
    var no_id = $("#no_id").val();
    var newPath = "";
    if (no_id == "0") {
        newPatn = "../insertNorder";
    } else {
        newpath = "../updateNorder";
    }

    if ($("#Norderform").form("validate")) {
        $("#Norderform").form("submit", {
            method: "POST",
            url: newPath,
            onSubmit: function (param) {
                //处理数据
                return $(this).form("validate");
            }, success: function (data) {
                if (data == 1) {
                    $.messager.alert("Notification", "SuccessfulOperation！", "info");
                    doCanale();
                    $("#norderdg").datagrid("reload");
                } else {
                    $.messager.alert("Notification", "OperationFailed！", "error");
                }
            }
        });
    } else {
        $.messager.alert("ErrorMessage", "Form validation failed", "error");

    }
}

