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
var bb1 = Titanium.UI.createButtonBar({
	labels:['课堂内容', '课堂练习', '知识共享', '学习帮助', '学习指导'],
	backgroundColor:'#336699',
	top:50,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	height:35,
	width:600
});

win.add(bb1);

var activeMovie = Titanium.Media.createVideoPlayer({
	url:'/movies/movie.mp4',
	backgroundColor:'#111',
	movieControlMode: Titanium.Media.VIDEO_CONTROL_DEFAULT, // See TIMOB-2802, which may change this property name
	scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
	autoplay:true,
	top:90
});

win.add(activeMovie);
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





