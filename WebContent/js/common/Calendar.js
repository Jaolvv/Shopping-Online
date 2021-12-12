/**
 * Calendar 1.0
 * @param {object} options
 * @author 谢亮
 */
function Calendar(options){
	
	//是否为IE浏览器;
	var msie = jQuery.browser.msie && typeof window['XMLHttpRequest'] != "object";
	
	//图片的路径;
	var imgPath = 'images/common/calendar/';
	
	//保存12个月的字符串;
	var monthArray = ['1月 ','2月 ','3月 ','4月 ','5月 ','6月 ','7月 ','8月 ','9月 ','10月 ','11月 ','12月 '];
	
	//保存一周7天的字符串;
	var dayArray = ['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一','&nbsp;&nbsp;二','&nbsp;&nbsp;三','&nbsp;&nbsp;四','&nbsp;&nbsp;五','&nbsp;&nbsp;六','&nbsp;&nbsp;日'];
	
	//保存“周”;
	var weekString = '周';
	
	//保存今天;
	var todayString = '今天';
	
	//保存12个月每月的天数;
	var daysInMonthArray = [31,28,31,30,31,30,31,31,30,31,30,31];
	
	//当前的年份;
	var currentYear;
	
	//当前的月份;
	var currentMonth;
	
	//当前的天;
	var currentDate;
	
	//选择的年;
	var year;
	
	//选择的月;
	var month;
	
	//选择的日;
	var date;
	
	//返回的日期;
	var returnDate;
	
	//返回的日期的字符串
	var returnDateStr;

	//选中项颜色;
	var selectBoxHighlightColor = '#D60808';
	
	//左边周数背景色;
	var selectBoxRolloverBgColor = '#E2EBED';
	
	//日历对象;
	var calendarObj = {};
	
	//是否存在;
	var isExist = false;
	
	//标志鼠标是否在年移动符号上
	var flag = false;
	
	//默认的选项;
	var optionsDefaults = {
		format:'yyyy-MM-dd',		//接收和返回的时间格式;
		curDate:null,				//接收传入的时间参数字符串;
		clearDateText:'清除',		//配置清除按钮上显示的文字;
		showClearDate:true,			//是否显示清除按钮;
		displayForm:1,				//为1的时候，显示位置跟随鼠标而定;为2的时候，需要指定显示位置，;
		position:[0,0],				//保存显示位置;
		onClear:null,				//清空的回调函数，无返回值;
		onClose:null,				//关闭的回调函数, 返回值true，运行关闭，false表示不允许关闭;
		onChange:null,				//function(oldDate, newDate)选中了某个日期的回调函数，true表示接受，FALSE表示不接收;
		onYearChange:null,			//function(oldYear, newYear)年份选择变化的回调函数，true接收，false表示不接收;
		onMonthChange:null,			//function(oldMonth, newMonth)月份选择变化的回调函数，true接收，false表示不接收;
		onSelectToday:null,			//选中当天的回调函数，无返回值;
		onSelect:null				//选择日期的回调函数;
	}
	
	/**
	 * 功能：合并默认的选项和传入的选项
	 */
	var processOpts = function(){
		calendarObj.opts = jQuery.extend({},optionsDefaults,options);
	}
	
	/**
	 * 功能：取得当前的年，月，日
	 */
	var getCurrentDate = function(){
		var d = new Date();
		currentYear = d.getFullYear();
		currentMonth = d.getMonth()+1;
		currentDate = d.getDate();
	}

	/**
	 * 功能：工具方法;
	 */
	var _getInt = function(str,i,minlength,maxlength) {
	    for (var x=maxlength; x>=minlength; x--) {
	        var token=str.substring(i,i+x);   
	        if (token.length < minlength) { return null; }   
	        if (_isInteger(token)) { return token; }   
	        }   
	    return null;   
    }  
	
	var _isInteger = function(val) {   
	    var digits="1234567890";   
	    for (var i=0; i < val.length; i++) {   
	        if (digits.indexOf(val.charAt(i))==-1) { 
					return false; 
				}   
	        }   
	    return true;   
    } 
	
	/**
	 * 功能：根据格式字符串解析时间字符串
	 */
	var getDateFromFormat = function (val,format) {   
	    val=val+"";   
	    format=format+"";   
	    var i_val=0;   
	    var i_format=0;   
	    var c="";   
	    var token="";   
	    var token2="";   
	    var x,y;   
	    var now=new Date();   
	    var year=now.getYear();   
	    var month=now.getMonth()+1;   
	    var date=1;   
	    var hh=now.getHours();   
	    var mm=now.getMinutes();   
	    var ss=now.getSeconds();   
	    var ampm="";   
	       
	    while (i_format < format.length) {   
	        // Get next token from format string   
	        c=format.charAt(i_format);   
	        token="";   
	        while ((format.charAt(i_format)==c) && (i_format < format.length)) {   
	            token += format.charAt(i_format++);   
	            }   
	        // Extract contents of value based on format token   
	        if (token=="yyyy" || token=="yy" || token=="y") {   
	            if (token=="yyyy") { x=4;y=4; }   
	            if (token=="yy")   { x=2;y=2; }   
	            if (token=="y")    { x=2;y=4; }   
	            year=_getInt(val,i_val,x,y);   
	            if (year==null) { return 0; }   
	            i_val += year.length;   
	            if (year.length==2) {   
	                if (year > 70) { year=1900+(year-0); }   
	                else { year=2000+(year-0); }   
	                }   
	            }   
	        else if (token=="MMM"||token=="NNN"){   
	            month=0;   
	            for (var i=0; i<MONTH_NAMES.length; i++) {   
	                var month_name=MONTH_NAMES[i];   
	                if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {   
	                    if (token=="MMM"||(token=="NNN"&&i>11)) {   
	                        month=i+1;   
	                        if (month>12) { month -= 12; }   
	                        i_val += month_name.length;   
	                        break;   
	                        }   
	                    }   
	                }   
	            if ((month < 1)||(month>12)){return 0;}   
	            }   
	        else if (token=="EE"||token=="E"){   
	            for (var i=0; i<DAY_NAMES.length; i++) {   
	                var day_name=DAY_NAMES[i];   
	                if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {   
	                    i_val += day_name.length;   
	                    break;   
	                    }   
	                }   
	            }   
	        else if (token=="MM"||token=="M") {   
	            month=_getInt(val,i_val,token.length,2);   
	            if(month==null||(month<1)||(month>12)){return 0;}   
	            i_val+=month.length;}   
	        else if (token=="dd"||token=="d") {   
	            date=_getInt(val,i_val,token.length,2);   
	            if(date==null||(date<1)||(date>31)){return 0;}   
	            i_val+=date.length;}   
	        else if (token=="hh"||token=="h") {   
	            hh=_getInt(val,i_val,token.length,2);   
	            if(hh==null||(hh<1)||(hh>12)){return 0;}   
	            i_val+=hh.length;}   
	        else if (token=="HH"||token=="H") {   
	            hh=_getInt(val,i_val,token.length,2);   
	            if(hh==null||(hh<0)||(hh>23)){return 0;}   
	            i_val+=hh.length;}   
	        else if (token=="KK"||token=="K") {   
	            hh=_getInt(val,i_val,token.length,2);   
	            if(hh==null||(hh<0)||(hh>11)){return 0;}   
	            i_val+=hh.length;}   
	        else if (token=="kk"||token=="k") {   
	            hh=_getInt(val,i_val,token.length,2);   
	            if(hh==null||(hh<1)||(hh>24)){return 0;}   
	            i_val+=hh.length;hh--;}   
	        else if (token=="mm"||token=="m") {   
	            mm=_getInt(val,i_val,token.length,2);   
	            if(mm==null||(mm<0)||(mm>59)){return 0;}   
	            i_val+=mm.length;}   
	        else if (token=="ss"||token=="s") {   
	            ss=_getInt(val,i_val,token.length,2);   
	            if(ss==null||(ss<0)||(ss>59)){return 0;}   
	            i_val+=ss.length;}   
	        else if (token=="a") {   
	            if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}   
	            else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}   
	            else {return 0;}   
	            i_val+=2;}   
	        else {   
	            if (val.substring(i_val,i_val+token.length)!=token) {return 0;}   
	            else {i_val+=token.length;}   
	            }   
	        }   
	    // If there are any trailing characters left in the value, it doesn't match   
	    if (i_val != val.length) { return 0; }   
	    // Is date valid for month?   
	    if (month==2) {   
	        // Check for leap year   
	        if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year   
	            if (date > 29){ return 0; }   
	            }   
	        else { if (date > 28) { return 0; } }   
	        }   
	    if ((month==4)||(month==6)||(month==9)||(month==11)) {   
	        if (date > 30) { return 0; }   
	        }   
	    // Correct hours value   
	    if (hh<12 && ampm=="PM") { hh=hh-0+12; }   
	    else if (hh>11 && ampm=="AM") { hh-=12; }   
	    var newdate=new Date(year,month-1,date,hh,mm,ss);   
	    return newdate;   
    }   

	/**
	 * 功能：设置当前选择的日期
	 */
	var setSelectDate = function(){
		var dateFormat = calendarObj.opts.format;
		var parametersDate = calendarObj.opts.curDate;
		var time;
		if(parametersDate != null&&parametersDate.length>0){
			time = getDateFromFormat(parametersDate,dateFormat);
		}else{
			time = new Date();
		}

		year = time.getFullYear();
		month = time.getMonth()+1;
		date = time.getDate();

	}
	
	/**
	 * 功能：处理闰年问题
	 */
	var processLeapYear = function(inputYear){
		if(inputYear % 400 == 0 || inputYear % 4 == 0 && inputYear % 100 != 0){
			daysInMonthArray[1] = 29;
		}
	}

	/**
	 * 功能：创建日历的主DIV
	 */
	var createCalendarDiv = function(){
		calendarObj.calendarDiv = jQuery('<div>')
					.attr('id','calendarDiv')
					.addClass('calendarDiv');
		calendarObj.calendarDiv.appendTo('body');
	}
	
	/**
	 * 功能：创建顶部工具栏
	 */
	var createTopBar = function(){
		//生成顶部工具栏;
		calendarObj.topBar = jQuery('<div>');
		calendarObj.topBar
			.addClass('topBar')
			.attr('id','topBar')
			.appendTo(calendarObj.calendarDiv);
		
		//生成年选择框;
		calendarObj.yearDiv = jQuery('<div>');
		calendarObj.yearDiv.addClass('selectBox');
		calendarObj.yearDiv.attr('id','yearSelect');
		calendarObj.yearDiv.css('width','55px');
		//生成年份的字符串部分;
		var span = jQuery('<span>');
		span.html(year);
		span.attr('id','calendar_year_txt');
		span.appendTo(calendarObj.yearDiv);
		//生成年份的下拉图片;
		var img = jQuery('<img>');
		img.attr('src',imgPath+'down.gif');
		img.css({position:'absolute',right:'0px'});
		img.appendTo(calendarObj.yearDiv);
		//将年份选择框加到topBar上;
		calendarObj.yearDiv.appendTo(calendarObj.topBar);
		
		//生成月份选择框;
		calendarObj.monthDiv = jQuery('<div>');
		calendarObj.monthDiv.addClass('selectBox');
		calendarObj.monthDiv.attr('id','monthSelect');
		calendarObj.monthDiv.css('width','60px');
		//生成月份的字符串部分;
		var span = jQuery('<span>');
		span.html(monthArray[month-1]);
		span.attr('id','calendar_month_txt');
		span.appendTo(calendarObj.monthDiv);
		//生成月份的下拉图片上;
		var img = jQuery('<img>');
		img.attr('src',imgPath+'down.gif');
		img.css({position:'absolute',right:'0px'});
		img.appendTo(calendarObj.monthDiv);
		//将月份选择框追加到topBar上;
		calendarObj.monthDiv.appendTo(calendarObj.topBar);
		
		//生成月份上图片;
		calendarObj.leftDiv = jQuery('<div>');
		calendarObj.leftDiv.css({
									marginLeft:'10px',
									marginRight:'1px'
								})
							.attr('id','leftDivImg');
		
		var img = jQuery('<img>');
		img.attr('src',imgPath+'left_n.gif');
		img.appendTo(calendarObj.leftDiv);
		calendarObj.leftDiv.appendTo(calendarObj.topBar);
		
		//生成月份下图片
		calendarObj.rightDiv = jQuery('<div>');
		calendarObj.rightDiv.css({
									marginLeft:'1px',
									marginRight:'1px'
								})
							.attr('id','rightDivImg');
		
		var img = jQuery('<img>');
		img.attr('src',imgPath+'right_n.gif');
		img.appendTo(calendarObj.rightDiv);
		calendarObj.rightDiv.appendTo(calendarObj.topBar);
		
		//创建关闭按钮
		calendarObj.closeImg = jQuery('<img>');
		calendarObj.closeImg.attr('src',imgPath+'close.gif')
							.css('float','right')
							.attr('id','closeImg')
							.appendTo(calendarObj.topBar);
	}
	
	/**
	 * 功能：创建年的下拉列表
	 */
	var createYearDropDown = function(){
		//创建年下拉列表的DIV
		var yearDropDown = jQuery('<div>');	
		yearDropDown.attr('id','yearDropDown')
					.addClass('monthYearPicker')
					.css({
						left:'3px',
						width:'40px'
					});
		yearDropDown.appendTo(calendarObj.calendarDiv);
		
		var d = new Date();
		if(year){
			d.setFullYear(year);	
		}
		var startYear = d.getFullYear()/1 - 5;
		var subDiv = jQuery('<div>');
		subDiv.html('&nbsp;&nbsp;- ');	
		subDiv.attr('id','decButton');	
		subDiv.css('cursor','pointer');
		subDiv.appendTo(yearDropDown);
		for(var no=startYear;no<(startYear+10);no++){
			var subDiv = jQuery('<div>');
			subDiv.html(no);		
			subDiv.attr('id','yearDiv' + no);
			subDiv.addClass('div');	
			subDiv.appendTo(yearDropDown);
			if(year && year==no){
				subDiv.css('color',selectBoxHighlightColor);
				subDiv.addClass('activeYear');
			}			
		}
		var subDiv = jQuery('<div>');
		subDiv.html('&nbsp;&nbsp;+ ');
		subDiv.attr('id','addButton');
		subDiv.css('cursor','pointer');
		subDiv.appendTo(yearDropDown);
	}
	
	/**
	 * 功能：创建月的下拉列表
	 */
	var createMonthDropDown = function(){
		//创建月下拉列表的DIV
		var monthDropDown = jQuery('<div>');
		monthDropDown.attr('id','monthDropDown')
					.addClass('monthYearPicker')
					.css({
						left:'50px',
						width:'50px'
					});
		monthDropDown.appendTo(calendarObj.calendarDiv);
		
		//添加选择项
		for(var i = 0;i < monthArray.length ;i++){
			var month1 = jQuery('<div>')
			month1.html(monthArray[i]);
			month1.attr('id','monthDiv'+(i+1));
			month1.attr('params',i+1);
			month1.addClass('div');
			month1.appendTo(monthDropDown);
			if(month == i+1){
				month1.css('color',selectBoxHighlightColor);
				month1.addClass('activeMonth');
			}
		}
	}
	
	/**
	 * 功能：创建日历主体部分
	 */
	//工具方法，得到周
	var getWeek = function(_year,_month,_day){
		var day = _day/1;
		var year = _year /1;
	    var month = _month/1 + 1; //use 1-12
	    var a = Math.floor((14-(month))/12);
	    var y = year+4800-a;
	    var m = (month)+(12*a)-3;
	    var jd = day + Math.floor(((153*m)+2)/5) + 
	                 (365*y) + Math.floor(y/4) - Math.floor(y/100) + 
	                 Math.floor(y/400) - 32045;      // (gregorian calendar)
	    var d4 = (jd+31741-(jd%7))%146097%36524%1461;
	    var L = Math.floor(d4/1460);
	    var d1 = ((d4-L)%365)+L;
	    NumberOfWeek = Math.floor(d1/7) + 1;
	    return NumberOfWeek;        
	}
	//创建日历主体部分
	var createCalendarContent = function(){
		if(calendarObj.calendarContentDiv){
			calendarObj.calendarContentDiv.remove();
		}
		calendarObj.calendarContentDiv = jQuery('<div>');
		calendarObj.calendarContentDiv.attr('id','calendarContentDiv');
		calendarObj.calendarContentDiv.appendTo(calendarObj.calendarDiv);
		
		month = month/1;
		var d = new Date();
		d.setFullYear(year);
		d.setDate(1);
		d.setMonth(month-1);
		var dayStartOfMonth = d.getDay();
		if(dayStartOfMonth==0)dayStartOfMonth=7;
		dayStartOfMonth--;
		
		//创建表格
		var calTable = document.createElement('TABLE');
		calTable.cellSpacing = '0';
		calendarObj.calendarContentDiv.append(calTable);
		var calTBody = document.createElement('TBODY');
		calTable.appendChild(calTBody);
		var row = calTBody.insertRow(-1);
		var cell = row.insertCell(-1);
		cell.innerHTML = weekString;
		cell.style.backgroundColor = selectBoxRolloverBgColor;
		for(var no=0;no<dayArray.length;no++){
			var cell = row.insertCell(-1);
			cell.innerHTML = dayArray[no]; 
		}
		var row = calTBody.insertRow(-1);
		var cell = row.insertCell(-1);
		cell.style.backgroundColor = selectBoxRolloverBgColor;
		var week = getWeek(year,month-1,1);
		cell.innerHTML = week;		// Week
		for(var no=0;no<dayStartOfMonth;no++){
			var cell = row.insertCell(-1);
			cell.innerHTML = '&nbsp;';
		}
		var colCounter = dayStartOfMonth;
		processLeapYear(year);
		var daysInMonth = daysInMonthArray[month-1];
		for(var no=1;no<=daysInMonth;no++){
			d.setDate(no-1);
			if(colCounter>0 && colCounter%7==0){
				var row = calTBody.insertRow(-1);
				var cell = row.insertCell(-1);
				var week = getWeek(year,month-1,no);
				cell.innerHTML = week;		// Week		
				cell.style.backgroundColor = selectBoxRolloverBgColor;	
			}
			var cell = row.insertCell(-1);
			
			if(no==date){
				jQuery(cell).addClass('activeDay');
			}
			jQuery(cell).html(no);
			jQuery(cell).attr('params',no);
			jQuery(cell).addClass('dateCell');
			colCounter++;
		}
		
		jQuery('#calendarContentDiv td').css('font-size','9pt');
	}
	
	/**
	 * 功能：创建日历底部
	 */
	var createBottomBar = function(){
		calendarObj.bottomBar = jQuery('<div>');
		calendarObj.bottomBar.attr('id','bottomBar')
					.addClass('todaysDate')
					.css({
						cursor:'pointer'
					});
		calendarObj.bottomBar.appendTo(calendarObj.calendarDiv);
		
		var subDiv = jQuery('<span>');
		subDiv.attr('id','todaysDateString');
		subDiv.css({
				width:(calendarObj.calendarDiv.width()-60)+'px'
			})
			.css('float','left');
		
		subDiv.html('今天：'+currentYear+'年'+currentMonth+'月'+currentDate+'日');
		
		subDiv.appendTo(calendarObj.bottomBar);
		
		//配置清除按钮
		
		if(calendarObj.opts.showClearDate){
			var clear = jQuery('<span>');
			clear.html(calendarObj.opts.clearDateText)
					.attr('id','clearDateText')
					.css({
						cursor:'pointer',
						color:'red',
						textAlign:'center'
					})
					.css('float','right');
			clear.appendTo(calendarObj.bottomBar);
		}
	}

	/**
	 * 功能：初始化日历控件
	 */
	this.init = function(){
		if(jQuery('#calendarDiv').attr('id') != null){
			isExist = true;
			return;
		}
		processOpts();
		getCurrentDate();
		setSelectDate();
		createCalendarDiv();
		createTopBar();
		createYearDropDown();
		createMonthDropDown();
		createCalendarContent();
		createBottomBar();
	}
	
	/**
	 * 功能：鼠标移到或移除年选择按钮上，高亮显示或不高亮显示年选择按钮
	 */
	var highLightYearDrop = function(){
		if(calendarObj.yearDiv.hasClass('selectBox')){
			calendarObj.yearDiv.removeClass('selectBox');
			calendarObj.yearDiv.addClass('selectBoxOver');
			jQuery('#yearSelect>img').attr('src',imgPath+'down_over.gif');
		}else{
			calendarObj.yearDiv.removeClass('selectBoxOver');
			calendarObj.yearDiv.addClass('selectBox');
			jQuery('#yearSelect>img').attr('src',imgPath+'down.gif');
		}
	}
	
	/**
	 * 功能：鼠标移动到或移除月选择按钮上，高亮显示或不高亮显示月选择按钮
	 */
	var highLightMonthDrop = function(){
		if(calendarObj.monthDiv.hasClass('selectBox')){
			calendarObj.monthDiv.removeClass('selectBox');
			calendarObj.monthDiv.addClass('selectBoxOver');
			jQuery('#monthSelect>img').attr('src',imgPath+'down_over.gif');
		}else{
			calendarObj.monthDiv.removeClass('selectBoxOver');
			calendarObj.monthDiv.addClass('selectBox');
			jQuery('#monthSelect>img').attr('src',imgPath+'down.gif');
		}
	}
	
	/**
	 * 功能：高亮显示上月按钮
	 */
	var highLightLeft = function(){
		var img = jQuery('#leftDivImg>img');
		if(img.attr('src') == imgPath+'left_n.gif'){
			img.attr('src',imgPath+'left_over.gif');
		}else{
			img.attr('src',imgPath+'left_n.gif');
		}
	}
	
	/**
	 * 功能：高亮显示下月按钮
	 */
	var highLightRight = function(){
		var img = jQuery('#rightDivImg>img');
		if(img.attr('src') == imgPath+'right_n.gif'){
			img.attr('src',imgPath+'right_over.gif');
		}else{
			img.attr('src',imgPath+'right_n.gif');
		}
	}
	
	/**
	 * 功能：高亮显示关闭按钮
	 */
	var highlightClose = function(){
		if(calendarObj.closeImg.attr('src')==imgPath+'close.gif'){
			calendarObj.closeImg.attr('src',imgPath+'close_over.gif');
		}else{
			calendarObj.closeImg.attr('src',imgPath+'close.gif');
		}
	}
	
	/**
	 * 功能：显示年下拉列表
	 */
	var displayYearDropDown = function(){
		var yearDropDown = jQuery('#yearDropDown');
		var monthDropDown = jQuery('#monthDropDown');
		if(yearDropDown.css('display') == 'none'){
			yearDropDown.css('display','block');
		}else{
			yearDropDown.css('display','none');
		}
		monthDropDown.css('display','none');
	}
	
	/**
	 * 功能：显示月下拉列表
	 */
	var displayMonthDropDown = function(){
		var yearDropDown = jQuery('#yearDropDown');
		var monthDropDown = jQuery('#monthDropDown');
		if(monthDropDown.css('display') == 'none'){
			monthDropDown.css('display','block');
		}else{
			monthDropDown.css('display','none');
		}
		yearDropDown.css('display','none');
	}
	
	/**
	 * 功能：鼠标移到和移出年下拉列表上
	 */
	var highLightYearDropDown = function(_div){
		if(_div.hasClass('monthYearActive')){
			_div.removeClass('monthYearActive');
		}else{
			_div.addClass('monthYearActive');
		}
	}

	/**
	 * 功能：更新年
	 */
	var updateYear = function(_div){
		//得到所有年选项的DIV
		var yearArray = jQuery('#yearDropDown > div');
		jQuery('.activeYear').css('color','')
								.removeClass('activeYear');
		
		if(_div.attr('id') == 'decButton'){
			var startYear = jQuery(yearArray.get(1)).html()/1 -1;
		}else{
			var startYear = jQuery(yearArray.get(1)).html()/1 +1;
		}
		for(var no=1;no<yearArray.length-1;no++){
			jQuery(yearArray.get(no)).html(startYear+no-1);	
			jQuery(yearArray.get(no)).attr('id','yearDiv' + (startYear/1+no/1-1));
			if(year == startYear+no-1){
				jQuery(yearArray.get(no)).css('color',selectBoxHighlightColor)
											.addClass('activeYear');
			}
		}
		
	}
	
	/**
	 * 功能：更新月
	 */
	var updateMonth = function(){
		jQuery('.activeMonth').css('color','')
								.removeClass('activeMonth');
		jQuery('#monthDropDown>div').each(function(){
			if(jQuery(this).attr('params') == month){
				jQuery(this).css('color',selectBoxHighlightColor)
							.addClass('activeMonth');
			}
		});
	}
	
	/**
	 * 功能：向下翻月
	 */
	var addMonth = function(){
		if(month+1 < 13){
			month = month + 1;
			jQuery('#monthSelect>span').html(month+'月');
		}else{
			month = 1;
			jQuery('#monthSelect>span').html(month+'月');
			year = year + 1;
			jQuery('#yearSelect>span').html(year);
		}
		jQuery('#yearDropDown').hide();
		jQuery('#monthDropDown').hide();
		updateContent();
	}
	
	/**
	 * 功能：向上翻月
	 */
	var decMonth = function(){
		if(month-1 > 0){
			month = month - 1;
			jQuery('#monthSelect>span').html(month+'月');
		}else{
			month = 12;
			jQuery('#monthSelect>span').html(month+'月');
			year = year - 1;
			jQuery('#yearSelect>span').html(year);
		}
		jQuery('#yearDropDown').hide();
		jQuery('#monthDropDown').hide();
		updateContent();
	}
	
	/**
	 * 功能：更新控件主体内容
	 */
	var updateContent = function(){
		createCalendarContent();
		//选择日
		jQuery('#calendarContentDiv .dateCell').each(function(){
			var temp = jQuery(this);
			temp.click(function(){
				selectDate(temp);
				hideCalendar();
			});
		});
	}
	
	/**
	 * 功能：选择年
	 */
	var selectYear = function(_div){
		var temp = true;
		if(jQuery.isFunction(calendarObj.opts.onYearChange)){
			temp = calendarObj.opts.onYearChange.apply(this,[year,_div.html()]);
		}
		if(temp){
			year = _div.html();
			jQuery('.activeYear').css('color','')
									.removeClass('activeYear');
			jQuery('#yearDropDown>div').each(function(){
				if(jQuery(this).html() == year){
					jQuery(this).css('color',selectBoxHighlightColor)
								.addClass('activeYear');
				}
			});
			jQuery('#yearSelect>span').html(year);
			updateContent();
		}
		jQuery('#yearDropDown').css('display','none');
	}
	
	/**
	 * 功能：选择月
	 */
	var selectMonth = function(_div){
		var temp = true;
		if(jQuery.isFunction(calendarObj.opts.onMonthChange)){
			temp = calendarObj.opts.onMonthChange.apply(this,[month,_div.attr('params')]);
		}
		if(temp){
			month = _div.attr('params')/1;
			jQuery('#monthDropDown').css('display','none');
			jQuery('#monthSelect>span').html(month+'月');
			updateContent();
		}
		updateMonth();
	}
	
	/**
	 * 功能：选择日期
	 */
	var selectDate = function(_td){
		var temp = true;
		if(jQuery.isFunction(calendarObj.opts.onChange)){
			temp = calendarObj.opts.onChange.apply(this,[date,_td.attr('params')]);
		}
		if(temp){
			var temp = _td.attr('params');
			jQuery('#calendarContentDiv .activeDay').removeClass('activeDay');
			date = temp;
			_td.addClass('activeDay');
		}
		returnDate = new Date(year,month-1,date);
		var temp = returnDate.getMonth();
		//用于返回选择日期的回调函数
		returnDateStr = formatDate(returnDate,calendarObj.opts.format);
		if(jQuery.isFunction(calendarObj.opts.onSelect)){
			calendarObj.opts.onSelect.apply(this,[returnDateStr]);
		}
	}
	
	/**
	 * 功能：选择当前日期
	 */
	var getToday = function(){
		returnDate = new Date(currentYear,currentMonth-1,currentDate);
		returnDateStr = formatDate(returnDate,calendarObj.opts.format);
		if(jQuery.isFunction(calendarObj.opts.onSelectToday)){
			calendarObj.opts.onSelectToday.apply(this,[returnDateStr]);
		}
	}
	
	/**
	 * 功能：清除日期
	 */
	var clearDate = function(){
		if(jQuery.isFunction(calendarObj.opts.onClear)){
			calendarObj.opts.onClear.apply(this);
		}
	}
	
	/**
	 * 功能：格式化日期
	 */
	var formatDate = function(_date,_format){
		 var str = _format; 
		 var Week = ['日','一','二','三','四','五','六'];
		 
		 str=str.replace(/yyyy|YYYY/,_date.getFullYear()); 
		 str=str.replace(/yy|YY/,(_date.getYear() % 100)>9?(_date.getYear() % 100).toString():'0' + (_date.getYear() % 100)); 
		 
		 str=str.replace(/MM/,(_date.getMonth()+1)>9?(_date.getMonth()+1).toString():'0' + (_date.getMonth()+1)); 
		 str=str.replace(/M/g,_date.getMonth()+1); 
		 
		 str=str.replace(/w|W/g,Week[_date.getDay()]); 
		 
		 str=str.replace(/dd|DD/,_date.getDate()>9?_date.getDate().toString():'0' + _date.getDate()); 
		 str=str.replace(/d|D/g,_date.getDate()); 
		 
		 str=str.replace(/hh|HH/,_date.getHours()>9?_date.getHours().toString():'0' + _date.getHours()); 
		 str=str.replace(/h|H/g,_date.getHours()); 
		 
		 str=str.replace(/mm/,_date.getMinutes()>9?_date.getMinutes().toString():'0' + _date.getMinutes()); 
		 str=str.replace(/m/g,_date.getMinutes()); 
		 
		 str=str.replace(/ss|SS/,_date.getSeconds()>9?_date.getSeconds().toString():'0' + _date.getSeconds()); 
		 str=str.replace(/s|S/g,_date.getSeconds()); 
		 
		 return str; 
	}
	
	/**
	* 功能：根据鼠标点击的位置自动判断显示的位置
	* 参数：鼠标当前的坐标数组
	**/
	var autoShow = function(top,left){
		var containerLeft = left;
		var containerTop = top;
		
		//取得文档的宽和高
		var documentX = jQuery(window).width();
		var documentY = jQuery(window).height();
		
		//取得鼠标当前的坐标
		
		var mouseX = containerLeft;
		var mouseY = containerTop;
		
		//得到当前的容器的大小	
		var divWidth = jQuery('#calendarDiv').width();
		var divHeight = jQuery('#calendarDiv').height();

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
		return [containerTop,containerLeft]
	}
	
	/**
	 * 功能：设置显示位置
	 */
	var setPosition = function(_top,_left){
		calendarObj.calendarDiv.css({
			top:_top,
			left:_left
		})
	}
	
	/**
	 * 功能：绑定事件和时间处理函数
	 */
	var bindEvents = function(){
		//为topBar上的各个按钮添加鼠标经过事件
		calendarObj.yearDiv.mouseover(highLightYearDrop);
		calendarObj.yearDiv.mouseout(highLightYearDrop);
		calendarObj.monthDiv.mouseover(highLightMonthDrop);
		calendarObj.monthDiv.mouseout(highLightMonthDrop);
		calendarObj.leftDiv.mouseover(highLightLeft);
		calendarObj.leftDiv.mouseout(highLightLeft);
		calendarObj.rightDiv.mouseover(highLightRight);
		calendarObj.rightDiv.mouseout(highLightRight);
		calendarObj.closeImg.mouseover(highlightClose);
		calendarObj.closeImg.mouseout(highlightClose);
		//为topBar上的各个按钮添加点击事件
		calendarObj.yearDiv.click(displayYearDropDown);
		calendarObj.monthDiv.click(displayMonthDropDown);
		//当鼠标移到年下拉列表和月下拉列表上的每一项时
		jQuery('.calendarDiv .monthYearPicker .div').each(function(){
			var temp = jQuery(this);
			temp.mouseover(function(){
				highLightYearDropDown(temp);
			});
			temp.mouseout(function(){
				highLightYearDropDown(temp);
			});
		});
		jQuery('#decButton').mouseover(function(){
			highLightYearDropDown(jQuery(this));
			loopYearDec();
		});
		
		jQuery('#decButton').mouseout(function(){
			highLightYearDropDown(jQuery(this));
			loopYearDec();
		});
		jQuery('#addButton').mouseover(function(){
			highLightYearDropDown(jQuery(this));
			loopYearAdd();
		});
		jQuery('#addButton').mouseout(function(){
			highLightYearDropDown(jQuery(this));
		});
		//想上翻月
		jQuery('#rightDivImg').click(addMonth);
		//向下翻月
		jQuery('#leftDivImg').click(decMonth);
		//选择年
		jQuery('#yearDropDown>div').each(function(){
			var temp = jQuery(this);
			if(temp.hasClass('.calendarDiv .monthYearPicker .div')){
				temp.click(function(){
					selectYear(temp);
				});
			}
		});
		//选择月
		jQuery('#monthDropDown>div').each(function(){
			var temp = jQuery(this);
			temp.click(function(){
				selectMonth(temp);
			});
		});
		//选择日
		jQuery('#calendarContentDiv .dateCell').each(function(){
			var temp = jQuery(this);
			temp.click(function(){
				selectDate(temp);
				hideCalendar();
			});
		});
		//选择当天
		jQuery('#todaysDateString').click(function(){
			getToday();
			hideCalendar();
		});
		//清除
		jQuery('#clearDateText').click(function(){
			clearDate();
			hideCalendar();
		});
		jQuery('#calendarDiv').click(function(e){
			if(jQuery.browser.msie)  
				Event.stop(event);
			else
				Event.stop(e);
		})
		//给关闭按钮绑定事件
		jQuery(document).bind('click',hideCalendar);
		jQuery('#closeImg').click(hideCalendar);
	}
	
	/**
	 * 功能：实现年的按时变化
	 */
	var loopYearDec = function(){
		if(jQuery('#decButton').hasClass('monthYearActive')){
			flag = true;
		}else{
			flag = false;
		}
		
		if (flag) {
			updateYear(jQuery('#decButton'));
			setTimeout(loopYearDec, 300);
		}
	}
	var loopYearAdd = function(){
		if(jQuery('#addButton').hasClass('monthYearActive')){
			flag = true;
		}else{
			flag = false;
		}
		
		if (flag) {
			updateYear(jQuery('#addButton'));
			setTimeout(loopYearAdd, 300);
		}
	}
	
	/**
	 * 功能：显示日历控件
	 */
	
	this.show = function(_position){
		if(isExist){
			return;
		}
		var _top;
		var _left;
		if(_position == null){
			_top = calendarObj.opts.position[0];
			_left = calendarObj.opts.positioin[1];
		}else if(calendarObj.opts.displayForm == 2){
			_top = _position[0];
			_left = _position[1];
		}else if(calendarObj.opts.displayForm == 1){
			if (_position.x || _position.y) {
				_top = autoShow(position.y, _position.x)[0];
				_left = autoShow(position.y,position.x)[1];
			}
			else {
				_top = autoShow(_position.pageY,_position.pageX)[0];
				_left = autoShow(_position.pageY,_position.pageX)[1];
			}
		}else{
			alert('选择的显示模式错误！');
			return;
		}
		setPosition(_top,_left);
		bindEvents();
		calendarObj.calendarDiv.show();
	}
	
	/**
	 * 功能：删除元素
	 */
	var remmoveElements = function(){
		jQuery('#calendarDiv').remove();
	}
	
	/**
	 * 功能：静态关闭方法
	 */
	var hideCalendar = function(){
		var temp = true;
		if(jQuery.isFunction(calendarObj.opts.onClose)){
			temp = calendarObj.opts.onClose.apply(this);
		}
		if(temp){
			remmoveElements();
		}
	}
	
	/**
	 * 功能：关闭日历
	 */
	
	this.hide = function(){
		hideCalendar();
	}
	
	/**
	 * 调用初始化函数
	 */
	
	this.init();
}
