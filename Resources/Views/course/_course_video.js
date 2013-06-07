/*
 * 课程视频页
 */

tb1.setIndex(0); 

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
	width:720,
	height:40,
	font:{fontSize:24},
});
viewVideo.add(labelTitle);


//课程内容简介
var labelCont = Ti.UI.createLabel({
	id:'course_cont',
	text:'人教版小学数学一年级上册学习视频 新课标《特级教师辅导》根据教育部最新制定的新课程标准和人民教育出版社教科书内容同步制作的学生家庭学习音像教材。',
	top:570,
	height:150,
	width:720,
});

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