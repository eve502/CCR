/*
 * 多题帮助页 by eve 2013-6-18
 */
var win = Ti.UI.currentWindow;

var help_data = [
	{sid:1,question:'1.买一个本子要8元，有6元4角，还差多少钱？', cont:[
		{user_id:1,user_name:'王晓晓',answer:'8 - 6.4 = 1.6(元)'},
		{user_id:2,user_name:'李大大',answer:'8元减去6.4元等于1.6元'},
		{user_id:3,user_name:'张黑黑',answer:'8元减去6.4元等于1.6元，即1元6角'},
	]},
	{sid:2,question:'2.买一个本子要8元，有6元4角，还差多少钱？', cont:[
		{user_id:1,user_name:'王晓晓',answer:'8 - 6.4 = 1.6(元)'},
		{user_id:2,user_name:'张黑黑',answer:'8元减去6.4元等于1.6元'},
		{user_id:3,user_name:'李大大',answer:'8元减去6.4元等于1.6元，即1元6角'},
	]},
	{sid:3,question:'3.买一个本子要8元，有6元4角，还差多少钱？', cont:[
		{user_id:1,user_name:'王晓晓',answer:'8 - 6.4 = 1.6(元)'},
		{user_id:2,user_name:'王力宏',answer:'8元减去6.4元等于1.6元'},
		{user_id:3,user_name:'林志颖',answer:'8元减去6.4元等于1.6元，即1元6角'},
	]}
];

var tb_help_data = [];

//初始化表格行
var help_len = help_data.length;
for(j=0;j<help_len;j++)
{
	var row = Ti.UI.createTableViewRow({
		hasChild:true,
		height:60,
		title:'          '+help_data[j].question,
		backgroundColor:'#fff',
	});
	
	//题号
	var sid = Ti.UI.createLabel({
		text:help_data[j].sid,
		width:40,
		height:40,
		top:10,
		left:10,
		borderRadius:20,
		borderWidth:2,
		borderColor:'#DFE2E7',
		backgroundColor:'#369',
		textAlign:'center',
		color:'#fff',
		font:{fontSize:20}
	}); 
	row.add(sid);
	
	tb_help_data[j] = row;		
}

//表格搜索框
var help_search = Titanium.UI.createSearchBar({
	barColor:'#DFE2E7',
	showCancel:false,
	hintText:'search',
});
///表格创建
var mHelpTable = Ti.UI.createTableView({
	data:tb_help_data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'transparent',
	search:help_search,
	//filterAtribute:'filter'
});
win.add(mHelpTable);

mHelpTable.addEventListener('click',function(e){
	var index = e.index;
	//Ti.API.info('e.index=' + e.index);
	var w = Ti.UI.createWindow({
		title:L('answers'),
		url:'/Views/course/_s_help.js',
		backgroundColor:'#DFE2E7',
	});
	//打开窗口
	Ti.UI.currentTab.open(w,{animate:true});
});
	


