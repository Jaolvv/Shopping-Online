/**
 * 缓存一些数据，用于解决同时提交多次的情况
 * 	
 */
AjaxSubmitMap = {
	urlLocks : {}
}

/**
 * AjaxSubmit构造函数
 * 	
 */
AjaxSubmit = function(options) {
	//返回的容器
	this.target = null;
	
	//url
	this.url = null;
	
	 //提交的表单form
	this.form = null;
	
	//提交方式
	this.submitType = "post";
	
	//提交前检查函数
	this.beforeSubmit = null;
	
	//提交成功后的后续操作函数
	this.success = null;
	
	//提交的参数json格式
	this.parameter = null;
	
	//返回类型：默认html
	this.resultType = 'html';
	
	//初始化参数
	if(options != null) {
		options.url != null ? this.url = options.url : this.url = null;
		options.target != null ? this.target = options.target : this.target = null;
		options.form != null ? this.form = options.form : this.form = null;
		options.beforeSubmit != null && typeof(options.beforeSubmit) == "function" ? this.beforeSubmit = options.beforeSubmit : this.beforeSubmit = null;
		options.success != null && typeof(options.success) == "function" ? this.success = options.success : this.success = null;
		options.resultType != null ? this.resultType = options.resultType :  this.resultType = 'html';
		options.submitType != null ? this.submitType = options.submitType :  this.submitType = 'post';
		options.parameter != null ? this.parameter = options.parameter : this.parameter = null;
		
		//锁定正在提交的信息
		if(this.url) {
			if(AjaxSubmitMap.urlLocks[this.url] == '1'){
			 	//alert('数据正在处理中，请稍后！');
			    AjaxSubmitMap.urlLocks[this.url] = 2;
			}
			else {
				AjaxSubmitMap.urlLocks[this.url] = '1';
			}
		}
	}
	
	//提交form表单操作,
	this.submitForm = function(){
		//提交前验证输入条件,以及处理事件
		if(AjaxSubmitMap.urlLocks[this.url] == 2) return;
		if(this.beforeSubmit != null && !this.beforeSubmit()) {return;}	
		
		if(this.target == null) {
			if(jQuery('#saveResultDiv').size() ==0) {
				jQuery(document.body).append('<div id="saveResultDiv" style="display:none;"></div>');
			}
			this.target = 'saveResultDiv';
		}
		
		var resultTarget = this.target;
		
		//设置返回函数
		var afterSave = this.success;
		
		//将表单提交参数转换成json格式
		this.parameter = jQuery("#"+this.form).formToArray();
		var lockUrl = this.url;
		
		//返回类型不同，处理方式不一样
		if(this.resultType == "html") {
			var backObj = (this.success == null ? null : new SubmitBack(jQuery("#"+resultTarget)));
			jQuery.post(this.url,this.parameter,function(data){AjaxSubmitMap.urlLocks[lockUrl] = '0';jQuery("#"+resultTarget).html(evalScript(data));if(typeof(afterSave) == 'function'){afterSave(backObj);}},this.resultType);
		}
		else if(this.resultType == "json") {
			jQuery.post(this.url,this.parameter,function(data){AjaxSubmitMap.urlLocks[lockUrl] = '0';if(typeof(afterSave) == 'function'){afterSave(data);}},this.resultType);
		}
	}
	
	//post方式提交
	this.post = function(){
		//提交前验证输入条件,以及处理事件
		if(AjaxSubmitMap.urlLocks[this.url] == 2) return;
		if(this.beforeSubmit != null && !this.beforeSubmit()) {return;}
		
		if(this.target == null) {
			if(jQuery('#saveResultDiv').size() ==0) {
				jQuery(document.body).append('<div id="saveResultDiv" style="display:none;"></div>');
			}
			this.target = 'saveResultDiv';
		}
		
		var resultTarget = this.target;
		
		//设置返回函数
		var afterSave = this.success;
		var lockUrl = this.url;
		
		
		//返回类型不同，处理方式不一样
		if(this.resultType == "html") {
			var backObj = (this.success == null ? null : new SubmitBack(jQuery("#"+resultTarget)));
			jQuery.post(this.url,this.parameter,function(data){AjaxSubmitMap.urlLocks[lockUrl] = '0';jQuery("#"+resultTarget).html(evalScript(data));if(typeof(afterSave) == 'function'){afterSave(backObj);}},this.resultType);
		}
		else if(this.resultType == "json") {
			jQuery.post(this.url,this.parameter,function(data){AjaxSubmitMap.urlLocks[lockUrl] = '0';if(typeof(afterSave) == 'function'){afterSave(data);}},this.resultType);
		}
	}
	
	//采用链接的形式
	this.link = function(){
		if(AjaxSubmitMap.urlLocks[this.url] == 2) return;
		
		if(jQuery('#linkSubmitForm').size() ==0) {
			jQuery(document.body).append('<form id="linkSubmitForm" name="linkSubmitForm" method="post" style="display:none;"></form>');
		}
		var url = this.url;
		if(this.url.indexOf("?") > 0) {
			url = this.url.substring(0, this.url.indexOf("?"));
			var lastParam = this.url.substring(this.url.indexOf("?") + 1);
			if(this.parameter == null || typeof(this.parameter) != 'object') {
				this.parameter = {};
			}
			var array = lastParam.split("&");
			for(var i = 0; i < array.length; i++) {
				if(array[i].indexOf("=") > 0) {
					var key = array[i].substring(0, array[i].indexOf("="));
					var value = array[i].substring(array[i].indexOf("=") + 1);
					this.parameter[key] = value;
				}
			}
		}
		
		//设置提交信息
		jQuery("#linkSubmitForm").html("").attr('action',url);
		
		//提交
		if(this.parameter) {
			for(var name in this.parameter) {
				jQuery("#linkSubmitForm").append("<input type='hidden' name='" + jQuery.trim(name) + "' value='" + this.parameter[name] + "' />")
			}
		}
		
		//设置表单的信息
		var paramArray = jQuery("#"+this.form).formToArray();
		for(var i = 0; i < paramArray.length; i++) {
			jQuery("#linkSubmitForm").append("<input type='hidden' name='" + jQuery.trim(paramArray[i]['name']) + "' value='" + paramArray[i]['value'] + "' />")
		}
		
		//提交表单
		jQuery("#linkSubmitForm").submit();
		AjaxSubmitMap.urlLocks[this.url] = '0';
	}
	
	//get方式提交
	this.get = function(){
		//提交前验证输入条件,以及处理事件
		if(AjaxSubmitMap.urlLocks[this.url] == 2) return;
		if(this.beforeSubmit != null && !this.beforeSubmit()) {return;}
		
		if(this.target == null) {
			if(jQuery('#saveResultDiv').size() ==0) {
				jQuery(document.body).append('<div id="saveResultDiv" style="display:none;"></div>');
			}
			this.target = 'saveResultDiv';
		}
		
		var resultTarget = this.target;
		
		//设置返回函数
		var afterSave = this.success;
		var lockUrl = this.url;
	
		//返回类型不同，处理方式不一样
		if(this.resultType == "html") {
			var backObj = (this.success == null ? null : new SubmitBack(jQuery("#"+resultTarget)));
			jQuery.get(this.url,this.parameter,function(data){AjaxSubmitMap.urlLocks[lockUrl] = '0';jQuery("#"+resultTarget).html(evalScript(data));if(typeof(afterSave) == 'function'){afterSave(backObj);}},this.resultType);
		}
		else if(this.resultType == "json") {
			jQuery.get(this.url,this.parameter,function(data){AjaxSubmitMap.urlLocks[lockUrl] = '0';jQuery("#"+resultTarget).html(evalScript(data));if(typeof(afterSave) == 'function'){afterSave(data);}},this.resultType);
		}
		
		
	}
	
	//执行传入文本中的脚本信息
	evalScript = function(htmlData) {
		var data = String(htmlData);
		var scriptFragment = '<script[^>]*>([\\S\\s]*?)<\/script>';
		var linkFragment = '<link([^>]*)(text/css)([^>]*)\/>';
		var srcFragment = 'src[\\S\\s]*=[\\S\\s]*[\'\"]?[\.]js';
		var hrefFragment = 'href[\\S\\s]*=[\\S\\s]*[\'\"]?[\.]css';
		var styleFragment = '<style[^>]*>([\\S\\s]*?)<\/style>';
		
		//匹配所有的字符串
		 var matchLink = new RegExp(linkFragment, 'img');
		 var matchHref = new RegExp(hrefFragment, 'im');
		 
		 var matchStyle = new RegExp(styleFragment, 'img');
		 
		 var matchAll = new RegExp(scriptFragment, 'img');
		 var matchOne = new RegExp(scriptFragment, 'im');
		 var matchSrc = new RegExp(srcFragment, 'im');
		 
		 //样式信息
		 var styleList = data.match(matchStyle) || [];
		 if(styleList.length > 0) {
			 var oHead = jQuery(document.getElementsByTagName('HEAD')[0]);
			 for(var i=0; i<styleList.length; i++) {
				 jQuery(styleList[i]).appendTo(oHead);
				 data = data.replace(styleList[i],'');
			 }
		 }
		 
		 
		 //清除样式信息
		 var linkList = data.match(matchLink) || [];
		 if(linkList.length > 0) {
			var index = 0;
			var linkJson = {};
			
			for(var i=0; i<linkList.length; i++) {
				var srcObjs = linkList[i].match(matchHref);
				if(srcObjs != null && srcObjs.length>0) {
					var srcPath = srcObjs[0].replace(new RegExp('href[\\S\\s]*=','img'),'');
					srcPath = srcPath.replace(new RegExp('[\'\"]','img'),'');
				 	srcPath = jQuery.trim(srcPath);
				 	linkJson[srcPath] = linkList[i];
				 	index ++;
				}
			 }
			
			if(index > 0) {
				var oLinks = document.getElementsByTagName('link'); 
				
				//遍历查找是否存在对应的js
				for(var j = 0;j < oLinks.length; j++) {
					if(oLinks[j].getAttributeNode('href') != null && linkJson[oLinks[j].getAttributeNode('href').value] != null) {
						data = data.replace(linkJson[oLinks[j].getAttributeNode('href').value],'');
						delete linkJson[oLinks[j].getAttributeNode('href').value];
					}
				}
				
				for(var i in linkJson) {
					var oHead = document.getElementsByTagName('HEAD')[0];
					var oLink = document.createElement("link");
					oLink.type = "text/css";
					oLink.rel = 'stylesheet';
					oLink.href = i;
					oHead.appendChild(oLink);
					data = data.replace(linkJson[i],'');
				}
			}
		 }
		
		 //查找所有可执行的js元素以及链接的元素
		 var srcJsList = new Array();
		 var evalJsList = new Array();
		 var srcJson = {};
		 
		 //查找所有javascript
		 var allList = data.match(matchAll) || [];
		 
		 for(var i=0; i<allList.length; i++) {
			//存放src路径
			var srcObjs = allList[i].match(matchSrc);
			
			 if(srcObjs != null && srcObjs.length>0) {
				 var srcPath = srcObjs[0].replace(new RegExp('src[\\S\\s]*=','img'),'');
				 srcPath = srcPath.replace(new RegExp('[\'\"]','img'),'');
				 srcPath = jQuery.trim(srcPath);
				 srcJsList.push(srcPath);
				 srcJson[srcPath] = allList[i];
			 }
			 else {
				 //匹配第一个，匹配成功后，放入执行数组中
				 var oneList = allList[i].match(matchOne) || [''];
				 
				 if(oneList != null && oneList.length > 1) {
					 evalJsList.push(oneList[1]);
				 }
			 }
		 }
		 
		 //执行js
		 for(var i = 0;i<evalJsList.length;i++) {
			 eval(evalJsList[i]);
		 }
		 
		//动态添加js
		 if(srcJsList.length > 0) {
			 //查找所有的js
			var oScripts = document.getElementsByTagName('script');

			//遍历查找是否存在对应的js
			for(var j = 0;j < oScripts.length; j++) {
				if(oScripts[j].getAttributeNode('src') != null && srcJson[oScripts[j].getAttributeNode('src').value] != null) {
					data = data.replace(srcJson[oScripts[j].getAttributeNode('src').value],'');
					delete srcJson[oScripts[j].getAttributeNode('src').value];
				}
			}
			
			for(var i in srcJson) {
				var oHead = document.getElementsByTagName('HEAD')[0];
				var oScript= document.createElement("script");
				oScript.type = "text/javascript";
				oScript.src = i;
				oHead.appendChild(oScript);
			}
		 }
		 
		 return data;
	}
	
	/**
	 * 表单提交方式
	 */
	this.targetSubmit = function(){
		//提交前验证输入条件,以及处理事件
		if(AjaxSubmitMap.urlLocks[this.url] == 2) return;
		if(this.beforeSubmit != null && !this.beforeSubmit()) {return;}
		
		//没有提供保存的target
		if(jQuery('#saveResultIframe').size() == 0){
			jQuery(document.body).append('<iframe frameborder="0" id="saveResultIframe" name="saveResultIframe" style="display:none;"></iframe>');
		}
		
		//设置返回函数
		var afterSave = this.success;
		
		//绑定form表单提交的路径，跳转到的iframe等
		document.getElementById(this.form).setAttribute('enctype','multipart/form-data');
		document.getElementById(this.form).setAttribute('encoding','multipart/form-data');
//		jQuery("#"+this.form).attr('enctype','multipart/form-data');
		jQuery("#"+this.form).attr('action',this.url);
		jQuery("#"+this.form).attr('target','saveResultIframe');
		jQuery("#"+this.form).attr('method',this.submitType);
		var resultTarget = this.target;
		var resultType = this.resultType;
		var lockUrl = this.url;
		
		//提交表单
		jQuery("#"+this.form).submit();
		
		//得到返回结果
		var saveResult = document.getElementById('saveResultIframe');
		
		//iframe加载完毕后的处理
		saveResult.onload = saveResult.onreadystatechange = function() {   
		     if (this.readyState && this.readyState != 'complete'){
		    	 return;
		    } 
		     else {
		     	 AjaxSubmitMap.urlLocks[lockUrl] = '0';
		    	 var resultObj = jQuery("#saveResultIframe").contents().find('body');
	    		 if(resultTarget != null ){
	    			 jQuery("#"+resultTarget).html(resultObj.html());
	    			 resultObj =  jQuery("#"+resultTarget);
	    			 jQuery("#saveResultIframe").contents().find('body').html('');
	    		 }
	    		 
		    	 if(afterSave != null && typeof(afterSave) == 'function') {
		    	 	if(resultType == 'json') {
		    	 		jQuery.trim(resultObj.text()) == '' ? afterSave({}) : afterSave(eval("("+resultObj.text() + ")"));;
		    	 	}
		    	 	else {
		    	 	 	afterSave(new SubmitBack(resultObj));
		    	 	}
		    	 }
		    } 
	    }
	}
}

/**
 * 提交返回的操作对象,此为容器对象
 * @param container
 */
SubmitBack = function(container){
	//设置容器
	this.container = container;
	
	/**
	 * 获取保存结果中指定节点的jQuery对象
	 */
	this.getTarget = function(node){
		return (node == null ? this.container : this.container.find('#'+node));
	}
	
	/**
	 * 获得指定节点的指定属性值
	 */
	this.getChildAttribute = function(node,attrName) {
		if(node != null && attrName != null) {
			return (this.container.find('#'+node).size() == 0 ? null  : this.container.find('#'+node)[0].getAttributeNode(attrName).value);
		}
		else {
			return null;
		}
	}
}