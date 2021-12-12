<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>登录</title>
    <link rel="Icon" href="imagess/icon.png" type="image/x-icon" /><!-- icon图标 -->

    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="./css/bootstrap.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./css/style.css">


    <!-- Custom Fonts -->
    <link rel="stylesheet" href="./font-awesome/css/font-awesome.min.css" type="text/css">
    <link rel="stylesheet" href="./fonts/font-slider.css" type="text/css">

    <!-- jQuery and Modernizr-->
    <script src="./js/jquery-2.1.1.js"></script>

    <script src="./js/bootstrap.min.js"></script>

    <script type="text/javascript" src="./js/account.js"></script>

    <style type="text/css">
        * {
            font-family: "HarmonyOS Sans SC";
        }
        .breadcrumb{
            height: 46px;
            text-align: left;
        }
    </style>
</head>

<body>
<%@ include file="./head.jsp" %>
<!-- //////////////////////////////////////////////////// -->
<!-- //////////////////////Account Page////////////////// -->
<!-- //////////////////////////////////////////////////// -->
<div id="page-content" class="single-page">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="breadcrumb">
                    <li><a href="./index">首页</a></li>
                    <li><a href="#">账户</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="heading">
                    <h2>登录</h2>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="用户名：" name="u_name1" id="u_name1" required>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="密码："
                           name="u_password1" id="u_password1" required>
                </div>
                <button type="button" class="btn btn-1" onclick="login()">登录</button>
                <a href="#">忘记密码</a>
                <span id="s1"></span>
            </div>

            <div class="col-md-6">
                <div class="heading"><h2>没有账号?创建一个账户吧！</h2></div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="姓名:" name="u_name" id="u_name" required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="密码:" name="u_password" id="u_password" required>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="邮箱:" name="u_email" id="u_email" required>
                </div>
                <div class="form-group">
                    <input type="addr" class="form-control" placeholder="地址:" name="u_addr" id="u_addr" required>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="邮编:" name="u_zip" id="u_zip" required>
                </div>
                <div class="form-group">
                    <input type="tel" class="form-control" placeholder="电话:" name="u_phone" id="u_phone" required>
                </div>
                <div class="form-group">
                    <a href="${ctx}/html/UserAgreement.html">
                        <span style="color: blue">
                            《用户注册协议及服务条款》
                        </span>
                    </a>
                    <input name="agree" id="aagree" type="checkbox">我同意此条款内容.
                </div>
                <button type="button" class="btn btn-1" onclick="regUser()">注册</button>
            </div>
        </div>
    </div>
</div>
<%@include file="end.jsp" %>
</body>

</html>