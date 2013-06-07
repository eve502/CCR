// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 


var Win = Ti.UI.currentWindow


// 
var _course_data = [
	{id:1,title:"第一章 加减法", hasChild:true},
	{id:2,title:"第二章 乘除法", hasChild:true},
	{id:3,title:"第三章 平方", hasChild:true},
]

//搜索框
var search = Titanium.UI.createSearchBar({
	showCancel:false,
	barColor:'#DFE2E7',
});


//TableView课程列表
var menu_list_tb = Ti.UI.createTableView({
	data:_course_data,
	minRowHeight:64,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'#DFE2E7',
	rowBackgroundColor:'white',
	separatorColor:'#cfcfcf',
	allowsSelection:true,
	search:search,
});


//表格事件
menu_list_tb.addEventListener('click', function(e){
	//Ti.API.info(e.rowData.hasChild);
	if (e.rowData.hasChild)
	{
		currentCourseId = e.rowData.id;
		
		mainTabGroup.setActiveTab(1);
		
		
		/*
		//Ti.API.info(e.rowData.title);
		var w = Titanium.UI.createWindow({
			url:"/Views/course/course_detail.js",
			title:e.rowData.title,
			backgroundColor:'#FFF'
		});
		
		var label = Titanium.UI.createButton({
			title:e.rowData.title,
			color:'#fff',
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var close = Titanium.UI.createButton({
			title:'课程列表',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		
		close.addEventListener('click', function()
		{
			Ti.API.info('IN HERE');
			w.close();
		});	
		
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
		//win.rightNavButton = contactAdd;
		
		// create and add toolbar
		var toolbar = Titanium.UI.iOS.createToolbar({
			items:[close,flexSpace,label,flexSpace,qusIcon],
			top:0,
			borderTop:false,
			borderBottom:true
		});
		w.add(toolbar);	
		
		w.open({animated:true});
	
		//Ti.UI.currentTab.open(w,{animated:true});
		*/
	}
});

// add table view to the window
Win.add(menu_list_tb);



