/*
 * 课程练习页
 */

var win = Ti.UI.currentWindow;

//navBar左侧关闭按钮, 和右侧用户列表弹窗
Ti.include('/Views/userinfo/_usr_list.js');

var cur_page = 0; //当前页面
var cur_level = 0; //当前测试级别
var total_score = 0; //题目测试得分
var result_list = []; //测试结果列表（对or错）

var level_data = [
	{title:'初级篇',pass:false,done:false},
	{title:'中级篇',pass:false,done:false},
	{title:'高级篇',pass:false,done:false},
];

var data_exam = [
	{id:1,score:25,question:'1.买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]},
	{id:2,score:25,question:'2.买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false}
	]},
	{id:3,score:25,question:'3.买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]},
	{id:4,score:25,question:'4.买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]}
];

//课堂标题
var label_exer = Ti.UI.createLabel({
	text:'    课堂练习 - ' + level_data[cur_level].title,
	top:0,
	width:720,
	height:80,
	font:{fontSize:24},
	color:'#FFF',
	textAlign:'left',
	backgroundColor:'#369',
	borderRadius:20,
	borderWidth:10,
	borderColor:'#DFE2E7'
});	
win.add(label_exer);

//页码
var label_page = Ti.UI.createLabel({
	text: + '1/' + data_exam.length,
	top:0,
	right:20,
	width:700,
	height:80,
	color:'#FFF',
	font:{fontSize:32},
	textAlign:'right'
});	
win.add(label_page);

//提示外包视图
var tipsWrap = Ti.UI.createView({
	width:720,
	height:730,
	top:100,
	zIndex:10,
	visible:false,
});
win.add(tipsWrap);


//答对提示
var isRight = Ti.UI.createImageView({
	image:'/images/icon/icon_big_right.png',
	visible:false,
	zIndex:11
});
tipsWrap.add(isRight);

//答错提示
var isWrong = Ti.UI.createImageView({
	image:'/images/icon/icon_big_wrong.png',
	visible:false,
	zIndex:11
});
tipsWrap.add(isWrong);


//生成视图
var views_len = data_exam.length;
var scroll_views_data = [];

for(i=0;i<views_len;i++){
	//题目内容显示区域
	var viewExerCont = Ti.UI.createView({
		width:720,
		height:720,
		top:100,
		backgroundColor:'#369',
	});
	
	//跳过按钮
	var pass_btn = Ti.UI.createButton({
		title:L('pass'),
		top:630,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2,
		font:{fontSize:24}
	});
	viewExerCont.add(pass_btn);
	
	pass_btn.addEventListener('click',function(){
		if(cur_page < (data_exam.length - 1)){
			//进入下一个测试题目
			cur_page++;
			//createCurExam();
		}else{
			//进入测试结果页面
			//createViewResult();
		}
	});		
	
	//当前页面问题描述
	var exerWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:200,
		top:0,
		backgroundColor:'#FFF',
	});	
	viewExerCont.add(exerWrap);
	
	var label_question = Ti.UI.createLabel({
		text:data_exam[i].question,
		font:{fontSize:24}
	});		
	exerWrap.add(label_question);
	
	//当前页面题目选项按钮
	var cur_answers = data_exam[i].answers; 
	var cur_answers_len = cur_answers.length;

	var title_list = [];
	
	for(j=0;j<cur_answers_len;j++)
	{
		//Ti.API.info('i=' + i);
		var answer_btn = Ti.UI.createButton({
			title:cur_answers[j].cont,
			top:220 + j*100,
			width:500,
			height:90,
			borderRadius:20,
			borderColor:'#DFE2E7',
			borderWidth:2,
			font:{fontSize:24}
		});	
		viewExerCont.add(answer_btn);
		
		title_list.push(cur_answers[j].cont);
		
		//按钮事件
		answer_btn.addEventListener('click',function(e){
			var title = e.source.title;
			var index = inArray(title,title_list);
			
			if(cur_answers[index].result){
				var cur_score = data_exam[cur_page].score;
				total_score += cur_score;
				result_list.push(1);
				showTips(isRight);
			}else{
				result_list.push(0);
				showTips(isWrong);
			}
		});
	}
	scroll_views_data.push(viewExerCont);
}
//Ti.API.info(scroll_views_data);

