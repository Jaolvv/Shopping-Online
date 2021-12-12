/**
 * dialog 1.0
 * @author 谢亮
 * @param {Object} id
 * @param {Object} data
 * @param {Object} options
 * @declaration 1、该组件主要是用于生成一个简单的模态或者非模态窗口,其中部分代码参照SimpleModal 1.2.3
 * 				2、在生成窗口时必须传入id和data两个参数，options可选，其中data可以是一个普通对象，jQuery对象或者是一个合法的字符串
 * 				3、在使用new运算符初始化窗口后，必须显示调用show方法才能将窗口显示出来，在显示的时候可以重新设置窗口的位置和大小，但是必须在new的时候
 * 				   指定相应的displayForm和isScroll的对应值
 * 				4、在new的时候可以通过传入相应的optioins的属性，可以对窗口的样式，模式进行控制
 * 				5、注意：	①在show的时候是通过传入一个JSON对象来指定位置和大小的，大小参数：size，位置参数：position
 * 							②当选择显示位置是跟随鼠标时，position传入的是一个事件，为了兼容不同的浏览器必须在传入事件时对时间进行处理，
 * 							  例如：event = event||window.event;
 * @example $('#demo2').click(function(event){
 *				e.preventDefault();
 *				ev = e||window.event;
 *				dialog1 = new Dialog('dialog1',jQuery("#dialog2"),{displayForm:1,isModal:false,isScroll:true});
 *				dialog1.show({size:[300,200]});
 *			})
 */


