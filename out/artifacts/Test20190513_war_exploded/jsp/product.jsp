<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>商品详情页</title>
    <link rel="Icon" href="${ctx}/imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->

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

    <script src="${ctx }/js/photo-gallery.js"></script>

    <script type="text/javascript">
        function addCart(userinfo, p_id) {
            if (userinfo != "") {
                var n = $("#number").val();
                if (/^\d+/.test(n)) {
                    if (n != 0) {
                        location.href = "${ctx}/addCart?key=" + p_id + "&v=" + n;
                    } else {
                        layer.open({
                            title: '错误提示',
                            content: '数量不能为零',
                            offset: '100px'
                        });
                    }
                } else {
                    layer.open({
                        title: '错误提示',
                        content: '请输入购买数量',
                        offset: '100px'
                    });
                }
            } else {
                layer.open({
                    title: '错误提示',
                    content: '请登录后操作',
                    offset: '100px'
                });
            }
        }

        function buy(userinfo, p_id) {
            layer.open({
                title: ['确认提示'],
                content: '<div style="color: #767676">您确定直接购买吗？<br/></div>',
                btn: ['确认', '取消'],
                offset: '100px',
                yes: function (index, layero) {
                    if (userinfo != "") {
                        var n = $("#number").val();
                        if (/^\d+$/.test(n)) {
                            if (n != 0) {
                                location.href = "${ctx}/product/checkOrder?p_id=" + p_id + "&v=" + n;
                            } else {
                                layer.open({
                                    title: '错误提示',
                                    content: '数量不能为零',
                                    offset: '100px'
                                });
                            }
                        } else {
                            layer.open({
                                title: '错误提示',
                                content: '请输入购买数量',
                                offset: '100px'
                            });
                        }
                    } else {
                        layer.open({
                            title: '错误提示',
                            content: '请登录后操作',
                            offset: '100px'
                        });
                    }
                }
            });
        }

        function jumpCategory(cg_id) {
            location.href = "${ctx}/usersSelectCategory?cg_id=" + cg_id + "&pageCount=1";
        }
    </script>

    <style type="text/css">
        * {
            font-family: "HarmonyOS Sans SC";
        }

        .breadcrumb {
            height: 46px;
        }
    </style>
</head>
<body>
<%@ include file="head.jsp" %>
>
<c:if test="text/javascript">
    <script type="text/javascript">
        layer.open({
            title: '错误提示',
            content: '${addCartInfo}',
            offset: '100px'
        })
    </script>
