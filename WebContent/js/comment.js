$(function () {
    selectCommentAll();
});

//显示用户信息
function selectCommentAll() {
    selectData('../selectAllCommentPage');
}

//动态的插入表格数据
function selectData(url) {
    $("#comdg").datagrid({
        title: '评论信息列表',
        iconCls: 'icon-edit',
        width: '100%',
        heigth: 'auto',
        border: true,
        url: url,
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'co_id', title: '评论ID', sorttable: true, width: '20%'},
            {field: 'co_comment', title: '评论详情', width: '20%'},
            {
                field: 'product', title: '所属商品', width: '20%', formatter: function (product) {
                    return product.p_name
                }
            },
            {
                field: 'userinfo', title: '评论人', width: '20%', formatter: function (userinfo) {
                    return userinfo.u_name
                }
            },
            {
                field: 'formatter', title: '操作', align: 'center',
                halign: 'center', width: '20%', formatter: selectComment
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
        sortName: 'co_id',
        sortOrder: 'desc',
        idFild: 'co_id',
        loadMsg: 'Loading...'
    });
}


//详情的操作
function selectComment(value, row, index) {
    //value值:列对象本身
    //row：当前行数据，对象点属性名
    //index：当前页第几行的索引从0开始
    return "<a href='javascript:selectCommentById(" + index + ")' style='color:red'>Detail</a>";
}

//查询用户id
function selectCommentById(index) {
    var rows = $("#comdg").datagrid("getRows");
    var row = rows[index];
    $("#coid").html(row.co_id);
    $("#cocomment").html(row.co_comment);
    $("#pid").html(row.product.p_name);
    $("#uid").html(row.userinfo.u_name);
    $('#showCommentInfo').dialog({
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
    $("#addrdg").datagrid("checkRow", rowIndex);
    updateCommentInfo(rowData);
}

function closeDialog() {
    $("#showCommentInfo").dialog("close");
}



