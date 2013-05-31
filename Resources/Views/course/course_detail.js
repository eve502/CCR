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
 * 课堂内容
 */
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


var qusIcon = Titanium.UI.createImageView({
	image:'/images/icon/ico_setting_account.png',
	width:74,
	height:64,
	top:535,
	right:20,
	zindex:6
});

viewVideo.add(qusIcon);

//班级成员列表
var data = [
	{title:'张子涵', header:'老师'},
	{title:'王萧'},
	{title:'李四'},
	{title:'王晓晓', header:'同学'},
	{title:'赵敏'},
	{title:'刘谦'},
	{title:'刘伟'},
	{title:'明明'},
	{title:'艾晓静'}
	];
	
var usr_list = Ti.UI.createTableView({
	data:data
});

//班级成员列表弹窗
var rightButton = Ti.UI.createButton({title: L('btn_close')});
rightButton.addEventListener('click', function(e){
    popover.hide();
});

var popover = Ti.UI.iPad.createPopover({
    width: 300,
    height: 400,
    title: '班级成员',
    rightNavButton: rightButton
});
popover.add(usr_list);


//班级成员列表弹窗
qusIcon.addEventListener('click',function(){
	//班级成员列表Window
	popover.show({ view: qusIcon });
	
});


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

/*----------------------------------------------------------
 * 课堂练习
 */

var cur_page = 1; //当前题目
var cur_level = 0; //当前测试级别
var cur_score = 0; //题目测试得分

var data_level = ['初级篇','中级篇','高级篇'];

var data_exam = [
	{score:'25',question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元'},
		{cont:'2元4角'},
		{cont:'1元2角'}
	]},
	{score:'25',question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元'},
		{cont:'2元4角'},
		{cont:'1元2角'}
	]},
	{score:'25',question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元'},
		{cont:'2元4角'},
		{cont:'1元2角'}
	]},
	{score:'25',question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元'},
		{cont:'2元4角'},
		{cont:'1元2角'}
	]}
];

var viewExer = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var viewCurEaxm = Ti.UI.createView({
	width:720,
	height:710,
	top:0
});

//页面内容初始化
createViewCurExam();

//跳过按钮
var pass_btn = Ti.UI.createButton({
	title:L('pass'),
	top:730,
	width:300,
	height:80,
	borderRadius:20,
	borderColor:'#DFE2E7',
	borderWidth:2
});

pass_btn.addEventListener('click',function(){
	if(cur_page < (data_exam.length - 1)){
		cur_page++;	
		clearViewCurExam();	
		createViewCurExam();
	}else{
		//pass_btn.hide();
	}	
});

viewExer.add(pass_btn);

win.add(viewExer);

function clearViewCurExam()
{
	viewExer.remove(viewCurEaxm);
}

//页面内容创建
function createViewCurExam()
{
	viewExer.add(viewCurEaxm);
	
	var label_exer = Ti.UI.createLabel({
		text:'    课堂练习 - ' + data_level[cur_level],
		top:0,
		width:720,
		height:80,
		font:{fontSize:24},
		color:'#FFF',
		textAlign:'left',
		backgroundColor:'#369',
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7'
	});
	
	viewCurEaxm.add(label_exer);
	
	var label_page = Ti.UI.createLabel({
		text:cur_page + '/' + data_exam.length,
		top:0,
		right:20,
		width:700,
		height:80,
		color:'#FFF',
		font:{fontSize:32},
		textAlign:'right'
	});
	
	viewCurEaxm.add(label_page);
	
	//当前页面问题描述
	var exerWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:200,
		top:100,
		font:{fontSize:28},
	});
	
	viewCurEaxm.add(exerWrap);
	
	var label_question = Ti.UI.createLabel({
		text:data_exam[cur_page].question,
	});
	
	exerWrap.add(label_question);
	
	//当前页面题目选项按钮
	var cur_answers = data_exam[cur_page].answers; 
	var cur_answers_len = cur_answers.length; 
	
	for(i=0;i<cur_answers_len;i++)
	{
		//Ti.API.info('i=' + i);
		var answer_btn = Ti.UI.createButton({
			title:cur_answers[i].cont,
			top:320 + i*100,
			width:500,
			height:90,
			borderRadius:20,
			borderColor:'#DFE2E7',
			borderWidth:2
		}); 
		viewCurEaxm.add(answer_btn);
	}
}


/*----------------------------------------------------------
 * 知识共享
 */
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



/*----------------------------------------------------------
 * 学习帮助
 */
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





