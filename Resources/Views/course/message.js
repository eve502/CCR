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
	{user_id:1,user_name:'王晓晓',avatar:'/images/avatar/user.png',message:'这个问题是怎么解答的?'},
	{user_id:2,user_name:'李大大',avatar:'/images/avatar/user.png',message:'请教个问题'},
	{user_id:3,user_name:'张黑黑',avatar:'/images/avatar/user.png',message:'这个问题解题过程是这样的:'},
];

//表格init
var tb_msg_data = [];

//帮助条数
var msg_len = msg_data.length;	
//初始化表格行数据
for(i=0;i<msg_len;i++)
{
	var row = Ti.UI.createTableViewRow({
		hasChild:true,
		height:85,
		backgroundColor:'#fff',
	});	
	
	//用户头像
	var avatar = Ti.UI.createImageView({
		image:msg_data[i].avatar,
		width:50,
		height:50,
		top:5,
		left:10,
		borderRadius:10,
		borderWidth:2,
		borderColor:'#DFE2E7',
	}); 
	row.add(avatar);
	
	//用户名
	var userNameLabel = Ti.UI.createLabel({
		text:msg_data[i].user_name,
		top:60,
		left:10,
		font:{fontSize:14},
		width:50,
		textAlign:'center'
	});
	row.add(userNameLabel);
	
	//解答描述
	var row_text = msg_data[i].message;
	if(row_text.length > 10)
		row_text =  msg_data[i].message.substr(0,10) + '...';
	
	var msgLabel = Ti.UI.createLabel({
		text:row_text,
		top:20,
		height:'auto',
		left:70,
	});
	row.add(msgLabel);
	
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
	//Ti.API.info('e.index=' + e.index);
	var w = Ti.UI.createWindow({
		title:msg_data[index].user_name,
		//url:'/Views/course/_help_det.js',
		backgroundColor:'#DFE2E7',
	});
	//打开窗口
	Ti.UI.currentTab.open(w,{animate:true});
});



	
	
	