var scrollView = Titanium.UI.createScrollableView({
	views:scroll_views_data,
	showPagingControl:true,
	pagingControlHeight:30,
	maxZoomScale:2.0,
	currentPage:0
});
win.add(scrollView);


var activeView = scroll_views_data[0];

scrollView.addEventListener('scroll', function(e)
{
	activeView = e.view;  // the object handle to the view that is about to become visible
	i = e.currentPage;
	label_page.setText(i + 1 + '/' + data_exam.length);
	Titanium.API.info("scroll called - current index " + i + ' active view ' + activeView);
});
scrollView.addEventListener('click', function(e)
{
	Ti.API.info('ScrollView received click event, source = ' + e.source);
});
scrollView.addEventListener('touchend', function(e)
{
	Ti.API.info('ScrollView received touchend event, source = ' + e.source);
});



//页面内容初始化
//createCurExam();


function showTips(obj)
{
	//Ti.API.info(obj.visible);
	obj.show();//Ti.API.info(obj.visible);
	tipsWrap.show();
	setTimeout(function(){
		obj.hide({animate:true});
		tipsWrap.hide();
	},500);
}



/*
function createViewResult()
{
	label_page.text = ''; //清除页码标志	
	level_data[cur_level].done = true; //标志本套测试已经做过
	emptyAllChildren(viewExerCont);
	
	//查看测试结果按钮
	var viewResultBtn = Ti.UI.createButton({
		title:L('view_result'),
		top:530,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2,
		font:{fontSize:24}
	});
	
	viewExerCont.add(viewResultBtn);
	viewResultBtn.addEventListener('click',function(e){
		createResultList();
	});
	
	//重新测试按钮
	var retestBtn = Ti.UI.createButton({
		title:L('retest'),
		top:630,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2,
		visible:false,
		font:{fontSize:24}
	});
	
	viewExerCont.add(retestBtn);
	retestBtn.addEventListener('click',function(){
		level_data[cur_level].done = false;
		cur_page = 0;
		total_score = 0;
		createCurExam();
	});
	
	//下一轮测试按钮
	var nextBtn = Ti.UI.createButton({
		title:L('next_exam'),
		top:630,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2,
		visible:false,
		font:{fontSize:24}
	});
	
	viewExerCont.add(nextBtn);
	
	var resultWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:200,
		top:0,
	});
	
	viewExerCont.add(resultWrap);
	
	if(total_score >= 80){
		var exam_result = total_score + '分，恭喜您！可以进入下一轮测试啦！ 可点击“下一轮测试”开始。';
		level_data[cur_level].pass = true;
		nextBtn.show();
	}else{
		var exam_result = total_score + '分，继续努力，达到80分就可以进入下一轮测试喽！';
		retestBtn.show();
	}
	
	var label_result = Ti.UI.createLabel({
		text:exam_result,
		font:{fontSize:24}
	});
	
	//resultWrap.remove(label_result);
	resultWrap.add(label_result);	
}


function createResultList()
{
	label_page.text = '';
	emptyAllChildren(viewExerCont);
	
	//重新测试按钮
	var retestBtn2 = Ti.UI.createButton({
		title:L('retest'),
		top:670,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2,
		font:{fontSize:24}
	});
	
	viewExerCont.add(retestBtn2);
	retestBtn2.addEventListener('click',function(){
		Ti.API.info('retest2');
		level_data[cur_level].done = false;
		cur_page = 0;
		total_score = 0;
		createCurExam();
	});
	
	var data_result = [],image;

	for(i=0;i<data_exam.length;i++){
		result_list[i] == 1  ? image = '/images/icon/icon_right.png' : image = '/images/icon/icon_wrong.png';
		data_result.push({title:data_exam[i].question,leftImage:image,hasChild:true});
	}
	
	var resultListTb = Ti.UI.createTableView({
		data:data_result,
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'#FFF',
		height:500,
		top:0
	});
	viewExerCont.add(resultListTb);
	
	resultListTb.addEventListener('click',function(e){
		cur_page = e.index;
		viewExerCont.remove(resultListTb); //删除表格
		createCurExam();
	});
}

//页面内容创建
function createCurExam()
{	
	emptyAllChildren(viewExerCont);	//清空viewExerCont的内容
	
	if(level_data[cur_level].done){
		label_page.text = ''; 
		
		//学习帮助按钮
		var help_btn = Ti.UI.createButton({
			title:L('help'),
			top:730,
			width:300,
			height:80,
			borderRadius:20,
			borderColor:'#DFE2E7',
			borderWidth:2,
			font:{fontSize:24}
		});
		win.add(help_btn);
		
		help_btn.addEventListener('click',function(){
			sHelp_sid = data_exam[cur_page].id; //单一题目id
			initSHelpTable();
			//显示单题帮助
			multiHelpView.hide();
			singleHelpView.show();
			//跳转到帮助页面
			showView(viewHelp);
			tb1.setIndex(3);
		});
	}else{
		//当前页码
		label_page.setText((cur_page + 1) + '/' + data_exam.length);
		//跳过按钮
		var pass_btn = Ti.UI.createButton({
			title:L('pass'),
			top:630,
			width:300,
			height:80,
			borderRadius:20,
			borderColor:'#DFE2E7',
			borderWidth:2,
			font:{fontSize:24}
		});
		viewExerCont.add(pass_btn);
		
		pass_btn.addEventListener('click',function(){
			if(cur_page < (data_exam.length - 1)){
				//进入下一个测试题目
				cur_page++;
				createCurExam();
			}else{
				//进入测试结果页面
				createViewResult();
			}
		});		
	}	
	
	//当前页面问题描述
	var exerWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:200,
		top:0,
	});	
	viewExerCont.add(exerWrap);
	
	//Ti.API.info(data_exam[cur_page].question);
	
	var label_question = Ti.UI.createLabel({
		text:data_exam[cur_page].question,
		font:{fontSize:24}
	});		
	exerWrap.add(label_question);
	
	//当前页面题目选项按钮
	var cur_answers = data_exam[cur_page].answers; 
	var cur_answers_len = cur_answers.length; 

	var title_list = [];
	
	for(i=0;i<cur_answers_len;i++)
	{
		//Ti.API.info('i=' + i);
		var answer_btn = Ti.UI.createButton({
			title:cur_answers[i].cont,
			top:220 + i*100,
			width:500,
			height:90,
			borderRadius:20,
			borderColor:'#DFE2E7',
			borderWidth:2,
			font:{fontSize:24}
		});	
		viewExerCont.add(answer_btn);
		
		title_list.push(cur_answers[i].cont);
		
		if(!level_data[cur_level].done){
			//按钮事件
			answer_btn.addEventListener('click',function(e){
				var title = e.source.title;
				var index = inArray(title,title_list);
				
				//Ti.API.info('index='+index);
				
				if(cur_answers[index].result){
					var cur_score = data_exam[cur_page].score;
					total_score += cur_score;
					result_list.push(1);
					showTips(isRight);
				}else{
					result_list.push(0);
					showTips(isWrong);
				}
				
				setTimeout(function(){
					if(cur_page < (data_exam.length - 1)){
						//进入下一个测试题目
						cur_page++;	
						createCurExam();
					}else{
						//进入测试结果页面
						createViewResult();					
					}				
				},500);	
			});
		}		
	}
}

*/




