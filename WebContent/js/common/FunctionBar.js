//=======================================================================================
/**
* Description: Item对象，在FunctionBar类中被调用
*			使用方法:ItemObj = new Item(text,value)

* Copyright: Copyright BONC(c) 2004-2007
* Company: 北京东方国信电子有限公司
* author 张倜豪
* version 1.0
**/
function Item(text, value)
{
	//默认是图片，请注意必须是7x7的大小，如果不是这个大小就会出现图片的拉伸
	this.defaultImg = 'images/common/funbar/dot.gif';
	this.spaceImg = 'images/common/funbar/space.gif';

	//Item的值
	this.value = value;
	//Item显示值
	this.text = text;
	//Item在Group中的编号
	this.id;

	//是否选中
	this.isSelect = false;

	this.itemTr = document.createElement('tr');
	this.itemTd = document.createElement('td');
	this.itemTr.appendChild(this.itemTd);

	//放多个空格来将信息向右移动
	this.blankTextObj = document.createTextNode('　　');
	this.itemTd.appendChild(this.blankTextObj);

	//创建一个img并将img添加到span中
	this.imgObj = document.createElement('img');
	this.imgObj.setAttribute('src',this.defaultImg);
	this.itemTd.appendChild(this.imgObj);
	this.imgObj.align = 'absmiddle';
	this.imgObj.width = '7';
	this.imgObj.height = '7';

	//一个空格的图片，用于占位
	this.imgSpaceObj = document.createElement('img');
	this.imgSpaceObj.setAttribute('src',this.spaceImg);
	this.itemTd.appendChild(this.imgSpaceObj);
	this.imgSpaceObj.width = '4';
	this.imgSpaceObj.height = '4';

	this.itemSpan = document.createElement('span');
	this.itemTd.appendChild(this.itemSpan);
	this.itemSpan.className = 'item';

	//创建Item的描述文字，并将文字添加到<a></a>中间
	this.textObj = document.createTextNode(this.text);
	this.itemSpan.appendChild(this.textObj);

	//事件处理，对于在<a>的链接中点击时的事件处理
	this.itemSpan.onclick = this.handleOnClick;
	this.itemSpan.onmousemove = this.handleOnMouseMove;
	this.itemSpan.onmouseout = this.handleOnMouseOut;
};

/**
* 设置默认图标，在需要改变系统默认设置图片的时候被调用
* param img 默认图片的路径
**/
Item.prototype.setDefaultImg = function(img)
{
	this.defaultImg = img;
	this.imgObj.setAttribute('src',this.defaultImg);
};

/**
* 设置Item的描述文字
* param text Item的描述文字
**/
Item.prototype.setText = function(text)
{
	this.text = text;
	this.textObj.nodeValue = text;
};

/**
* 处理在节点文字上单击的事件
*/
Item.prototype.handleOnClick = function(e)
{
	var onClickHandle;

	//一下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var element = theEvent.srcElement;
    if (!element) 
	{
		element = theEvent.target;
    }

	if(element.tagName == 'SPAN')
	{
		onClickHandle = element.getAttribute('cf');
		eval(onClickHandle);
	}
};

/**
* 处理在节点文字上移动鼠标的事件
*/
Item.prototype.handleOnMouseMove = function(e)
{
	var onMouseMoveHandle;
	
	//一下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var element = theEvent.srcElement;
    if (!element) 
	{
		element = theEvent.target;
    }
	
	if(element.tagName == 'SPAN')
	{
		onMouseMoveHandle = element.getAttribute('mmf');
		eval(onMouseMoveHandle);
	}
};

/**
* 处理在节点文字上移出鼠标的事件
*/
Item.prototype.handleOnMouseOut = function(e)
{
	var onMouseOutHandle;

	//一下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var element = theEvent.srcElement;
    if (!element) 
	{
		element = theEvent.target;
    }

	if(element.tagName == 'SPAN')
	{
		onMouseOutHandle = element.getAttribute('mof');
		eval(onMouseOutHandle);
	}
};

/**
* 设置节点的onClick事件对应的函数
* param value 将onClick事件对应的函数放入到<a cf = "**">中**的位置
*/
Item.prototype.setOnClick = function(value)
{
	this.itemSpan.setAttribute('cf',value);
};

