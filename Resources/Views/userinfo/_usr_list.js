/*
 * author ：eve by 2013-5-30
 * user list page 
 */

var win = Ti.UI.currentWindow;

//Toolbar
var label = Titanium.UI.createButton({
	title:'班级成员',
	color:'#fff',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var close = Titanium.UI.createButton({
	title:'关闭',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

close.addEventListener('click', function()
{
	Ti.API.info('IN HERE');
	win.close();
});		

// create and add toolbar
var toolbar = Titanium.UI.iOS.createToolbar({
	items:[flexSpace,label,flexSpace,close],
	top:0,
	borderTop:false,
	borderBottom:true
});
win.add(toolbar);	


//班级成员列表
var data = [
	{title:'张子涵', header:'老师'},
	{title:'王萧'},
	{title:'李四'},
	{title:'王晓晓', header:'同学'},
	{title:'赵敏'},
	{title:'刘谦'},
	{title:'刘伟'},
	{title:'明明'},
	{title:'艾晓静'}
	];
	
var usr_list = Ti.UI.createTableView({
	data:data,
	top:43
});

win.add(usr_list);
