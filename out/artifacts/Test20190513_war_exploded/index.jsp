<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>王德发(WTF)首页</title>
    <link rel="Icon" href="imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="${ctx }/css/bootstrap.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${ctx }/css/style.css">


    <!-- Custom Fonts -->
    <link rel="stylesheet" href="${ctx }/font-awesome/css/font-awesome.min.css" type="text/css">
    <link rel="stylesheet" href="${ctx }/fonts/font-slider.css" type="text/css">

    <!-- jQuery and Modernizr-->
    <script src="${ctx }/js/jquery-2.1.1.js"></script>

    <script src="${ctx }/js/bootstrap.min.js"></script>

    <style type="text/css">
        * {
            font-family: "HarmonyOS Sans SC";
        }

        html {
            height: 100%;
        }
    </style>
</head>

<body>
<%@ include file="./jsp/head.jsp" %>
<!--//////////////////////////////////////////////////-->
<!--///////////////////HomePage///////////////////////-->
<!--//////////////////////////////////////////////////-->
<div class="copyrights">Collect from <a href="http://www.cssmoban.com/">ç½é¡µæ¨¡æ¿</a></div>
<div id="page-content" class="home-page">
    <div class="container">
        <div class="row">
            <div class="col-lg-12" style="border-radius: 10px">
                <!-- Carousel -->
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators hidden-xs">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" style="border: 2px solid #34495e;border-radius: 10px">
                        <div class="item active">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=150">
                                <img src="${ctx}/imagess/main-banner-11.png" alt="First slide"><%--轮播图1--%>
                            </a>
                        </div>

                        <div class="item">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=161">
                                <img src="${ctx }/imagess/main-banner-2.png" alt="Second slide"><%--轮播图2--%>
                            </a>
                        </div>

                        <div class="item">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=162">
                                <img src="${ctx }/imagess/main-banner-3.jpg" alt="Third slide"><%--轮播图3--%>
                            </a>
                        </div>

                        <div class="item">
                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=163">
                                <img src="${ctx }/imagess/main-banner-4.jpg" alt="Third slide"><%--轮播图4--%>
                            </a>
                        </div>

                    </div>
                    <%--carousel-inner.end--%>

                    <!-- Controls -->
                    <%--上一张--%>
                    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"
                       style="border-radius: 10px">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>

                    <%--下一张--%>
                    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next"
                       style="border-radius: 10px">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div><!-- /carousel -->
            </div>
        </div>
        <div class="row">
            <div class="banner">
                <div class="col-sm-4">
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=142">
                        <img src="${ctx }/imagess/switch1.jpg" title="前往查看Switch!" style="border-radius: 10px"/>
                    </a>
                </div>
                <div class="col-sm-4">
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=143">
                        <img src="${ctx }/imagess/PS5.jpg" title="前往查看PlayStation5!" style="border-radius: 10px"/>
                    </a>
                </div>
                <div class="col-sm-4">
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=144">
                        <img src="${ctx }/imagess/xbox-series-X.jpg" title="前往查看Xbox Series X!"
                             style="border-radius: 10px"/>
                    </a>
                </div>
            </div>
        </div>
        <%--手机热销榜--%>
        <div class="row">
            <div class="col-lg-12">
                <div class="heading"><h2 style="font-family: 'HarmonyOS Sans SC'">手机热销榜</h2></div>
                <div class="products">

                    <%--product1--%>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="product"
                             style="border:1px solid gainsboro;border-radius: 8px;box-shadow: 1px 2px 5px #888888;">
                            <div class="image">
                                <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=126">
                                    <img src="${ctx}/imagess/1-2-X.jpg"/>
                                </a>
                            </div>
                            <div class="buttons">
                                <a class="btn cart" href="#">
                                    <span class="glyphicon glyphicon-shopping-cart"></span>
                                </a>
                                <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                <a class="btn compare" href="#"><span class="glyphicon glyphicon-transfer"></span></a>
                            </div>
                            <div class="caption">
                                <div class="name">
                                    <h3>
                                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=126">
                                            Xperia1 II 5G智能手机
                                        </a>
                                    </h3>
                                </div>
                                <div class="price">￥5999.00<span>￥6999.00</span></div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star-empty"></span></div>
                            </div>
                        </div>
                    </div>

                    <%--product2--%>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="product"
                             style="border:1px solid gainsboro;border-radius: 8px;box-shadow: 1px 2px 5px #888888;">
                            <div class="image">
                                <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=145">
                                    <img src="${ctx}/imagess/零度白.png"/>
                                </a>
                            </div>
                            <div class="buttons">
                                <a class="btn cart" href="#">
                                    <span class="glyphicon glyphicon-shopping-cart"></span>
                                </a>
                                <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                <a class="btn compare" href="#"><span class="glyphicon glyphicon-transfer"></span></a>
                            </div>
                            <div class="caption">
                                <div class="name">
                                    <h3>
                                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=145">
                                            华为P40 Pro 5G
                                        </a>
                                    </h3>
                                </div>
                                <div class="price">￥7000.00<span>￥7599.00</span></div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star-empty"></span></div>
                            </div>
                        </div>
                    </div>

                    <%--product3--%>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="product"
                             style="border:1px solid gainsboro;border-radius: 8px;box-shadow: 1px 2px 5px #888888;">
                            <div class="image">
                                <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=164">
                                    <img src="${ctx}/imagess/K40-X.jpg"/>
                                </a>
                            </div>
                            <div class="buttons">
                                <a class="btn cart" href="#">
                                    <span class="glyphicon glyphicon-shopping-cart"></span>
                                </a>
                                <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                <a class="btn compare" href="#"><span class="glyphicon glyphicon-transfer"></span></a>
                            </div>
                            <div class="caption">
                                <div class="name">
                                    <h3>
                                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=164">
                                            RedmiK40 5G
                                        </a>
                                    </h3>
                                </div>
                                <div class="price">￥2189.00<span>￥3189.00</span></div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star-empty"></span></div>
                            </div>
                        </div>
                    </div>

                    <%--product4--%>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div class="product"
                             style="border:1px solid gainsboro;border-radius: 8px;box-shadow: 1px 2px 5px #888888;">
                            <div class="image">
                                <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=134">
                                    <img src="${ctx}/imagess/note20U-X.jpg"/>
                                </a>
                            </div>
                            <div class="buttons">
                                <a class="btn cart" href="#">
                                    <span class="glyphicon glyphicon-shopping-cart"></span>
                                </a>
                                <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart"></span></a>
                                <a class="btn compare" href="#"><span class="glyphicon glyphicon-transfer"></span></a>
                            </div>
                            <div class="caption">
                                <div class="name">
                                    <h3>
                                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=134">
                                            Galaxy Note20 Ultra 5G
                                        </a>
                                    </h3>
                                </div>
                                <div class="price">￥6599.00<span>￥7599.00</span></div>
                                <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star"></span><span
                                        class="glyphicon glyphicon-star-empty"></span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <%--手机热销榜end--%>


            <div class="row">
                <div class="banner">
                    <div class="col-sm-6">
                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=147"
                           title="前往查看商品">
                            <img src="${ctx }/imagess/sub-banner44.jpg"
                                 style="border-radius: 10px;border:3px solid #7f8c8d;"/>
                        </a>

                    </div>
                    <div class="col-sm-6">
                        <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=134"
                           title="前往查看商品">
                            <img src="${ctx }/imagess/sub-banner5.jpg"
                                 style="border-radius: 10px; border:1px solid #7f8c8d;"/>
                        </a>
                    </div>
                </div>
            </div>

            <%--PS5--%>
            <div class="row">
                <div class="col-lg-12">
                    <div class="heading"><h2 style="font-family: 'HarmonyOS Sans SC'">PS5热卖</h2></div>
                    <div class="products">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=165">
                                        <img src="${ctx}/imagess/productImg/漫威蜘蛛侠-迈尔斯莫拉里斯-最终版.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=165">
                                                迈尔斯莫拉里斯-最终版
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥298.00<span>￥398.00</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=166">
                                        <img src="${ctx}/imagess/productImg/恶魔之魂-重制版.png"/>
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
                                                恶魔之魂-重制版
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
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image"><a
                                        href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=171">
                                    <img src="${ctx}/imagess/productImg/使命的召唤17-冷战.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=171">
                                                使命的召唤17-冷战
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥400.00<span>￥539.00</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=167">
                                        <img src="${ctx}/imagess/productImg/瑞奇与叮当-列痕-切割分裂.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=167">
                                                瑞奇与叮当-列痕-切割分裂
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥450.00<span>￥558.00</span></div>
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

                <%--Switch--%>
                <div class="col-lg-12">
                    <div class="heading"><h2 style="font-family: 'HarmonyOS Sans SC'">Switch热卖</h2></div>
                    <div class="products">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=170">
                                        <img src="${ctx }/imagess/productImg/塞尔达传说-荒野之息.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=170">
                                                塞尔达传说-荒野之息
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥310.00<span>￥358.00</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=168">
                                        <img src="${ctx }/imagess/productImg/超级马力欧派对.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=168">
                                                超级马力欧派对
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥299.00<span>￥340</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=172">
                                        <img src="${ctx }/imagess/productImg/奥日与黑暗森林.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=172">
                                                奥日与黑暗森林
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥245.00<span>￥250</span></div>
                                    <div class="rating"><span class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span><span
                                            class="glyphicon glyphicon-star"></span></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="product">
                                <div class="image">
                                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=169">
                                        <img src="${ctx }/imagess/productImg/怪物猎人崛起Rise.png"/>
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
                                            <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=169">
                                                怪物猎人崛起Rise
                                            </a>
                                        </h3>
                                    </div>
                                    <div class="price">￥438.00<span>￥450.00</span></div>
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
        </div>
    </div>
    <%@ include file="./jsp/end.jsp" %>
</body>
</html>
