<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>购物车</title>
    <link rel="Icon" href="../imagess/icon.png" type="image/x-icon" /><!-- icon图标 -->

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="${ctx }/css/bootstrap.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${ctx }/css/style.css">


    <!-- Custom Fonts -->
    <link rel="stylesheet" href="${ctx }/font-awesome/css/font-awesome.min.css" type="text/css">
    <link rel="stylesheet" href="${ctx }/fonts/font-slider.css" type="text/css">

    <!-- jQuery and Modernizr-->
    <script src="${ctx }/js/jquery-2.1.1.js"></script>

    <!-- Core JavaScript Files -->
    <script src="${ctx }/js/bootstrap.min.js"></script>

    <script type="application/javascript">
        function updateNumber(key, value) {
            var val = $("#" + key).val();
            var v = value - val;
            if (/^\d + /.test(val)) {
                if (val != 0) {
                    if (value > v) {
                        location.href = "${ctx}/updateCartNumber?p_id=" + key + "&num=" + (value - v);
                    } else if (value == val) {
                        removeCart(key);
                    } else {
                        layer.open({title: '错误提示', content: '退货数量不能大于' + value, offset: '100px'});
                    }
                } else {
                    layer.open({title: '错误提示', content: '数量不能为零' + value, offset: '100px'});
                }
            } else {
                layer.open({title: '错误提示', content: '请输入购买数量' + value, offset: '100px'});
            }
            var v = value - val;
        }

        function jiesuan() {
            layer.open({
                title: ['确认信息'],
                content: '<div style="color: #767676">您确定要结算购物车吗？<br/></div>',
                btn: ['确认', '取消'],
                offset: '100px',
                // 回调函数
                yes: function (index, layero) {
                    self.location = "${ctx}/product/PaymentCat";
                }
            });
        }

        function removeCart(key) {
            layer.open({
                title: ['确认提示'],
                content: '<div style="color: #767676">您确定要将此物品移除购物车吗？<br/></div>',
                btn: ['确认', '取消'],
                offset: '100px',
                // 回调函数
                yes: function (index, layero) {
                    self.location = "${ctx}/removeProductCart?key=" + key;
                }
            });
        }
    </script>

    <style type="text/css">
        * {
            font-family: "HarmonyOS Sans SC";
        }
    </style>

</head>
<body>
<%@include file="head.jsp" %>
<c:if test="${!empty cartInfo}">
    <script type="text/javascript">
        layer.open({
            title: '错误提示',
            content: '${cartInfo}',
            offset: '100px'
        });
    </script>
