/**
 * 工具类
 */
BSST = {
		//取得对应的键值
		get : function(map,key) {
			return BSST.Format.get(map,key);
		},

		//取得对应的键值，赋予默认值
		getEx : function(map,key,defaultValue) {
			return BSST.Format.getEx(map,key,defaultValue);
		},

		//取得json的长度
		getJsonSize : function(json) {
			return BSST.Format.getJsonSize(json);
		},

		//取得缓存对象
		getCache : function(key) {
			return BSST.Cache.getCache(key);
		},

		//设置缓存对象
		setCache : function(key,obj){
			BSST.Cache.setCache(key,obj);
		},

		//清除空对象
		emptyJson : function(json){
			return BSST.Format.emptyJson(json);
		},

		//清除空对象
		emptyJsonEx : function(json,defaultJson){
			return BSST.Format.emptyJsonEx(json,defaultJson);
		},

		//清除空值
		emptyValue : function(value) {
			return BSST.Format.emptyValue(value);
		},

		//清除空值
		emptyString : function(value,defaultValue) {
			return BSST.Format.emptyString(value,defaultValue);
		},

		//清除空值，赋予默认值
		emptyValueEx : function(value,defaultValue) {
			return BSST.Format.emptyValueEx(value,defaultValue);
		},

		//合并json，两个都有，采用原来的为主
		unionJson : function(src,tar){
			return BSST.Format.unionJson(src,tar);
		},

		//替换json对象
		replaceJson : function(src,tar){
			return BSST.Format.replaceJson(src,tar);
		},

		//将json转换成string类型
		covertToString : function(json){
			return BSST.Format.covertToString(json);
		},

		//比较2个数组
		compArray : function(src,dst) {
			return BSST.Format.compArray(src,dst);
		},

		//创建对话框,
		//json：传入的参数，例如:width:300,height:200等
		//divName：外层div名称，可以标识这个对话框的唯一编号。格式：org_tree
		createDialog : function(json,divName) {
			var thisJson = BSST.emptyValue(divName) != '' ? BSST.unionJson(json,{'divName':divName}) : BSST.emptyJson(json);
			var dialog = BSST.getCache(json['divName']);
			if(BSST.emptyValue(dialog) == '') {
				dialog = new BSST.Dialog(thisJson);
				BSST.setCache(json['divName'],dialog);
			}
			else {
				dialog.initMap(thisJson);
				dialog.createDiv();
			}
			return dialog;
		},

		//关闭对话框
		closeDialog : function(divName) {
			BSST.getCache(divName).closeDialog();
		},

		//显示对话框,divName：哪一个对话框
		//title：对话框显示的名称
		//callbackMethod中带有opts参数，通过改变参数值改变dialog弹出的形状
		showDialog : function(divName,title,callbackMethod) {
			BSST.getCache(divName).showDialog(title,callbackMethod);
		},

		//取得对话框
		getDialog : function(divName){
			return BSST.getCache(divName)		
		},

		//取得文件名称
		getFileName : function(obj) {
			return BSST.Document.File.getFileName(obj);
		},

		//取得文件后缀
		getFileSuffix : function(obj) {
			return BSST.Document.File.getFileSuffix(obj);
		},

		//回调事件
		callback : function(divName,obj) {
			var closeFlag = true;

			if(BSST.getDialog(divName).callbackMethod){
				closeFlag = BSST.getDialog(divName).callbackMethod(obj);
				if(BSST.emptyValue(closeFlag) !== false || BSST.emptyValue(closeFlag) === '' ) closeFlag = true;
			}

			return closeFlag
		},

		//回调事件并关闭窗口
		callbackDialog : function(divName,obj) {
			var dialog = BSST.getDialog(divName);
			var closeFlag = true;
			if(dialog.callbackMethod){
				var closeFlag = dialog.callbackMethod(obj);
				closeFlag = (BSST.emptyValue(closeFlag) !== false || BSST.emptyValue(closeFlag) === '' )
			}
			if(closeFlag) dialog.closeDialog();
		},

		//取得web的路径
		getWebAppPath : function(url){
			return BSST.Document.Script.getWebAppPath(url);
		},

		//创建js对象
		createJs : function(js) {
			return BSST.Document.Script.createJS(js);
		},

		//js加载完成后的事件处理函数
		callbackJsLoad : function(json) {
			BSST.Document.Script.callbackJsLoad(json)
		},

		//创建路径对应的所有对象
		register : function(path) {
			BSST.Namespace.register(path);
		},

		//创建注册对象
		registerEx : function(path,obj) {
			BSST.Namespace.register(path,obj);
		},

		//创建log4j对象
		createLog4j : function(applyFlag){
			if(BSST.emptyValue(BSST.getCache("log4javascript")) == '') {
				BSST.setCache("log4javascript",new BSST.Log4j());
				if(applyFlag)BSST.getCache("log4javascript").applyLog4j();
			}
		},

		//验证重复性
		repeatValid : function(json) {
			BSST.Valid['repeatValid'](json);
		},

		//压缩图片
		pictureZoom : function(imgJqueryObjs,width,height){
			BSST.Picture.pictureZoom(imgJqueryObjs,width,height);
		},

		//鼠标移动到图片上的事件处理函数，必须是jquery对象
		mouseMove : function(imgObjs) {
			BSST.Picture.mouseMove(imgObjs);
		},

		//睡眠线程
		sleep : function(sleepTime) {
			BSST.Document.Script.sleep(sleepTime);
		},

		//链接到其他页面
		location : function(url) {
			BSST.Document.Script.location(url);
		},

		//格式化数字
		formatNumber : function(num,pattern) {
			return BSST.Number.formatNumber(num,pattern);
		},

		//格式化日期
		formatDate : function(format, date) {
			return BSST.Date.formatCurTime(format, date);
		},

		//取得浏览器窗口的大小
		getWindowSize : function(){
			return BSST.Document.getWindowSize();
		},

		//固定滚动窗口
		fixScrollTable : function(json) {
			BSST.Document.fixScrollTable(json);
		},

		//带有session的复选时，都没有设置参数时设置默认的复选项值，如果发现同类被选中则取消默认值
		defaultSessionValue : function(obj, formName){
			BSST.Document.defaultSessionValue(obj, formName);
		},

		//随机产生指定数位的随机码
		randomNums : function(paramJson) {
			return BSST.Format.getRandomNums(paramJson);
		},

		//进行MD5加密
		md5 : function (code, key, raw) {
			return new BSSTMD5().md5(code, key, raw);
		},

		//大于多少长度省略
		omitValue : function (value, len, last) {
			var len = BSST.emptyValueEx(len,10);
			var last = BSST.emptyValueEx(last,"...");
			return value.length > len ? value.substring(0,len) + last : value;
		}
}

/**
 * 常量
 */
