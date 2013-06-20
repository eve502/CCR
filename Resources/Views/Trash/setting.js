// 
//  main.js | message
//  LA
//  
//  Created by h2o on 2011-09-29.
//  Copyright 2011 h2o. All rights reserved.
//

var setting_sp = {};


// 左侧 主目录
setting_sp.masterWindow = Ti.UI.createWindow({
    title:L('setting'),
    backgroundColor: 'transparent',
    url:'/Views/setting/_master.js',
});

// 右侧 内容区
setting_sp.detailWindow = Ti.UI.createWindow({
    //backgroundColor: '#DFE2E7',
    //url:'/setting/_detail.js',
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

// tab4
var tab_setting_win = Ti.UI.createWindow({
	title:L('setting'),
	//backgroundColor:'#369',
	navBarHidden:true,
})

tab_setting_win.add(setting_sp.splitView_win);

var tab_setting = Ti.UI.createTab({
	title:L('setting'),
	icon:'/images/icon/ico_more.png',
	window:tab_setting_win,
})


setting_sp.masterWindow.sp_win = setting_sp;






