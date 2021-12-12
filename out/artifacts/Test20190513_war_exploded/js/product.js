$(function () {
    selectProductAll();
    categoryComboboxConfig();
});

function selectProductAll() {
    $("#prodg").datagrid({
        title: 'ProductInformationList',
        iconCls: 'icon-edit',
        width: '100%',
        height: 'auto',
        border: true,
        url: "../product/selectProductAll",
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'p_id', title: 'ID', sorttable: true, width: '15%'},
            {field: 'cg_name', title: 'Type', width: '15%', formatter: cateInfo},
            {field: 'p_name', title: 'Name', width: '20%'},
            {field: 'p_price', title: 'Price', sorttable: true, width: '15%'},
            {field: 'p_supplier', title: 'Supplier', width: '28%'}
        ]],
        singleSelect: true,
        checkOnSelect: true,
        pagination: true,
        pageSize: 5,
        pageList: [5, 10, 15, 20],
        rownumbers: true,
        nowrap: false,
        onDblClickRow: onDblClickRow,
        striped: true,
        method: 'get',
        sortName: 'p_id',
        sortOrder: 'desc',
        idFild: 'p_id',
        loadMsg: 'Loading...'
    });
}

function cateInfo(value, row, index) {
    return row.cgId.cg_name;
}

function onDblClickRow(rowIndex, rowData) {
    updateProduct(rowData);
}

function updateProduct(rowData) {
    var selRows = $("#prodg").datagrid("getSelected");
    if (selRows != null) {
        rowData = rowData == null ? selRows : rowData;

        $("#prohead").attr("src", rowData.p_imgName);
        $("#p_id").val(rowData.p_id);
        $("#cgId").combobox("setValue", rowData.cgId.cg_id);
        $("#p_name").val(rowData.p_name);
        $("#p_price").val(rowData.p_price);
        $("#p_supplier").val(rowData.p_supplier);
        $("#ProductDiv").dialog({
            iconCls: 'icon-save',
            title: 'AddProduct',
            closed: false,
            cache: false,
            modal: true,
            buttons: '#pp',
            onBeforeOpen: function () {
                selectCate();
            }
        }).dialog("open").dialog("center");
    } else {
        $.messager.alert("ErrorMessage", "No row data selected to be modified", "error");
    }
}

//初始化下拉列表
function categoryComboboxConfig() {
    $("#productId").combobox({
        url: "../product/selectProCateGory",
        method: "post",
        valueField: 'cg_id',
        textField: 'cg_name',
        loadFilter: function (data) {
            var first = {cg_id: -1, cg_name: "ProductList"};
            data.unshift(first);
            return data;
        },
        onSelect: function (record) {
            var cg_id = record.cg_id;
            getProduct(cg_id);
        }
    });
    $("#productId").combobox("setValue", "-1");
}

//当下拉列表值被改变时调用的函数(去查询选择的项目)
function getProduct(num) {
    if (num == -1) {
        selectProductAll();
    } else {
        $.ajax({
            type: 'post',
            url: "../product/selectProductByCgid",
            data: {'cg_id': num},
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.length != 0) {
                    $('#prodg').datagrid('loadData', data);
                } else {
                    $.messager.alert('Notification', 'There is no product information under this item', 'info');
                }
            }
        });
    }
}

function doCancle() {
    $("#productform").form("clear");
    $("#ProductDiv").dialog("close");
    $("#p_id").val("0");
}

function insertProduct() {
    $("#ProductDiv").dialog({
        iconCls: 'icon-save',
        title: 'AddProduct',
        closed: false,
        cache: false,
        modal: true,
        buttons: '#pp',
        onBeforeOpen: function () {
            selectCate();
        }
    }).dialog("open").dialog("center");
}

function selectCate() {
    $("#cgId").combobox({
        url: "../product/selectProCateGory",
        method: "post",
        valueField: 'cg_id',
        textField: 'cg_name',
        loadFilter: function (data) {
            var first = {cg_id: -1, cg_name: "ProductList"};
            data.unshift(first);
            return data;
        }
    });
    $("#cgId").combobox("setValue", "-1");
}

function deleteProduct() {
    var selRows = $("#prodg").datagrid("getSelected");
    if (selRows != null) {
        $.messager.confirm("DeleteReminder", "Are you sure you want to delete this data？", function (f) {
            if (f) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {"p_id": selRows.p_id},
                    url: "../product/deleteProductById",
                    success: function (data) {
                        if (data == 1) {
                            $.messager.alert("Notification", "Successfully deleted！", "info");
                            $("#prodg").datagrid("reload");
                        } else {
                            $.messager.alert("Notification", "Failed to delete！", "info");
                        }
                    }
                });
            }
        });
    } else {
        $.messager.alert("Error Message", "No row data selected to be deleted", "error");
    }
}

//提交修改或者添加表单
function submitProductInfo() {
    var p_id = $("#p_id").val();
    var newPath = "";
    if (p_id == 0) {
        newPath = "../product/insertProduct";
    } else {
        newPath = "../product/updateProduct";
    }
    if ($("#productform").form("validate")) {
        $("#productform").form("submit", {
            method: "POST",
            url: newPath,
            onSubmit: function (param) {
                //处理数据
                if ($("#cgId").val() == -1) {
                    $.messager.alert("Notification", "Product type cannot be the default value！", "error");
                    return false;
                } else {
                    return $(this).form("validate");
                }
            }, success: function (data) {
                if (data == 1) {
                    $.messager.alert("Notification", "Successful operation！", "info");
                    doCancle();
                    $("#prodg").datagrid("reload");
                } else {
                    $.messager.alert("Notification", "Operation failed！", "error");
                }
            }
        });
    } else {
        $.messager.alert("ErrorNotification", "Form validation failed", "error");
    }
}