BSST.Constants = {
		BSST_URL_PATH : 'js/common/Bsst.js',
		LOG4J_URL_PATH : 'js/common/log4j/log4javascript.js'
}

/**
 * 缓存类
 */
BSST.Cache = {
		cache : {},
		//设置缓存对象
		setCache : function(key,obj){
			BSST.Cache.cache[key] = obj;
		},
		//取得缓存对象
		getCache : function(key) {
			return BSST.Cache.cache[key];
		}
}

/**
 * 数字处理类
 */
BSST.Number = {
		formatNumber : function(num,pattern) {
			var strarr = num?num.toString().split('.'):['0'];  
			var fmtarr = pattern?pattern.split('.'):[''];  
			var retstr='';  

			// 整数部分  
			var str = strarr[0];  
			var fmt = fmtarr[0];  
			var i = str.length-1; 
			var comma = false;

			for(var f=fmt.length-1;f>=0;f--){  
				switch(fmt.substr(f,1)){  
				case '#':  
					if(i>=0 ) retstr = str.substr(i--,1) + retstr;  
					break;  
				case '0':  
					if(i>=0) retstr = str.substr(i--,1) + retstr;  
					else retstr = '0' + retstr;  
					break;  
				case ',':  
					comma = true;  
					retstr=','+retstr;  
					break;  
				}  
			}

			for(var f=fmt.length-1;f>=0;f--){  
				switch(fmt.substr(f,1)){  
				case '#':  
					if(i>=0 ) retstr = str.substr(i--,1) + retstr;  
					break;  
				case '0':  
					if(i>=0) retstr = str.substr(i--,1) + retstr;  
					else retstr = '0' + retstr;  
					break;  
				case ',':  
					comma = true;  
					retstr=','+retstr;  
					break;  
				}  
			} 

			if(i>=0){  
				if(comma){  
					var l = str.length;  
					for(;i>=0;i--){  
						retstr = str.substr(i,1) + retstr;  
						if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;   
					}  
				}  
				else {
					retstr = str.substr(0,i+1) + retstr;
				}  
			}

			// 处理小数部分  
			str=strarr.length>1?strarr[1]:'';  
			fmt=fmtarr.length>1?fmtarr[1]:'';  

			i=0;  

			if(fmt.length > 0) {
				var ss = "";
				var lastIndex = 0;
				var lastNumber = 0;
				for(var f=0;f<fmt.length;f++){  
					switch(fmt.substr(f,1)){  
					case '#':  
						if(i<str.length) {
							var v = str.substr(i++,1);
							ss += v;
							if(v != '0')lastNumber = i;
						}  
						break;  
					case '0':  
						if(i<str.length) {
							var v = str.substr(i++,1);
							ss += v;
							if(v != '0')lastNumber = i;
						}  
						else {
							retstr+='0';  
						}
						lastIndex = i;
						break;  
					}  
				} 

				if(ss.length > 0) {
					if(lastIndex == 0) {
						if(lastNumber > 0) {
							retstr = retstr + "." + ss.substring(0,lastNumber + 1);
						}
					}
					else {
						if(lastIndex > lastNumber) {
							retstr = retstr + "." + ss;
						}
						else {
							retstr = retstr + "." + ss.substring(0,lastNumber + 1);
						}
					}
				} 
			}

			return retstr.replace(/^,+/,'').replace(/\.$/,'');  
		}
}

/**
 * 日期处理类
 */
BSST.Date = {
		//取得日期函数
		formatCurTime : function(formatStr,date){
			var str = formatStr;   
			var Week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];  

			var thisDate = typeof(date) == 'Date' ? date : new Date();

			str=str.replace(/yyyy|YYYY/,thisDate.getFullYear());   
			str=str.replace(/yy|YY/,(thisDate.getYear() % 100)>9?(thisDate.getYear() % 100).toString():'0' + (thisDate.getYear() % 100));   

			str=str.replace(/MM/,thisDate.getMonth() >= 9 ? '': '0' + (thisDate.getMonth() + 1));   
			str=str.replace(/M/g,thisDate.getMonth() + 1);   

			str=str.replace(/w|W/g,Week[thisDate.getDay()]);   

			str=str.replace(/dd|DD/,thisDate.getDate() > 9 ? thisDate.getDate().toString():'0' + thisDate.getDate());   
			str=str.replace(/d|D/g,thisDate.getDate());   

			str=str.replace(/hh|HH/,thisDate.getHours()>9?thisDate.getHours().toString():'0' + thisDate.getHours());   
			str=str.replace(/h|H/g,thisDate.getHours());   
			str=str.replace(/mm/,thisDate.getMinutes()>9?thisDate.getMinutes().toString():'0' + thisDate.getMinutes());   
			str=str.replace(/m/g,thisDate.getMinutes());   

			str=str.replace(/ss|SS/,thisDate.getSeconds()>9?thisDate.getSeconds().toString():'0' + thisDate.getSeconds());   
			str=str.replace(/s|S/g,thisDate.getSeconds());   

			return str;   
		},
		//根据描述取得时间
		formatTime : function(formatStr,seconds){
			var seconds = isNaN(seconds) ? 0 : seconds;
			var str = formatStr;

			var returnStr = "";

			var key = "V";

			//去的小时、分钟、以及秒；并拼凑时间
			var hour = parseInt(seconds/3600);
			var minute = parseInt((seconds - hour*3600)/60);
			var second = seconds - hour*3600 - minute*60;

			//切去秒数
			str=str.replace(/ss|SS/,key+(second > 9 ? second : '0' + second));   
			str=str.replace(/s|S/g,key+second);  
			returnStr = str.substring(str.indexOf(key) + 1) + returnStr;
			str = str.substring(0,str.indexOf(key));

			//切掉分钟数
			str=str.replace(/mm/,key+(minute > 9 ? minute : '0' + minute));   
			str=str.replace(/m/g,key+minute);   
			returnStr = str.substring(str.indexOf(key) + 1) + returnStr;
			str = str.substring(0,str.indexOf(key));

			//切去小时
			str=str.replace(/hh|HH/,key+(hour > 9 ? hour : '0' + hour));   
			str=str.replace(/h|H/g,key+hour); 
			returnStr = (hour > 0 ?  str.substring(str.indexOf(key) + 1) : "") + returnStr;
			str = str.substring(0,str.indexOf(key));

			return returnStr;
		},
		//取得当前的毫秒数
		getMillisecond : function(date){
			var thisDate = typeof(date) == 'Date' ? date : new Date();

			return thisDate.getMilliseconds()
		}
}

/**
 * webservice调用的方法
 */
