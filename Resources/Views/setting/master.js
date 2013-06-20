

if( typeof(Analytics) != 'object' ){
	var Analytics = require('/Views/common/analytics')
}
var A = new Analytics('app:setting');

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

var setting_data = [
	{title:L('account'), hasChild:true, url:'/Views/setting/_account.js', leftImage:'/images/ico_setting_account.png'},
	{title:L('feedback'), hasChild:true, url:'/Views/setting/_feedback.js', leftImage:'/images/ico_setting_feedback.png', header:''},
	//{title:L('help'), hasChild:true, url:'/Views/setting/_help.js', leftImage:'/images/ico_setting_help.png'},
]


var setting_navgroup = Ti.UI.createTabGroup({
	allowUserCustomization:true,
	left:252-10,	// 192
	zIndex:3
});
setting_navgroup.addEventListener('click', function(e){
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
var subject_len = setting_data.length;
for(i=0;i<subject_len;i++)
{
	var tab_win = Ti.UI.createWindow({
		tabBarHidden:true,
		navBarHidden:true,
		_parent:setting_navgroup,
		Pwin:win,
		Pmenu:main_menu_view,
		url:setting_data[i].url,	
		Ptabs:setting_navgroup,	
	});
	var subject_tab = Ti.UI.createTab({
		title:setting_data[i].title,
		window:tab_win,
		visible:false,
	});
	setting_navgroup.addTab(subject_tab);
}

setting_navgroup.open();

win.add(setting_navgroup);


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
			hasChild:setting_data[i].hasChild,
			title:setting_data[i].title,
			leftImage:setting_data[i].leftImage
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
	setting_navgroup.width = 768;	// 宽度复位
	setting_navgroup.setActiveTab(main_menu_active_item);
	main_menu_tbview.selectRow( main_menu_active_item );
	setting_navgroup.tabs[main_menu_active_item].window.fireEvent('reset');
})

setting_navgroup.setActiveTab(0);


main_menu_tbview.fireEvent('click', {index:main_menu_active_item, rowData:setting_data[main_menu_active_item] } );








