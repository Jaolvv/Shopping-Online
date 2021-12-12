<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>用户信息页面</title>
    <link rel="Icon" href="imagess/user.png" type="image/x-icon"/><!-- icon图标 -->

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
        * {
            font-family: "HarmonyOS Sans SC";
        }
    </style>

    <script type="text/javascript">
        function jumpModify(){
            location.href = "${ctx}/jumpUserModify";
        }
        function selectUserNorders() {
            location.href = "${ctx}/selectUserNorders";
        }
    </script>
</head>

<body>
<%@include file="./head.jsp" %>
<table width="500px" class="layui-table" lay-even lay-skin="line">
    <thead>
    <tr>
        <td colspan="2" align="center">
            <i class="layui-text" style="font-size: 35px">用户信息</i>
        </td>
    </tr>
    </thead>
    <tr>
        <td align="right">用户编号：</td>
        <td>${sessionScope.userinfo.u_id}</td>
    </tr>
    <tr>
        <td align="right">用户姓名：</td>
        <td>${sessionScope.userinfo.u_name}</td>
    </tr>
    <tr>
        <td align="right">用户邮箱：</td>
        <td>${sessionScope.userinfo.u_email}</td>
    </tr>
    <tr>
        <td align="right">寄送地址：</td>
        <td>${sessionScope.userinfo.u_addr}</td>
    </tr>
    <tr>
        <td align="right">用户邮箱：</td>
        <td>${sessionScope.userinfo.u_zip}</td>
    </tr>
    <tr>
        <td align="right">用户号码：</td>
        <td>${sessionScope.userinfo.u_phone}</td>
    </tr>
    <tr>
        <td align="right">注册时间：</td>
        <td>${sessionScope.userinfo.u_createDate}</td>
    </tr>

    <tr>
        <td colspan="2" align="center">
            <button onclick="javascript:jumpModify()"
                    class="layui-btn" style="width: 120px; height: 50px">
                <i class="layui-icon" style="font-size: 20px">&#xe642;修改</i>
            </button>
            <button onclick="javascript:selectUserNorders()"
                    class="layui-btn" style="width: 240px;height: 50px">
                <i class="layui-icon" style="font-size: 20px">&#xe63c;查询已购买订单信息</i>
            </button>
        </td>
    </tr>
</table>
<%@include file="end.jsp" %>
</body>

</html>
