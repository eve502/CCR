/*
 * author ：eve by 2013-5-30
 * user list page 
 */

//左侧关闭窗口的按钮
var close = Titanium.UI.createButton({
	title:'课程',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
win.setLeftNavButton(close);

close.addEventListener('click', function()
{
	win._tabGroup.close();
	win._parent.close();
	win._parent._parent._parent._parent.show();
});	


//右上角按钮, 点击弹窗选择联系
//班级成员列表
var user_data = [
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
	data:user_data
});

//班级成员列表弹窗
var rightButton = Ti.UI.createButton({title: L('btn_close')});
rightButton.addEventListener('click', function(e){
    popover.hide();
});

var popover = Ti.UI.iPad.createPopover({
    width: 300,
    height: 400,
    title: '班级成员',
    rightNavButton: rightButton
});
popover.add(usr_list);	
//
var qusIcon = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.INFO_DARK
});
qusIcon.addEventListener('click',function(){
	popover.show({ view: qusIcon });
});
win.setRightNavButton(qusIcon);



