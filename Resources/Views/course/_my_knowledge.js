/**
 * 知识共享页
 */

var win = Ti.UI.currentWindow;

//navBar左侧关闭按钮, 和右侧用户列表弹窗
Ti.include('/Views/userinfo/_usr_list.js');


var label_share = Ti.UI.createLabel({
	text:L('my_knowledge'),
	top:10,
	height:50,
	textAlign:'center'
});

win.add(label_share);
