$(function () {
});

function openuserselect() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/userSelect.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询用户',
        content: content,
        closable: true
    });
}

function delectuser() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/deleteUser.php" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '删除用户',
        content: content,
        closable: true
    });
}


function selectUserInfoAll() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/selectUserAll.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询所有用户',
        content: content,
        closable: true
    });
}

function selectCcategory() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/Ccategory.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询商品类型',
        content: content,
        closable: true
    });
}

function selectProduct() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/product.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询商品',
        content: content,
        closable: true
    });
}

function selectOrder() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/norder.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询订单',
        content: content,
        closable: true
    });
}


function selectNotice() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/selectNoticeAll.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询所有公告',
        content: content,
        closable: true
    });
}

function selectAddress() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/selectAddressAll.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询所有地址',
        content: content,
        closable: true
    });
}

function selectComment() {
    var content = '<iframe scrolling="auto" frameborder="0" src="./admin/comment.html" style="width:100%;height:98%;"></iframe>';
    $('#tt').tabs('add', {
        title: '查询所有评价',
        content: content,
        closable: true
    });
}