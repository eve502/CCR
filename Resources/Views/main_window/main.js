// 
//  course.js
//  CCR
//  
//  Created by eve on 2013-4-7.
//  Copyright 2013 eve. All rights reserved.
// 

// 主视图文件

var currentUserType = 0; //当前用户类型， 0 -- 学生， 1 -- 老师
var sHelp_sid = -1; //单一题目帮助的题目id

var mainTabGroup = Ti.UI.createTabGroup({
	backgroundColor:'#fff',
	zIndex:3
});

var currentCourseId = -1; //当前课程id


/*
 * 用户设置
 */
Ti.include('/Views/account/setting.js');


/*
 * 课程别表页 （用户类型判断） 
 */
if(currentUserType == 0){
	//学生课程列表
	Ti.include('/Views/course/subject_stu.js');
	
}else if(currentUserType == 1){
	//学生课程列表
	Ti.include('/Views/course/subject_tch.js');
}

/*
 * 课程详情
 */
Ti.include('/Views/course/course_detail.js');


/*
 * tab group
 */
if(typeof(tab_course)!='undefined'){
	mainTabGroup.addTab(tab_course)
}

if(typeof(tab_setting)!='undefined'){
	mainTabGroup.addTab(tab_setting)
}

//课程详情页面Tabs
if(typeof(tab_course_detail) != 'undefined')
{
	mainTabGroup.addTab(tab_course_detail);
	mainTabGroup.addTab(tab_course_exer);
	mainTabGroup.addTab(tab_course_help);
	mainTabGroup.addTab(tab_my_knowledge);
	mainTabGroup.addTab(tab_answer_det);
}






// 设置默认显示
//mainTabGroup.setActiveTab(0)

// open tab group
mainTabGroup.open({opacity:1, duration:100})