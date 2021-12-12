<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Addr</title>
    <link rel="Icon" href="imagess/icon.png" type="image/x-icon"/><!-- icon图标 -->
</head>
<body>
<div class="right">
    </br>
    <table border=1 width="850">
        <tr>
            <td>id</td>
            <td>地址1</td>
            <td>地址2</td>
            <td>地址3</td>
        </tr>

        <c:forEach items="${address_information }" var="s">
            <tr>
                    <%--  <td>${s} </td> --%>
                <td>${s.u_id}</td>
                <td>${s.u_address1}</td>
                <td>${s.u_address2}</td>
                <td>${s.u_address3}</td>
            </tr>
        </c:forEach>

    </table>
</div>
<form action="${pageContext.request.contextPath }/add_address">
    地址：<input type="text" name="address-1" id="address-1"/>
    <br/>
    <input type="submit" value="保存">
</form>
</body>
</html>