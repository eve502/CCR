// 
//  auth.js
//  LA
//  
//  Created by admin on 2011-09-06.
//  Copyright 2011 admin. All rights reserved.
// 


// auth

var auth_tabgroup = Titanium.UI.createTabGroup({
	//backgroundColor:'#369',
	//zIndex:3
})


// 登录窗口
var login_win = Titanium.UI.createWindow({
    title:L('account_sign_in'),
    //tabBarHidden:true,
    navBarHidden:true,
    tabBarHidden:true,
    auth_tabgroup:auth_tabgroup,
    url:'Views/Account/_signIn.js'
})
var loginTab = Titanium.UI.createTab({
    title:L('login'),
    window:login_win
})
auth_tabgroup.addTab(loginTab)

// 新注册窗口
var account_win = Titanium.UI.createWindow({
    title:L('new_account'),
    url:'Views/Account/_signUp.js'
})
/*
var accountTab = Titanium.UI.createTab({
    title:L('new_account'),
    window:account_win
})
auth_tabgroup.addTab(accountTab)
*/

// 显示窗体
auth_tabgroup.opacity = 0
auth_tabgroup.open({opacity:1, duration:200})