</c:if>
<!--//////////////////////////////////////////////////-->
<!--///////////////////Product Page///////////////////-->
<!--//////////////////////////////////////////////////-->
<div id="page-content" class="single-page">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumb">
                    <li><a href="${ctx}/index.jsp">首页</a></li>
                    <li><a href="javascript:jumpCategory(${product.cgId.cg_id})">商品类型</a></li>
                    <li><a href="#">${product.p_name}</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div id="main-content" class="col-md-8">
                <div class="product">
                    <div class="col-md-6">
                        <div class="image">
                            <img style="border:3px solid gainsboro" width="457" height="458"
                                 src="${ctx}${requestScope.product.p_imgName}"/>
                            <div class="image-more">
                                <ul class="row">
                                    <li class="col-lg-3 col-sm-3 col-xs-4">
                                        <a href="#">
                                            <img class="img-responsive" src="${ctx}${requestScope.product.p_imgName}"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="col-lg-3 col-sm-3 col-xs-4">
                                        <a href="#">
                                            <img class="img-responsive" src="${ctx}${requestScope.product.p_imgName}"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="col-lg-3 col-sm-3 col-xs-4">
                                        <a href="#">
                                            <img class="img-responsive" src="${ctx}${requestScope.product.p_imgName}"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="col-lg-3 col-sm-3 col-xs-4">
                                        <a href="#">
                                            <img class="img-responsive" src="${ctx}${requestScope.product.p_imgName}"
                                                 alt="">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="caption">
                            <div class="name"><h3>${requestScope.product.p_name}</h3></div>
                            <div class="info">
                                <ul>
                                    <li>供应商: ${requestScope.product.p_supplier}</li>
                                    <li>商品编号: ${requestScope.product.p_id}</li>
                                </ul>
                            </div>
                            <div class="price"><%--price--%>
                                <i class="layui-icon" style="font-size: 30px;color: #1E9FFF">￥</i>
                                ${requestScope.product.p_price}
                                <span>
                                    <i class="layui-icon"
                                       style="font-size: 30px;color: gray">￥</i>${requestScope.product.p_price}
                                </span>
                            </div>
                            <div class="options"><%--规格--%>
                                规格
                                <select>
                                    <option value="" selected>---请选择---</option>
                                    <option value="Red">红色</option>
                                    <option value="Black">黑色</option>
                                </select>
                            </div>
                            <div class="rating"> <%--星级--%>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                                <span class="glyphicon glyphicon-star"></span>
                            </div>
                            <div class="well"> <%--加入购物车以及购买--%>
                                <label>数量：
                                    <input class="form-inline quantity" id="number" type="text" value="1">
                                    <a class="btn btn-2"
                                       href="javascript:addCart('${sessionScope.userinfo}',${requestScope.product.p_id})">购物车</a>
                                    <div class="share well">
                                        <input type="button" value="购买" class="layui-btn layui-btn-lg"
                                               style="width: 240px;height: 50px;font-size: 40px"
                                               onclick="buy('${sessionScope.userinfo}',${requestScope.product.p_id})"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>

                <div class="product-desc">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#description">介绍</a></li>
                        <li><a href="#review">评论</a></li>
                    </ul>
                    <div class="tab-content">
                        <%--产品介绍/特性--%>
                        <div id="description" class="tab-pane fade in active">
                            <h1>${requestScope.product.p_name}</h1>
                            <h1 style="font-size: 25px;color: #0017f4">产品介绍/特性</h1>
                            <h3 style="font-size: 36px;font-family: 'HarmonyOS Sans SC Medium'">
                                ${requestScope.product.p_introduction}
                            </h3>
                        </div>
                        <%--评论--%>
                        <div id="review" class="tab-pane fade">
                            <h2>
                                购买了
                                <b style="color: #0E2D5F">
                                    ${requestScope.product.p_name}
                                </b>
                                的用户评价：
                            </h2>
                            <br>
                            <div>
                                <span>
                                <b>Jao:</b>
                                </span>
                                <span>
                                    好用
                                </span>

                                <span>
                                    <br>
                                <b>张三:</b>
                                </span>
                                <span>
                                    真香！
                                </span>

                                <br>
                                <b>李四:</b>
                                </span>
                                <span>
                                    太好用啦 五星五星！！！！
                                </span>

                                <br>
                                <b>王五:</b>
                                </span>
                                <span>
                                    物超所值
                                </span>
                            </div>
                            <c:forEach var="comment" items="${Commentlist}">
                                <h2>${comment.userinfo.u_name }:</h2>${comment.co_comment}
                            </c:forEach>
                        </div>

                    </div>
                </div>

                <div class="product-related">
                    <div class="heading"><h2>相关产品</h2></div>
                    <div class="products">
                        <div class="col-lg-4 col-md-4 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=142">
                                        <img src="${ctx}/imagess/productImg/switch1.jpg"/>
                                    </a>
                                </div>
                                <div class="buttons">
                                    <a class="btn cart" href="#"><span class="glyphicon glyphicon-shopping-cart"></span></a>
                                    <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                    <a class="btn compare" href="#"><span
                                            class="glyphicon glyphicon-transfer"></span></a>
                                </div>
                                <div class="caption">
                                    <div class="name"><h3>
                                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=142">
                                            任天堂 Switch
                                        </a>
                                    </h3></div>
                                    <div class="price">￥2499.00<span>￥3499.00</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=144">
                                        <img src="${ctx }/imagess/productImg/Xbox.png"/>
                                    </a>
                                </div>
                                <div class="buttons">
                                    <a class="btn cart" href="#"><span class="glyphicon glyphicon-shopping-cart"></span></a>
                                    <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                    <a class="btn compare" href="#"><span
                                            class="glyphicon glyphicon-transfer"></span></a>
                                </div>
                                <div class="caption">
                                    <div class="name"><h3>
                                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=144">
                                            微软Xbox Series X
                                        </a>
                                    </h3>
                                    </div>
                                    <div class="price">￥4499.00<span>￥5000.00</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=166">
                                        <img src="${ctx }/imagess/productImg/恶魔之魂-重制版.png"
                                             style="height:220px;width: 380px;"/>
                                    </a>
                                </div>
                                <div class="buttons">
                                    <a class="btn cart" href="#"><span class="glyphicon glyphicon-shopping-cart"></span></a>
                                    <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                    <a class="btn compare" href="#"><span
                                            class="glyphicon glyphicon-transfer"></span></a>
                                </div>
                                <div class="caption">
                                    <div class="name">
                                        <h3>
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=166">
                                                PS5恶魔之魂-重制版
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥398.00<span>￥498.00</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div id="sidebar" class="col-md-4">
                <%--分类--%>
                <div class="widget wid-categories">
                    <div class="heading"><h4>分类</h4></div>
                    <div class="content">
                        <ul>
                            <li><a href="#">显示器/电视</a></li>
                            <li><a href="#">数码/电子</a></li>
                            <li><a href="#">周边</a></li>
                            <li><a href="#">手机平板</a></li>
                        </ul>
                    </div>
                </div>

                <%--TYPE--%>
                <div class="widget wid-type">
                    <div class="heading"><h4>类型</h4></div>
                    <div class="content">
                        <select>
                            <option value="EL" selected>家庭娱乐</option>
                            <option value="MT">手机配件</option>
                            <option value="WC">显示设备</option>
                            <option value="TA">鼠标键盘</option>
                            <option value="AP">音频设备</option>
                        </select>
                    </div>
                </div>

                <%--优惠/折扣--%>
                <div class="widget wid-discouts">
                    <div class="heading"><h4>优惠/折扣</h4></div>
                    <div class="content">
                        <label class="checkbox"><input type="checkbox" name="discount" checked="">Upto - 10%
                            (20)</label>
                        <label class="checkbox"><input type="checkbox" name="discount">40% - 50% (5)</label>
                        <label class="checkbox"><input type="checkbox" name="discount">30% - 20% (7)</label>
                        <label class="checkbox"><input type="checkbox" name="discount">10% - 5% (2)</label>
                        <label class="checkbox"><input type="checkbox" name="discount">Other(50)</label>
                    </div>
                </div>


                <%--最新上架--%>
                <div class="widget wid-product">
                    <div class="heading"><h4>最新上架</h4></div>
                    <div class="content">
                        <div class="product" style="width: 400px; height: 100px">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=162">
                                <img src="${ctx}/imagess/productImg/华为HUAWEI-MatePad-Pro.png"/>
                            </a>
                            <div class="wrapper">
                                <h5>
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=162">
                                        HUAWEI MatePad Pro
                                    </a>
                                </h5>
                                <div class="price">￥4999.0</div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span></div>
                            </div>
                        </div>
                        <div class="product" style="width: 400px;">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=109">
                                <img src="${ctx }/imagess/productImg/Pad-Pro-11.png"/>
                            </a>
                            <div class="wrapper">
                                <h5>
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=109">
                                        iPad Pro 11
                                    </a>
                                </h5>
                                <div class="price">￥6999.0</div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span></div>
                            </div>
                        </div>
                        <div class="product" style="width: 400px;">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=134">
                                <img src="${ctx}/imagess/productImg/Galaxy-Note20-Ultra-5G.png"/>
                            </a>
                            <div class="wrapper">
                                <h5>
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=134">
                                        Galaxy Note20 Ultra
                                    </a>
                                </h5>
                                <div class="price">￥7599.0</div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%-- /.modal-content --%>
    </div>
    <%-- /.modal-dialog --%>
</div>
<%-- /.modal --%>
<%@include file="end.jsp" %>

<%--IMG-thumb--%>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="media-body">
            </div>
        </div>
        <%--/.modal-content--%>
    </div>
    <%--/.modal-dialog--%>
</div>
<%--/.modal--%>

<script>
    $(document).ready(function () {
        $(".nav-tabs a").click(function () {
            $(this).tab('show');
        });
        $('.nav-tabs a').on('shown.bs.tab', function (event) {
            var x = $(event.target).text();
            var y = $(event.relatedTarget).text();
            $(".act span").text(x);
            $(".prev span").text(y);
        });
    });
</script>
</body>

</html>