/**
* 设置节点的onMouseMove事件对应的函数
* param value 将onMouseMove事件对应的函数放入到<a mmf = "**">中**的位置
*/
Item.prototype.setOnMouseMove = function(value)
{
	this.itemSpan.setAttribute('mmf',value);
};

/**
* 设置节点的onMouseOut事件对应的函数
* param value 将onMouseOut事件对应的函数放入到<a mof = "**">中**的位置
*/
Item.prototype.setOnMouseOut = function(value)
{
	this.itemSpan.setAttribute('mof',value);
};

/**
* 当在文字上面点击的时候执行的方法，主要是将点中的Item加亮
* param value 将onClick事件对应的函数放入到<a cf = "**">中**的位置
*/
Item.prototype.onClick = function()
{
	this.setStatus(9);
};

/**
* 设置当前Item的状态
* param stat 0默认状态,1鼠标移动状态,9选中状态, -1未选中状态
*/
Item.prototype.setStatus = function(stat)
{
	this.status = stat;

	//默认状态和鼠标在TD移动的状态
	if(this.status == 0 && !this.isSelect)
	{
		this.itemSpan.className = 'item';
	}
	else if(this.status == 1 && !this.isSelect)
	{
		this.itemSpan.className = 'itemHover';
	}
	else if(this.status == 9)
	{
		this.isSelect = true;
		this.itemSpan.className = 'itemSelect';
	}
	else if(this.status == -1)
	{
		this.isSelect = false;
		this.itemSpan.className = 'item';
	}
};

//=======================================================================================
/**
* Description: Group对象，在FunctionBar类中被调用
*			使用方法:groupObj = new Group(text, value)

* Copyright: Copyright BONC(c) 2004-2007
* Company: 北京东方国信电子有限公司
* author 张倜豪
* version 1.0
**/
function Group(text, value)
{
	//和Group相对应的FunctionBar对象
	this.barObj;

	//Group默认的图片
	this.defaultImg = 'images/common/funbar/Group.gif';

	//Group的值
	this.value = value;
	//Group显示文字
	this.text = text;
	this.id;
	//当前Group的状态
	this.status;

	//是否选中
	this.isSelect = false;
	//是否展开
	this.isExpand = false;

	//子节点对象数组
	this.childItems = [];

	//调用初始化函数
	this.init();

	//事件处理
	this.groupTd.onclick = this.handleOnClick;
	this.groupTd.onmousemove = this.handleOnMouseMove;
	this.groupTd.onmouseout = this.handleOnMouseOut;
};

/**
* 初始化函数，在创建对象的时候被调用
*/
Group.prototype.init = function()
{
	this.groupTr = document.createElement('tr');
	this.groupTd = document.createElement('td');
	this.groupTr.appendChild(this.groupTd);

	this.groupTd.width='100%';
	this.groupTd.height='26';
	//this.groupTd.align='center';
	this.groupTd.className = 'group';

	//放一个空格来将信息向右移动
	this.blankTextObj = document.createTextNode('　');
	this.groupTd.appendChild(this.blankTextObj);

	//创建一个img并将img添加到span中
	this.imgObj = document.createElement('img');
	this.imgObj.setAttribute('src',this.defaultImg);
	this.groupTd.appendChild(this.imgObj);
	this.imgObj.align = 'absmiddle';

	//创建Item的描述文字，并将文字添加到<a></a>中间
	this.textObj = document.createTextNode(' ' + this.text);
	this.groupTd.appendChild(this.textObj);

	//加一条颜色较深的线<tr><td bgcolor="#A1B2D9" height='1'></td></tr>
	this.line1Tr = document.createElement('tr');
	this.line1Td = document.createElement('td');
	this.line1Tr.appendChild(this.line1Td);
	this.line1Td.height = '1';
	this.line1Td.style.backgroundColor = '#A1B2D9';

	//加一条颜色较深的线<tr><td bgcolor="#A1B2D9" height='1'></td></tr>
	this.line2Tr = document.createElement('tr');
	this.line2Td = document.createElement('td');
	this.line2Tr.appendChild(this.line2Td);
	this.line2Td.height = '1';
	this.line2Td.style.backgroundColor = '#A1B2D9';
	//默认情况下不显示
	this.line2Tr.style.display = 'none';

	//创建子节点层的div
	this.groupChildTr = document.createElement('tr');
	this.groupChildTd = document.createElement('td');
	this.groupChildTr.appendChild(this.groupChildTd);

	this.groupChildTdTable = document.createElement('table');
	this.groupChildTdTbody = document.createElement('tbody');
	this.groupChildTdTable.appendChild(this.groupChildTdTbody);
	this.groupChildTd.appendChild(this.groupChildTdTable);


	//展开或者折叠所属Item，默认情况是折叠的
	this.expand(this.isExpand);
};

