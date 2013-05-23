// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 


var win = Ti.UI.currentWindow;

//
// BASIC BUTTON BAR
// 

var course_navgroup = Ti.UI.createTabGroup({
	id:'tabGroup1'
});
course_navgroup.addEventListener('click', function(e){
	pr(e)
});

// 课堂内容
var course_det_win = Ti.UI.createWindow({
	url:'/Views/course/course_detail.js',
});
var course_det_tab = Ti.UI.createTab({
	title:L('course_detail'),
	window:course_det_win
});


// 课堂练习
var course_exer_win = Ti.UI.createWindow({
	url:'/Views/course/course_exercise.js',
});
var course_exer_tab = Ti.UI.createTab({
	title:('course_exer'),
	window:course_exer_win
});

// 知识共享
var knowledge_share_win = Ti.UI.createWindow({
	url:'/Views/course/knowledge_share.js',
});
var knowledge_share_tab = Ti.UI.createTab({
	title:L('knowledge_share'),
	window:knowledge_share_win
});

// 学习帮助
var course_help_win = Ti.UI.createWindow({
	url:'/Views/course/course_help.js',
});
var course_help_tab = Ti.UI.createTab({
	title:L('course_help'),
	window:course_help_win
});



course_navgroup.addTab(course_det_tab);
course_navgroup.addTab(course_exer_tab);
course_navgroup.addTab(knowledge_share_tab);
course_navgroup.addTab(course_help_tab);

course_navgroup.open();


win.add(course_navgroup);

///////////////////////////////////////
/*
var bb1 = Titanium.UI.createButtonBar({
	labels:['课堂内容', '课堂练习', '知识共享', '学习帮助', '学习指导'],
	backgroundColor:'#336699',
	bottom:5,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	height:35,
	width:600
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

win.add(bb1);
*/

//video view
var viewVideo = Ti.UI.createView({	
	borderRadius:10,
	borderColor:'#336699',
	width:720,
	height:520,
	top:60
});
win.add(viewVideo);

var activeMovie = Titanium.Media.createVideoPlayer({
	url:'/movies/movie.mp4',
	backgroundColor:'#111',
	movieControlMode: Titanium.Media.VIDEO_CONTROL_EMBEDDED, // See TIMOB-2802, which may change this property name
	scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
	width:700,
	height:500,
	top:10
});

viewVideo.add(activeMovie);

//course information
var viewCourseIntro = Ti.UI.createView({
	width:720,
	height:450,
	top:600
});
win.add(viewCourseIntro);

var labelTitle = Ti.UI.createLabel({
	id:'course_title',
	text:'第一章 加减法',
	top:0,
	height:40,
	font:{fontSize:28},
	textAlign:'left'
});

var labelCont = Ti.UI.createLabel({
	id:'course_cont',
	text:'人教版小学数学一年级上册学习视频 新课标《特级教师辅导》根据教育部最新制定的新课程标准和人民教育出版社教科书内容同步制作的学生家庭学习音像教材。',
	top:0,
	height:200,
});
viewCourseIntro.add(labelTitle);
viewCourseIntro.add(labelCont);


//win closed flag
var windowClosed = false;

activeMovie.addEventListener('load',function()
{
	// animate label
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(3);
	movieLabel.animate({transform:t, duration:500, color:'red'},function()
	{
		var t = Titanium.UI.create2DMatrix();
		movieLabel.animate({transform:t, duration:500, color:'white'});
	});
});
activeMovie.addEventListener('complete',function()
{	
	if (!windowClosed)
	{
		Ti.API.debug('Completed!');
		var dlg = Titanium.UI.createAlertDialog({title:'Movie', message:'Completed!'});
		dlg.show();
		win.close();
	}
});

activeMovie.play();

win.addEventListener('close', function() 
{
	if (!windowClosed)
	{
		windowClosed = true;
		activeMovie.stop();
	}
});





