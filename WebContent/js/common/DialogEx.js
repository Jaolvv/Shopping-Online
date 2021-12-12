/******************************************************************** 
 * <p>Title: BWidget组件</p> 
 * <p>Description: BWidget组件定义</p> 
 * <p>Copyright: Copyright (c) 2010 BONC， Co.Ltd. All Rights Reserved</p> 
 * <p>Company: BONC </p> 
 * <p>WebSite: http://www.bonc.com.cn</p> 
 * @author 李镇涛
 * @version 1.00 
 * @date 2010-07-06 
 * @comment 页面布局 
 *********************************************************************/

/********************************************************************
 * dialog 1.00
 * @author 李镇涛
 * @param id（必填）		String		Dialog对象将创建一个id为id值的div装载内容区
 * @param data（必填）	jQuery		弹出对话框内容区jQuery对象
 * @param options（选填）json		
 * @declaration 1、options可以包含属性displayForm, height, width, isModal, title,
 * 					dialogType, buttons
 * options可选参数	类型		默认值			描述								备注
 * displayForm		Integer	1		弹出对话框在页面中第一次弹出时的位置	1:屏幕居中显示
 * 																		2:给定位置（在调用dialog.show()中的position参数给出）
 * 																		3:跟随鼠标（通过调用dialog.show()中position或eve参数给出的事件对象获取的鼠标位置）
 * height			Integer 300		弹出对话框的高度						
 * width			Integer 200		弹出对话框的宽度
 *********************************************************************/

 /**
 * 存放页面的高度和宽度
 * @return
 */
var w;

/**
 * 判断是否是第一次弹出
 * @return
 */
var myselfflag=false;

/**
 * 取页面的高度与宽度
 * @return
 */
var getDimensions = function(){
	//取得当前的浏览器对象
	var el = jQuery(window);
	// 对于jQuery在opera上的高度的bug进行调整
	var h = jQuery.browser.opera && jQuery.browser.version > '9.5' && jQuery.fn.jquery <= '1.2.6' ?
		document.documentElement['clientHeight'] : 
		el.height();
	w = [h, el.width()];
}

/**
 * 取dialog的位置
 * @param refObj
 * @param divWidth
 * @param divHeight
 * @return
 */
function getPositionByRefObj(refObj,divWidth,divHeight){
	var obj_left=null;
	var obj_top=null;
	getDimensions();
	var docX = w[1];
	var docY = w[0];
	var textWidth=refObj.outerWidth();
	var textHeight=refObj.outerHeight();
	var obj=refObj.position();
	var obj_bottom=docY-obj.top-textHeight;
	var obj_right=docX-obj.left;
	if(obj_bottom>=divHeight){
		obj_top=obj.top+textHeight+document.body.scrollTop;
		//右边有足够的空间显示div=======================================
		if(obj_right>divWidth){
			obj_left=obj.left+document.body.scrollLeft;
		}else{
			//左边有足够的空间显示div=======================================
			if(obj.left+textWidth>=divWidth){
				obj_left=obj.left+textWidth-divWidth-document.body.scrollLeft;
				if(!window.ActiveXObject){
					obj_left=obj_left-5;
				}
			}else{
				obj_left=(docX-divWidth)/2+document.body.scrollLeft;
			}
		}
	}else if(obj.top>divHeight){
		obj_top=obj.top-divHeight-document.body.scrollTop;
		if(window.ActiveXObject){
			if(!myselfflag){
				obj_top=obj_top-4;
			}else{
				obj_top=obj_top-4;
			}
		}else{
			if(!myselfflag){
				obj_top=obj_top-20;
			}else{
				obj_top=obj_top-18;
			}
		}
		//右边有足够的空间显示div=======================================
		if(obj_right>divWidth){
			obj_left = obj.left+document.body.scrollLeft;
		}else{
			//左边有足够的空间显示div=======================================
			if(obj.left+textWidth>=divWidth){
				obj_left = obj.left+textWidth-divWidth+document.body.scrollLeft;
				if(!window.ActiveXObject){
					obj_left = obj_left-5;
				}
			}else{
				//如果鼠标点击的两边都不够显示div，那么取屏幕x方向上的中间值
				obj_left = (docX-divWidth)/2+document.body.scrollLeft;
				
			}
		}
	}else{
		//设置上边距
		left_top = (docY-divHeight)/2+document.body.scrollTop;
		if(obj_right>divWidth){
			obj_left=obj.left+document.body.scrollLeft;
		}else{
			if(obj.left+textWidth>=divWidth){
				obj_left=obj.left+textWidth-divWidth+document.body.scrollLeft;
			}else{
				obj_left=(docX-divWidth)/2+document.body.scrollLeft;
			}
		}
	}
	myselfflag=true;
	return {left:obj_left,top:obj_top};
}