BSST.Webservice = {
		//调用webservice取得返回结果
		sendEx : function(params){
			//缓存请求以及参数
			var xmlhttp = BSST.Webservice.createXMLHttpRequest();
			BSST.Webservice.cache['params'] = params; 
			BSST.Webservice.cache['xmlhttp'] = xmlhttp; 

			xmlhttp.onreadystatechange = BSST.Webservice.handleStateChange; //状态改变事件处理函数
			xmlhttp.open("POST",params.url, true); //设置提交方式
			var data = BSST.Webservice.getSoapData(params); //取得soap协议对象
			xmlhttp.setRequestHeader("Content-Length",BSST.Webservice.getDataLen(data)); //设置文件长度
			xmlhttp.setRequestHeader("Content-Type","application/soap+xml"); //设置文件格式
			xmlhttp.setRequestHeader("SOAPAction",params.namespace + params.methodName); //设置命名空间以及方法名
			xmlhttp.send(data); //提交信息

		},
		send : function(params) {
			$.ajax({
				url:'http://172.31.255.107/pbx/services/ICtiCall?wsdl',
				type:"post",
				contentType:"text/xml",
				data: BSST.Webservice.getSoapData(params),
				dataType:'xml',
				success:function(data){
					alert(data);
				},
				error: function(x, e) {
					alert('error:'+e);
				}
			});
		},
		cache:{},
		//取得SOAP的参数
		getSoapData : function(params) {
			//根据WSDL分析sayHelloWorld是方法名，parameters是传入参数名
			var postdata="<?xml version=\"1.0\" encoding=\"utf-8\"?>";
			postdata += "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">";
			postdata += "<soap:Body>";
			postdata += "<hangupCalling xmlns=\"http://172.31.255.107/pbx/services\">";

			postdata += "<extNo>"+3102+"</extNo>";

			//设置参数
//			if(typeof(params.parameter) == 'object') {
//			for(var key in params.parameter) {
//			postdata += "<"+key+">"+params.parameter[key]+"</"+key+">"
//			}
//			}

			postdata += "</hangupCalling>";
			postdata += "</soap:Body>";
			postdata += "</soap:Envelope>";

			return postdata;
		},

		//返回处理结果
		handleStateChange : function() {
			var xmlhttp = BSST.Webservice.cache['xmlhttp'];
			var params = BSST.Webservice.cache['params'];

			if(xmlhttp.readyState == 4) {
				alert(xmlhttp.status);
				if(xmlhttp.status==200) {
					if(params.success) params.success(xmlhttp.responseText);
				}
				else if(xmlhttp.status==404) {
					alert('找不到请求的服务器资源！');
				}
			}
		},

		//创建头部协议
		createXMLHttpRequest : function(){
			var xmlhttp = null;
			try {            
				xmlhttp = new XMLHttpRequest();
			}
			catch (e1){
				try {                
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e2){
					xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
				}
			}

			return xmlhttp;
		},

		//创建头部协议
		getDataLen : function(str){
			var bytesCount=0;
			for (var i = 0; i < str.length; i++) {
				var c = str.charAt(i);
				if (/^[u0000-u00ff]$/.test(c)) { //匹配双字节
					bytesCount += 1;
				}
				else {
					bytesCount += 2;
				}
			}
			return bytesCount;
		}
}

/**
 * 格式化对象
 */
BSST.Format = {
		//取得对应的键值
		get : function(map,key) {
			return BSST.Format.getEx(map,key,'');
		},

		//取得对应的键值
		getEx : function(map,key,defaultValue) {
			var value = map[key];
			return value != null && typeof(value) != 'undefined' ? value :defaultValue;
		},

		//取得json的长度
		getJsonSize : function(json) {
			var len = 0;

			if(typeof(json) == 'object') {
				for(var i in json) {
					len++;
				}
			}

			return len;
		},

		//清除空对象
		emptyJson : function(json){
			return json == null || typeof(json) != 'object' ? {} : json;
		},

		//清除空对象
		emptyJsonEx : function(json,defaultJson){
			var src = (json == null || typeof(json) != 'object') ? {} : json;
			return BSST.Format.unionJson(src,defaultJson);
		},

		//清除空值
		emptyValue : function(value) {
			return BSST.Format.emptyValueEx(value,'');
		},

		//比较2个数组,取得2者中不同和相同部分
		compArray : function(srcArray,dstArray) {
			var srcJson = BSST.Format.convertArrayToJson(srcArray);
			var dstJson = BSST.Format.convertArrayToJson(dstArray);
			return BSST.Format.compJsonKey(srcJson,dstJson);
		},

		//比较2个json,取得2者中不同和相同部分
		compJsonKey : function(srcJson,dstJson) {
			var srcJson = BSST.Format.emptyJson(srcJson,{});
			var dstJson = BSST.Format.emptyJson(dstJson,{});

			var srcArray = [];
			var dstArray = [];
			var sameArray = [];

			for(var i in srcJson) {
				if(dstJson[i] != null) {
					sameArray.push(i);
					delete dstJson[i];
				}
				else {
					srcArray.push(i);
				}
			}

			for(var i in dstJson) {
				dstArray.push(i);
			}

			return {src:srcArray,same:sameArray,dst:dstArray};
		},

		//将数组转换成json
		convertArrayToJson : function(array) {
			var json = {};

			if(BSST.Format.emptyValueEx(array,0) != 0 && array.length > 0) {
				for(var i = 0; i< array.length; i++) {
					json[array[i]] = '1';
				}
			}

			return json;
		},

		//将数组转换成json
		convertArrayObjToJson : function(array,attr) {
			var json = {};

			if(BSST.Format.emptyValueEx(array,0) != 0 && array.length > 0) {
				for(var i = 0; i< array.length; i++) {
					json[array[i].attr] = '1';
				}
			}

			return json;
		},

		//清除空值，赋予默认值
		emptyValueEx : function(value,defaultValue) {
			return value != null && typeof(value) != 'undefined' ? value :defaultValue;
		},

		//清除空值，赋予默认值
		emptyString : function(value, defaultValue) {
			return value != null && typeof(value) != 'undefined' && jQuery.trim(value) !== ''? value : defaultValue;
		},

		//合并json，两个都有，采用原来的为主
		unionJson : function(src,tar){
			var srcJson = BSST.Format.emptyJson(src); 
			var tarJson = BSST.Format.emptyJson(tar);

			for(var key in tarJson) {
				if(BSST.Format.emptyValue(srcJson[key]) == '') srcJson[key] = tarJson[key];
			}

			return srcJson;
		},

		//替换json对象
		replaceJson : function(src,tar){
			return BSST.Format.replaceJson(tar,src);
		},

		//取得驼峰命名规则
		getHumpName : function(str){
			if(str.indexOf("_") > 0) {
				var  array = str.split("_");
				str = BSST.Format.toLowerFirstLetter(array[0]);

				for(var i = 1; i< array.length; i++) {
					str += BSST.Format.toUpperFirstLetter(array[i]);
				}
			}

			return str;
		},

		//取得随机数
		getRandomNums : function(paramJson){
			//默认生成6位的随机数
			var json = BSST.unionJson(paramJson,{num:6,format:'lower'});
			var n = BSST.emptyValueEx(json['num'],6);
			var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			var res = "";
			for(var i = 0; i < n ; i ++) {
				var id = Math.ceil(Math.random()*61);
				res += chars[id];
			}

			//格式化生成的随机码
			if(json['format'] == 'lower') res = res.toLowerCase();
			else if(json['format'] == 'upper') res = res.toUpperCase();

			return res;
		},

		//将首字母大写
		toUpperFirstLetter : function(str){
			return str.replace(/\b\w+\b/g, function(word) {   
				return word.substring(0,1).toUpperCase() +  word.substring(1);
			});
		},

		//将首字母小写
		toLowerFirstLetter : function(str) {
			return str.replace(/\b\w+\b/g, function(word) {   
				return word.substring(0,1).toLowerCase() +  word.substring(1);
			});
		},

		//将json对象转换成string
		covertToString : function(json){
			var r = [];
			if(typeof json =="string") return "\""+json.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
			if(typeof json =="undefined") return "";
			if(typeof json == "object"){
				if(json === null) {
					return "";
				} else if(!json.sort){
					for(var i in json) {
						r.push(i+":" + BSST.Format.covertToString(json[i]));
					}

					r="{"+r.join()+"}"
				}else{
					for(var i =0; i<json.length; i++) {
						r.push(BSST.Format.covertToString(json[i]))
					}

					r="["+r.join()+"]"
				}

				return r;
			}
			return json.toString();
		}
}