/**
* 设置Group的Text
* param value Group的Text
*/
Group.prototype.setText = function(value)
{
	this.text = value;
	this.textObj.nodeValue = value;
};

/**
* 处理在节点文字上单击的事件
*/
Group.prototype.handleOnClick = function(e)
{
	var onClickHandle;

	//一下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var element = theEvent.srcElement;
    if (!element) 
	{
		element = theEvent.target;
    }

	if(element.tagName == 'TD')
	{
		onClickHandle = element.getAttribute('cf');
		eval(onClickHandle);
	}
};

/**
* 处理鼠标在节点文字上移动的事件
*/
Group.prototype.handleOnMouseMove = function(e)
{
	var onMouseMoveHandle;
	
	//一下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var element = theEvent.srcElement;
    if (!element) 
	{
		element = theEvent.target;
    }
	
	if(element.tagName == 'TD')
	{
		onMouseMoveHandle = element.getAttribute('mmf');
		
		eval(onMouseMoveHandle);
	}
};

/**
* 处理鼠标移出节点文字的事件
*/
Group.prototype.handleOnMouseOut = function(e)
{
	var onMouseOutHandle;

	//一下代码主要是用于ie和firefox兼容而做的处理
	//ie下：theEvent = window.event，而firefox下是通过函数的参数e传递进来的
	var theEvent = window.event || e;
    var element = theEvent.srcElement;
    if (!element) 
	{
		element = theEvent.target;
    }

	if(element.tagName == 'TD')
	{
		onMouseOutHandle = element.getAttribute('mof');
		eval(onMouseOutHandle);
	}
};

/**
* 设置节点的onClick事件对应的函数
* param value 将onClick事件对应的函数放入到<a cf = "**">中**的位置
*/
Group.prototype.setOnClick = function(value)
{
	this.groupTd.setAttribute('cf',value);
};

/**
* 设置鼠标在节点文字上移动的事件对应的函数
* param value 将mousemove事件对应的函数放入到<a mmf = "**">中**的位置
*/
Group.prototype.setOnMouseMove = function(value)
{
	this.groupTd.setAttribute('mmf',value);
};

/**
* 设置鼠标移出节点文字上事件对应的函数
* param value 将mouseout事件对应的函数放入到<a mof = "**">中**的位置
*/
Group.prototype.setOnMouseOut = function(value)
{
	this.groupTd.setAttribute('mof',value);
};

/**
* 展开或者折叠的事件处理函数，该函数会被FunctionBar的展开函数调用
**/
Group.prototype.onExpand = function()
{
	//判断有无子节点，如果没有，则不展开
	if(this.hasChild())
	{
		this.expand(!this.isExpand);
		//展开的时候将第二条线显示出来
		this.line2Tr.style.display = 'block';
	}
}

/**
* 确定展开还是收拢子节点
* param expandFlag 为true时展开节点，为false是收拢节点
*/
Group.prototype.expand = function(expandFlag)
{
	this.isExpand = expandFlag;

	if(this.groupChildTr != null)
	{
		//设置子节点展开还是收拢
		if(this.isExpand)
		{
			this.groupChildTr.style.display = 'block';
		}
		else
		{
			this.groupChildTr.style.display = 'none';
		}
	}
};

/**
* 设置当前Group的状态
* param stat 0默认状态,1鼠标移动状态
*/
Group.prototype.setStatus = function(stat)
{
	this.status = stat;

	//默认状态和鼠标在TD移动的状态
	if(this.status == 0)
		this.groupTd.className = 'group';
	else
		this.groupTd.className = 'groupHover';
};

