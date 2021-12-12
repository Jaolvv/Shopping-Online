<%@tag import="org.cqipc.edu.mybatis.Page" %>
<%@tag pageEncoding="UTF-8" %>
<%@attribute name="pages" type="org.cqipc.edu.mybatis.Page" required="true" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    int current = pages.getPageNo();
    int begin = pages.getStart();
    Long end = pages.getEnd();
    int totalPage = pages.getTotalPage();
    request.setAttribute("current", current);
    request.setAttribute("begin", begin);
    request.setAttribute("end", end);
    request.setAttribute("totalPage", totalPage);
%>

<div id="pagination">
	
</div>

<script>
layui.use(['layer', 'laypage'], function(){
		var laypage = layui.laypage, layer = layui.layer;
        var totalPage = <%=request.getAttribute("totalPage")%>;
        var current = <%=request.getAttribute("current")%>;
        laypage({
            cont: 'pagination',
            pages: totalPage,
            skip: true,
            first: '首页',
            last: '末页',
            curr: current,
            jump: function (obj, first) {
                if (!first) {
                    current = obj.curr;
                    window.location.href = "?page=" + obj.curr + "&${searchParams}"+"&type=${flag}";
                }
            }
        });
    });
    function freshen() {
        setTimeout(function () {
            window.location.href = "?page=" + <%=request.getAttribute("current")%> +"&${searchParams}"+"&type=${flag}";
        }, 1000)
    }
</script>


