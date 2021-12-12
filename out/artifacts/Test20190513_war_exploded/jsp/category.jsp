<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>商品类目</title>
    <link rel="Icon" href="imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="${ctx }/css/bootstrap.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${ctx }/css/style.css">

    <!-- Custom Fonts -->
    <link rel="stylesheet" href="${ctx }/fonts/font-slider.css" type="text/css">

    <!-- jQuery and Modernizr-->
    <script src="${ctx }/js/jquery-2.1.1.js"></script>

    <script src="${ctx }/js/bootstrap.min.js"></script>

    <script type="text/javascript">
        function jumpCategoryPage(page, cg_id) {
            location.href = "${ctx }/usersSelectCategory?cg_id=" + cg_id + "&pageCount=" + page;
        }

        function addCart(p_id) {
            location.href = "${ctx}/addCart?key=" + p_id + "&v=1";
        }
    </script>
    <style type="text/css">
        * {
            font-family: "HarmonyOS Sans SC";
        }
    </style>
</head>

<body style="width: 100%">
<%@ include file="./head.jsp" %>
<!-- ////////////////////////////////// -->
<!-- //////////Category Page/////////// -->
<!-- ////////////////////////////////// -->

<div id="page-content" class="single-page">
    <div class="row">
        <div class="col-lg-12">
            <ul class="breadcrumb" style="height: 46px">
                <li><a href="${ctx}/index.jsp">首页</a></li>
                <li>分类</li>
            </ul>
        </div>
    </div>

    <c:forEach var="product" items="${pList}" varStatus="num">
        <c:if test="num.count eq 1 ||(num.count-1)%3 eq 0">
            <div class="row">
            <div class="col-md-12">
            <div class="products">
        </c:if>
        <div style="margin-right: 50px;margin-left: 50px">
            <div class="col-lg-4 col-md-4 col-xs-12">
                <div class="product">
                    <div class="image">
                        <a href="javascript:selectProduct(${product.p_id})">
                            <img width="430" height="556" src="${ctx }${requestScope.product.p_imgName}"/></a>
                    </div>
                    <div class="buttons">
                        <a class="btn cart" href="#"><span class="glyphicon glyphicon-shopping-cart"></span></a>

                        <a class="btn wishlist" href="#"><span class="glyphicon glyphicon-heart "></span></a>

                        <a class="btn compare" href="#"><span class="glyphicon glyphicon-transfer"></span></a>
                    </div>

                    <div class="caption">
                        <div class="name">
                            <h3><a href="javascript:selectProduct(${product.p_id})">${product.p_name}</a></h3>
                        </div>
                        <div class="price">${product.p_price}</div>
                        <div class="rating">
                            <span class="glyphicon glyphicon-star"></span> <span
                                class="glyphicon glyphicon-star"></span><span
                                class="glyphicon glyphicon-star"></span> <span
                                class="glyphicon glyphicon-star"></span><span
                                class="glyphicon glyphicon-star-empty "></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <c:if test="num.count %3 eq 0 || num.count eq 3">
            </div>
            </div>
            </div>
        </c:if>
    </c:forEach>
</div>
</div>
<!--分页器-->
<div class="row text-center" style="width: 100%">
    <ul class="pagination" id="cate">
        <c:forEach begin="1" end="${count}" var="num">
            <li id="${num}"><a href="javascript:jumpCategoryPage(${num}${cg_id})">${num}</a></li>
        </c:forEach>
    </ul>
</div>
<script type="text/javascript">
    $("#" +${pageCount}).attr("class", "active");
</script>
<%@ include file="./end.jsp" %>
</body>

</html>