/**
* 向当前Group中添加Item，子节点是加在childLayerDiv上面的
* param item 子节点(Item)对象
*/
Group.prototype.addItem = function(item)
{
	this.groupChildTdTbody.appendChild(item.itemTr);
	this.childItems[this.childItems.length] = item;

	item.id = this.childItems.length - 1;

	//如果当前Group已经添加到FunctionBar中，则生成Item相关单击事件处理函数
	if(this.id != null)
	{
		item.setOnClick(this.barObj.barObjName + '.clickItem(' + this.id + "," + item.id + ');');
	}
};

/**
* 获取当前Group的子节点数目
* return 当前Group的子节点数目
*/
Group.prototype.getChildNums = function()
{
	return this.childItems.length;
};

/**
* 获取当前Group的子节点
* return 当前Group的子节点数组
*/
Group.prototype.getChildItems = function()
{
	return this.childItems;
};

/**
* 获取当前Group是否有子节点
* return 为true表示有子节点，为false表示没有子节点
*/
Group.prototype.hasChild = function()
{
	return this.childItems.length > 0 ? true : false;
};

//=======================================================================================
/**
* Description: FunctionBar对象
*			使用方法:funBarObj = new FunctionBar(barObjName)，
*			barObjName和funBarObj一致，是funBarObj的字符描述
*
* Copyright: Copyright BONC(c) 2004-2007
* Company: 北京东方国信电子有限公司
* author 张倜豪
* version 1.0
**/
function FunctionBar(barObjName)
{
	this.barObjName = barObjName;

	//子节点对象数组
	this.groups = [];
	//functionBar对应的层
	this.barTable;

	//调用初始化函数
	this.init();
};

/**
* 初始化函数，在创建对象的时候被调用
*/
FunctionBar.prototype.init = function()
{
	this.barTable = document.createElement('table');
	this.barTbody = document.createElement('tbody');
	this.barTable.appendChild(this.barTbody);

	this.barTable.border = '0';
	this.barTable.cellPadding = '0';
	this.barTable.cellSpacing = '0';

	this.barTable.width = '100%';
};

/**
* 获取FunctionBar对象对应的div
* return Group对象对应的div
*/
FunctionBar.prototype.getFunctionBardiv = function()
{
	return this.barTable;
};

/**
* 展开所有节点
*/
FunctionBar.prototype.expandAll = function()
{
	//逐个展开所有的Group
	for(var i=0; i<this.groups.length; i++)
	{
		this.groups[i].expand(true);
		//展开的时候将分隔二级菜单的下边线条显示出来
		this.groups[i].line2Tr.style.display = 'block';
	}
};

/**
* 折叠所有节点
*/
FunctionBar.prototype.closeAll = function()
{
	//逐个折叠所有的Group
	for(var i=0; i<this.groups.length; i++)
	{
		this.groups[i].expand(false);
		//折叠的时候将分隔二级菜单的下边线条隐藏
		this.groups[i].line2Tr.style.display = 'none';
	}
};

/**
* 向当前Group中添加Item，子节点是加在childLayerDiv上面的
* param child 子节点(Item)对象
*/
FunctionBar.prototype.addGroup = function(group)
{
	//Group条
	this.barTbody.appendChild(group.groupTr);
	//深色的线条
	this.barTbody.appendChild(group.line1Tr);
	//二级菜单
	this.barTbody.appendChild(group.groupChildTr);

	//有二级菜单的时候才显示第二条线
	if(group.childItems.length > 0)
	{
		//深色的线条
		this.barTbody.appendChild(group.line2Tr);
	}

	this.groups[this.groups.length] = group;

	group.id = this.groups.length - 1;

	//设置Group单击事件
	group.setOnClick(this.barObjName + '.expandGroup(' + group.id + ');');

	//设置Group鼠标移动事件
	group.setOnMouseMove(this.barObjName + '.mouseMoveGroup(' + group.id + ');');

	//设置Group鼠标移出事件
	group.setOnMouseOut(this.barObjName + '.mouseOutGroup(' + group.id + ');');

	//如果Group有子节点Item,设置Item单击事件
	if(group.childItems.length > 0)
	{
		for(var i=0;i<group.childItems.length;i++)
		{
			group.childItems[i].setOnClick(this.barObjName + '.clickItem(' + group.id + "," + group.childItems[i].id + ');');
			group.childItems[i].setOnMouseMove(this.barObjName + '.mouseMoveItem(' + group.id + "," + group.childItems[i].id + ');');
			group.childItems[i].setOnMouseOut(this.barObjName + '.mouseOutItem(' + group.id + "," + group.childItems[i].id + ');');
		}
	}

};