/**
 * 对话框
 */
BSST.Dialog = function(json){
	//对话框以及参数
	this.json = json;
	this.map = null;
	this.dialog = null;
	this.showSize = null;
	this.callbackMethod = null;
	this.isForm = true;
	var thisObj = this;

	//显示对话框
	this.showDialog = function(title,callbackMethod){
		//创建对话框
		thisObj.dialog.create(title,callbackMethod);
		//显示对话框
		thisObj.dialog.show(thisObj.showSize);
	}

	//取得key对应的信息
	this.get = function(key){
		return BSST.Format.get(thisObj.map,key);
	}

	//设置key对应的value
	this.put = function(key,value){
		thisObj.map[key] = value;
	}

	//是否初始化了树
	this.isLoadTree = function(){ 
		var innerDiv = thisObj.get('innerDiv');
		var initFlag = thisObj.get(innerDiv + "_init_flag");
		return BSST.emptyValueEx(initFlag, false);
	}

	//关闭对话框
	this.closeDialog = function(){
		if(thisObj.dialog)thisObj.dialog.close();
	}

	//初始化参数信息
	this.initMap = function(json) {
		thisObj.map = BSST.Format.emptyJson(json);
		thisObj.callbackMethod = thisObj.get('callbackMethod');
		if(thisObj.get('isForm') != '') thisObj.isForm = thisObj.get('isForm');
	}

	//创建容器对象,isForm:是否需要创建form对象
	this.createDiv = function(){
		var innerDiv = thisObj.get('innerDiv');

		if($(thisObj.get('divName')+"_div") == null) jQuery(document.body).append('<div id="'+thisObj.get('divName')+'_div" style="display:none;"></div>');

		//如果需要创建多个实例（用于树），则添加到指定div下，否则按照表单形式创建
		if(BSST.Format.emptyValue(innerDiv) == '') {
			var humpDivName = BSST.Format.getHumpName(thisObj.get('divName'));
			if(thisObj.isForm) {
				if($(humpDivName + 'Form') != null) jQuery("#"+humpDivName + "Form").remove();
				jQuery("#"+thisObj.get('divName')+"_div").append('<form id="'+ humpDivName + 'Form" name="'+ humpDivName + 'Form"><div id="'+ humpDivName + 'Div"></div></form>');
			}
			else {
				if($(humpDivName + 'Div') != null) jQuery("#"+humpDivName+ "Div").remove();
				jQuery("#"+thisObj.get('divName')+"_div").append('<div id="'+ thisObj.get('divName') + 'Div"></div>');
			}
		}
		else {
			if($(innerDiv) == null) {
				jQuery("#"+thisObj.get('divName')+"_div").append("<div id='"+innerDiv+"'></div>");
				thisObj.put(innerDiv + "_init_flag",false);
			}
			else {
				jQuery("#"+innerDiv).show();
				thisObj.put(innerDiv + "_init_flag",true);
			}
		}
	}

	//取得提交的表单名称
	this.getFormName = function(){
		if(thisObj.isForm && BSST.Format.emptyValue(thisObj.get('innerDiv')) == '') return  BSST.Format.getHumpName(thisObj.get('divName')) + 'Form';
	}

	//取得提交的表单名称
	this.getJqueryForm = function(){
		return jQuery("#"+thisObj.getFormName());
	}

	//取得div的名称
	this.getDivName = function(){
		return BSST.Format.emptyValue(thisObj.get('innerDiv')) == '' ? BSST.Format.getHumpName(thisObj.get('divName')) + 'Div' : thisObj.get('innerDiv');

	}

	//取得div的名称
	this.getJqueryDiv = function(){
		return jQuery("#"+thisObj.getDivName());
	}

	//初始化信息
	this.initDialog = function(){
		thisObj.initMap(thisObj.json);
		thisObj.showSize = new BSST.Dialog.ShowSize(thisObj.map);
		thisObj.dialog = new BSST.Dialog.Info(thisObj.dialog,thisObj.get('divName'));
		thisObj.createDiv();
	}
	thisObj.initDialog();
}

/**
 * 弹出对话框信息
 * @memberOf {TypeName} 
 */
BSST.Dialog.Info = function(obj,divName,title){
	//取得驼峰命名以及对话框
	this.divName = divName;
	this.dialog = obj;
	var thisObj = this;

	//创建对话框
	this.create = function(title,callbackMethod){
		var title = title;
		var callbackMethod = callbackMethod;

		if(thisObj.dialog == null || !thisObj.dialog.isExist()) {
			var opts = {displayForm:3, isModal:false, buttons:{},dialogType:2};
			if(callbackMethod)callbackMethod(opts);
			thisObj.dialog = new DialogEx(BSST.Format.getHumpName(thisObj.divName)+"Dialog",jQuery("#"+thisObj.divName+"_div"),opts);
		}

		//显示标题,将此对象回调
		jQuery("#ui-dialog-title-"+BSST.Format.getHumpName(thisObj.divName)+"Dialog").html(title);
	}

	//显示对话框
	this.show = function(showSize) {
		thisObj.dialog.show(showSize.showSize);
	}

	//关闭窗口
	this.close = function(){
		if(thisObj.dialog)thisObj.dialog.hide();
	}
}

