/**
* DoubleListTransfer对象构造函数
* 参数: leftList 左列表框
*       rightList 右列表框
*		opts json对象,含有两个元素,第一元素为onTransfer,第二个元素为onMove,onTransfer和onMove均对应一个回调函数.
*			 onTransfer: function(source, target, items) 左右移动的回调函数：参数依次是，移动的源、目标list、移动的项目，返回true就接收，表示移动成功，false表示拒绝移动
*			 onMove: function(source, items) 上下移动的回调函数：参数依次是，进行项目移动的list、移动的项目, 返回true就接收，表示移动成功，false表示拒绝移动	
**/
DoubleListTransfer = function(leftList,rightList,opts){
	
	this.leftList = leftList;

	this.rightList = rightList;

	this.opts = opts;
	
	/**
	* 将左列表框的元素全部移动右列表框
	**/
	this.transferAllToRight = function(){
		
		this.selectAllItems(this.leftList);
		this.transfer('left');
	}

	/**
	* 将左列表框选中元素移动右列表框
	**/ 
	this.transferSelToRight = function(){

		this.transfer('left');
	}

	/**
	* 将右列表框的元素全部移动到左列表框
	**/
	this.transferAllToLeft = function(){

		this.selectAllItems(this.rightList);
		this.transfer('right');		
	}

	/**
	* 将右列表框选中的元素移动到左列表框
	**/
	this.transferSelToLeft = function(){
		
		this.transfer('right');		
	}
	
	/**
	* 将左列表框的选中元素上移
	**/
	this.leftListSelUp = function(){
		
		this.move('left','up');
	}
	
	/**
	* 将左列表框的选中元素下移
	**/
	this.leftListSelDown = function(){
		
		this.move('left','down');
	}
	
	/**
	* 将右列表框的选中元素上移
	**/
	this.rightListSelUp = function(){
		
		this.move('right','up');
	}
	
	/**
	* 将右列表框的选中元素下移
	**/
	this.rightListSelDown = function(){

		this.move('right','down');
	}

	/**
	* 左右移动函数,在回调函数onTransfer返回true时实现移动操作
	**/
	this.transfer = function(direction){
		var source;
		var target;

		//指定source 和 target
		if('left' == direction){
			source = this.leftList;
			target = this.rightList;
		}else{
			source = this.rightList;
			target = this.leftList;				
		}

		//获取选中项
		var items = this.getSelectedItem(source);

		if(items != null && items.length > 0){
			
			if(opts && opts.onTransfer){
				 if(opts.onTransfer(source,target,items)){
					this.transferItems(source,target,items);
				 }
			}else{
					//当没有绑定相应的回调函数时,默认执行移动操作
					this.transferItems(source,target,items);
			}
		}
	}
	
	/**
	* 功能:上下移动函数,在回调函数onMove返回true时实现移动操作
	* 参数: direction: 左右
	*       type: 上下
	**/
	this.move = function(direction,type){
		var source;

		//指定source 
		if('left' == direction){
			source = this.leftList;
		}else{
			source = this.rightList;
		}
		//获取选中项
		var items = this.getSelectedItem(source);
		
		if(items != null && items.length > 0){
			
			if(opts && opts.onMove){
				 if(opts.onMove(source,items)){
					this.moveItems(source,type,items);
				 }
			}else{
					//当没有绑定相应的回调函数时,默认执行移动操作
					this.moveItems(source,type,items);
			}

		}
		
	}

	/**
	* 左右移动操作
	**/
	this.transferItems = function(source,target,items){
		
		//将选中项移到目录列表
		for(var i=0; i<items.length; i++){
			items[i].selected = false;
			target.appendChild(items[i]);
		}
		
		//从源列表将选中项移除
		var tempOptions = new Array();
		for(var i=0; i<source.options.length; i++){
			if(!source.options[i].selected){
				tempOptions[tempOptions.length] = source.options[i];
			}
		}
		
		source.options.length = tempOptions.length; //重置source的options数组长度
		for(var i=0; i<tempOptions.length; i++){
			source.options[i] = tempOptions[i];
		}
	}
	
	/**
	* 上下移动操作
	**/
	this.moveItems = function(source,type,items){
		
		//上移
		if('up' == type){
			for(var i=0; i<source.options.length; i++){
				if(source.options[i].selected ){
					if(i != 0 && !source.options[i-1].selected){
						this.swapOptions(source, i,i-1);
					}
				}
			}
		}

		//下移
		if('down' == type){
			for(var i=source.options.length-1; i>=0; i--){
				if(source.options[i].selected ){					
					if( i != source.options.length -1 && !source.options[i+1].selected){						
						this.swapOptions(source,i,i+1);
					}					
				}
			}
		}
	}

	/**
	* 获取左或者右列表框被选取的项
	**/
	this.getSelectedItem = function(source){
		
		var items = new Array();

		for(var i=0; i<source.options.length; i++){
			if(source.options[i].selected){
				items[items.length] = source.options[i];
			}
		}
		return items;
	}

	/**
	* 功能:交换两个option
	**/
	this.swapOptions = function(objTargetElement, first, second) {
		var opt = objTargetElement.options;
		var temp = new Option(opt[first].text, opt[first].value, opt[first].defaultSelected, opt[first].selected);
		var temp2= new Option(opt[second].text, opt[second].value, opt[second].defaultSelected, opt[second].selected);
		opt[first] = temp2;
		opt[second] = temp;
	}

	/**
	* 选中指定列表框中所有项
	**/
	this.selectAllItems = function(source) {
		for (var i = 0; i < source.options.length; i++) {
				source.options[i].selected = true;    
		}
		
		return false;
	}

}
