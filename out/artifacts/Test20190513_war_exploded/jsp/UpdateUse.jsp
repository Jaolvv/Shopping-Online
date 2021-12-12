<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>修改用户信息</title>
    <link rel="Icon" href="imagess/useredit.png" type="image/x-icon" /><!-- icon图标 -->
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
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
    <script type="text/javascript" src="${ctx }/layui/lay/dest/layui.all.js"></script>
    <script type="text/javascript" src="${ctx }/layui/layui.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx }/layui/css/layui.css">

    <style type="text/css">
        *{
            font-family: "HarmonyOS Sans SC";
        }
    </style>
</head>
<body>
<%@include file="head.jsp" %>
<form class="layui-form" action="./UserController?type=updateUserInfo">
    <center><b class="layui-text" style="font-size: 35px">用户信息修改</b></center>
    <div class="layui-form-item">
        <label class="layui-form-label" style="width: 20%;">用户编号：</label>
        <div class="layui-input-block">
            <input type="text" required value="${sessionScope.userinfo.u_id}" id="u_id" name="u_id"
                   autocomplete="off" class="layui-input" readonly="readonly" style="width: 80%">
        </div>
    </div>
    <div class="layui-form-item">
        <lobel class="layui-form-label" style="width: 20%">用户姓名:</lobel>
        <div class="layui-input-block">
            <input type="text" required placeholder="请输入姓名" lay-verify="required"
                   value="${sessionScope.userinfo.u_name}" id="u_name" name="u_name"
                   autocomplete="off" class="layui-input" style="width: 80%;">
        </div>
    </div>

    <div class="layui-form-item">
        <lobel class="layui-form-label" style="width: 20%">用户邮箱:</lobel>
        <div class="layui-input-block">
            <input type="text" required placeholder="请输入邮箱" lay-verify="email"
                   value="${sessionScope.userinfo.u_email}" id="u_email" name="u_email"
                   autocomplete="off" class="layui-input" style="width: 80%;">
        </div>
    </div>

    <div class="layui-form-item">
        <lobel class="layui-form-label" style="width: 20%">用户密码:</lobel>
        <div class="layui-input-block">
            <input type="password" required placeholder="请输入密码" lay-verify="number"
                   value="${sessionScope.userinfo.u_password}" id="u_password" name="u_password"
                   autocomplete="off" class="layui-input" style="width: 80%;">
        </div>
    </div>

    <div class="layui-form-item">
        <lobel class="layui-form-label" style="width: 20%">用户地址:</lobel>
        <div class="layui-input-block">
            <input type="text" required placeholder="请输入邮寄地址" lay-verify="required"
                   value="${sessionScope.userinfo.u_addr}" id="u_addr" name="u_addr"
                   autocomplete="off" class="layui-input" style="width: 80%;">
        </div>
    </div>

    <div class="layui-form-item">
        <lobel class="layui-form-label" style="width: 20%">用户邮编:</lobel>
        <div class="layui-input-block">
            <input type="text" required placeholder="请输入邮编" lay-verify="number"
                   value="${sessionScope.userinfo.u_zip}" id="u_zip" name="u_zip"
                   autocomplete="off" class="layui-input" style="width: 80%;">
        </div>
    </div>

    <div class="layui-form-item">
        <lobel class="layui-form-label" style="width: 20%">用户电话:</lobel>
        <div class="layui-input-block">
            <input type="text" required placeholder="请输入电话号码" lay-verify="phone"
                   value="${sessionScope.userinfo.u_phone}" id="u_phone" name="u_phone"
                   autocomplete="off" class="layui-input" style="width: 80%;">
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">提&nbsp;交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重&nbsp;置</button>
        </div>
    </div>
</form>
<%@include file="end.jsp" %>
</body>
</html>
