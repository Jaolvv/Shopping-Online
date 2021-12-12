
function tick() {
   var hours, minutes, seconds, xfile;
   var intHours, intMinutes, intSeconds;
   var today, theday;
   today = new Date();
   function initArray(){
   this.length=initArray.arguments.length
   for(var i=0;i<this.length;i++)
   this[i+1]=initArray.arguments[i] }
   var d=new initArray(
   " 星期日",
   " 星期一",
   " 星期二",
   " 星期三",
   " 星期四",
   " 星期五",
   " 星期六");
   theday =  [today.getMonth()+1]+"月" +today.getDate()+"日"+""+d[today.getDay()+1];
   intHours = today.getHours();
   intMinutes = today.getMinutes();
   intSeconds = today.getSeconds();
   if (intHours == 0) {
   hours = "12:";
   xfile = " 午夜 ";
   } else if (intHours < 12) {
   hours = intHours+":";
   xfile = " 上午 ";
   } else if (intHours == 12) {
   hours = "12:";
   xfile = " 正午 ";
   } else {
   intHours = intHours - 12
   hours = intHours + ":";
   xfile = " 下午 ";
   }
   if (intMinutes < 10) {
   minutes = "0"+intMinutes+"";
   } else {
   minutes = intMinutes+"";
   }
   if (intSeconds < 10) {
   seconds = "0"+intSeconds+" ";
   } else {
   seconds = intSeconds+" ";
   }
   timeString =hours+minutes+" "+xfile;
   screenTimePhone.innerHTML = timeString;
   bigTime.innerHTML=hours+minutes;
   datePhone.innerHTML=theday;
   theTime=window.setTimeout("tick();", 100);
   valstatu=1;
   }
   window.onload = tick;
