$(function () {
    selectAddressAll();
});

//显示用户信息
function selectAddressAll() {
    selectData('../selectAllAddressPage');
}

//动态的插入表格数据
function selectData(url) {
    $("#addrdg").datagrid({
        title: '公告信息列表',
        iconCls: 'icon-edit',
        width: '100%',
        heigth: 'auto',
        border: true,
        url: url,
        columns: [[
            {field: 'ck', checkbox: true},
            {field: 'a_id', title: 'ID', sorttable: true, width: '25%'},
            {field: 'a_addr', title: 'AddressDetail', width: '25%'},
            {
                field: 'userinfo', title: 'OwnedUser', width: '25%', formatter: function (userinfo) {
                    return userinfo.u_name
                }
            },
            {
                field: 'formatter', title: 'Edit', align: 'center',
                halign: 'center', width: '25%', formatter: selectAdress
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
        sortName: 'a_id',
        sortOrder: 'desc',
        idFild: 'a_id',
        loadMsg: 'Loading...'
    });
}


//详情的操作
function selectAdress(value, row, index) {
    //value值:列对象本身
    //row：当前行数据，对象点属性名
    //index：当前页第几行的索引从0开始
    return "<a href='javascript:selectAddressById(" + index + ")' style='color:red'>Detail</a>";
}

//查询用户id
function selectAddressById(index) {
    var rows = $("#addrdg").datagrid("getRows");
    var row = rows[index];
    $("#aid").html(row.a_id);
    $("#aaddr").html(row.a_addr);
    $("#uid").html(row.userinfo.u_name);
    $('#showAddressInfo').dialog({
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
    updateNoticeInfo(rowData);
}

function closeDialog() {
    $("#showAddressInfo").dialog("close");
}



