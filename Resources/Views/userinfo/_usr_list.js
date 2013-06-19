/*
 * author ：eve by 2013-5-30
 * user list page 
 */

//左侧关闭窗口的按钮
var close = Titanium.UI.createButton({
	title:win._parent.title,
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
	
var userTable = Ti.UI.createTableView({
	data:user_data
});
//点击用户,打开发送消息窗口
userTable.addEventListener('click',function(e){
	var index = e.index;
	
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);
	
	var w = Titanium.UI.createWindow({
		title:e.rowData.title,
		backgroundColor:'#FFF',
		url:'/Views/message/send_msg.js',
		height:400,
		width:620,
		transform:t,
		borderWidth:2,
		borderColor:'#999',
		borderRadius: 8,
	});
	
	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;
	
	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({transform:t2, duration:200});

	});
	
	//关闭用户列表窗口
	popover.hide();
		
	//打开发送消息窗口
	w.open(a);
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
popover.add(userTable);	
//
var qusIcon = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.INFO_DARK
});
qusIcon.addEventListener('click',function(){
	popover.show({ view: qusIcon });
});
win.setRightNavButton(qusIcon);



