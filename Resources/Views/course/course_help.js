/*
 * 学习帮助页
 * params: sid: 问题id
 */

var win = Ti.UI.currentWindow;


var help_type = 0; // 0 - 默认是多题帮助, 1 - 单题帮助

//navBar左侧关闭按钮, 和右侧用户列表弹窗
Ti.include('/Views/userinfo/_usr_list.js');

if(help_type == 0){
	Ti.include('/Views/course/_m_help.js');
}else{
	Ti.include('/Views/course/_s_help.js');
}



