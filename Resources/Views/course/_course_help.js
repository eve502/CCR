/*
 * 学习帮助页
 * params: sid: 问题id
 */
var data_sHelp = [
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

var tb_sHelp_data = [];
var tb_mHelp_data = [];


var viewHelp = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

/*
 * 单一问题帮助View
 */
var singleHelpView = Ti.UI.createView({
	visible:false,
	width:720,
	height:850
}); 
viewHelp.add(singleHelpView);

//单题帮助的表格初始化
//initSHelpTable();

/*
 * 多问题帮助列表
 */
var multiHelpView = Ti.UI.createView({
	visible:true,
	width:720,
	height:850
});
viewHelp.add(multiHelpView);

//多题帮助的表格初始化
initMHelpTable();

win.add(viewHelp);

function initMHelpTable()
{
	//初始化表格行数据(多题)
	createMHelpTableRow(); 
	
	//搜索框
	var help_search = Titanium.UI.createSearchBar({
		barColor:'#FFF',
		showCancel:false,
		hintText:'search',
	});
	
	var mHelpList = Ti.UI.createTableView({
		data:tb_mHelp_data,
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'#FFF',
		search:help_search,
		//filterAtribute:'filter'
	});
	multiHelpView.add(mHelpList);
	
	mHelpList.addEventListener('click',function(e){
		Ti.API.info('e.index=' + e.index);
		sHelp_sid = data_sHelp[e.index].sid;
		emptyViewChild(singleHelpView);  //清空singleHelpView的内容
		multiHelpView.hide();
		singleHelpView.show();
		initSHelpTable();
	});
}

function createMHelpTableRow()
{
	var mHelpList_len = data_sHelp.length;
	
	for(j=0;j<mHelpList_len;j++)
	{
		var row = Ti.UI.createTableViewRow({
			hasChild:true,
			height:60,
			title:'          '+data_sHelp[j].question
		});
		
		//题号
		var sNum = Ti.UI.createLabel({
			text:data_sHelp[j].sid,
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
		row.add(sNum);
		
		tb_mHelp_data[j] = row;		
	}
}

function initSHelpTable()
{
	var sHelp_sid_index = getArrayIndex(sHelp_sid); //题目id所对应的data_sHelp的数据.
	Ti.API.info("sHelp_sid_index="+sHelp_sid_index);
	
	//当前问题描述wrap
	var singleHelpWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:120,
		top:10,
	});		
	singleHelpView.add(singleHelpWrap);
	
	var singleTitle = Ti.UI.createLabel({
		font:{fontSize:24},
		top:10,
		height:100,
	});
	singleHelpWrap.add(singleTitle);
	
	if(sHelp_sid_index == -1){
		singleTitle.setText("暂无数据,可联系老师寻求帮助.");
	}else{
		singleTitle.setText(data_sHelp[sHelp_sid_index].question);
		//初始化表格行数据(单题)
		createSHelpTableRow();
		//单题帮助信息列表
		var sHelpList = Ti.UI.createTableView({
			data:tb_sHelp_data,
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
			backgroundColor:'#FFF',
			top:140,
		});
		singleHelpView.add(sHelpList);
	}
}

function createSHelpTableRow()
{
	var sHelp_sid_index = getArrayIndex(sHelp_sid); //题目id所对应的data_sHelp的数据.
	var sHelpList_len = data_sHelp[sHelp_sid_index].cont.length;
	
	for(i=0;i<sHelpList_len;i++)
	{
		var row = Ti.UI.createTableViewRow({
			hasChild:true,
			height:85
		});	
		
		//用户头像
		var avatar = Ti.UI.createImageView({
			image:'/images/avatar/user.png',
			width:50,
			height:50,
			top:5,
			left:10,
			borderRadius:10,
			borderWidth:2,
			borderColor:'#DFE2E7',
		}); 
		row.add(avatar);
		
		//用户名
		var userNameLabel = Ti.UI.createLabel({
			text:data_sHelp[sHelp_sid_index].cont[i].user_name,
			top:60,
			left:10,
			font:{fontSize:14},
			width:50,
			textAlign:'center'
		});
		row.add(userNameLabel);
		
		//解答描述
		var row_text = data_sHelp[sHelp_sid_index].cont[i].answer;  Ti.API.info(row_text.length);
		if(row_text.length > 10)
			row_text =  data_sHelp[sHelp_sid_index].cont[i].answer.substr(0,10) + '...';
		
		var sAnswerLabel = Ti.UI.createLabel({
			text:row_text,
			top:20,
			left:70
		});
		row.add(sAnswerLabel);
		
		tb_sHelp_data[i] = row;
	}

}

// 查找数组中的某条数据,返回对应的index
function getArrayIndex(sid)
{
	var data_sHelp_len = data_sHelp.length;
	var index = -1;
	for(i=0;i<data_sHelp_len;i++)
	{
		if(data_sHelp[i].sid == sid){
			index = i;break;
		}
	}
	return index;
}



