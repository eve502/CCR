/*
 * 学习帮助页
 * params: sid: 问题id
 */

var win = Ti.UI.currentWindow;

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

/*
 * 解答详情页
 */
var answerView = Ti.UI.createView({
	visible:false,
	width:720,
	height:850
});
viewHelp.add(answerView);




win.add(viewHelp);

function initAnswerCont(aid)
{
	var sHelp_sid_index = getArrayIndex(sHelp_sid);
	
	//返回学习帮助列表按钮
	var returnBtn = Ti.UI.createButton({
		title:L('return'),
		systemButton:Titanium.UI.iPhone.SystemButton.DONE,
		left:10,
		top:0
	});
	answerView.add(returnBtn);
	
	//返回按钮, 返回到答案列表
	returnBtn.addEventListener('click',function(e){
		initSHelpTable();	
		multiHelpView.hide();
		singleHelpView.show();
		answerView.hide();
	});
	
	//当前问题描述wrap
	var qusWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:120,
		top:55,
	});		
	answerView.add(qusWrap);
	
	//问题题目
	var qusTitle = Ti.UI.createLabel({
		text:data_sHelp[sHelp_sid_index].question,
		font:{fontSize:20},
		height:100,
	});
	qusWrap.add(qusTitle);
	
	//回答内容边框
	var answerWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:5,
		borderColor:'#DFE2E7',
		width:600,
		height:600,
		top:200,
	});		
	answerView.add(answerWrap);
	
	//回答内容
	var answerCont = Ti.UI.createLabel({
		text:data_sHelp[sHelp_sid_index].cont[aid].answer,
		font:{fontSize:20},
		top:20,
		left:20
	});
	answerWrap.add(answerCont);
	
}

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
		//Ti.API.info('e.index=' + e.index);
		sHelp_sid = data_sHelp[e.index].sid;
		multiHelpView.hide();
		singleHelpView.show();
		answerView.hide();
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
	emptyAllChildren(singleHelpView);  //清空singleHelpView的内容
	
	var sHelp_sid_index = getArrayIndex(sHelp_sid); //题目id所对应的data_sHelp的数据.
	
	//当前问题描述wrap
	var singleHelpWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:120,
		top:55,
	});		
	singleHelpView.add(singleHelpWrap);
	
	var singleTitle = Ti.UI.createLabel({
		font:{fontSize:20},
		height:100,
	});
	singleHelpWrap.add(singleTitle);
	
	//返回学习帮助列表按钮
	var returnMHelpBtn = Ti.UI.createButton({
		title:L('return_help_list'),
		systemButton:Titanium.UI.iPhone.SystemButton.DONE,
		left:10,
		top:0
	});
	singleHelpView.add(returnMHelpBtn);
	
	returnMHelpBtn.addEventListener('click',function(e){
		sHelp_sid=-1;
		initMHelpTable();		
		multiHelpView.show(); //显示多题帮助
		singleHelpView.hide();
		answerView.hide();
	});
	
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
			top:175,
		});
		singleHelpView.add(sHelpList);
		
		sHelpList.addEventListener('click',function(e){
			initAnswerCont(e.index);
			multiHelpView.hide(); //显示多题帮助
			singleHelpView.hide();
			answerView.show();
		})
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



