// 
//  subject_detail.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 



var Win = Ti.UI.currentWindow;

// 
var _course_data = [
	{title:"第一章 加减法", hasChild:true},
	{title:"第二章 乘除法", hasChild:true},
	{title:"第三章 平方", hasChild:true},
];

var main_view = Ti.UI.createView({
	top:0,
	width:526,
	//left:292,
	left:0,
	zIndex:2
});

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
	if (e.rowData.hasChild)
	{
		//Ti.API.info(e.rowData.title);
		var w = Titanium.UI.createWindow({
			url:"/Views/course/course_detail.js",
			navBarHidden:false,
			title:e.rowData.title,
			_parent:Win,
		});
		//隐藏splitWindow
		Win._parent.hide();
		//打开窗口
		w.open({animated:true});
	}
});

// add table view to the window
main_view.add(menu_list_tb);

Win.add(main_view);

