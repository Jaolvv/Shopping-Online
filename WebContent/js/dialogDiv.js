$(function () {

});

function deletesCode() {
    layer.closeAll();

}

function submit() {
    var p_id = $("#p_id").val();
    var co_comment = $("#co_comment").val();
    var that = this;
    $.ajax({
        url: "./addComment",
        type: "post",
        dataType: "json",
        data: $('#layform').serialize(),
        success: function (data) {
            if (data == 1) {
                alert("提交成功");
                deletesCode()
            } else {
                alert("提交失败");
                deletesCode()
            }
        }
    });
}

function btnfun() {
    var v = document.getElementById("butt").value;
    var layform = $("#layform");
    layform.append("商品ID：<input type='text' id='p_id' name='p_id' readonly='readonly' value='" + v + "'/><hr>");
    layer.open({
        type: 1,
        title: '评价',
        area: ['600px', '400px'],
        content: $('#divs1'),
        offset: '100px',
        maxmin: true,
        end: function () {
            $("#divs1").css("display", "none");
        }
    });
}

function showOrederdetail(no_id) {
    $.ajax({
        url: './userSelectOrderdetailByNoid',
        data: {"no_id": no_id},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tbody = $("#layTab tbody");
            tbody.empty();
            for (var i = 0; i < data.length; i++) {
                tbody.append("<tr><td>" + data[i].o_id + "</td><td>" + data[i].noId.no_id +
                    "</td><td>" + data[i].pId.p_name + "</td><td>" + data[i].quantity + "</td><td>" + data[i].price + "</td></tr>");
            }
        }
    });
    layer.open({
        type: 1,
        title: '明细信息',
        area: ['600px', '400px'],
        content: $('#divs'),
        offset: '100px',
        maxmin: true,
        end: function () {
            $("#divs").css("display", "none");
        }
    });
}