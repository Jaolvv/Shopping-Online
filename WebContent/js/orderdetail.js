$(function () {
    $('#quantity').textbox({
        onChange: function () {
            var p_id = $("#p_id").combobox("getValue");
            var p_price = selectProductPrice(p_id);
            var num = $(this).textbox("getValue");
            $("#price").textbox("setValue", (p_price * num));
        }
    });
});

function norderInfo(value, row, index) {
    return row.noId.no_id;
}

var noooooid = 0;

function selectOrderdetail(no_id) {
    noooooid = no_id;
    $("#orderdetailDiv").dialog({
        iconCls: 'icon-save',
        title: 'DetailedDetails',
        closed: false,
        cache: false,
        modal: true,
        buttons: '#aa',
        onBeforeOpen: function () {
            $("#orderdetaildg").datagrid({
                title: 'DetailedList',
                iconCls: 'icon-edit',
                width: '100%',
                height: 'auto',
                border: true,
                queryParams: {"no_id": no_id},
                url: "../selectOrderdetailByNoid",
                columns: [[
                    {field: 'ck', checkbox: true},
                    {field: 'o_id', title: 'DetailID', sorttable: true, width: '18%'},
                    {field: 'no_id', title: 'OrderID', width: '20%', formatter: norderInfo},
                    {field: 'p_name', title: 'Product', width: '20%', formatter: productInfo},
                    {field: 'quantity', title: 'Quantity', sorttable: true, width: '20%'},
                    {field: 'price', title: 'DetailedTotalPrice', width: '20%'}
                ]],
                singleSelect: true,
                checkOnSelect: true,
                pagination: true,
                pageSize: 5,
                pageList: [5, 10, 15, 20],
                rownumbers: true,
                onDblClickRow: dblClickRows,
                nowrap: false,
                striped: true,
                method: 'get',
                sortName: 'o_id',
                sortOrder: 'desc',
                idFiled: 'o_id',
                loadMsg: 'Loading...'
            });
        }
    }).dialog("open").dialog("center");
}


function productInfo(value, row, index) {
    return row.pId.p_name;
}

function doCancle2() {
    $("#norderdg").datagrid("reload");
    $("#orderdetailDiv").dialog("close");
}

function doCancle3() {
    $("#noid").textbox({disabled: false});
    $("#orderform").form("clear");
    $("#orderDiv").dialog("close");
    $("#o_id").val("0");
}

function dblClickRows(rowIndex, rowData) {
    updateOrderdetail(rowData);
}

function updateOrderdetail(rowData) {
    $("#noid").textbox({disabled: true});
    var selRows = $("#orderdetaildg").datagrid("getSelected");
    if (selRows != null) {
        rowData = rowData == null ? selRows : rowData;
        $("#orderDiv").dialog({
            iconCls: 'icon-save',
            title: 'ModifyDetails',
            closed: false,
            cache: false,
            modal: true,
            buttons: '#ww',
            onBeforeOpen: function () {
                selectProducts();
                $("#orderform").form("load", rowData);
                $("#noid").textbox("setValue", noooooid);
                $("#p_id").combobox("setValue", noooooid);
            }
        }).dialog("open").dialog("center");
    } else {
        $.messager.alert("Error message", "No row data selected to be modified", "error");
    }
}

function selectProducts() {
    $("#p_id").combobox({
        url: "../updateOrderdetailSelectProducts",
        method: "post",
        valueField: 'p_id',
        textField: 'p_name',
        loadFilter: function (data) {
            var first = {p_id: -1, p_name: "ProductList"};
            data.unshift(first);
            return data;
        },
        onSelect: function (record) {
            var p_id = record.p_id;
            if (p_id != -1) {
                var p_price = selectProductPrice(p_id);
                var num = $("#quantity").textbox("getValue");
                $("#price").textbox("setValue", (p_price * num));
            }
        }

    });
    $("#p_id").combobox("setValue", "-1");
}


function selectProductPrice(p_id) {
    var p_price = 0;
    $.ajax({
        type: "get",
        dataType: "json",
        url: "../selectProductPrice",
        data: {"p_id": p_id},
        async: false,
        success: function (data) {
            p_price = data;
        }
    });
    return p_price;
}

function insertOrderdetail() {
    $("#noid").textbox({disabled: true});
    $("#orderDiv").dialog({
        iconCls: 'icon-save',
        title: 'AddDetail',
        closed: false,
        cache: false,
        modal: true,
        buttons: '#ww',
        onBeforeOpen: function () {
            selectProducts();
            $("#noid").textbox("setValue", noooooid);
        }
    }).dialog("open").dialog("center");
}

function deleteOrderdetail() {
    var selRows = $("orderdetaildg").datagrid("getSelected");
    if (selRows != null) {
        $.messager.confirm("DeleteReminder", "Are you sure you want to delete this data？", function (f) {
            if (f) {
                $.ajax({
                    type: "get",
                    dastaType: "json",
                    data: {"o_id": selRows.o_id},
                    url: "../selectProductPrice",
                    success: function (data) {
                        if (data == 1) {
                            $.messager.alert("Notification", "删除成功", "info");
                            $("#orderdetaildg").datagrid("reload");
                        } else {
                            $.messager.alert("Notification", "删除失败", "info");
                        }

                    }
                });
            }
        });
    } else {
        $.messager.alert("ErrorMessage", "未选择要删除的行数据", "error");
    }
}

//提交新增或修改明细
function submitOrderdetailInfo() {
    $("#noid").textbox({disabled: false});
    var o_id = $("#o_id").val();
    var newPath = "";
    if (o_id == 0) {
        newPath = "../insertOrderdetail";
    } else {
        newPath = "../updataOrderdetail";
    }
    if ($("#orderform").form("validate")) {
        $("#orderform").form("submit", {
            method: "POST",
            url: newPath,
            onSubmit: function (param) {
                return $(this).form("validate");
            }, success: function (data) {
                if (data == 1) {
                    $.messager.alert("Notification", "操作成功", "info");
                    doCancle3();
                    $("#orderdetaildg").datagrid("reload");
                    $("#orderdg").datagrid("reload");
                } else {
                    $.messager.alert("Notification", "操作失败", "error");
                }
            }
        });
    } else {
        $.messager.alert("ErrorMessage", "表单验证未通过", "error");
    }
}
