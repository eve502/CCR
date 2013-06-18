/*
 * 单题帮助页面 by eve 2013-6-18 
 */

var win = Ti.UI.currentWindow;

var s_help_data = [
	{sid:1,question:'1.买一个本子要8元，有6元4角，还差多少钱？', cont:[
		{user_id:1,user_name:'王晓晓',avatar:'/images/avatar/user.png',answer:'8 - 6.4 = 1.6(元)'},
		{user_id:2,user_name:'李大大',avatar:'/images/avatar/user.png',answer:'8元减去6.4元等于1.6元'},
		{user_id:3,user_name:'张黑黑',avatar:'/images/avatar/user.png',answer:'8元减去6.4元等于1.6元，即1元6角'},
	]}
];

//当前问题描述wrap
var singleHelpWrap = Ti.UI.createView({
	borderRadius:20,
	borderWidth:10,
	borderColor:'#CCC',
	width:720,
	height:120,
	top:20,
	backgroundColor:'#fff',
});		
win.add(singleHelpWrap);

var singleTitle = Ti.UI.createLabel({
	font:{fontSize:20},
	height:100,
});
singleHelpWrap.add(singleTitle);

//表格init
var tb_s_help_data = [];


if(s_help_len < 1){
	singleTitle.text = "暂无数据,可联系同学或老师寻求帮助!";
}else{
	singleTitle.text = s_help_data[0].question;
	//帮助条数
	var s_help_len = s_help_data[0].cont.length;	
	//初始化表格行数据
	for(i=0;i<s_help_len;i++)
	{
		var row = Ti.UI.createTableViewRow({
			hasChild:true,
			height:85,
			backgroundColor:'#fff',
		});	
		
		//用户头像
		var avatar = Ti.UI.createImageView({
			image:s_help_data[0].cont[i].avatar,
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
			text:s_help_data[0].cont[i].user_name,
			top:60,
			left:10,
			font:{fontSize:14},
			width:50,
			textAlign:'center'
		});
		row.add(userNameLabel);
		
		//解答描述
		var row_text = s_help_data[0].cont[i].answer;  
		if(row_text.length > 10)
			row_text =  s_help_data[0].cont[i].answer.substr(0,10) + '...';
		
		var sAnswerLabel = Ti.UI.createLabel({
			text:row_text,
			top:20,
			left:70
		});
		row.add(sAnswerLabel);
		
		tb_s_help_data[i] = row;
	}

	//答案列表
	var sHelpTable = Ti.UI.createTableView({
		data:tb_s_help_data,
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'transparent',
		top:130,
	});
	win.add(sHelpTable);
	
	sHelpTable.addEventListener('click',function(e){
		var index = e.index;
		//Ti.API.info('e.index=' + e.index);
		var w = Ti.UI.createWindow({
			title:L('answer'),
			url:'/Views/course/_help_det.js',
			backgroundColor:'#DFE2E7',
		});
		//打开窗口
		Ti.UI.currentTab.open(w,{animate:true});
	})
}



	
	
	

