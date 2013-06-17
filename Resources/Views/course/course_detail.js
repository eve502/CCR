// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 



var cur_win = Ti.UI.currentWindow;
cur_win.visible = false;


var win = Ti.UI.createWindow({
	title:cur_win.title,
	_parent:cur_win,
});

/*
cur_win.addEventListener('click',function(){
	Ti.API.info('this is cur_win');
});

win.addEventListener('click',function(){
	Ti.API.info('this is win');
});
*/

/*
 * 当前窗口TabGroup
 */
var c_tab_data = [
	{title:'课堂内容',url:'/Views/course/_course_video.js'},
	{title:'课堂练习',url:'/Views/course/_course_exer.js'},
	{title:'学习帮助',url:'/Views/course/_course_help.js'},
	{title:'我的知识',url:'/Views/course/_my_knowledge.js'},
	{title:'答题情况',url:'/Views/course/_answer_det.js'},
];

var detailTabGroup = Ti.UI.createTabGroup();

var tabs_len = c_tab_data.length;
for(i=0;i<tabs_len;i++){
	//窗口
	var c_tab_win = Ti.UI.createWindow({
		title:cur_win.title,
		url:c_tab_data[i].url,
		//navBarHidden:true,
		_parent:win,
		_tabGroup:detailTabGroup,
	});
	//Tab
	var c_tab = Ti.UI.createTab({
		title:c_tab_data[i].title,
		window:c_tab_win,
	});
	// add Tab to tabgroup
	detailTabGroup.addTab(c_tab);	
}

detailTabGroup.open();

win.add(detailTabGroup);

detailTabGroup.setActiveTab(0);


/*

//右上角按钮, 点击弹窗选择联系

//班级成员列表
var user_data = [
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
	data:user_data
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
//
var qusIcon = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.INFO_DARK
});
qusIcon.addEventListener('click',function(){
	popover.show({ view: qusIcon });
});
win2.setRightNavButton(qusIcon);


//窗口NavBar菜单
var label = Titanium.UI.createButton({
	title:win.title,
	color:'#fff',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});


var close = Titanium.UI.createButton({
	title:'课程',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
win2.setLeftNavButton(close);

close.addEventListener('click', function()
{
	win.close();
});	
*/


/*

// Toolbar
var top_toolbar = Titanium.UI.iOS.createToolbar({
	items:[close,flexSpace,label,flexSpace,qusIcon],
	top:0,
	borderTop:false,
	borderBottom:true
});
win.add(top_toolbar);

	


//win closed flag
var windowClosed = false;
var sHelp_sid = -1; //单一题目帮助的题目id

// include helper functions
Ti.include('/Views/common/helper.js');

//窗口底部tab

var tb1 = Ti.UI.iOS.createTabbedBar({
	labels:['课堂内容', '课堂练习', '学习帮助', '我的知识','答题情况'],
	bottom:10,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	width:600,
	zIndex:5,
	borderRadius:0,
});

// Toolbar
var btm_toolbar = Titanium.UI.iOS.createToolbar({
	items:[flexSpace,tb1,flexSpace],
	bottom:0,
	borderTop:true,
	borderBottom:false
});
win.add(btm_toolbar);


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

*/




