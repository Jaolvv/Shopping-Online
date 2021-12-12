$(function () {
    selectNoticeAll();
});

//显示用户信息
function selectNoticeAll() {
    selectData('../selectNoticeAll');
}

//动态的插入表格数据
function selectData(url) {
    $("#noticedg").datagrid({
        title: '公告信息列表',
        iconCls: 'icon-edit',
        width: '100%',
        heigth: 'auto',
        border: true,
        url: url,
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'n_id', title: 'ID', sorttable: true, width: '20%'},
            {field: 'n_title', title: '公告标题', width: '20%'},
            {field: 'n_content', title: '公告内容', width: '20%'},
            {field: 'n_date', title: '有效时间', width: '20%', formatter: dateFormatter},
            {
                field: 'formatter', title: '操作', align: 'center',
                halign: 'center', width: '20%', formatter: selectNotice
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
        sortName: 'n_id',
        sortOrder: 'desc',
        idFild: 'n_id',
        loadMsg: 'Loading...'
    });
}

//格式化时间
function dateFormatter(value) {
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + month + "-" + day;
}

//详情的操作
function selectNotice(value, row, index) {
    //value值:列对象本身
    //row：当前行数据，对象点属性名
    //index：当前页第几行的索引从0开始
    return "<a href='javascript:selectNoticeById(" + index + ")' style='color:red'>详情</a>";
}

//查询公告id
function selectNoticeById(index) {
    var rows = $("#noticedg").datagrid("getRows");
    var row = rows[index];
    $("#nid").html(row.n_id);
    $("#ntitle").html(row.n_title);
    $("#ncontent").html(row.n_content);
    $("#ndate").html(row.n_date);
    $('#showNoticeInfo').dialog({
        iconCls: 'icon-save',
        title: '公告信息',
        width: 450,
        height: 350,
        closed: false,
        cache: false,
        modal: true,
        buttons: '#aa'
    }).dialog("open").dialog("center");
}

function onDblClick(rowIndex, rowData) {
    $("#noticedg").datagrid("checkRow", rowIndex);
    updateNoticeInfo(rowData);
}

function closeDialog() {
    $("#showNoticeInfo").dialog("close");
}

//更新公告信息
function updateNoticeInfo(rowData) {
    var selRows = $("#noticedg").datagrid("getSelections");
    if (selRows.length == 1) {
        rowData = rowData == null ? selRows[0] : rowData;
        $("#noticeDiv").dialog({
            iconCls: 'icon-save',
            title: '修改用户',
            closed: false,
            cache: false,
            modal: true,
            buttons: '#bb',
            onOpen: function () {
                $("#noticeUpdateform").form("load", rowData);
            }
        }).dialog("open").dialog("center");
    } else if (selRows.length == 0) {
        $.messager.alert("错误信息", "没有选择要修改的行数据", "error");
    } else {
        $.messager.alert("错误信息", "修改不能选择多行", "error");
    }
}


function doCancle() {
    $("#noticeUpdateform").form("clear");
    $("#noticeDiv").dialog("close");
}

//插入公告信息
function insertNoticeInfo() {
    $("#noticeDiv").dialog({
        iconCls: 'icon-save',
        title: '添加用户',
        closed: false,
        cache: false,
        modal: true,
        buttons: '#bb',
        onOpen: function () {
            $("#noticeUpdateform").form("clear");
            $("#n_id").val("0");
        }
    }).dialog("open").dialog("center");
}

//提交公告信息
function submitNoticeInfo() {
    var nid = $("#n_id").val();
    var newPath = "";
    if (nid == 0) {
        newPath = "../addNotice";
    } else {
        newPath = "../updateNotice";
    }
    if ($("#noticeUpdateform").form("validate")) {
        $("#noticeUpdateform").form("submit", {
            method: "POST",
            url: newPath,
            onSubmit: function (param) {
                //处理数据
                return $(this).form("validate");
            }, success: function (data) {
                if (data == 1) {
                    $.messager.alert("消息提示", "操作成功！", "info");
                    doCancle();
                    selectNoticeAll();
                } else {
                    $.messager.alert("消息提示", "操作失败！", "error");
                }
            }
        });
    } else {
        $.messager.alert("错误信息", "表单验证未通过", "error");
    }
}

//删除公告信息
function deleteNoticeInfo() {
    var selRows = $("#noticedg").datagrid("getSelections");
    if (selRows.length == 1) {
        $.messager.confirm('信息提示', '确认要删除吗？', function (b) {
            if (b) {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {"n_id": selRows[0].n_id},
                    url: "../deleteNotice",
                    success: function (data) {
                        if (data == 1) {
                            $.messager.alert('信息提示', '删除成功!', "info");
                            selectNoticeAll();
                        } else {
                            $.messager.alert('信息提示', '删除失败!', "error");
                        }
                    }
                });
            }
        });
    } else if (selRows.length == 0) {
        $.messager.alert("消息提示", "没有选择要删除的公告数据", "info");
    } else {
        $.messager.alert("消息提示", "请选择一条公告数据删除", "info");
    }
}

