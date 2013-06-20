// 
//  course.js
//  CCR
//  
//  Created by eve on 2013-4-7.
//  Copyright 2013 eve. All rights reserved.
// 

// 主视图文件

var mainTabGroup = Ti.UI.createTabGroup({
	backgroundColor:'#fff',
	zIndex:3
});

/*
 * 用户设置
 */
Ti.include('/Views/setting/setting.js');


/*
 * 课程别表页 （用户类型判断） 
 */
Ti.include('/Views/course/subject.js');


/*
 * tab group
 */
if(typeof(tab_course)!='undefined'){
	mainTabGroup.addTab(tab_course)
}

if(typeof(tab_setting)!='undefined'){
	mainTabGroup.addTab(tab_setting)
}



// 设置默认显示
//mainTabGroup.setActiveTab(0)

// open tab group
mainTabGroup.open({opacity:1, duration:100})


