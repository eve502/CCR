/**
 * 知识共享页
 */

var win = Ti.UI.currentWindow;

//navBar左侧关闭按钮, 和右侧用户列表弹窗
Ti.include('/Views/userinfo/_usr_list.js');


/*
 * 单题帮助页面 by eve 2013-6-18 
 */

var win = Ti.UI.currentWindow;

var msg_data = [
	{user_id:1,user_name:'王晓晓',avatar:'/images/avatar/user.png',message:'这个问题是怎么解答的?',orig_msg:''},
	{user_id:2,user_name:'李大大',avatar:'/images/avatar/user.png',message:'请教个问题',orig_msg:''},
	{user_id:3,user_name:'张黑黑',avatar:'/images/avatar/user.png',message:'这个问题解题过程是这样的:',orig_msg:'这个问题是怎么解决的?'},
];

//表格init
var tb_msg_data = [];

//帮助条数
var msg_len = msg_data.length;
//初始化表格行数据
for(i=0;i<msg_len;i++)
{
	var row = Ti.UI.createTableViewRow({
		height:'auto',
		backgroundColor:'#fff',
		rightImage:'/images/icon/ico_message.png',
		text:msg_data[i].user_name,
	});	
	
	//用户头像
	var avatar = Ti.UI.createImageView({
		image:msg_data[i].avatar,
		width:60,
		height:60,
		top:5,
		left:10,
		borderRadius:30,
		borderWidth:2,
		borderColor:'#DFE2E7',
	}); 
	row.add(avatar);
	
	//用户名
	var userNameLabel = Ti.UI.createLabel({
		text:msg_data[i].user_name,
		top:65,
		left:10,
		font:{fontSize:14},
		width:60,
		height:30,
		textAlign:'center'
	});
	row.add(userNameLabel);
	
	//解答描述
	var msgLabel = Ti.UI.createLabel({
		text:msg_data[i].message,
		top:20,
		width:600,
		height:'auto',
		left:80,
	});
	row.add(msgLabel);
	
	if(msg_data[i].orig_msg != ''){
		var oMsgLabel = Ti.UI.createLabel({
			text:'回复: ' + msg_data[i].orig_msg,
			top:60,
			width:600,
			height:'auto',
			left:80,
			backgroundColor:'#DFE2E7',
			borderRadius:5,
		});
		row.add(oMsgLabel);
	}
	
	tb_msg_data[i] = row;
}

//答案列表
var msgTable = Ti.UI.createTableView({
	data:tb_msg_data,
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
	backgroundColor:'transparent',
});
win.add(msgTable);

msgTable.addEventListener('click',function(e){
	var index = e.index;
	
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);
	
	var w = Titanium.UI.createWindow({
		title:e.rowData.text,
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
		
	//打开发送消息窗口
	w.open(a);
});



	
	
	