/**
 * 功能：弹出对话框的样式设置
 * @param {Object} json 对话框样式
 */
BSST.Dialog.ShowSize = function(json){
	//接收弹出对话框的宽度和高度,是否居中等
	this.json = json;
	this.showSize = null;
	var thisObj = this;

	//设置宽度
	this.setWidth = function(width){
		thisObj.showSize.size[0] = width;
	}

	//设置高度
	this.setHight = function(hight){
		thisObj.showSize.size[1] = hight;
	}

	//设置显示效果
	this.setEve = function(e){
		thisObj.showSize.eve = e;
	}

	//初始化显示信息
	this.initShowSize = function(){
		var json = BSST.Format.emptyJson(thisObj.json);
		var eHeight = json['height'] != null && typeof(json['height']) != 'undefined' && /^[1-9][0-9]*$/.test(json['height']) ? json['height'] : 320;
		var eWidth = json['width'] != null && typeof(json['width']) != 'undefined' && /^[1-9][0-9]*$/.test(2000) ? json['width'] : 600;
		var eve = json['e'] != null && typeof(json['e']) != 'undefined' ? json['e'] : null;
		thisObj.showSize = {size:[eWidth,eHeight],'eve':eve};
	}
	this.initShowSize();
}

/**
 * 日志输出的js
 */
BSST.Log4j = function() {
	//log4j对象
	this.log4j = null;
	this.appender = null;
	this.bindFlag = false;
	var thisObj = this;

	this.init = function(){
		//设置默认的js,并创建js对象
		var script = BSST.createJs(BSST.getWebAppPath() + BSST.Constants.LOG4J_URL_PATH);
		if(script) {
			script.onload = script.onreadystatechange = function(){  
				if(!this.readyState || this.readyState== 'loaded' || this.readyState == 'complete'){  
					thisObj.createLog4j();
				}
				//script.onload=script.onreadystatechange=null;  
			}
		}
		else {
			thisObj.createLog4j();
		}
	}

	//创建log4j对象
	this.createLog4j = function(){
		thisObj.log4j = log4javascript.getLogger();
		thisObj.appender = new log4javascript.PopUpAppender();
		thisObj.appender.setFocusPopUp(false);
		thisObj.appender.setNewestMessageAtTop(false);
		BSST.registerEx("log4j");
		log4j = thisObj.log4j;
		if(thisObj.bindFlag)thisObj.log4j.addAppender(thisObj.appender);
	}

	//应用log4j
	this.applyLog4j = function(){
		if(thisObj.appender == null) {
			thisObj.bindFlag = true;
		}
		else {
			if(!thisObj.bindFlag) {
				thisObj.log4j.addAppender(thisObj.appender);
				thisObj.bindFlag = true;
			}
		}
	}

	//移除appender
	this.removeAppender = function(){
		thisObj.log4j.removeAppender(thisObj.appender);
		thisObj.bindFlag = false;
	}

	//初始化信息
	this.init();
}

/**
 * 命名空间
 */
BSST.Namespace = {
		//不存在就注册新的结束
		register : function(path) {
			var arr = path.split(".");    
			var ns = "";    
			for(var i=0;i<arr.length;i++){    
				if(i>0) ns += ".";    
				ns += arr[i];    
				eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");    
			}    
		},
		registerEx : function(path,objName) {
			var arr = path.split(".");    
			var ns = "";    
			for(var i=0;i<arr.length;i++){    
				if(i>0) ns += ".";    
				ns += arr[i];    
			}  

			if(ns != "") {
				objName = BSST.emptyValueEx(objName,"Object");
				eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new "+objName+"();");
			}
		}
}

/**
 * 元素对象
 */
