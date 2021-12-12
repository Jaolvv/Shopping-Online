<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div id="divs" style="display:none">
    <div class="widget am-cf" style="font-family:'HarmonyOS Sans SC Medium'">
        <div class="widget-body am-fr">
            <div class="layui-form-item">
                <table id="layTab" class="layui-table" id="example-r">
                    <thead>
                        <tr>
                            <td align="center">明细编号</td>
                            <td align="center">所属订单</td>
                            <td align="center">购买商品</td>
                            <td align="center">购买数量</td>
                            <td align="center">明细总金额</td>
                        </tr>

                    </thead>

                    <tbody>

                    </tbody>
                </table>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block" style="text-align:right">
                    <button onclick="deletesCode()" type="layui-btn" class="layui-btn layui-btn-primary"
                    style="margin-right: 20px;margin-top: 50px;">
                        关闭
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
