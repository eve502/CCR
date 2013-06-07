// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 



var win = Ti.UI.currentWindow;
//win closed flag
currentCourseId = 0;


/*
 * 课堂内容页
 */
var win_course_detail = Ti.UI.createWindow({
	url:'/Views/course/_course_video.js',
});

//课堂内容页Tab
var tab_course_detail = Ti.UI.createTab({
	title:L('course_det'),
	icon:'/images/icon/ico_cloud.png',
	window:win_course_detail
});

/*
 * 课堂练习页
 */
var win_course_exer = Ti.UI.createWindow({
	url:'/Views/course/_course_exer.js',
});

//课堂练习页Tab
var tab_course_exer = Ti.UI.createTab({
	title:L('course_exer'),
	icon:'/images/icon/ico_cloud.png',
	window:win_course_exer
});

/*
 * 学习帮助页
 */
var win_course_help = Ti.UI.createWindow({
	url:'/Views/course/_course_help.js',
});

//学习帮助页Tab
var tab_course_help = Ti.UI.createTab({
	title:L('course_help'),
	icon:'/images/icon/ico_cloud.png',
	window:win_course_help
});

/*
 * 我的知识页
 */
var win_my_knowledge = Ti.UI.createWindow({
	url:'/Views/course/_course_video.js',
});

//我的知识页Tab
var tab_my_knowledge = Ti.UI.createTab({
	title:L('_my_knowledge'),
	icon:'/images/icon/ico_cloud.png',
	window:win_my_knowledge
});


/*
 * 答题情况页
 */
var win_answer_det = Ti.UI.createWindow({
	url:'/Views/course/_answer_det.js',
});

//我的知识页Tab
var tab_answer_det = Ti.UI.createTab({
	title:L('_my_knowledge'),
	icon:'/images/icon/ico_cloud.png',
	window:win_answer_det
});



//课堂内容
//Ti.include('/Views/course/_course_video.js');

//课堂练习
//Ti.include('/Views/course/_course_exer.js');

//学习帮助
//Ti.include('/Views/course/_course_help.js');

//我的知识
//Ti.include('/Views/course/_my_knowledge.js');

//答题情况
//Ti.include('/Views/course/_answer_det.js');


/*
 * 窗口底部tab
 
var tb1 = Ti.UI.iOS.createTabbedBar({
	labels:['课堂内容', '课堂练习', '学习帮助', '我的知识','答题情况'],
	backgroundColor:'#336699',
	bottom:10,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	height:35,
	width:600,
	zIndex:5
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

win.add(tb1);


tb1.addEventListener('click', function(e)
{
	Ti.API.info(e);
	if(!windowClosed){
		switch(e.index){
			case 0:showView(viewVideo);break;
			case 1:showView(viewExer);break;
			case 2:
				sHelp_sid=-1;
				initMHelpTable();
				//显示多题帮助
				multiHelpView.show();
				singleHelpView.hide();
				showView(viewHelp);
				break;
			case 3:showView(viewShare);break;			
			case 4:showView(viewTestResult);break;
			default:showView(viewVideo);
		}
	}
});	




function showView(view)
{
	if(view !== viewVideo){
		activeMovie.pause();
	}else{
		activeMovie.play();
	}
	viewVideo.hide();
	viewExer.hide();
	viewShare.hide();
	viewHelp.hide();
	viewTestResult.hide();
	view.show();
}
*/




