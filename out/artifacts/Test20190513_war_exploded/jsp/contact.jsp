<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>联系我们</title>
    <link rel="icon" href="../imagess/icon.png" type="image/x-icon" /><!-- icon图标 -->

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
        .glyphicon-earphone {
            margin-top: 5px;
        }

        .glyphicon-envelope {
            margin-top: 5px;
        }

        * {
            font-family: "HarmonyOS Sans SC Medium";
        }
    </style>
</head>

<body>
<%@ include file="head.jsp" %>
<!-- ////////////////////////////////////////// -->
<!-- //////////////////Contact Page//////////// -->
<!-- ////////////////////////////////////////// -->
<div id="page-content" class="single-page">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumb" style="height: 46px">
                    <li><a href="index.html">首页</a></li>
                    <li><a href="contact.html">联系</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="heading">
                    <h1 style="font-family: 'HarmonyOS Sans SC Medium'">联系我们</h1>
                </div>
            </div>
            <div class="col-md-6" style="margin-bottom: 30px;">
                <form name="form1" id="ff" method="post" action="contact.php">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="您的姓名" name="name"
                               id="name" required
                               data-validation-required-message="亲输入您的姓名.">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="您的邮箱" name="email"
                               id="email" required
                               data-validation-required-message="请输入您的邮箱.">
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control" placeholder="您的手机号码" name="phone"
                               id="phone" required
                               data-validation-required-message="请输入您的手机号码.">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="留言信息 *" name="message" id="message" required
                                  data-validation-required-message="请留言.">
                        </textarea>
                    </div>
                    <button type="submit" class="btn btn-1">立刻发送信息！</button>
                </form>
            </div>
            <div class="col-md-6">
                <p><span class="glyphicon glyphicon-home"></span> 重庆市, 渝北区 桃源大道1000号</p>
                <p><span class="glyphicon glyphicon-earphone"></span> +86 023-68671033</p>
                <p><span class="glyphicon glyphicon-envelope"></span> cqipcedu@163.com</p>
                <br>
                <iframe src="map.html" width="600" height="500" frameborder="0" scrolling="no">
                </iframe>
            </div>
        </div>
    </div>
</div>
<%@include file="end.jsp" %>
</body>
</html>