setInterval("show_time0.innerHTML=fnDate()",1000);
function fnDate(){
var date=new Date();
var year=date.getFullYear();//当前年份
var month=date.getMonth();//当前月份
var data=date.getDate();//天
var hours=date.getHours();//小时
var minute=date.getMinutes();//分
var second=date.getSeconds();//秒
var time=year+"-"+(month+1)+"-"+data+" "+hours+":"+fnW(minute)+":"+fnW(second);
return time;
}
function fnW(str){
var num;
str>9?num=str:num="0"+str;
return num;
}
// 此数据来源于审计统计 时间
function NewTime(){
    var date = new Date();
    return time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+'&nbsp;2:00:00';
}

$(".bottom-time").children().html(NewTime());