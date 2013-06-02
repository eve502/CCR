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



//课堂内容
Ti.include('/Views/course/_course_video.js');

//课堂练习
Ti.include('/Views/course/_course_exer.js');

//知识共享
Ti.include('/Views/course/_knowledge_share.js');

//学习帮助
Ti.include('/Views/course/_course_help.js');


///////////////////////////////////////

//当前窗口关闭事件
win.addEventListener('close', function() 
{
	if (!windowClosed)
	{
		windowClosed = true;
		activeMovie.stop();
	}
});


/*
 * 窗口底部tab
 */
var tb1 = Ti.UI.iOS.createTabbedBar({
	labels:['课堂内容', '课堂练习', '知识共享', '学习帮助'],
	backgroundColor:'#336699',
	bottom:10,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	height:35,
	width:600,
	zindex:5
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
			case 2:showView(viewShare);break;
			case 3:showView(viewHelp);break;
			default:showView(viewVideo);break;
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
	view.show();
}