DialogEx = function(dialogId, content, options){
	var curDialog = this;

	/**
	 * 是否显示
	 */
	this.showTitle = false;
	
	/**
	 * 显示位置：1:居中显示;2:给定位置;3:跟随鼠标;4.文本框附近
	 */
	this.displayForm = 1;
	
	/**
	 * 对话框高度
	 */
	this.height = 300;
	
	/**
	 * 对话框宽度
	 */
	this.width = 200;

	/**
	 * 弹出对话框是否为模式对话框
	 */
	this.isModal = false;
	/**
	 * 弹出对话框标题
	 */
	this.title = "";
	/**
	 * 弹出对话框的id
	 */
	this.dialogId = dialogId;
	
	/**
	 * 对话框类型：1:只有内容；2:有标题，并可以定制按钮；3:有标题，并且有确定和取消按钮
	 */
	this.dialogType = 1;
	
	/**
	 * 弹出对话框内容
	 */
	this.content = content;
	/**
	 * 弹出对话框的按钮对象数组。默认的是"确定"按钮和"取消"按钮
	 */
	this.bottons = null;
	
	/**
	 * 对话框是否已经打开过
	 */
	this.exist = false;
	
	/**
	 * 绑定了Document的click事件
	 */
	this.bindDocumentClick = false;
	
	/**
	 * 对话框关闭前的高度
	 */
	this.dialogCurrHeight = null;
	
	/**
	 * 内容区高度
	 */
	this.contentHeight = null;
	
	this.refObj=null;
	
	//初始化参数
	if(options != null){
		if(options.displayForm != null){
			this.displayForm = options.displayForm;
		}
		
		if(options.refObj != null){
			this.refObj = options.refObj;
		}

		if(options.isModal != null){
			this.isModal = options.isModal;
		}
		
		if(options.title != null){
			this.title = options.title;
		}
		
		if(options.height != null){
			this.height = options.height;
		}
		
		if(options.width != null){
			this.width = options.width;
		}
		
		if(options.dialogType != null){
			this.dialogType = options.dialogType;
		}
		
		//有标题，可以定制按钮的对话框
		if(this.dialogType == 2){
			this.showTitle = true;
			if(options.buttons != null){
				this.bottons = options.buttons;
			}
		}else if(this.dialogType == 3){//有标题，并有确定和取消按钮
			this.showTitle = true;
			this.bottons = {
					"确定": function() { 
						if(curDialog.onSaveResult()){
							curDialog.closeDialog(); 
						}
					}, 
					"取消": function() { 
						curDialog.closeDialog(); 
					} 
			};
		}
	}
	
	this.init();
}

/**
 * 加载页面完成时初始化Dialog对象
 * @return 无返回值
 */
DialogEx.prototype.init = function (){
	var $ = jQuery;
	var curDialog = this;
	
	//dialogDiv
	var dialogDiv = jQuery('#' + this.dialogId);
	if(dialogDiv.size() == 0){
		dialogDiv = $('<div id="' + this.dialogId + '" style="height:auto;width:auto;"/>').appendTo('body', document);
	}
	
	//加载弹出对话框内容
	if(this.content != null){
		this.content.appendTo(dialogDiv);
	}
	
	//初始化按钮
	if(curDialog.bottons == null){
		//初始化弹出对话框
		$('#' + curDialog.dialogId).dialog({
			autoOpen: false,
			modal: curDialog.isModal,
			width: curDialog.width,
			height: curDialog.height,
			title: curDialog.title,
			close: function(event, ui) {
				if(curDialog.bindDocumentClick){
					jQuery(document).unbind('click', curDialog.clickDocument);
				}
			}
		});
	}else{
		//初始化弹出对话框
		$('#' + curDialog.dialogId).dialog({
			autoOpen: false,
			modal: curDialog.isModal,
			width: curDialog.width,
			height: curDialog.height,
			title: curDialog.title,
			buttons: curDialog.bottons,
			close: function(event, ui) {
				if(curDialog.bindDocumentClick){
					jQuery(document).unbind('click', curDialog.clickDocument);
				}
			}
		});
	}
}

/**
 * 关闭弹出对话框
 * @return 无返回值
 */
DialogEx.prototype.closeDialog = function (){
	//alert('close');
	//this.dialogCurrHeight = jQuery('#' + this.dialogId).parents('.ui-dialog')[0].style.width;
	//this.contentHeight = jQuery('#' + this.dialogId)[0].style.height;
	//alert("dialogHeight:" + this.dialogCurrHeight + ";contentHeight:" + this.contentHeight);
	jQuery('#' + this.dialogId).dialog("close");
}