</c:if>
<!-- ////////////////////////////////////////// -->
<!-- //////////////////Cart Page/////////////// -->
<!-- ////////////////////////////////////////// -->
<div id="page-content" class="single-page">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumb" style="height: 46px"> <%--面包屑--%>
                    <li><a href="${ctx}/index.jsp">首页</a></li>
                    <li><a href="${ctx}/jsp/cart.jsp">购物车</a></li>
                </ul>
            </div>
        </div>
        <c:if test="${fn:length(sessionScope.cart)>0}">
            <c:forEach items="${sessionScope.cart}" var="map">
                <div class="row">
                    <div class="product well">
                        <div class="col-md-3">
                            <div class="image">
                                <img src="${ctx}${map.key.p_imgName}">
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="caption">
                                <div class="name">
                                    <h3>
                                        <a href="${ctx}/ProductController?type=selectProductById&p_id=${map.key.p_id}">
                                                ${map.key.p_name}
                                        </a>
                                    </h3>
                                </div>
                                <div class="info">
                                    <ul>
                                        <li>供应商:${map.key.p_supplier}</li>
                                        <li>ID:${map.key.p_id}</li>
                                    </ul>
                                </div>
                                <div class="price">单价￥${map.key.p_price}</div>
                                <div class="price">总价￥${map.key.p_price * map.value}</div>
                                <label>数量:</label><input id="${map.key.p_id}" class="form-inline quantity" type="text"
                                                         value="${map.value}">
                                <a href="javascript:updateNumber(${map.key.p_id} ${map.value})" class="btn btn-2">更新数量(退)</a>
                                <hr>
                                <a href="javascript:removeCart(${map.key.p_id})"
                                   class="btn btn-default pull-right">移除商品</a>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </c:forEach>
        </c:if>
        <c:if test="${fn:length(sessionScope.cart)<=0}">
            <div class="row">
                <div class="product well">
                    <center><b style="font-family: '幼圆';font-size: 40px">当前购物车中还没有商品，请添加后查看</b></center>
                </div>
            </div>
        </c:if>
        <div class="row">
            <div class="col-md-4 col-md-offset-8">
                <center>
                    <a href="${ctx}/index.jsp" class="btn btn-1" style="border-radius: 20px">
                        继续购买
                    </a>
                    <xblock>
                        <button onclick="btnfun()" id="addAddress" class="layui-btn layui-btn-normal"
                        style="width: 100px;height: 55px;text-align: center;background-color: #0E2D5F;border-radius: 20px">
                            <i >新增地址</i>
                        </button>
                    </xblock>
                </center>
            </div>
        </div>
        <div class="row">
            <div class="pricedetails">
                <div class="col--md4 col-md-offset-8">
                    <table>
                        <h6>结算清单</h6>
                        <tr>
                            <td>默认地址</td>
                            <td>
                                <select name="add" id="addr" required="required">
                                    <option value="">---请选择地址---</option>
                                    <option value="${userinfo_addr}">${userinfo_addr}</option>
                                    <c:forEach items="${address}" var="address">
                                        <option value="${address.a_addr }">${address.a_addr }</option>
                                    </c:forEach>
                                </select>
                            </td>
                        <tr>
                            <p style="color: red">${msg}</p>
                        </tr>
                        </tr>
                        <tr>
                            <td>购买件数</td>
                            <td id="count">
                                <c:if test="${!empty count}">
                                    ${count}
                                </c:if>
                                <c:if test="${empty count}">
                                    0
                                </c:if>
                            </td>
                        </tr>
                        <tr style="border-top: 1px solid #333">
                            <td><h5>订单总价</h5></td>
                            <td id="sumprice">
                                <c:if test="${!empty sumprice}">
                                    ￥${sumprice}
                                </c:if>
                                <c:if test="${empty sumprice}">
                                    ￥0
                                </c:if>
                            </td>
                        </tr>
                    </table>
                    <center>
                        <a href="javascript:jiesuan()" class="btn btn-1" style="border-radius: 20px">
                            结算
                        </a>
                    </center>
                </div>
            </div>
        </div>
    </div>
</div>

<%--添加模态框--%>
<div class="layui-row" id="test" style="display: none;">
    <div class="layui-col-md10">
        <form class="layui-form" id="addAddressForm"  action="${ctx }/addAddress">
            <div class="layui-form-item">
                <label class="layui-form-label">地址</label>
                <div class="layui-input-block">
                    <input type="text" name="a_addr" class="layui-input"
                           placeholder="请输入地址">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">用户</label>
                <div class="layui-input-block">
                    <input readonly="readonly" type="text" lay-verify="required" name="u_id"
                           value="${u_id }" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button  type="submit" class="layui-btn layui-btn-normal"
                             lay-submit lay-filter="formDemo">提交</button>
                </div>
            </div>
        </form>
    </div>
</div>
<script type="text/javascript">
    function submit(){
        var a_addr=$("#a_addr").val();
        var u_id=$("#u_id").val();
        $.ajax({
            url:"./addAddress",
            type:"post",
            dataType:"json",
            data:$('#test').serialize(),
            success: function(data){
                if (data = 1){
                    alert("Submitted successfully");
                    deletesCode()
                }else {
                    alert("Submission Failed");
                    deletesCode()
                }
            }
        });
    }
    //弹出窗口
    function btnfun(){
        layer.open({
            type:1,
            title:'添加地址',
            area:['500px','500px'],
            content:$('#test'),
            offset:'100px',
            maxmin:true,
            end:function(){
                $("#test").css("display","none");
            }
        });
    }
</script>
<%@ include file="end.jsp" %>
</body>
</html>
