// 
//  welcome.js
//  LA
//  
//  Created by admin on 2011-09-07.
//  Copyright 2011 admin. All rights reserved.
// 


//
var welcome_win = Ti.UI.createWindow({
	title:L('welcome'),
	backgroundColor:'#fff',
	zIndex:2,
	navBarHidden:true,
	tabBarHidden:true,
	fullscreen:true,
})

var welcome_view_1 = Ti.UI.createView()
var msg = Ti.UI.createLabel({
    //text:"You have successfully logged in. Upon logging in we sent back your email address and your name. You can pass all kinds of data simply by creating objects on your window.\n\nYour email is:\n" + win.email + "\n\nyour name is:\n" + win.name,  
    text:'You are welcome!',
    top:10,  
    left:10,  
    width:300,  
    height:'auto',
})
welcome_view_1.add(msg)



//welcome_win.add(welcome_view_1)

var view_wel_01 = Ti.UI.createView({
	backgroundImage:'/images/wel_01.png',
	width:320,height:480,
	top:0,left:0
})
var view_wel_02 = Ti.UI.createView({
	backgroundImage:'/images/wel_02.png',
	width:320,height:480,
	top:0,left:0
})
var view_wel_blank = Ti.UI.createView({
	backgroundColor:'#fff',
	top:0,left:0
})

var saview = Ti.UI.createScrollableView({
	views:[view_wel_01,view_wel_02,view_wel_blank],
	//showPagingControl:true,
	//pagingControlHeight:20,
	cacheSize:3,		// will render 2 views for cache
})


welcome_win.add(saview)
welcome_win.opacity = 0
welcome_win.open({opacity:1, duration:200})


//var welcomeTab = Ti.UI.createTab()
//APP.tabGroup.addTab(welcomeTab)
//APP.tabGroup.open()


saview.addEventListener('scroll', function(e){
	pr('enent')
	pr(e)
	pr(saview.views.length)
	pr(saview.currentPage)
	//saview.remove = myview
	//saview.currentPage = 1,
	if (saview.currentPage === (saview.views.length-1)) {
		
		pr('show next')
		
		var vv = Ti.UI.createView({
			backgroundColor:'#696',
			width:100,
			height:100,
			opacity:0.5,
		})
		
		
		//welcome_win.add(vv)
				
		APP.showWelcomeScreen = false
		APP.createView()
		setTimeout(welcome_win.close, 50)
		
	}
	//saview.scrollToView = 1
})
