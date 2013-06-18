/*
 * 多题帮助页 by eve 2013-6-18
 */
var win = Ti.UI.currentWindow;

var answer_data = {user_id:1,user_name:'王晓晓',avatar:'/images/avatar/user.png',question:'1.买一个本子要8元，有6元4角，还差多少钱？',answer:'8 - 6.4 = 1.6(元)'};


//当前问题描述wrap
var qusWrap = Ti.UI.createView({
	borderRadius:20,
	borderWidth:10,
	borderColor:'#CCC',
	width:720,
	height:120,
	top:20,
	backgroundColor:'#fff',
});		
win.add(qusWrap);

//用户头像
var avatar = Ti.UI.createImageView({
	image:answer_data.avatar,
	width:50,
	height:50,
	top:20,
	left:20,
	borderRadius:10,
	borderWidth:2,
	borderColor:'#DFE2E7',
}); 
qusWrap.add(avatar);

//用户名
var userNameLabel = Ti.UI.createLabel({
	text:answer_data.user_name,
	top:70,
	left:20,
	font:{fontSize:14},
	width:50,
	textAlign:'center'
});
qusWrap.add(userNameLabel);

//问题题目
var qusTitle = Ti.UI.createLabel({
	text:answer_data.question,
	font:{fontSize:20},
	height:'auto',
	left:90,
	top:20,
});
qusWrap.add(qusTitle);

//回答内容边框
var answerWrap = Ti.UI.createView({
	borderRadius:20,
	borderWidth:5,
	borderColor:'#CCC',
	width:700,
	height:500,
	top:160,
	backgroundColor:'#fff',
});		
win.add(answerWrap);

//回答内容
var answerCont = Ti.UI.createLabel({
	text:answer_data.answer,
	font:{fontSize:20},
	top:20,
	left:20
});
answerWrap.add(answerCont);
	


