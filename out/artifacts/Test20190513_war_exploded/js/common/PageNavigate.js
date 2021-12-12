NameSpace = new Object();

/**
* 功能：处理自定义的命名空间，注册一个自定义的命名空间
**/
NameSpace.registor = function (uri) {
	var evalStr = "";
	
	//建立所谓的命名空间，实际上是从外到内，逐级创建对象的过程
	//如：frame.common，首先frame = new Object()，然后frame.common = new Object();
	if (uri != null && uri.length > 0) {
		var uriList = uri.split(".");
		
		var varName = "";
		
		for (var i = 0; i < uriList.length; i++) {
			if (i != 0) {
				varName = varName + ".";
			}
			
			varName = varName + uriList[i];
			
			evalStr = evalStr + "if(typeof(" + varName + ")=='undefined'){" + varName + " = new Object();}";
		}
		
		eval(evalStr);
	}
};

//注册一个frame.common命名空间
NameSpace.registor("frame.common");

/**
* 功能：pageNavigate的默认回调函数
* 参数：pageNo 传入的当前页号
*	   otherParam 前次请求中除去pageNo和pageRows参数以外的所有参数
**/
frame.common.pageCallBackMethod = function (pageNo, otherParam) {
	var url = "";
	var winLocation = window.location.href;
	
	if (winLocation.indexOf("?") == -1) {
		url = winLocation + "?curPageNo=" + pageNo + otherParam;
	} else {
		url = winLocation.substring(0, winLocation.indexOf("?")) + "?curPageNo=" + pageNo + otherParam;
	}
	
	window.location = url;
};
