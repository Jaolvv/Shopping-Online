<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>gonggao</title>
    <link rel="Icon" href="imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->
</head>
<body>
<table width="100%" border="1" class="table table-striped">
    <tr>
        <td>标题</td>
        <td>折扣</td>
    </tr>
    <c:forEach items="${notices}" var="d">
        <tr>
            <td>${d.n_title}</td>
            <td>${d.n_content}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>