// 
//  main.js | message
//  LA
//  
//  Created by h2o on 2011-09-29.
//  Copyright 2011 h2o. All rights reserved.
//

/*
 * 定义<短信沟通>tab
 */
var tab_setting_win = Ti.UI.createWindow({
	title:L('setting'),
	backgroundColor:'#C0C6D1',
});
tab_setting = Ti.UI.createTab({
	title:L('setting'),
	icon:'/images/icon/ico_more.png',
	window:tab_setting_win
});
var Win = tab_setting_win;

///////////////////////////////////////////


var label1 = Ti.UI.createLabel({
	text:'设置页',
	top:10,
	height:50,
	textAlign:'center'
});

Win.add(label1);






