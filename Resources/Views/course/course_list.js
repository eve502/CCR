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
	{title:"第一章 加减法", hasChild:true},
	{title:"第二章 乘除法", hasChild:true},
	{title:"第三章 平方", hasChild:true},
]


var menu_list_tb = Ti.UI.createTableView({
	data:_course_data,
	minRowHeight:64,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'#DFE2E7',
	rowBackgroundColor:'white',
	separatorColor:'#cfcfcf',
	allowsSelection:true,
});



//表格事件
menu_list_tb.addEventListener('click', function(e){
	//Ti.API.info(e.rowData.hasChild);
	if (e.rowData.hasChild)
	{
		//viewMode = 1;	
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
			title:'返回',
			style:Titanium.UI.iPhone.SystemButtonStyle.DONE
		});
		
		close.addEventListener('click', function()
		{
			Ti.API.info('IN HERE');
			w.close();
		});		
		
		// create and add toolbar
		var toolbar = Titanium.UI.iOS.createToolbar({
			items:[close,flexSpace,label,flexSpace],
			top:0,
			borderTop:false,
			borderBottom:true
		});
		w.add(toolbar);	
		
		w.open({animated:true});
	
		//Ti.UI.currentTab.open(w,{animated:true});
	}
});

// add table view to the window
Win.add(menu_list_tb);



