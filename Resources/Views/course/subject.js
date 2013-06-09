
if( typeof(Analytics) != 'object' ){
	var Analytics = require('/Views/common/analytics')
}
var A = new Analytics('app:setting');

// A.featureEvent(e)  or  A.featureEvent(e, {somekey: somevalue, })


var win = Titanium.UI.currentWindow;

// 
var subject_data = [
	{title:"数学", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_account.png'},
	{title:"语文", hasChild:true, url:'/Views/course/course_list.js', leftImage:'/images/icon/ico_setting_feedback.png', header:''},
]


var subject_navgroup = Ti.UI.createTabGroup({
	allowUserCustomization:true,
	left:202-10,	// 192
	zIndex:3
});
subject_navgroup.addEventListener('click', function(e){
	pr(e)
});


var subject_len = subject_data.length;
for(i=0;i<subject_len;i++)
{
	var tab_win = Ti.UI.createWindow({
		tabBarHidden:true,
		navBarHidden:true,
		_parent:subject_navgroup,
		Pwin:win,
		url:subject_data[i].url,
	});
	var subject_tab = Ti.UI.createTab({
		title:subject_data[i].title,
		window:tab_win
	});
	subject_navgroup.add(subject_tab);
}

subject_navgroup.open();

win.add(subject_navgroup);

// 导航菜单项 视图
var main_menu_view = Titanium.UI.createView({
	left:0,
	top:0,
	width:292+1,
	backgroundColor:'#EDEDED',
	//backgroundImage:'/images/bg_aside_menubar.png',
});

var main_menu_tbview = Titanium.UI.createTableView({
	allowsSelection:true,		
	separatorStyle:Titanium.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
	separatorColor:'#EDEDED',
	//headerView:header_view,
	//footerView:footer_view,
	minRowHeight:54,
	left:0,
	top:0,
	width:292,
	//backgroundColor:'transparent',
	backgroundColor:'#C0C6D1',
});

main_menu_view.add(main_menu_tbview);
win.add(main_menu_view);

/*
 * 构建左侧功能导航菜单
 */

	
	
var main_menu_active_item = 0;			// 默认显示  (对应 menu_list )

main_menu_tbview.setData(subject_data);


main_menu_tbview.addEventListener('click', function(e){	
	main_menu_active_item = e.index;
	sms_navgroup.width = 768;	// 宽度复位
	sms_navgroup.setActiveTab(main_menu_active_item);
	main_menu_tbview.selectRow( main_menu_active_item );
	subject_navgroup.tabs[main_menu_active_item].window.fireEvent('reset');
})

sms_navgroup.setActiveTab(0);

main_menu_tbview.fireEvent('click', {index:main_menu_active_item, rowData:subject_data[main_menu_active_item] } );






