/**
* 获取Group数目
* return Group数目
*/
FunctionBar.prototype.getGroupNums = function()
{
	return this.groups.length;
};

/**
* 获取所有Group
* return 所有Group
*/
FunctionBar.prototype.getGroups = function()
{
	return this.groups;
};

/**
* 展开或者折叠某一个group
* param groupId 要被折叠的group的编号
*/
FunctionBar.prototype.expandGroup = function(groupId)
{
	//首先将所有Group折叠起来
	this.closeAll();

	//获取需要展开或者折叠的节点对象
	var group = this.groups[groupId];

	//先展开
	group.onExpand();

	//如果有相应的单击处理函数，则执行
	if(this.onGroupClick != null)
	{
		this.onGroupClick(group);
	}
}

/**
* 鼠标在Group移动的处理函数
* param groupId 对应的group的编号
*/
FunctionBar.prototype.mouseMoveGroup = function(groupId)
{
	//获取需要展开或者折叠的节点对象
	var group = this.groups[groupId];

	//设置状态为加亮
	group.setStatus(1);
}

/**
* 鼠标在Group移出的处理函数
* param groupId 对应的group的编号
*/
FunctionBar.prototype.mouseOutGroup = function(groupId)
{
	//获取需要展开或者折叠的节点对象
	var group = this.groups[groupId];

	//设置状态为默认状态
	group.setStatus(0);
}

/**
* 展开或者折叠某一个group
* param groupId Group的编号
* param itemId Item的编号
*/
FunctionBar.prototype.clickItem = function(groupId, itemId)
{
	//获取需要展开或者折叠的节点对象
	var group = this.groups[groupId];
	var item = group.childItems[itemId];

	//先将所有Item设置成没有选中的状态
	this.unselectAllItem();

	//执行点击的特殊处理
	item.onClick();

	//如果有相应的单击处理函数，则执行
	if(this.onItemClick != null)
	{
		this.onItemClick(item);
	}
}

/**
* 鼠标在Item中移动事件
* param groupId Group的编号
* param itemId Item的编号
*/
FunctionBar.prototype.mouseMoveItem = function(groupId, itemId)
{
	//获取需要展开或者折叠的节点对象
	var group = this.groups[groupId];
	var item = group.childItems[itemId];

	//设置状态为Hover
	item.setStatus(1);
}

/**
* 鼠标在Item中移出事件
* param groupId Group的编号
* param itemId Item的编号
*/
FunctionBar.prototype.mouseOutItem = function(groupId, itemId)
{
	//获取需要展开或者折叠的节点对象
	var group = this.groups[groupId];
	var item = group.childItems[itemId];

	//设置状态为Hover
	item.setStatus(0);
}

/**
* 将所有的Item状态设置成未选中
*/
FunctionBar.prototype.unselectAllItem = function()
{
	//逐个折叠所有的Group
	for(var i=0; i<this.groups.length; i++)
	{
		for(var j=0;j<this.groups[i].childItems.length;j++)
		{
			this.groups[i].childItems[j].setStatus(-1);
		}
	}
};

/**
* 创建一个Group，并将当前functionBar对象传递给Group
* param text Group的文字描述
* param value Group的值
*/
FunctionBar.prototype.createGroup = function(text, value)
{
	var group = new Group(text, value);
	group.barObj = this;

	return group;
}

/**
* 创建一个item
* param text Item的文字描述
* param value Item的值
*/
FunctionBar.prototype.createItem = function(text, value)
{
	var item = new Item(text, value);

	return item;
}
