// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 

var cur_win = Ti.UI.currentWindow;
cur_win.visible = false;


var win = Ti.UI.createWindow({
	title:cur_win.title,
	_parent:cur_win,
});


/*
 * 当前窗口TabGroup
 */
var c_tab_data = [
	{title:L('course_det'),url:'/Views/course/_course_video.js',icon:'/images/tabs/KS_nav_ui.png'},
	{title:L('course_exer'),url:'/Views/course/_course_exer.js',icon:'/images/tabs/KS_nav_phone.png'},
	{title:L('course_help'),url:'/Views/course/_course_help.js',icon:'/images/tabs/KS_nav_platform.png'},
	{title:L('answer_det'),url:'/Views/course/_answer_det.js',icon:'/images/icon/ico_cloud.png'},
	{title:L('my_knowledge'),url:'/Views/course/_my_knowledge.js',icon:'/images/tabs/KS_nav_mashup.png'},
];

var detailTabGroup = Ti.UI.createTabGroup();

var tabs_len = c_tab_data.length;
for(i=0;i<tabs_len;i++){
	//窗口
	var c_tab_win = Ti.UI.createWindow({
		title:cur_win.title,
		url:c_tab_data[i].url,
		_parent:win,
		_tabGroup:detailTabGroup,
		backgroundColor:'#DFE2E7',
	});
	//Tab
	var c_tab = Ti.UI.createTab({
		title:c_tab_data[i].title,
		icon:c_tab_data[i].icon,
		window:c_tab_win,
	});
	// add Tab to tabgroup
	detailTabGroup.addTab(c_tab);	
}

detailTabGroup.open();

win.add(detailTabGroup);

detailTabGroup.setActiveTab(0);


