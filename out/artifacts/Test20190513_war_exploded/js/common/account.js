$(function(){
	
});

function login(){
var u_name=$("#u_name").val();
var u_password=$("#u_password").val();
if(u_name!="" && u_password!=""){
$.ajax({
url:"./UserLogin",
type:"POST",
dataType:" json" ,
data:{"u_name":u_name,"u_password":u_password},
async:false,
success:function(data){
if(data[0]=="ok"){
layer.open({title:'消息提示' ,content: '欢迎'+u_name+'登录' ,offset: '100p×'});location.href="./index.jsp";
}else{
$("#s1").html("<font color='red'>用户名或密码错误<font>");
return false;
}
}
});
}else{
$("#s1").html("<font color='red'>用户名或密码不能为空<font>");
return false;
}

}

function regUser(){
var u_name=document.getElementById("u_name").value;
var u_password=$("#u_password").val();
var u_email=$("#u_email").val();
var u_addr=$("#u_addr").val();
var u_zip=$("#u_zip").val();
var u_phone=$("#u_phone").val();
$.ajax({
type:"post",
dataType:"json",
data:{"u_name":u_name ,"u_password":u_password,"u_email":u_email,"u_addr":u_addr,"u_zip":u_zip,"u_phone":u_phone},
url:"./regUser",
success:function(data){
	if(data==1){
layer.open({title: '消息提示' ,content:'注册成功!请登录! ' ,offset: '100px'});
}
else{
layer.open({title: '错误提示',content:'注册失败! ',offset: '10Op×'});
}
}
});
}



