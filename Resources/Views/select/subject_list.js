// 
//  subject_list.js
//  LA
//  
//  Created by eve on 2013-4-11
//  Copyright 2013 eve. All rights reserved.
// 



if( typeof(Analytics) != 'object' ){
	var Analytics = require('/Views/common/analytics')
}
var A = new Analytics('app:setting');

// A.featureEvent(e)  or  A.featureEvent(e, {somekey: somevalue, })


var Win = Titanium.UI.currentWindow;

// 
var subject_data = [
	{title:"数学", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_account.png'},
	{title:"语文", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_feedback.png', header:''},
	//{title:L('help'), hasChild:true, url:'/setting/_help.js', leftImage:'/images/ico_setting_help.png'},
];

var subject_len = subject_data.length;
var row_data = [];
//table footer
var footer = Ti.UI.createView({
 	backgroundColor:'transparent',
 	height:20
});
var section = Ti.UI.createTableViewSection();
section.footerView = footer;

row_data[0] = section;
//create row data
for(i=0;i<subject_len;i++)
{
	section.add(
		Ti.UI.createTableViewRow({
			hasChild:subject_data[i].hasChild,
			title:subject_data[i].title,
			leftImage:subject_data[i].leftImage,
			url:subject_data[i].url,
		})
	);
}

var menu_list_tb = Ti.UI.createTableView({
	data:row_data,
	minRowHeight:64,
	//style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'#DFE2E7',
	rowBackgroundColor:'transparent',
	separatorColor:'#cfcfcf',
	allowsSelection:true,
})


menu_list_tb.addEventListener('click', function(e){
	
	if (e.rowData.url && e.rowData.hasChild)
	{
		var btn_none = Titanium.UI.createButton({
		    backgroundImage:'none',
		});

		var win = Titanium.UI.createWindow({
			url:e.rowData.url,
			title:e.rowData.title,
			leftNavButton:btn_none,
			_parent:Win._parent,
		});
		Ti.App.Properties.setInt('active_item_index', e.index);
		
		
		A.featureEvent(e);
		
		Win.sp_win.detailNav.open(win,{animated:false});
		//Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Win.add(menu_list_tb);

// 
var active_item_index = Ti.App.Properties.getInt('active_item_index') || 0;
menu_list_tb.selectRow(active_item_index)
menu_list_tb.fireEvent('click', {rowData:subject_data[ active_item_index ]})














