/*
 * 学习帮助页
 */
var win = Ti.UI.currentWindow;

var test_data=[
	{title:'张小小',level:0, comment_id:0,process:'80%'},
	{title:'李大大',level:1, comment_id:2,process:'50%'},
	{title:'张小小',level:0, comment_id:1,process:'80%'},
	{title:'张涵韵',level:2, comment_id:0,process:'70%'}
];

var tb_test_data = [];
var which_row = 0;

var viewTestResult = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var comments = ['做得不错', '继续努力', '多加认真会更好'];
//评语选项
var optionsDialogOpts = {
	options:comments,
	title:L('select_comment')
};

var comment_dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

// add event listener
comment_dialog.addEventListener('click',function(e)
{
	if(e.index != -1){
		//Ti.API.info('e.index=' + e.index);
		test_data[which_row].comment_id = e.index; 		
		initRowData(); 
		test_list.setData([]); //清空表格数据
		test_list.setData(tb_test_data);  //添加表格数据
	}	
});

initRowData(); //初始化表格row数据

var test_list = Ti.UI.createTableView({
	data:tb_test_data,	
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundColor:'#FFF',
});

//列表事件
test_list.addEventListener('click',function(e){
	//Ti.API.info('add comment');
	which_row = e.index;
	comment_dialog.show();
});


viewTestResult.add(test_list);

win.add(viewTestResult);

function initRowData()
{
	//测试结果条数
	var test_len = test_data.length;
	for(i=0;i<test_len;i++)
	{
		var row = Ti.UI.createTableViewRow();
		row.height = 70;
		switch(test_data[i].level)
		{
			case 0: row.leftImage = "/images/table/imageA.png"; break;
			case 1: row.leftImage = "/images/table/imageB.png"; break;
			case 2: row.leftImage = "/images/table/imageC.png"; break;
			default: row.leftImage = "/images/table/imageA.png";
		}
		
		var test_row_label = Ti.UI.createLabel({
			text: test_data[i].title,
			shadowOffset:{x:0,y:1},
			textAlign:'left',
			top:20,
			left:85,
			width: 100,
			height:'auto',
			font:{fontWeight:'bold',fontSize:24},
		});
		row.add(test_row_label);
		
		var test_row_label3 = Ti.UI.createLabel({
			text: test_data[i].process,
			textAlign:'left',
			top:25,
			left:190,
			width: 'auto',
			height:'auto',
			font:{fontWeight:'bold',fontSize:18}
		});	
		row.add(test_row_label3);
		
		var test_row_label2 = Ti.UI.createLabel({
			text: comments[test_data[i].comment_id],
			textAlign:'left',
			font:{fontWeight:'bold',fontSize:18},
			top:25,
			width:300,
			height:'auto',
			right:60,
			textAlign:'right',
		});	
		row.add(test_row_label2);
		
		var add_comm_btn = Ti.UI.createView({
			backgroundImage:'/images/table/commentButton.png',
			top:20,
			right:5,
			width:36,
			height:34,
			clickName:'add_comm_btn',		
		});
		row.add(add_comm_btn);
		
		tb_test_data[i] = row;
	}
}

