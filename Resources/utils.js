// 
//  utils.js
//  LA
//  
//  Created by eve on 2013-4-7.
//  Copyright 2013 eve. All rights reserved.
// 

var Model = {};				// 数据库操作
//Ti.include('lib/database.js');
//Ti.include('model/user.js');

//
// Create main view
//


initMainView = function(logined_account) {
	
	//pr(Ti.Locale.currentCountry)	// <null>	(android: US)
	pr(Ti.Locale.currentLanguage)	// en zh-Hans zh-Hant
	//pr(Ti.Locale.currentLocale)	// en-US	[android-only]
	
	// 读取自本地数据库
	//var user = Model.User.getCurrentUser('tlifedu');
	
	
	//登录状态
	APP.logined = true;
	
	/*
	if(user.access_key && user.access_secret){
		APP.logined = true;
		Titanium.App.Properties.setList('account', [user]);	// 记录当前登录的用户 备用
		// Titanium.App.Properties.getList('account')[0] 
	}
	*/
	
	if(!APP.logined){
		// open auth_tabgroup
		// 登录
		Ti.include('/Views/Account/auth.js');
	}else if(APP.showWelcomeScreen){
		// open welcome_win
		// 欢迎屏 用于新功能介绍
		Ti.include('/Views/main_window/welcome.js')
	}else{
		// open APP.tabGroup
		// 主视图 (包含所有功能入口)
		Ti.include('/Views/main_window/main.js')
		//Ti.include('main_window/test.js')
	}
	
}	


// 登录成功后 触发 grantEntrance 事件
Titanium.App.addEventListener('grantEntrance', function(e){
	Titanium.API.info('in grantEntrance')
	
	// inc tab
	//APP.logined = true
	
	initMainView();
	
})

Titanium.App.addEventListener('close_box_group', function(e){
	mainTabGroup.close();
})




