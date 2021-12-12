$(function () {
    selectCcategory();
});

function selectCcategory() {
    $("#catedg").datagrid({
        ititle: '类目信息列表',
        iconCls: "icon-edit",
        width: '100%',
        height: 'auto',
        border: true,
        url: " ../product/selectCcategoryAll",
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'cg_id', title: 'ID', sorttable: true, width: '30%'},
            {field: 'cg_name', title: 'TypeName', width: '50%'},
            {field: 'formatter', title: 'Edit', align: ' center', halign: ' center', width: '19%', formatter: cateInfo}
        ]],
        singleSelect: true,
        pagination: true,
        pageSize: 5,
        pageList: [5, 10, 15, 20],
        roenumbers: true, nowrap: false,
        striped: true,
        onDblClickRow: onDbclickRow,
        method: 'get',
        sortName: 'cg_id',
        sortOrder: 'cg_id',
        idFild: 'cg_id',
        loadMsg: 'Loading....'
    });
}

//选择修改行
function onDbclickRow(rowIndex, rowData) {
    $("#catedg").datagrid("checkRow", rowIndex);
    updateCateInfo(rowData);
}

//详情行的操作
function cateInfo(value, row, index) {
    // value值:列对象本身
    //row:当前行数据，对象点属性名
    //index:当前页第几行的索引从O开始
    return "<a href=\"javascript:selectCcateInfo(" + row.cg_id + " , '" +
        row.cg_name + "')\"' style='color:blue'>Detail</a> ||  <a href=' javascript:removeCategory(" + row.cg_id + ")' " +
        "style='color: #ff0000'>Del</a>";

}

function selectCcateInfo(cg_id, cg_name) {
    $("#cateDiv").dialog({
        iconCls: 'icon-save',
        title: '类目信息',
        closed: true
        , cache: false,
        model: true,
        boftons: '#bb',
        onOpen: function () {
            $("#cgid").html(cg_id);
            $("#cgname").html(cg_name);
        }
    }).dialog("open").dialog("center");
}

function updateCateInfo(rowData) {
    var selRows = $("#catedg").datagrid("getSelections");
    if (selRows.length == 1) {
        rowData = rowData == null ? selRows[0] : rowData;
        $("#categoryInfoDiv").dialog({
            iconCls: "icon-save",
            title: "修改类目",
            closed: false,
            cache: false,
            model: true,
            button: "#dd",
            onOpen: function () {
                $("#categoryInfoForm").form("load", rowData);
            }
        }).dialog("open").dialog("center");
    } else {
        $.messager.alert("Error Notification", "No data selected to modify", "error");
    }
}

function doClose() {
    $("#cateDiv").dialog("close");
}

function doCancle() {
    $("#categoryInfoForm").form("clear");
    $("#categoryInfoDiv").dialog("close");
}

function removeCategory(cg_id) {
    $.messager.confirm("Del Notification", "Are you sure you want to delete this data ? ", function (f) {
        if (f) {
            $.ajax({
                url: " ../ product/removeCategoryById",
                dataType: " json",
                data: {"cg_id": cg_id},
                type: "get",
                success: function (data) {
                    if (data == 1) {
                        $.messager.alert("Notification", "Successfully deleted! ", "info");
                        selectCcategory()
                    } else {
                        $.messager.alert("Notification", "Failed to delete! ", "error");
                    }
                }
            });
        }
    });
}

function insertCcategory() {
    $("#categoryInfoDiv").dialog({
        iconCls: "icon-save",
        title: "添加类目",
        closed: false,
        cache: false,
        model: true,
        button: "#dd",
        onOpen: function () {
        }
    }).dialog("open").dialog("center");
}

function submitCateInfo() {
    var cg_id = $("#cg_id").val();
    var newPath = "";
    if (cg_id == 0) {
        newPath = "../product/insertCcategory";
    } else {
        newPath = "../product/updateCcategory";
    }
    if ($("#categoryInfoForm").form("validate")) {
        $("#categoryInfoForm").form("submit", {
            method: "POST",
            url: newPath,
            onSubmit: function (param) {
                //处理数据
                return $(this).form("validate");
            }, success: function (data) {
                if (data == 1) {
                    $.messager.alert("Notification", "Success! ", "info");
                    doCancle();
                    selectCcategory();
                } else {
                    $.messager.alert("Notification", "Unsuccessful! ", "error");
                }
            }
        });
    } else {
        $.messager.alert("Notification", "表单未验证通过! ", "error");
    }
}