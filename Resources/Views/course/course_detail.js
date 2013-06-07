// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 



var win = Ti.UI.currentWindow;
//win closed flag
var windowClosed = false;
var sHelp_sid = -1; //单一题目帮助的题目id

// include helper functions
Ti.include('/Views/common/helper.js');

/*
 * 窗口底部tab
 */
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

//课堂内容
Ti.include('/Views/course/_course_video.js');

//课堂练习
Ti.include('/Views/course/_course_exer.js');

//学习帮助
Ti.include('/Views/course/_course_help.js');

//我的知识
Ti.include('/Views/course/_my_knowledge.js');

//答题情况
Ti.include('/Views/course/_answer_det.js');


//当前窗口关闭事件
win.addEventListener('close', function() 
{
	if (!windowClosed)
	{
		windowClosed = true;
		activeMovie.stop();
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





