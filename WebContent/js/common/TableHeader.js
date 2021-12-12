
/**
* 功能：在TH标签上点击鼠标的时候被调用
**/
clickOnTH = function(e, sortMethod, otherParams)
{
	try
	{
		//以下代码主要是用于ie和firefox兼容而做的处理
		//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
		var theEvent = window.event || e;
	    var srcObj = theEvent.srcElement;
	    if (!srcObj) 
		{
			srcObj = theEvent.target;
	    }
	
		var obj;
		if(srcObj.tagName.toUpperCase( ) == "TH") {
			obj = srcObj;
		}
		else if(srcObj.parentNode.tagName.toUpperCase( ) == "TH") {
			obj = srcObj.parentNode;
		}
			
		if (obj.tagName.toUpperCase( ) != "TH") {
			return;
		}
		
		if(obj != null)
		{
			//获取排序字段和排序方式
			var colName = obj.getAttribute('colName');
			var sortType = obj.getAttribute('sortType');
			
			if(colName != null && sortType != null) {
				var jsStr = sortMethod + "('" + colName + "','" + sortType + "','" + otherParams + "')";
				
				eval(jsStr);
			}
		}
	}
	catch(e)
	{
	}
}

/**
* 功能：在TH标签上移动鼠标的时候被调用
**/
overTHColor = function(e)
{
	//以下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var srcObj = theEvent.srcElement;
    if (!srcObj) 
	{
		srcObj = theEvent.target;
    }

	var obj;
	if(srcObj.tagName.toUpperCase( ) == "TH")
		obj = srcObj;
	else if(srcObj.parentNode.tagName.toUpperCase( ) == "TH")
		obj = srcObj.parentNode;

	if(obj != null)
	{
		obj.style.color="#CE0010";
		obj.style.cursor="pointer";
		//obj.style.backgroundColor = "#999999";
	}
}

/**
* 功能：当鼠标移出TH标签的时候被调用
**/
outTHColor = function(e)
{
	//以下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var srcObj = theEvent.srcElement;
    if (!srcObj) 
	{
		srcObj = theEvent.target;
    }

	var obj;
	if(srcObj.tagName.toUpperCase( ) == "TH")
		obj = srcObj;
	else if(srcObj.parentNode.tagName.toUpperCase( ) == "TH")
		obj = srcObj.parentNode;

	if(obj != null)
	{
		obj.style.color="#000";
		obj.style.cursor="default";
		//obj.style.backgroundColor = "";
	}
}

/**
* 功能：表头排序的默认调用函数
* 参数：colName 需要排序的字段
*	   sortType 排序的方式
**/
sortTable = function(colName,sortType,otherParams)
{
	var url = "";
	var winLocation = window.location.href;
	
	if (winLocation.indexOf("?") == -1) {
		//没有带参数，则在url后面追加参数
		url = winLocation + "?sortCol=" + colName + "&sortType=" + sortType;
	} 
	else {
		//已经有参数了，则需要将sortCol和sortType参数去掉
		url = winLocation.substring(0, winLocation.indexOf("?") + 1);
		
		url += "sortCol=" + colName + "&sortType=" + sortType + otherParams;
	}

	window.location = url;
}