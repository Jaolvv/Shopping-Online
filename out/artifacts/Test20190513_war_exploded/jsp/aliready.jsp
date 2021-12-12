<!--
* @FilePath: \WebContent\jsp\aliready.jsp
* @Author: Liu Xingyu
* @Date: 2021-06-21
* @Version: 1.0
* @Contact: 18423475135@163.com
* @Descripttion注释/说明:
-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags/" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
    <title>用户已购买信息</title>
    <link rel="Icon" href="imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->
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
    <script src="${ctx }/js/jquery-1.9.1.js"></script>
    <!-- Core JavaScript Files -->
    <script src="${ctx }/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${ctx }/layui/lay/dest/layui.all.js"></script>
    <script type="text/javascript" src="${ctx }/layui/layui.js"></script>
    <script type="text/javascript" src="${ctx }/js/dialogDiv.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx }/layui/css/layui.css">

    <style type="text/css">
        * {
            font-family: "HarmonyOS Sans SC";
        }
        .BigDiv {
            width: 55%;
            height: 500px;
            text-align: center;
            margin: auto;
        }
    </style>
    <%@ include file="dialogDiv.jsp" %>
</head>

<body class="layui-text">
<%@ include file="./head.jsp" %>
<div class="BigDiv">

    <table class="layui-table" id="example" style="height: 80%">
        <thead>
        <tr>
            <td align="center">订单号</td>
            <td align="center">用户</td>
            <td align="center">寄送地址</td>
            <td align="center">下单时间</td>
            <td align="center">订单总金额</td>
            <td>操作</td>
        </tr>
        </thead>

        <tbody>
        <c:forEach items="${nolist.results}" var="order">
            <tr>
                <td align="center">${order.no_id}</td>
                <td align="center">${order.uId.u_name}</td>
                <td align="center">${order.no_addr}</td>
                <td align="center">${order.no_orderdate}</td>
                <td align="center">${order.no_sumprice}</td>
                <td><a href="javascript:showOrederdetail(${order.no_id})">
                    <i class="layui-icon" style="font-size: 20px;color: #1E9FFF;">&#xe642;明细</i>
                </a>
                </td>
            </tr>
        </c:forEach>
        </tbody>

    </table>
    <tags:pagination pages="${nolist}"/>
</div>

<%@ include file="end.jsp" %>
</body>

</html>