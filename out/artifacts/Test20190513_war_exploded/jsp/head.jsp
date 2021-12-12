<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script type="text/javascript" src="${ctx }/layui/lay/dest/layui.all.js"></script>
<script type="text/javascript" src="${ctx }/layui/layui.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx }/layui/css/layui.css">
<script type="text/javascript">
    $(function () {
        //layer.open({title:'错误提示',content:'ok',offset:'100px'});
        initData();
    });

    function initData() {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "${ctx }/product/initData",
            success: function (data) {
                var clist = data[0];
                var plist = data[1];
                var uls = $("#uls");
                var result = "";
                for (var i = 0; i < clist.length; i++) {
                    result += "<li class='dropdown'><a href='#' onclick='jumpCategory(" + clist[i].cg_id +
                        ")' class='dropdown-toggle' data-toggle='dropdown'>" + clist[i].cg_name +
                        "</a><div class='dropdown-menu'><div class='dropdown-inner'><ul class='list-unstyled'>"
                    for (var k = 0; k < plist.length; k++) {
                        if (clist[i].cg_id == plist[k].cgId.cg_id) {
                            result += "<li><a href='javascript:selectProduct(" + plist[k].p_id + ")'>" + plist[k].p_name + "</a></li>";
                        }
                    }
                    result += "</ul></div></div></li>";
                }
                uls.append(result);
            }
        });
    }

    function jumpCategory(cg_id) {
        location.href = "${ctx}/usersSelectCategory?cg_id=" + cg_id + "&pageCount=1";
    }

    function selectProduct(p_id) {
        location.href = "${ctx}/product/selectProductByID?p_id=" + p_id;
    }

    function zhuxiao() {
        layer.open({
            title: ['确认提示'],
            content: '<div style="color:#767676">确定要退出当前登录吗?<br/></div>',
            btn: ['确认', '取消'],
            offset: '300px',
            //回调函数
            yes: function (index, layero) {
                location.href = "${ctx}/zhuxiao";
            }
        });
    }

    function jumpUserPage() {
        location.href = "${ctx}/selectUsersPage";
    }
</script>

<style type="text/css">/*样式*/
* {
    font-family: "HarmonyOS Sans SC";
}
.containerforsearch{
    width: 800px;
    margin: 50px auto 0 auto;
}
.parentforsearch{
    position: relative;
}
.searchproduct{
    width: 400px;
    height: 50px;
    border-radius: 20px;
    outline: none;
    border: 3px solid blue;
    padding-left: 20px;
    position: absolute;
}
.buttonforsearch{
    display: inline-block;
    border-radius: 40px;
    background-color: #f4511e;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 20px;
    padding: 20px;
    width: 150px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    position: absolute;
    top: -12px;
    left: 455px;
}
.buttonforsearch span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}
.buttonforsearch span:after {
    content: '🔍';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

.buttonforsearch:hover span {
    padding-right: 25px;
}

.buttonforsearch:hover span:after {
    opacity: 1;
    right: 0;
}
.hotsearch{
    margin-top: 110px;
    margin-right: 500px;
    position: inherit;
    top: 200px;
    text-align: center;
}

</style>

<nav id="top">
    <div class="container">
        <div class="row">
            <div class="col-xs-6">
                <img src="${ctx}/imagess/地址.png">
                <select class="city">
                    <option value="bj">北京</option>
                    <option value="cq" selected>重庆</option>
                </select>
            </div>

            <div class="col-xs-6">
                <ul class="top-link">
                    <li>
                        <c:if test="${!empty sessionScope.userinfo}">
                            欢迎<a href="javascript:jumpUserPage()"><span class="glyphicon glyphicon-user"></span>
                            ${sessionScope.userinfo.u_name}</a>登录
                            <font color="red"><span class="glyphicon glyphicon-user"><a href="javascript:zhuxiao()">
							注销</a></span></font>
                        </c:if>
                        <c:if test="${empty sessionScope.userinfo }">
                            <a href="${ctx}/accountLogin">
                                <span class="glyphicon glyphicon-user"></span>
                                用户登录
                            </a>
                        </c:if>
                    </li>
                    <li>
                        <a href="${ctx}/jsp/contact.jsp">
                            <span class="glyphicon glyphicon-envelope"></span>
                            联系我们
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav><%--top.end--%>

<!--Header-->
<header class="container">
    <div class="row">

        <%--logo--%>
        <div class="col-md-4">
            <div id="logo">
                <img src="${ctx}/imagess/headlogo.png"/>
            </div>
        </div>

        <%--search--%>
        <div class="containerforsearch">
            <form action="" class="parentforsearch">
                <input type="text" class="searchproduct" placeholder="请输入想要搜索的内容">
                <button class="buttonforsearch" style="vertical-align:middle"><span>搜索</span></button>
            </form>
        </div>

            <%--hotsearch--%>
            <div class="hotsearch">
                <span>
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=148">
                        <b style="color: #e74c3c">Macbook</b>
                    </a>
                </span>
                <span>
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=106">
                        <b>小米11</b>
                    </a>
                </span>
                <span>
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=160">
                        <b>索尼电视机</b>
                    </a>
                </span>
                <span>
                    <a href="http://localhost:8080/Test20190513_war_exploded/product/selectProductByID?p_id=156">
                        <b>RTX3060</b>
                    </a>
                </span>
            </div>

            <c:if test="${empty sessionScope.userinfo }">
                <!-- 模态框（Modal） -->
                <div class="modal fade" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true"></button>
                                <h4 class="modal-title" id="myModalLabel">What's New?!</h4>
                            </div>
                            <div class="modal-body">
                                <a href="${ctx}/selectNoticeByDate">
                                    <button id="butt" type="button" disabled="disabled"></button>
                                </a>
                                <table width="100%" id="trs" style="border-radius: 20px" class="table table-striped">
                                    <tr>
                                        <td>标题: 假的</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            内容: 没有内容
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">收到！</button>
                            </div>
                        </div>
                    </div>
                </div>
            </c:if>
            <script>
                var url = window.location.pathname;
                var u = "${ctx}/index.jsp";
                if (url == u) {
                    $('#myModal').modal();
                }
            </script>

        <c:if test="${!empty sessionScope.userinfo }">
                <div id="cart">
                    <a class="btn btn-1" href="${ctx }/product/selectCart">
                        <span class="glyphicon glyphicon-shopping-cart">
                        </span>购物车: ${fn:length(sessionScope.cart)}商品
                    </a>
                </div>
        </c:if>

    </div>
    <%--end_row--%>
</header>   <%--end_container--%>

<!--Navigation-->
<nav id="menu" class="navbar">
    <div class="container">
        <div class="navbar-header">
            <span id="heading" class="visible-xs">
                分类
            </span>
            <button type="button" class="btn btn-navbar navbar-toggle"
                    data-toggle="collapse" data-target=".navbar-ex1-collapse"><i class="fa fa-bars"></i></button>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul id="uls" class="nav navbar-nav">
                <li>
                    <a href="${ctx }/index.jsp">
                        首页
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>