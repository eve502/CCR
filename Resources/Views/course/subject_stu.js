// 
//  subject_stu.js | message
//  CCR
//  
//  Created by eve on 2013-4-7.
//  Copyright 2013 eve. All rights reserved.
//



var course_sp = {};



// 左侧 主目录
course_sp.masterWindow = Ti.UI.createWindow({
    title:L('subject'),
    backgroundColor: 'transparent',
    url:'/Views/course/subject_list.js',
});

// 右侧 内容区
course_sp.detailWindow = Ti.UI.createWindow({
    //backgroundColor: '#DFE2E7',
    //url:'/Views/course/course_list.js',
});


course_sp.masterNav = Ti.UI.iPhone.createNavigationGroup({
	window:course_sp.masterWindow
});

course_sp.detailNav = Ti.UI.iPhone.createNavigationGroup({
	window:course_sp.detailWindow
});

course_sp.splitView_win = Titanium.UI.iPad.createSplitWindow({
	masterView:course_sp.masterNav,
	detailView:course_sp.detailNav,
	showMasterInPortrait:true,	// popup or portrait
});

//设定course_sp.masterWindow的父级窗口
course_sp.masterWindow._parent =  course_sp.splitView_win;

Ti.App.addEventListener.addEventListener('app:rowClicked', function(e) {
    course_sp.splitView_win.setMasterPopupVisible(true);
	course_sp.splitView_win.setMasterPopupVisible(false);
});

course_sp.splitView_win.addEventListener('visible', function(e) {
	//if detail view then show button to display master list
	// the framework does this automagically!!
	//pr(e)
	if (e.view == 'detail') {
		e.button.title = "List";
		course_sp.detailWindow.leftNavButton = e.button;
	}else if (e.view == 'master') {	// popover
		course_sp.detailWindow.leftNavButton = null;
	}
});

//course_sp.splitView_win.open();


////////////////////////////////////////////////////////////////////////////////////////

/*
 * 定义<课程列表>tab
 */
var tab_course_win = Ti.UI.createWindow({
	title:L('course'),
	backgroundColor:'#C0C6D1',
	navBarHidden:true,
});
tab_course_win.add(course_sp.splitView_win);
tab_course = Ti.UI.createTab({
	title:L('course'),
	icon:'/images/icon/ico_cloud.png',
	window:tab_course_win
});

course_sp.masterWindow.sp_win = course_sp;