/**
 * 关闭窗口
 * @return  无返回值
 */
DialogEx.prototype.hide = function(){
	this.closeDialog();
}

/**
 * 单击“确定”按钮的回调函数
 * @return true: 关闭弹出对话框；false:不关闭弹出对话框
 */
DialogEx.prototype.onSaveResult = function (){
	return true;
}

/**
 * 打开弹出对话框
 * @param options  打开的弹出对话框设置：{size:[width, height], position:[left, top]|event, eve:event}
 * @return  无返回值
 */
DialogEx.prototype.show = function (options){
	var eve = null;
	if(options != null){
		//alert('x:' + options.size[0] + ";y:" + options.size[0]);
		eve = options.eve;
		if(!this.exist && options.size != null){
			//alert("重置大小");
			jQuery('#' + this.dialogId).dialog('option', 'width', options.size[0]);
			jQuery('#' + this.dialogId).dialog('option', 'height', options.size[1]);
		}
		
		if(this.displayForm == 2 && options.position != null){
			jQuery('#' + this.dialogId).dialog("option", "position", options.position);
		}else if(this.displayForm == 3 && (options.position != null || options.eve != null)){
			if(options.position != null){
				eve = options.position;
			}
			jQuery('#' + this.dialogId).dialog("option", "position", [eve.clientX, eve.clientY]);
		}else if(this.displayForm == 4){
			if(options.size != null){
				var divPostion=getPositionByRefObj(this.refObj,options.size[0],options.size[1]);
				jQuery('#' + this.dialogId).dialog("option", "position", [divPostion.left,divPostion.top]);
			}
		}
	}
	jQuery('#' + this.dialogId).dialog('open');
	if(!this.isModal && eve != null){
		try{
			eve.stopPropagation(); //取消事件传播
		}catch(e){
			
		}
		var curDialog = this;
		jQuery(document).bind('click', {curDialog:curDialog}, this.clickDocument);
		this.bindDocumentClick = true;
	}
	
	if(!this.exist){
		if(this.content != null){
			this.content.show();
		}
		
		if(this.dialogType == '01'){
			jQuery(this.content).parents('.ui-dialog').find('.ui-dialog-titlebar').hide();
		}
	}
	
	/*if(this.contentHeight != null){
		jQuery('#' + this.dialogId)[0].style.height = this.contentHeight;
		var dialogWidth = jQuery('#' + this.dialogId).parents('.ui-dialog')[0].style.width;
		//alert(dialogWidth);
		jQuery('#' + this.dialogId)[0].style.width = dialogWidth;
		//alert(jQuery('#' + this.dialogId)[0].style.width);
		jQuery('#' + this.dialogId).parents('.ui-dialog')[0].style.height = "auto";
	}*/
	this.exist = true;
}

/**
 * 判断鼠标单击事件是否在弹出对话框外触发
 * @param eve 事件对象
 * @return 无返回值
 */
DialogEx.prototype.clickDocument = function(eve){
	var x = eve.clientX;
	var y = eve.clientY;
	//alert(eve.data.curDialog.title);
	if(!eve.data.curDialog.inDialog({x:x, y:y})){
		//alert("在对话框外单击");
		eve.data.curDialog.closeDialog();
	}
}

/**
 * 点是否在弹出对话框内
 * @param position 判断的点
 * @return  true:点在对话框内；false:点在对话框外
 */
DialogEx.prototype.inDialog = function(position){
	//alert("ok");
	var dialogObj = jQuery('#' + this.dialogId).parent('.ui-dialog');
	var left = parseInt(dialogObj[0].style.left);
	//alert("left:" + left);
	var top = parseInt(dialogObj[0].style.top);
	var height = dialogObj[0].offsetHeight;
	//alert('top:' + top);
	//alert('height:' + height);
	var right = left + parseInt(dialogObj[0].style.width) + 10;
	var bottom = top + height + 10;
	
	//alert("x:" + position.x + "; y:" + position.y + ";left:" + left + "; top:" + 
	//		top + "; right:" + right + "; bottom:" + bottom);
	if(position.x >= (left - 10) && position.x <= right 
			&& position.y >= (top - 10) && position.y <= bottom){
		return true;
	}
	return false;
}

/**
 * 对话框是否已经弹出过
 * @return  true:已经调用过show弹出对话框; false:还没有弹出过
 */
DialogEx.prototype.isExist = function (){
	return this.exist;
}