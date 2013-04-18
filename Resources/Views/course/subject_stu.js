// 
//  subject_stu.js | message
//  CCR
//  
//  Created by eve on 2013-4-7.
//  Copyright 2013 eve. All rights reserved.
//



var setting_sp = {};



// 左侧 主目录
setting_sp.masterWindow = Ti.UI.createWindow({
    title:L('subject'),
    backgroundColor: 'transparent',
    url:'/Views/course/subject_list.js',
});

// 右侧 内容区
setting_sp.detailWindow = Ti.UI.createWindow({
    //backgroundColor: '#DFE2E7',
    //url:'/Views/course/course_list.js',
});


setting_sp.masterNav = Ti.UI.iPhone.createNavigationGroup({
	window:setting_sp.masterWindow
});

setting_sp.detailNav = Ti.UI.iPhone.createNavigationGroup({
	window:setting_sp.detailWindow
});

setting_sp.splitView_win = Titanium.UI.iPad.createSplitWindow({
	masterView:setting_sp.masterNav,
	detailView:setting_sp.detailNav,
	showMasterInPortrait:true,	// popup or portrait
});



Ti.App.addEventListener.addEventListener('app:rowClicked', function(e) {
    setting_sp.splitView_win.setMasterPopupVisible(false);
	setting_sp.splitView_win.setMasterPopupVisible(true);
});

setting_sp.splitView_win.addEventListener('visible', function(e) {
	//if detail view then show button to display master list
	// the framework does this automagically!!
	//pr(e)
	if (e.view == 'detail') {
		e.button.title = "List";
		setting_sp.detailWindow.leftNavButton = e.button;
	}else if (e.view == 'master') {	// popover
		setting_sp.detailWindow.leftNavButton = null;
	}
});

//setting_sp.splitView_win.open();


////////////////////////////////////////////////////////////////////////////////////////

/*
 * 定义<课程列表>tab
 */
var tab_course_win = Ti.UI.createWindow({
	title:L('course'),
	backgroundColor:'#C0C6D1',
	navBarHidden:true,
});
tab_course_win.add(setting_sp.splitView_win);
tab_course = Ti.UI.createTab({
	title:L('course'),
	icon:'/images/icon/ico_cloud.png',
	window:tab_course_win
});

setting_sp.masterWindow.sp_win = setting_sp;