BSST.Document = {
		//取得浏览器窗口的大小
		getWindowSize : function(){
			var winWidth = 0; 
			var winHeight = 0; 

			//获取窗口宽度 
			if(window.innerWidth) {
				winWidth = window.innerWidth; 
			}
			else if ((document.body) && (document.body.clientWidth)) {
				winWidth = document.body.clientWidth; 
			}

			//获取窗口高度 
			if (window.innerHeight){
				winHeight = window.innerHeight;
			}
			else if ((document.body) && (document.body.clientHeight)) {
				winHeight = document.body.clientHeight; 
			}

			//通过深入Document内部对body进行检测，获取窗口大小 
			if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) { 
				winHeight = document.documentElement.clientHeight; 
				winWidth = document.documentElement.clientWidth; 
			}

			return {width:winWidth, height:winHeight}
		},

		//固定table时固定高度
		fixScrollTable : function(json){
			var winJson = BSST.getWindowSize();

			//取得需要固定的table以及固定的宽度和高度
			var tableId = json['tableId'];
			var width = BSST.emptyValueEx(json['width'], winJson['width'] - 5);
			var height = BSST.emptyValueEx(json['height'], winJson['height']);
			var fixWidth = BSST.emptyValueEx(json['fixWidth'], 0);
			var fixHeight = BSST.emptyValueEx(json['fixHeight'], 0);
			var widthSize = 0;
			var heightSize = 0;

			if(jQuery("#"+tableId).size() != 1 || (height > jQuery("#" + tableId).height() && width > jQuery("#" + tableId).width())) return;


			//设置高度,如果大于滚动的高度，设置滚动的高度
			if(height > jQuery("#" + tableId).height()) {
				height = jQuery("#" + tableId).height() + 19;
				fixHeight = 0;
				widthSize = 17;
			}

			//设置宽度,如果大于滚动的高度，设置滚动的宽度
			if(width > jQuery("#" + tableId).width()) {
				width = jQuery("#" + tableId).width() + 17;
				jQuery("#" + tableId).css("width","99.9%");
				fixWidth = 0;
			}
			else {
				if(fixWidth == 0) {
					if(jQuery.browser.msie) {
						heightSize = 4;
					}
					else {
						heightSize = 6;
					}
				}
			}

			if(jQuery.browser.msie) {
				switch (jQuery.browser.version) {
				case "7.0":
					fixHeight += 5;
					if(fixWidth == 0) {
						jQuery("#" + tableId).css("width","98.5%");
						widthSize = 17;
					}
					else{
						fixWidth += 1;
					}
					break;
				case "8.0":
					fixHeight += 1;
					break;
				case "6.0":
					fixHeight += 5;
					if(width > jQuery("#" + tableId).width() - 17) {
						width = jQuery("#" + tableId).width();
						jQuery("#" + tableId).css("width","98.5%");
						fixWidth = 0;
						widthSize = 17;
					}
					else{
						fixWidth += 1;
					}
					break;
				}
			}

			if (jQuery("#" + tableId + "_tableLayout").size() > 0) {
				jQuery("#" + tableId + "_tableLayout").before(jQuery("#" + tableId));
				jQuery("#" + tableId + "_tableLayout").empty();
			}
			else {
				//设置样式
				jQuery("#" + tableId).after("<div id='" + tableId + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");
			}

			//追加样式
			jQuery('<div id="' + tableId + '_tableFix"></div>'
					+ '<div id="' + tableId + '_tableHead"></div>'
					+ '<div id="' + tableId + '_tableColumn"></div>'
					+ '<div id="' + tableId + '_tableData"></div>').appendTo("#" + tableId + "_tableLayout");

			//当前table
			var oldtable = jQuery("#" + tableId);

			//拷贝table
			var tableFixClone = oldtable.clone(true);

			//设置ID
			tableFixClone.attr("id", tableId + "_tableFixClone");

			//增加到table之后
			jQuery("#" + tableId + "_tableFix").append(tableFixClone);

			//再次复制table
			var tableHeadClone = oldtable.clone(true);
			tableHeadClone.attr("id", tableId + "_tableHeadClone");

			//设置上边的样式
			jQuery("#" + tableId + "_tableHead").append(tableHeadClone);
			var tableColumnClone = oldtable.clone(true);
			tableColumnClone.attr("id", tableId + "_tableColumnClone");

			//设置左边的样式
			jQuery("#" + tableId + "_tableColumn").append(tableColumnClone);
			jQuery("#" + tableId + "_tableData").append(oldtable);
			jQuery("#" + tableId + "_tableLayout table").each(function () {
				jQuery(this).css("margin", "0");
			});

			//设置固定的高度和宽度
			jQuery("#" + tableId + "_tableHead").css("height", fixHeight);
			jQuery("#" + tableId + "_tableFix").css("height", fixHeight);
			jQuery("#" + tableId + "_tableColumn").css("width", fixWidth);
			jQuery("#" + tableId + "_tableFix").css("width", fixWidth);


			//滚定事件处理函数
			jQuery("#" + tableId + "_tableData").scroll(function() {
				jQuery("#" + tableId + "_tableHead").scrollLeft(jQuery("#" + tableId + "_tableData").scrollLeft());
				jQuery("#" + tableId + "_tableColumn").scrollTop(jQuery("#" + tableId + "_tableData").scrollTop());
			});

			jQuery("#" + tableId + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50"});
			jQuery("#" + tableId + "_tableHead").css({ "overflow": "hidden", "width": width - 17, "position": "relative", "z-index": "45"});
			jQuery("#" + tableId + "_tableColumn").css({ "overflow": "hidden", "height": height - 17, "position": "relative", "z-index": "40"});
			jQuery("#" + tableId + "_tableData").css({ "overflow": "auto", "width": width - widthSize, "height": height - heightSize, "position": "relative", "z-index": "35" });

			jQuery("#" + tableId + "_tableFix").offset(jQuery("#" + tableId + "_tableLayout").offset());
			jQuery("#" + tableId + "_tableHead").offset(jQuery("#" + tableId + "_tableLayout").offset());
			jQuery("#" + tableId + "_tableColumn").offset(jQuery("#" + tableId + "_tableLayout").offset());
			jQuery("#" + tableId + "_tableData").offset(jQuery("#" + tableId + "_tableLayout").offset());
		},

		//根据操作的对象，将提交session的值，如果没有选中时设置默认值（避免不刷新对象），选中后将这类值取消
		defaultSessionValue : function(obj, formName) {
			//上级容器信息
			var containerObj =  BSST.emptyValue(formName) == '' ? jQuery(document.body) : jQuery("#" + formName);

			//首先按照传入对象判断
			var objs = typeof(obj) == "object" ? jQuery(obj) : containerObj.find(obj);

			//如果对象不满足时，则按照类型查找
			if(objs.size() == 0) objs = containerObj.find(":" + obj);
			if(objs.size() == 0) return;

			//取得需要提交的容器
			var parentObj = BSST.emptyValue(formName) == '' ? jQuery(objs[0]).parent() : jQuery("#" + formName);
			var nameObjJson = {};

			objs.each(function(){
				var thisObj = jQuery(this);
				var inputType = thisObj.attr("type");
				var inputName = thisObj.attr("name");

				//没有发现拥有选中的信息,设置隐藏域
				if(nameObjJson[inputName] == null || nameObjJson[inputName]['isSel'] == 0) {
					parentObj.append("<input type='hidden' name='" + inputName + "' value=''/>");
				}

				//checkbox判断选中事件
				if(inputType == "checkbox") {
					var nameJson = BSST.emptyJson(nameObjJson[inputName]);

					//如果发现选中的信息时，移除对应的信息
					if(BSST.emptyValueEx(nameJson['isSel'],0) == 0) {
						nameJson['isSel'] = (thisObj.attr("checked") ? "1" : "0");
						if(thisObj.attr("checked")) parentObj.find(":hidden[name=" + inputName + "]").remove();
					}

					//设置同类信息
					var nameArray = BSST.emptyValueEx(nameJson['array'], []);
					nameArray.push(thisObj);

					thisObj.click(function(){
						var inputType = jQuery(this).attr("type");
						var inputName = jQuery(this).attr("name");

						//选中时移除名称是对应名称的信息
						if(this.checked) {
							parentObj.find(":hidden[name=" + inputName + "]").remove();
						}
						else {
							//首先增加未选中的信息，如果发现存在选中了的信息时移除
							parentObj.append("<input type='hidden' name='" + inputName + "' value=''/>");
							var nameArray = nameObjJson[inputName]['array'];
							for(var i = 0; i < nameArray.size(); i++) {
								if(jQuery(nameArray[i]).attr("checked")) {
									parentObj.find(":hidden[name=" + inputName + "]").remove();
									break;
								}
							}
						}
					});
				}
			});
		}
}

/**
 * 操作文件
 */
BSST.Document.File = {
		//取得文件名称
		getFileName : function(obj) {
			var filePath = "";
			if(typeof(obj) == "object") {
				filePath = jQuery(obj).val();
			}
			else {
				filePath = obj;
			}
			filePath = filePath.replace("/","\\");
			return filePath.lastIndexOf("\\") > 0 ? filePath.substring(filePath.lastIndexOf("\\")+1) : filePath;
		},
		//取得文件的后缀
		getFileSuffix : function(obj) {
			var filePath = "";
			if(typeof(obj) == "object") {
				filePath = jQuery(obj).val();
			}
			else {
				filePath = obj;
			}
			return filePath.lastIndexOf(".") > 0 ? filePath.substring(filePath.lastIndexOf(".")+1) : '';
		}
}

/**
 * js处理对象
 */
BSST.Document.Script = {
		//将js线程停止一段
		sleep : function(sleepTime) {
			var timeLen = /^[1-9][0-9]*$/.test(sleepTime) ? sleepTime : 0;
			jQuery.ajaxSetup({async:false});
			new AjaxSubmit({
				url : "logout!sleep.action",
				parameter : {'sleepTime':timeLen}
			}).post();
			jQuery.ajaxSetup({async:true});
		},

		//链接到其他页面
		location : function(url){
			new AjaxSubmit({url:url}).link();
		},

		//判断是否存在js，不存在则加入对应的js
		evalScript : function(data) {
			if(BSST.emptyValue(data) != ''){
				//验证js的格式
				var scriptFragment = '<script[^>]*>([\\S\\s]*?)<\/script>';
				var srcFragment = 'src[\\S\\s]*=[\\S\\s]*[\'\"]?[\.]js';

				var matchAll = new RegExp(scriptFragment, 'img');
				var matchOne = new RegExp(scriptFragment, 'im');
				var matchSrc = new RegExp(srcFragment, 'im');

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
			}
		},

		//创建js信息
		createJS : function(src) {
			var srcJson = BSST.Document.Script.cache['allScript'];
			if(BSST.emptyValue(srcJson) == '') {
				srcJson = {};
				//添加到存在的js中
				var oScripts = document.getElementsByTagName('script');
				for(var j = 0;j < oScripts.length; j++) {
					if(oScripts[j].getAttributeNode('src') != null) {
						srcJson[oScripts[j].getAttributeNode('src').value] = '1';
					}
				}
				BSST.Document.Script.cache['allScript'] = srcJson;
			}

			//判断是否存在相同的js,不存在则创建对应的js
			if(srcJson[src] != '1') {
				var oHead = document.getElementsByTagName('HEAD')[0];
				var oScript= document.createElement("script");
				oScript.type = "text/javascript";
				oScript.src = src;
				oHead.appendChild(oScript);
				srcJson[src] = "1";

				return oScript;
			}

			return null;
		},

		//加载加载完成后，回调函数
		callbackJsLoad : function(jsonParam) {
			var json = BSST.emptyJson(jsonParam);
			var jsName = BSST.emptyValueEx(json['jsName'],json['js']);
			var callbackMethod = json['callbackMethod'];
			var param = json['param'];

			if(jsName) {
				//设置默认的js,并创建js对象
				var script = BSST.createJs(BSST.getWebAppPath() + jsName);
				if(script) {
					script.onload = script.onreadystatechange = function(){  
						if(!this.readyState || this.readyState== 'loaded' || this.readyState == 'complete'){ 
							if(callbackMethod)callbackMethod(param);
						}
					}
				}
				else {
					if(callbackMethod)callbackMethod(param);
				}
			}
		},

		//取得web对应的路径
		getWebAppPath : function(d){
			//如果缓存中不存在，则取出路径
			var WEB_APP_CONTEXT_PATH = BSST.emptyValue(BSST.Document.Script.cache["WEB_APP_CONTEXT_PATH"]) ;
			if(WEB_APP_CONTEXT_PATH == "") {

				//默认加载的路径
				d = BSST.emptyValueEx(d,BSST.Constants.BSST_URL_PATH);

				//取得js所有对象
				var oScripts = document.getElementsByTagName('script');
				for(var j = 0;j < oScripts.length; j++) {
					var e;
					if((e = oScripts[j].getAttributeNode('src')) != null) {
						e = e.value;
						var c;
						if ((c = e.indexOf(d)) > 0) {
							var b = e.indexOf("://");
							WEB_APP_CONTEXT_PATH = e.substring(0, c);
							break;
						}
					}
				}
				BSST.Document.Script.cache["WEB_APP_CONTEXT_PATH"] = WEB_APP_CONTEXT_PATH;
			}
			return WEB_APP_CONTEXT_PATH;

		},
		cache : {}
}

/**
 * 验证框架
 */
BSST.Valid = {
		'repeatValid' : function(json){
			json = BSST.emptyJson(json);

			//取得url、操作的对象，以及颜色改变的对象，查找的位置
			var url = BSST.emptyValue(json['url']);
			var obj =  BSST.emptyValue(json['validObj']);
			//需要进行验证的时候，如果需要多个参数，通过parameter传入
			var param = BSST.emptyJson(json['parameter']);
			var resultParam = BSST.emptyJson(json['resultParam']);
			var showErrorWord = BSST.emptyValue(json['showErrorWord']);

			//要进行远端校验的url对应的参数名称，参数值即要校验的内容，如果只有一个参数一般都采用这种方式
			var paramName = BSST.emptyValueEx(json['validName'],obj.attr('name'));

			var showPassWord = BSST.emptyValue(json['showPassWord']);
			var alertErrorWord = BSST.emptyValue(json['alertErrorWord']);
			if(alertErrorWord == '') alertErrorWord = showErrorWord;
			var defaultValue = BSST.emptyValueEx(json['defaultValue'],obj.val());
			var pos = BSST.emptyValueEx(json['validParentPos'],obj.parent());
			var funName = BSST.emptyValueEx(json['funName'],'blur');
			var passVildFun =  BSST.emptyValue(json['passVildFun']);

			//提价验证的信息
			if(pos.find(":hidden[opType=validMsg]").size() == 0) {
				pos.append("<input type='hidden' opType='validMsg' check_str='"+alertErrorWord+"' check_type='onlyAlert' can_empty='Y' />");
				pos.append("<span opType='validMsg'></span>");
			}

			var spanObj = pos.find("span[opType=validMsg]");
			var hidObj = pos.find(":hidden[opType=validMsg]");


			//绑定事件处理函数，值为‘’或与默认值相同时，不予验证。
			obj.bind(funName,function(){
				var flag = false;

				//如果存在相同的值，不予验证
				if(this.value != '') {
					if(this.value == defaultValue || (typeof(passVildFun) == "function" && !passVildFun())) {
						flag = true;
					}
					else {
						//设置对应的值
						//构造向服务器提交的参数列表：parameter的参数名/值，加上paramName和需要校验的域的值，由这两部分json之和构成
						var paramJson = {};
						for(var i in param){
							//paramJson[i] = eval("(" + param[i] + ")");
							paramJson[i] = param[i];
						}
						paramJson[paramName] = this.value;

						new AjaxSubmit({
							url : url,
							parameter : paramJson,
							resultType : 'json',
							success : function(json){
								spanObj.removeClass().removeAttr("style").html("");

								if(BSST.getJsonSize(resultParam) > 0) {
									var validJson = resultParam[json['resultCode']];
									var claArray = BSST.emptyValueEx(validJson['class'],[]);
									var styleJson =  BSST.emptyJson(validJson['style']);
									var alertMsg = BSST.emptyValueEx(validJson['alertMsg'],validJson['validMsg']);

									//设置验证结果和验证提示
									hidObj.attr("can_empty",validJson['validFlag']);
									hidObj.attr("check_str",BSST.emptyValueEx(json['resultDesc'],alertMsg));
									spanObj.html(BSST.emptyValueEx(json['resultDesc'],validJson['validMsg']));

									//设置class和style样式
									for(var i = 0; i < claArray.length; i++) {
										spanObj.addClass(claArray[i]);
									}
									for(var i in styleJson) {
										spanObj.css(i,styleJson[i]);
									}
								}
								else {
									//根据验证类型设置验证颜色，以及验证结果
									if(json['resultCode'] == 0) {
										hidObj.attr("can_empty","Y").removeAttr("check_str");
										spanObj.addClass("validPass").html(BSST.emptyValueEx(json['resultDesc'],showPassWord));
									}
									else {
										hidObj.attr("can_empty","N").attr("check_str",BSST.emptyValueEx(json['resultDesc'],alertErrorWord));
										spanObj.addClass("validError").html(BSST.emptyValueEx(json['resultDesc'],showErrorWord));
									}
								}
							}
						}).post();
					}
				}
				else {
					flag = true;
				}

				if(flag) {
					//清楚掉隐藏的信息以及验证信息
					hidObj.attr("can_empty","Y");
					spanObj.removeClass().removeAttr("style").html("");
				}
			});
		}
}

/**
 * 图片处理，包含压缩图片等
 */
BSST.Picture = {
		//压缩图片
		pictureZoom : function(objs,width,height) {
			var w = width;
			var h = height;

			//加载后的图片判断长度是否超过指定的长度
			objs.each(function(i){
				var loadImg = this;

				if(loadImg.complete) {
					BSST.Picture.autoScaling(jQuery(loadImg),w,h);
					return;
				}

				jQuery(loadImg).load(function(){
					BSST.Picture.autoScaling(jQuery(this),w,h);
				});
			});
		},
		//缩放比例
		autoScaling : function(img,width,height) {
			if(img.attr('width') > width){
				img.attr('width',width);
			}
			if(img.attr('height') > height){
				img.attr('height',height);
			}
			if(img.attr('height') < height){
				//设置img的style属性
				var style="margin-top:"+(height-img.attr('height'))/2+"px;";
				img.attr('style',style);
			}
		},
		//绑定秃瓢鼠标移动事件、在后面增减mouseover和mousedown
		mouseMove : function(imgObj) {
			imgObj.hover(function(){
				var className = jQuery(this).attr("claName");
				if(!jQuery(this).hasClass(className+"-mouseover-bg"))jQuery(this).addClass(className+"-mouseover-bg");
				if(jQuery(this).hasClass(className+"-bg"))jQuery(this).removeClass(className+"-bg");
				if(jQuery(this).hasClass(className+"-mousedown-bg"))jQuery(this).removeClass(className+"-mousedown-bg");
			},function(){
				var className = jQuery(this).attr("claName");
				if(!jQuery(this).hasClass(className+"-bg"))jQuery(this).addClass(className+"-bg");
				if(jQuery(this).hasClass(className+"-mouseover-bg"))jQuery(this).removeClass(className+"-mouseover-bg");
				if(jQuery(this).hasClass(className+"-mousedown-bg"))jQuery(this).removeClass(className+"-mousedown-bg");
			}).mousedown(function(){
				var className = jQuery(this).attr("claName");
				if(!jQuery(this).hasClass(className+"-mousedown-bg"))jQuery(this).addClass(className + "-mousedown-bg");
				if(jQuery(this).hasClass(className+"-bg"))jQuery(this).removeClass(className + "-bg")
				if(jQuery(this).hasClass(className+"-mouseover-bg"))jQuery(this).removeClass(className+"-mouseover-bg");
			}).mouseup(function(){
				var className = jQuery(this).attr("claName");
				if(!jQuery(this).hasClass(className+"-bg"))jQuery(this).addClass(className+"-bg");
				if(jQuery(this).hasClass(className+"-mouseover-bg"))(this).removeClass(className+"-mouseover-bg");
				if(jQuery(this).hasClass(className+"-mousedown-bg"))jQuery(this).removeClass(className+"-mousedown-bg");
			});
		}
}

/**
 * 简易的字符按串MD5加密
 */
BSSTMD5 = function(){
	'use strict';

	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF),
		msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}

	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	}

	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function binl_md5(x, len) {
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;

		var i, olda, oldb, oldc, oldd,
		a =  1732584193,
		b = -271733879,
		c = -1732584194,
		d =  271733878;

		for (i = 0; i < x.length; i += 16) {
			olda = a;
			oldb = b;
			oldc = c;
			oldd = d;

			a = md5_ff(a, b, c, d, x[i],       7, -680876936);
			d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
			d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
			d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

			a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
			d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i],      20, -373897302);
			a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
			d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
			c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
			d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
			c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
			d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
			d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
			d = md5_hh(d, a, b, c, x[i],      11, -358537222);
			c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i],       6, -198630844);
			d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
			d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}

	function binl2rstr(input) {
		var i,
		output = '';
		for (i = 0; i < input.length * 32; i += 8) {
			output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
		}
		return output;
	}

	function rstr2binl(input) {
		var i,
		output = [];
		output[(input.length >> 2) - 1] = undefined;
		for (i = 0; i < output.length; i += 1) {
			output[i] = 0;
		}
		for (i = 0; i < input.length * 8; i += 8) {
			output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
		}
		return output;
	}

	function rstr_md5(s) {
		return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
	}

	function rstr_hmac_md5(key, data) {
		var i,
		bkey = rstr2binl(key),
		ipad = [],
		opad = [],
		hash;
		ipad[15] = opad[15] = undefined;
		if (bkey.length > 16) {
			bkey = binl_md5(bkey, key.length * 8);
		}
		for (i = 0; i < 16; i += 1) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
		return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
	}

	function rstr2hex(input) {
		var hex_tab = '0123456789abcdef',
		output = '',
		x,
		i;
		for (i = 0; i < input.length; i += 1) {
			x = input.charCodeAt(i);
			output += hex_tab.charAt((x >>> 4) & 0x0F) +
			hex_tab.charAt(x & 0x0F);
		}
		return output;
	}

	function str2rstr_utf8(input) {
		return unescape(encodeURIComponent(input));
	}

	function raw_md5(s) {
		return rstr_md5(str2rstr_utf8(s));
	}
	function hex_md5(s) {
		return rstr2hex(raw_md5(s));
	}
	function raw_hmac_md5(k, d) {
		return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
	}
	function hex_hmac_md5(k, d) {
		return rstr2hex(raw_hmac_md5(k, d));
	}
	this.md5 = function(string, key, raw) {
		if (!key) {
			if (!raw) {
				return hex_md5(string);
			} 
			else {
				return raw_md5(string);
			}
		}
		if (!raw) {
			return hex_hmac_md5(key, string);
		} 
		else {
			return raw_hmac_md5(key, string);
		}
	}
}