//打开一个新窗口,并且让窗口居中
function opennew(newurl,windowName,width,height)
{
	var returnValue;
	var theLeft,theTop

	theLeft=(screen.width-width)/2-2
	theTop=(screen.height-height)/2
	returnValue = window.open(newurl,windowName,'width='+width+',height='+height+',scrollbars=0,status=0,toolbar=0,resizable=0,left='+theLeft+',top='+theTop+'').focus();
	
	return returnValue;
}

function opennew(newurl,windowName,width,height,scrollbars)
{
	var returnValue;
	var theLeft,theTop

	theLeft=(screen.width-width)/2-2
	theTop=(screen.height-height)/2
	returnValue = window.open(newurl,windowName,'width='+width+',height='+height+',scrollbars='+scrollbars+',status=0,toolbar=0,resizable=0,left='+theLeft+',top='+theTop+'');//.focus();
	returnValue.focus();
	
	return returnValue;
}

//打开一个新窗口并显示工具条
function opennewWithToolbar(newurl,windowName,width,height,scrollbars)
{
	var returnValue;
	var theLeft,theTop

	theLeft=(screen.width-width)/2-2
	theTop=(screen.height-height)/2
	returnValue = window.open(newurl,windowName,'width='+width+',height='+height+',scrollbars='+scrollbars+',status=0,toolbar=1,resizable=0,left='+theLeft+',top='+theTop+'');//.focus();
	returnValue.focus();

	return returnValue;
}

function opennewfull(newurl,windowName)
{
	window.open(newurl,windowName,'width='+screen.width+',height='+(screen.height-55)+',scrollbars=1,toolbar=0,resizable=0,left=0,top=0').focus();
}

function openModal(newUrl,windowName,width,height,controlName)
{
	controlName.value=showModalDialog(newUrl,windowName,"dialogWidth:"+width+";dialogHeight:"+height+";center:1")
}