/**
 * 功能：软电话相关事件处理函数
 */
BSSTWindow = function(opts){
	//初始化配置参数
	var date = new Date();
	this.defaultConfig = {width:1000,height:600,topmost:true,winName:'window' + date.getTime(),showTitle:true,resizable:true};
 	this.settings = BSST.unionJson(opts, this.defaultConfig);
 	var _this = this;
 	
 	//打开新窗口(同一个窗口)
 	this.openSameWindow = function(url){
 		var winJson = BSST.unionJson({winName:"window-same"},_this.settings);
 		_this.showWindow(winJson,url);
 	};
 	
 	//打开新的窗口
 	this.openNewWindow = function(url){
 		var date = new Date();
 		var winJson = BSST.unionJson({winName:"window-new" + date.getTime()},_this.settings);
 		_this.showWindow(winJson,url);
 	}
 	
 	//打开窗口
	this.openWindow = function(url){
		var winJson = BSST.unionJson({},_this.settings);
		_this.showWindow(winJson,url);
 	}
 	
 	//打开窗口
 	this.showWindow = function(winJson,url){
 		var url = BSST.emptyValueEx(url,winJson['url']);
 		
 		//设置url的连接
 		winJson['url'] = this.settings.linkFlag ? url : BSST.getWebAppPath() + url;
 		winJson['url'] = winJson['url'] + (winJson['url'].indexOf("?") > 0 ? '&' : '?' ) + 'winName=' + winJson['winName'];
 		winJson = BSST.unionJson(winJson, _this.settings);
 		
 		if(this.checkBrowser()) {
 			top.window.external.popupWinWithName(winJson['winName'], winJson['url'],
 			winJson['width'], winJson['height'] + 20, winJson['resizable']);
 		}
 		else {
 			var theLeft = (screen.width-winJson['width'])/2-2;
			var theTop = (screen.height-winJson['height'])/2;
			top.window.open(winJson['url'],winJson['winName'],
						'width=' + winJson['width'] + ',height=' + winJson['height'] + ',left=' + theLeft + ',top=' + theTop + ',' +
						'toolbar=0, location=0, menubar=0, scrollbars=0, resizable=0, status=0').focus();
 		}
 	},
 	
 	//检测是否专用浏览器(专用浏览器中包含window.external.version()方法)
 	this.checkBrowser = function(){
 		
 		try {
			if(top.window.external.version) {
				return true;
			}
		}catch(e){
			return false;
		}
 		
		return false;
 	}
 	
 	//关闭当前窗口
 	this.closePage = function(){
 		if(this.checkBrowser()) {
 			window.external.closePopupWin();
 		}
 		else {
 			window.close();
 		}
 	}
 	
 	//显示窗口
 	this.showMainWindow = function(flag) {
 		if(this.checkBrowser()) top.window.external.openMainWin(BSST.emptyValueEx(flag, true));
 	}
 	
 	//退出应用程序
 	this.exitPlatForm = function(){
 		if(this.checkBrowser()) top.window.external.exitPlatform();
 	}
 	
 	//调用弹出窗口事件事件
 	this.callPopWinScript = function(winName,callbackMethod){
 		if(this.checkBrowser()) top.window.external.callPopWinScript(winName,callbackMethod);
 	}
 	
 	//调用主窗口的事件
 	this.callMainFrameScript = function(callbackMethod){
 		if(this.checkBrowser()) top.window.external.callMainFrameScript(callbackMethod);
 	}
 	
	//调用主窗口的事件
 	this.callWorkFrameScript = function(json){
 		if(!this.checkBrowser()) return; 
 		json = BSST.emptyJson(json);
 		//如果不是主页时，调用工作区域的窗口
 		var workTop = BSST.emptyValueEx(json['isMainFrame'],0) == 1 ? "" : "top.mainframe.workspace.";
 		var jsonParam = typeof(json['param']) == 'object' ? BSST.covertToString(json['param']) : BSST.emptyValue(json['param']);
 		var jsonStr = "{callbackMethod:" + workTop +json['callbackMethod']+",param:" + jsonParam + "}";
 		top.window.external.callMainFrameMethod('callIndexMethod', jsonStr);
 	}
 }