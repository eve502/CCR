
if( typeof(Analytics) != 'object' ){
	var Analytics = require('/Views/common/analytics')
}
var A = new Analytics('app:subject');

// A.featureEvent(e)  or  A.featureEvent(e, {somekey: somevalue, })


//右侧窗口区域
var win = Ti.UI.createWindow({
	title:L('course'),
	backgroundColor:'#C0C6D1',
});

/*
 * 定义<课程列表>tab
 */
tab_course = Ti.UI.createTab({
	title:L('course'),
	icon:'/images/icon/ico_cloud.png',
	window:win
});


////////////////////////////

// 
var subject_data = [
	{title:"数学", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_account.png'},
	{title:"语文", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_feedback.png'},
	{title:"英语", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_feedback.png'},
]


var subject_navgroup = Ti.UI.createTabGroup({
	allowUserCustomization:true,
	left:252-10,	// 192
	zIndex:3
});
subject_navgroup.addEventListener('click', function(e){
	pr(e);
});


// 导航菜单项 视图
var main_menu_view = Titanium.UI.createView({
	left:0,
	top:0,
	width:342+1,
	backgroundColor:'#EDEDED',
	//backgroundImage:'/images/bg_aside_menubar.png',
});


//tabGroup
var subject_len = subject_data.length;
for(i=0;i<subject_len;i++)
{
	var tab_win = Ti.UI.createWindow({
		tabBarHidden:true,
		navBarHidden:true,
		_parent:subject_navgroup,
		Pwin:win,
		Pmenu:main_menu_view,
		url:subject_data[i].url,	
		Ptabs:subject_navgroup,	
	});
	var subject_tab = Ti.UI.createTab({
		title:subject_data[i].title,
		window:tab_win,
		visible:false,
	});
	subject_navgroup.addTab(subject_tab);
}

subject_navgroup.open();

win.add(subject_navgroup);


var rowData = [];

//table footer
var footer = Ti.UI.createView({
	backgroundColor:'transparent',
	height:20
});
var section = Ti.UI.createTableViewSection();
section.footerView = footer;

rowData[0] = section;

for(i=0;i<subject_len;i++)
{
	section.add(
		Ti.UI.createTableViewRow({
			hasChild:subject_data[i].hasChild,
			title:subject_data[i].title,
			leftImage:subject_data[i].leftImage
		})
	);
}


var main_menu_tbview = Titanium.UI.createTableView({
	data:rowData,
	allowsSelection:true,		
	separatorStyle:Titanium.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
	separatorColor:'#EDEDED',
	//headerView:header_view,
	//footerView:footer_view,
	minRowHeight:54,
	left:0,
	top:0,
	width:342,
	//backgroundColor:'transparent',
	backgroundColor:'#C0C6D1',
});

main_menu_view.add(main_menu_tbview);
win.add(main_menu_view);

/*
 * 构建左侧功能导航菜单
 */

	
	
var main_menu_active_item = 0;			// 默认显示  (对应 menu_list )

main_menu_tbview.addEventListener('click', function(e){	
	main_menu_active_item = e.index;
	subject_navgroup.width = 768;	// 宽度复位
	subject_navgroup.setActiveTab(main_menu_active_item);
	main_menu_tbview.selectRow( main_menu_active_item );
	subject_navgroup.tabs[main_menu_active_item].window.fireEvent('reset');
})

subject_navgroup.setActiveTab(0);


main_menu_tbview.fireEvent('click', {index:main_menu_active_item, rowData:subject_data[main_menu_active_item] } );




