var Dialog = function(id,data,options){
	
	//保存是否是IE6浏览器
	var ie6 = jQuery.browser.msie && parseInt(jQuery.browser.version) == 6 && typeof window['XMLHttpRequest'] != "object";
	var ieQuirks = jQuery.browser.msie && !jQuery.boxModel;
	
	//保存浏览器的大小
	var w;
	
	//保存传入的ID
	var id = id;
	jQuery(this).attr('id',id);
	
	//保存传入的data
	var data = data;
	
	//保存传入的选项
	var options = options;
	
	//窗口包含的所有对象
	var dialog = {};
	
	//是否已经存在
	var isExist = false;
	
	//对象的默认选项
	var defaults = {
		opacity: 50,								//不透明度，在0-100之间取值
		overlayId: 'b-overlay',						//遮罩层ID
		overlayCssClass:'b-overlay',				//遮罩层样式CLASS
		overlayCss: {},								//遮罩层CSS
		containerId: 'b-container',					//容器ID
		containerCssClass:'b-container',			//容器样式CLASS
		containerCss: {},							//容器CSS
		dataCss: {},								//数据CSS
		zIndex: 1000,								//z-index的值
		close: true,								//是否显示closeHTML
		closeHTML: '<a id="close'+this.id+'" class="modalCloseImg" title="Close"></a>',
		closeClass: 'b-close',						//关闭按钮的样式
		position: null,								//container的显示位置
		persist: false,								//是否保存数据
		onOpen: null,								//打开时的回调函数
		onClose: null,								//关闭时的回调函数
		displayForm:1,								//显示模式,1表示绝对居中,2指定位置，3跟随鼠标位置
		isScroll:false,								//内容超出显示的时候是否显示滚动条
		isModal:true,								//是否显示为模态窗口
		orig:null									//如果不保存改变后的数据，保存原数据的备份
	}
	
	/**
	 * 功能：对默认的选项和传入的选项进行合并，并对ID进行相应的处理
	 */
	var processOpts = function(){
		//对传入的选项和默认的选项进行合并，并放入dialog的opts属性当中
		dialog.opts = jQuery.extend({},defaults,options);
		
		//对ID进行处理
		dialog.opts.overlayId += '-'+id;
		dialog.opts.containerId += '-'+id;
		
	}
	
	/**
	 * 功能：对data进行处理，将其转换为一个jQuery对象，方便后面统一处理
	 */
	var processData = function(){
		// 如果传入的data是一个对象
		if (typeof data == 'object') {
			// 如果data对象不是一个jQuery对象，就将其转换为一个jQuery对象
			data = data instanceof jQuery ? data : jQuery(data);
			
			// 如果该对象来自于一个DOM对象节点，那么保存其父节点
			if (data.parent().parent().size() > 0) {
				dialog.parentNode = data.parent();
				// 是否要保存数据
				if (!dialog.opts.persist) {
					dialog.orig = data.clone(true);
				}
			}
		}
		else if (typeof data == 'string' || typeof data == 'number') {
			// 如果data为一段HTML代码，将其转换为一个jQuery对象
			data = jQuery('<div/>').html(data);
		}
		else {
			// 不支持的数据类型
			alert('SimpleModal Error: Unsupported data type: ' + typeof data);
			return false;
		}
		//将data放入dialog的属性当中
		dialog.data = data.addClass('simplemodal-data').css(dialog.opts.dataCss);
		data = null;
	}
	
	/**
	 * 功能：取得浏览器的大小
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
	 * 功能：创建iframe，overlay，container
	 */
	var create = function(){
		
		// 如果当前的浏览器为IE6，那么我们就创建一个iframe,如果是模态窗口就创建iframe和遮罩层
		if(dialog.opts.isModal){
			if (ie6) {
				dialog.iframe = jQuery('<iframe src="javascript:false;"/>')
					.attr('id','iframe'+id)
					.css(jQuery.extend(dialog.opts.iframeCss, {
						display: 'block',
						opacity: 0, 
						position: 'fixed',
						height: w[0],
						width: w[1],
						zIndex: opts.zIndex,
						top: 0,
						left: 0
					}))
					.appendTo('body');
			}
	
			// 创建遮罩层
			dialog.overlay = jQuery('<div/>')
				.attr('id', dialog.opts.overlayId)
				.addClass(dialog.opts.overlayCssClass)
				.css(jQuery.extend(dialog.opts.overlayCss, {
					display: 'block',
					opacity: dialog.opts.opacity / 100,
					height: w[0],
					width: w[1],
					position: 'fixed',
					left: 0,
					top: 0,
					zIndex: dialog.opts.zIndex + 1
				}))
				.appendTo('body');
			}

		// 创建容器
		dialog.container = jQuery('<div/>')
			.attr('id', dialog.opts.containerId)
			.addClass(dialog.opts.containerCssClass)
			.css(jQuery.extend(dialog.opts.containerCss, {
				display: 'block',
				position: 'fixed',
				zIndex: dialog.opts.zIndex + 2
			}))
			.append(dialog.opts.close 
				? jQuery(dialog.opts.closeHTML).addClass(dialog.opts.closeClass)
				: '')
			.appendTo('body');
		
		// 容器载入数据并隐藏数据
		dialog.container.append(dialog.data.show());
	}
	
	/**
	 * 功能：当对象刚生成时进行，调用的初始化方法
	 */
	this.init = function(){
		//合并选项，处理ID
	 	processOpts();
		//处理数据
		processData();
		//获取浏览器大小
		getDimensions();
		//创建iframe，overlay 和 container
		create();
	 }
	 
	/**
	* 功能：根据鼠标点击的位置自动判断显示的位置
	* 参数：鼠标当前的坐标数组
	**/
	var autoShow = function(left,top){
		var containerLeft = left;
		var containerTop = top;
		
		//取得文档的宽和高
		var documentX = w[1];
		var documentY = w[0];
		
		//取得鼠标当前的坐标
		
		var mouseX = containerLeft;
		var mouseY = containerTop;
		
		//得到当前的容器的大小	
		var divWidth = jQuery('#' + dialog.opts.containerId).width();
		var divHeight = jQuery('#' + dialog.opts.containerId).height();
		
		//如果鼠标点击的下方有足够的空间显示div
		if((documentY-mouseY)>divHeight){
		
			//设置上边距
			containerTop = mouseY+document.body.scrollTop;
			
			//如果鼠标点击的右边有足够的空间显示div
			if((documentX-mouseX)>divWidth){
			
				containerLeft = mouseX+document.body.scrollLeft;
				
			}else{
				//如果鼠标点击的左边有足够的空间显示div
				if(mouseX>divWidth){
				
					containerLeft = mouseX-divWidth+document.body.scrollLeft;
					
				}else{
				
					//如果鼠标点击的两边都不够显示div，那么取屏幕x方向上的中间值
					containerLeft = (documentX-divWidth)/2+document.body.scrollLeft;
					
				}
			}
			
			
		}else if(mouseY>divHeight){
			//如果鼠标点击的上方有足够的空间显示div
			//设置上边距	
			containerTop = mouseY-divHeight+document.body.scrollTop; 
				
			//如果鼠标点击的右边有足够的空间显示div
			if((documentX-mouseX)>divWidth){
			
				containerLeft = mouseX+document.body.scrollLeft;
				
			}else{
				//如果鼠标点击的左边有足够的空间显示div
				if(mouseX>divWidth){
				
					containerLeft = mouseX-divWidth+document.body.scrollLeft;
					
				}else{
				
					//如果鼠标点击的两边都不够显示div，那么取屏幕x方向上的中间值
					containerLeft = (documentX-divWidth)/2+document.body.scrollLeft;
					
				}
			}
		}else{
			
			//设置上边距
			containerTop = (documentY-divHeight)/2+document.body.scrollTop;
				
			//如果鼠标点击的右边有足够的空间显示div
			if((documentX-mouseX)>divWidth){
			
				containerLeft = mouseX+document.body.scrollLeft;
				
			}else{
				//如果鼠标点击的左边有足够的空间显示div
				if(mouseX>divWidth){
				
					containerLeft = mouseX-divWidth+document.body.scrollLeft;
					
				}else{
				
					//如果鼠标点击的两边都不够显示div，那么取屏幕x方向上的中间值
					containerLeft = (documentX-divWidth)/2+document.body.scrollLeft;
					
				}
			}
		}
		//返回左边距和上边距
		return [containerLeft,containerTop]
	}
	
	/**
	 * 功能：设置container的显示位置
	 * 参数：1、options1包含两个选项，size和position
	 * 		2、size为容器的大小的一个数组，第一个值存放width，第二个存放height，
	 * 		   如果内容超过容器的显示位置，就根据isScroll的值来判断是否添加滚动条
	 * 		3、如果displayForm为1，position不用传，传了也没有用，
	 * 		  如果displayForm为2，position为一个坐标数组，第一个值为left，第二个值为top
	 * 		  否则position就是一个事件对象，用于取得鼠标的坐标，container的位置就随鼠标的坐标而定
	 */
	var setPosition = function(options1){
	 	//设置容器的大小
		if(options1 != null&&options1.size != null){
			if(dialog.opts.isScroll){
				//对container的大小进行设置
				dialog.container.css({
					width: options1.size[0],
					height: options1.size[1]
				});
				//对data的大小进行设置，并对其超出显示设置为自动添加滚动条
				dialog.data.css({
					width: options1.size[0],
					height: options1.size[1],
					overflow: 'auto'
				});
			}else{
				//对container的大小进行设置
				dialog.container.css({
					width: options1.size[0],
					height: options1.size[1]
				});
				//对data的大小进行设置，并对其超出显示设置为自动添加滚动条
				dialog.data.css({
					width: options1.size[0],
					height: options1.size[1]
				});
			}
		}
		
		//保存容器位置的变量
		var left,top;
		//设置容器的位置，分3种情况
		if(dialog.opts.displayForm == 1){
			//永远居中显示
			top = (w[0]/2) - ((dialog.container.height() || dialog.data.height())/2);
			left = (w[1]/2) - ((dialog.container.width() || dialog.data.width())/2);
		}else if(dialog.opts.displayForm == 2){
			//固定位置
			left = position[0];
			top = position[1];
		}else if(dialog.opts.displayForm == 3){
			//根据鼠标位置来确定
			if (options1 == null) {
				alert('没有正确传入事件，获取不到鼠标坐标！');
			}
			else {
				if (options1.position.x || options1.position.y) {
					left = autoShow(position.x, position.y)[0];
					top = autoShow(position.x, position.y)[1];
				}
				else {
					left = autoShow(options1.position.pageX, options1.position.pageY)[0];
					top = autoShow(options1.position.pageX, options1.position.pageY)[1];
				}
			}
		}else{
			alert('请选择正确的显示模式！');
		}
		dialog.opts.position = [left,top];
		dialog.container.css({left: left, top: top});
	}
	
	/**
	 * 功能：纠正IE显示
	 */
	var fixIE = function(){
		//读取容器的位置
		var p = dialog.opts.position;

		// simulate fixed position - adapted from BlockUI
		jQuery.each([dialog.iframe || null, dialog.overlay, dialog.container], function (i, el) {
			if (el) {
				var bch = 'document.body.clientHeight', bcw = 'document.body.clientWidth',
					bsh = 'document.body.scrollHeight', bsl = 'document.body.scrollLeft',
					bst = 'document.body.scrollTop', bsw = 'document.body.scrollWidth',
					ch = 'document.documentElement.clientHeight', cw = 'document.documentElement.clientWidth',
					sl = 'document.documentElement.scrollLeft', st = 'document.documentElement.scrollTop',
					s = el[0].style;
				
				//IE下面使用的样式是:position:absolute，firefox下使用的是position:fixed
				s.position = 'absolute';
				if (i < 2) {
					s.removeExpression('height');
					s.removeExpression('width');
					s.setExpression('height','' + bsh + ' > ' + bch + ' ? ' + bsh + ' : ' + bch + ' + "px"');
					s.setExpression('width','' + bsw + ' > ' + bcw + ' ? ' + bsw + ' : ' + bcw + ' + "px"');
				}
				else {
					var te, le;
					if (p && p.constructor == Array) {
						var top = p[0] 
							? typeof p[0] == 'number' ? p[0].toString() : p[0].replace(/px/, '')
							: el.css('top').replace(/px/, '');
						te = top.indexOf('%') == -1 
							? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"'
							: parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';

						if (p[1]) {
							var left = typeof p[1] == 'number' ? p[1].toString() : p[1].replace(/px/, '');
							le = left.indexOf('%') == -1 
								? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"'
								: parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
						}
					}
					else {
						te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
						le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
					}
					s.removeExpression('top');
					s.removeExpression('left');
					s.setExpression('top', te);
					s.setExpression('left', le);
				}
			}
		});
	}
	
	/**
	 * 功能：绑定事件
	 */
	var bindEvents = function(){
		// 给关闭按钮绑定点击的时间处理函数
		jQuery('#close' + id).bind('click.'+id, function (e) {
			e.preventDefault();
			hideContent();
		});

		// 给窗口的大小变化绑定事件处理函数
		jQuery(window).bind('resize.'+id, function () {
			// 重新取得窗口大小
			getDimensions();

			// 重新设置容器的位置
			if(dialog.opts.displayForm == 1){
				setPosition();
			}
			if (ie6||ieQuirks) {
				fixIE();
			}
			else {
				// 更新iframe和overlay
				dialog.iframe && dialog.iframe.css({height: w[0], width: w[1]});
				dialog.overlay && dialog.overlay.css({height: w[0], width: w[1]});
			}
		});
	}
	
	/**
	 * 功能：显示
	 */
	this.show = function(options1){
		//根据传入的显示类型，大小和位置来确定容器的显示
		setPosition(options1);
		//校准在IE上的显示
		if (ie6 || ieQuirks) {
			fixIE();
		}
		//绑定关闭按钮的事件处理函数以及窗口大小变化的事件处理函数
		bindEvents();
	}
	
	/**
	 * 功能：取消事件绑定
	 */
	var unbindEvents = function(){
		//取消绑定关闭按钮的时间
		jQuery('#close' + id).unbind('click.'+id);
		//取消绑定窗口大小变化的事件处理函数
		jQuery(window).unbind('resize.'+id);
	}
	
	/**
	 * 功能：移除元素，根据选项的值决定将修改后的数据还是原数据放回原来的地方
	 */
	var removeElements = function(){
		// 如果数据不存在就退出
		if (!dialog.data) {
			return false;
		}

		if (jQuery.isFunction(dialog.opts.onClose)) {
			// 执行回调函数
			dialog.opts.onClose.apply(this, [dialog]);
		}
		else {
			// 如果data来自DOM，就将其放回原处
			if (dialog.parentNode) {
				// 是否要保存改变后的数据
				if (dialog.opts.persist) {
					// 保存修改后的数据
					dialog.data.hide().appendTo(dialog.parentNode);
				}
				else {
					//不保存修改后的数据，则移除data，将原数据的备份放回data原来的地方
					dialog.data.remove();
					dialog.orig.appendTo(dialog.parentNode);
				}
			}
			else {
				// 如果data不是来自DOM，就直接移除
				dialog.data.remove();
			}

			// 如果存在，移除iframe，overlay 和 container
			dialog.container && dialog.container.remove();
			dialog.overlay && dialog.overlay.remove();
			dialog.iframe && dialog.iframe.remove();

			// 重置dialog对象
			dialog = {};
		}
	}
	
	/**
	 * 功能：静态关闭方法
	 */
	var hideContent = function(){
		removeElements();
		unbindEvents();
	}
	
	/**
	 * 功能：关闭方法
	 */
	this.hide = function(){
		hideContent();
	}
	
	/**
	 * 功能：判断对象是否已经存在
	 */
	this.isExist = function(){
		return jQuery('#b-container-'+id).attr('id') != null;
	}
	
	/**
	 * 功能：调用初始化方法
	 */
	this.init();
}
