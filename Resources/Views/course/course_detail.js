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


/*----------------------------------------------------------
 * current win content
 */



//video view
var viewVideo = Ti.UI.createView({
	width:720,
	height:850,
	top:60
});
win.add(viewVideo);

var videoWrap = Ti.UI.createView({
	borderRadius:10,
	borderColor:'#336699',
	width:720,
	height:520,
	top:10
});
viewVideo.add(videoWrap);

var activeMovie = Titanium.Media.createVideoPlayer({
	url:'/movies/movie.mp4',
	backgroundColor:'#111',
	mediaControlStyle: Titanium.Media.VIDEO_CONTROL_EMBEDDED, // See TIMOB-2802, which may change this property name
	scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
	width:700,
	height:500,
	top:10,
	autoplay:false
});

videoWrap.add(activeMovie);


var labelTitle = Ti.UI.createLabel({
	id:'course_title',
	text:'第一章 加减法',
	top:550,
	height:40,
	font:{fontSize:28},
	textAlign:'left'
});

var labelCont = Ti.UI.createLabel({
	id:'course_cont',
	text:'人教版小学数学一年级上册学习视频 新课标《特级教师辅导》根据教育部最新制定的新课程标准和人民教育出版社教科书内容同步制作的学生家庭学习音像教材。',
	top:570,
	height:150,
});
viewVideo.add(labelTitle);
viewVideo.add(labelCont);


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
		//var dlg = Titanium.UI.createAlertDialog({title:'Movie', message:'Completed!'});
		//dlg.show();
	}
});

activeMovie.play();

//exer view
var viewExer = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var label_exer = Ti.UI.createLabel({
	text:'课堂练习',
	top:10,
	height:50,
	textAlign:'center'
});

viewExer.add(label_exer);
win.add(viewExer);


// knowloage share view
var viewShare = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var label_share = Ti.UI.createLabel({
	text:'知识共享',
	top:10,
	height:50,
	textAlign:'center'
});

viewShare.add(label_share);
win.add(viewShare);

// help view
var viewHelp = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var label_help = Ti.UI.createLabel({
	text:'课堂帮助',
	top:10,
	height:50,
	textAlign:'center'
});

viewHelp.add(label_help);
win.add(viewHelp);



//窗口关闭事件
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





