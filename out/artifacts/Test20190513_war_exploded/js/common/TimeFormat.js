/**
*对存在数据库中的用秒来表示的时间进行转换成时分秒的形式在页面上进行显示
*如果date_type不指明时间的类型的话，则做默认的当作秒处理
*/

/**
 * 对指明了时间类型的时候作出的处理
 * @param str 时间的单位
 */
function secondFormat(str){

	//获取表中要进行时间格式转换的列中的所有的值,其中元素属性中必须包含date_type和unit两个属性
	//date_type＝"timeLen"代表的一个标识，证明要进行转换的列
	//unit代表要进行转换的时间的单位 ，其中 “s”代表“秒”，“ms”代表“毫秒”，“m”代表"分钟"
	var objs = jQuery("[date_type="+str+"]");
	
	//判断是否存在此属性，存在的话进行遍历，然后做相应的操作；但是如果不存在，则不做处理
	if(objs.size()>0){
	
	//遍历根据属性所获取的信息
	for(var i=0;i<objs.size();i+=1){

		//获取属性unit的值
		var unit = jQuery(objs[i]).attr('date_type');
			
		//获取该列中的值
		var time = jQuery(objs[i]).html();
		
		//声明三个变量，用作对时间时间进行操作之后返回到页面之中去
		var formatTime;
	
		//根据属性unit的值来判断出时间的格式
		
		//如果单位所秒（“s”）
		if(unit == 's'){
			//声明一个变量，用作接受时间转换之后的结果并返回到页面之中去
			formatTime=formatSecond(time);			
			//将转换后的结果显示到页面上去
			jQuery(objs[i]).html(formatTime)
			
			//清空中间值，防止对下条数据的影响
			formatTime="";			
		}

		//如果单位是毫秒（“ms”）
		else if(unit == "ms"){	
			//现将毫秒转换成秒，以防止直接相除，产生科学计数法而导致得出的最终结果有偏差
			time=parseInt(time/1000);		
			//判断时间转换成小时之后，小时的数字是否为0；如果为0的话，则不显示到页面之中；否则的话，则要进行显示出来
			if(time>0){
			if(parseInt(time/3600)>0){
				var hour = parseInt(time/3600);
				var formatHour=hour+"时";
				formatTime=formatHour;
			}
			//判断时间转换成分钟之后，分钟的数字是否为0；如果为0的话，则不显示到页面之中；否则的话，则要进行显示出来
			if(parseInt(time%3600/60)>0){
				alert(time%3600);
				var min=parseInt(time%3600/60);
				var formatMin=min+"分";
				if(parseInt(time/3600)>0){
					formatTime+=formatMin;
				}
				else{
					formatTime=formatMin;
				}
			}
			//判断时间转换成秒之后，秒的数字是否为0；如果为0 的话，则不显示到页面之中；否则的话，则要进行显示出来
			if(parseInt(time%3600%60)>0){
				var sec=parseInt(time%3600%60);			
				var formatSec=sec+"秒";
				if(parseInt(time/3600)>0||parseInt(time%3600/60)>0){
					formatTime+=formatSec;
				}
				else{
					formatTime=formatSec;
				}
			}
			//对零秒和空值做特殊处理
			if(parseInt(time/3600)==0&&parseInt(time%3600/60)==0){
				if(parseInt(time%3600%60)==0){
					formatTime="0秒";
				}
				if(time==null){
					formatTime="0秒";
				}
			}
			//将转换后的结果显示到页面上去
			jQuery(objs[i]).html(formatTime);
			
			//清空中间值，防止对下条数据的影响
			formatTime="";
			}
			else{
				jQuery(objs[i]).html("0秒");
			}
		}
			
		
		//如果单位是分钟（“m”）
		else if(unit=="m"){
			//判断时间转换成小时之后，小时的数字是否为0；如果为0的话，则不显示到页面之中；否则的话，则要进行显示出来
			if(parseInt(time/60)>0){
				var hour = parseInt(time/60);
				var formatHour=hour+"时";
				formatTime=formatHour;
			}
			if(parseInt(time%60)>0){
				var min=parseInt(time%60);
				var formatMin=min+"分";
				if(parseInt(time/60)>0){
					formatTime+=formatMin;
				}
				else{
					formatTime=formatMin;
				}
			}
			//对零秒和空值做特殊处理
			if(parseInt(time/60)==0){
				if(parseInt(time%60)==0){
					formatTime="0分";
				}
				if(time==null){
					formatTime="0分";
				}
			}
			//将转换后的结果显示到页面上去
			jQuery(objs[i]).html(formatTime);
			//清空中间值，防止对下条数据的影响
			formatTime="";
		}
	}
	}
}
/**
 *  默认情况下做出的处理操作
 */
function secondFormat(){
	//获取表中要进行时间格式转换的列中的所有的值,其中元素属性中必须包含date_type和unit两个属性
	//date_type＝"timeLen"代表的一个标识，证明要进行转换的列
	//unit代表要进行转换的时间的单位 ，其中 “s”代表“秒”，“ms”代表“毫秒”，“m”代表"分钟"
	var objs = jQuery("[date_type]");
	//判断是否存在此属性，存在的话进行遍历，然后做相应的操作；但是如果不存在，则不做处理
	if(objs.size()>0){
	
	//遍历根据属性所获取的信息
	for(var i=0;i<objs.size();i+=1){

		//获取属性unit的值
		var unit = jQuery(objs[i]).attr('date_type');
			
		//获取该列中的值
		var time = jQuery.trim(jQuery(objs[i]).html());
		
		//声明一个变量，用作接受时间转换之后的结果并返回到页面之中去
		var formatTime=formatSecond(time);
		
		//将转换后的结果显示到页面上去
		jQuery(objs[i]).html(formatTime);
		
		//将转换后的结果显示到页面上去
		jQuery(objs[i]).html(formatTime);
		
		//清空中间值，防止对下条数据的影响
		formatTime="";
		}
	}
}

/**
 * 公共方法：对时间为秒时进行的操作
 * @param time 进行格式转换的时间
 * @return format 转换好了之后的格式
*/
function formatSecond(time){
	var format;
	//判断时间转换成小时之后，小时的数字是否为0；如果为0的话，则不显示到页面之中；否则的话，则要进行显示出来
	if(parseInt(time/3600)>0){
		var hour = parseInt(time/3600);
		var formatHour=hour+"时";
		format=formatHour;
	}
	//判断时间转换成分钟之后，分钟的数字是否为0；如果为0的话，则不显示到页面之中；否则的话，则要进行显示出来
	if(parseInt(time%3600/60)>0){
		var min=parseInt(time%3600/60);
		var formatMin=min+"分";
		if(parseInt(time/3600)>0){
			format+=formatMin;
		}
		else{
			format=formatMin;
		}
	}
	//判断时间转换成秒之后，秒的数字是否为0；如果为0 的话，则不显示到页面之中；否则的话，则要进行显示出来
	if(parseInt(time%3600%60)>0){
		var sec=parseInt(time%3600%60);
		var formatSec=sec+"秒";
		if(parseInt(time/3600)>0||parseInt(time%3600/60)>0){
			format+=formatSec;
		}
		else{
			forma=formatSec;
		}
	}
	//对零秒和空值做特殊处理
	if(parseInt(time/3600)==0&&parseInt(time%3600/60)==0){
		if(parseInt(time%3600%60)==0){
			format="0秒";
		}
		if(time==null){
			format="0秒";
		}
	}
	return format;
}
