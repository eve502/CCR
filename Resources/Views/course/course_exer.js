/*
 * 课程练习页
 */

var win = Ti.UI.currentWindow;

// include helper functions
Ti.include('/Views/common/helper.js')

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

var exam_data = [
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
	top:10,
	width:720,
	height:80,
	font:{fontSize:24},
	color:'#FFF',
	textAlign:'left',
	backgroundColor:'#369',
	borderRadius:20,
	borderWidth:10,
	borderColor:'#CCC'
});	
win.add(label_exer);

//页码
var label_page = Ti.UI.createLabel({
	text: '1/' + exam_data.length,
	top:10,
	right:40,
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
	top:110,
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


//生成题目视图//////////////////////////////
var views_len = exam_data.length;
var scroll_views_data = [];

for(i=0;i<views_len;i++){
	//题目内容显示区域
	var viewExerCont = Ti.UI.createView({
		width:720,
		height:720,
		top:110,
	});
	
	//跳过按钮
	var pass_btn = Ti.UI.createButton({
		title:L('pass'),
		top:640,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#CCC',
		borderWidth:2,
		font:{fontSize:24}
	});
	viewExerCont.add(pass_btn);
	
	pass_btn.addEventListener('click',function(){
		if(cur_page < (exam_data.length - 1)){
			result_list.push(0);  //标记为错误
			//total_score += 0; //不加分
			//进入下一个测试题目
			scrollView.currentPage = ++cur_page;
			label_page.setText(cur_page + '/' + exam_data.length);
		}else{
			//测试结果描述
			if(total_score >= 80){
			var exam_result = total_score + '分，恭喜您！可以进入下一轮测试啦！ 可点击“下一轮测试”开始。';
				level_data[cur_level].pass = true;
				retestBtn.left = 169; retestBtn.show();
				nextBtn.left = 399; nextBtn.show(); 
			}else{
				var exam_result = total_score + '分，继续努力，达到80分就可以进入下一轮测试喽！';
				retestBtn.show();
				retestBtn.left = 284;
				nextBtn.hide();
			}
			label_result.text = exam_result;
			//测试结果列表数据
			var data_result = [],image;					
			for(i=0;i<exam_data.length;i++){
				result_list[i] == 1  ? image = '/images/icon/icon_right.png' : image = '/images/icon/icon_wrong.png';
				data_result.push({title:exam_data[i].question,leftImage:image,hasChild:true,backgroundColor:'#fff'});
			}
			resultListTb.data = data_result;
			//进入测试结果页面
			scrollView.currentPage = ++cur_page;
			label_page.text = '测试结果';
		}
	});		
	
	//当前页面问题描述
	var exerWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#CCC',
		width:720,
		height:200,
		top:0,
		backgroundColor:'#FFF',
	});	
	viewExerCont.add(exerWrap);
	
	var label_question = Ti.UI.createLabel({
		text:exam_data[i].question,
		font:{fontSize:24}
	});		
	exerWrap.add(label_question);
	
	//当前页面题目选项按钮
	var cur_answers = exam_data[i].answers; 
	var cur_answers_len = cur_answers.length;

	var title_list = [];
	
	for(j=0;j<cur_answers_len;j++)
	{
		//Ti.API.info('i=' + i);
		var answer_btn = Ti.UI.createButton({
			title:cur_answers[j].cont,
			top:230 + j*100,
			width:500,
			height:90,
			borderRadius:20,
			borderColor:'#CCC',
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
				var cur_score = exam_data[cur_page].score;
				total_score += cur_score;
				result_list.push(1);
				showTips(isRight);
			}else{
				result_list.push(0);
				showTips(isWrong);
			}
			setTimeout(function(){
				if(cur_page < (exam_data.length - 1)){
					//进入下一个题目
					scrollView.currentPage = ++cur_page;
					label_page.setText(cur_page + '/' + exam_data.length);
				}else{
					//测试结果描述
					if(total_score >= 80){
					var exam_result = total_score + '分，恭喜您！可以进入下一轮测试啦！ 可点击“下一轮测试”开始。';
						level_data[cur_level].pass = true;
						retestBtn.left = 169; retestBtn.show();
						nextBtn.left = 399; nextBtn.show(); 
					}else{
						var exam_result = total_score + '分，继续努力，达到80分就可以进入下一轮测试喽！';
						retestBtn.show();
						retestBtn.left = 284;
						nextBtn.hide();
					}
					label_result.text = exam_result;  
					//测试结果列表数据
					var data_result = [],image;					
					for(i=0;i<exam_data.length;i++){
						result_list[i] == 1  ? image = '/images/icon/icon_right.png' : image = '/images/icon/icon_wrong.png';
						data_result.push({title:exam_data[i].question,leftImage:image,hasChild:true,backgroundColor:'#fff'});
					}
					resultListTb.data = data_result;
					//进入测试结果页面
					scrollView.currentPage = ++cur_page;
					label_page.text = '测试结果';
				}		
			},500);
			
		});
	}
	scroll_views_data.push(viewExerCont);
}


//测试结果视图///////////////////////////////////////
var viewExerResult = Ti.UI.createView({
	width:720,
	height:720,
	top:110,
});

//测试结果描述
var resultWrap = Ti.UI.createView({
	borderRadius:20,
	borderWidth:10,
	borderColor:'#CCC',
	backgroundColor:'#fff',
	width:720,
	height:120,
	top:0,
});
viewExerResult.add(resultWrap);

var label_result = Ti.UI.createLabel({
	font:{fontSize:24}
});
resultWrap.add(label_result);

//测试结果列表
var resultListTb = Ti.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
	backgroundColor:'#fff',//'transparent',
	width:700,
	height:480,
	top:140,
	borderRadius:10,
	borderWidth:5,
	borderColor:'#CCC',
});
viewExerResult.add(resultListTb);
resultListTb.addEventListener('click',function(e){
	//cur_page = e.index;
	var w = Ti.UI.createWindow({
		title:L('answers'),
		url:'/Views/course/_s_help.js',
		backgroundColor:'#DFE2E7',
	});
	Ti.UI.currentTab.open(w,{animate:true});
});

//重新测试按钮
var retestBtn = Ti.UI.createButton({
	title:L('retest'),
	top:640,
	width:200,
	height:80,
	borderRadius:20,
	borderColor:'#CCC',
	borderWidth:2,
	visible:false,
	font:{fontSize:24}
});
viewExerResult.add(retestBtn);
retestBtn.addEventListener('click',function(){
	level_data[cur_level].done = false;
	cur_page = 0;
	total_score = 0;
	scrollView.currentPage = cur_page;
	result_list = [];
	label_page.text = '1/' + exam_data.length;
});

//下一轮测试按钮
var nextBtn = Ti.UI.createButton({
	title:L('next_exam'),
	top:640,
	width:200,
	height:80,
	borderRadius:20,
	borderColor:'#CCC',
	borderWidth:2,
	visible:false,
	font:{fontSize:24}
});
viewExerResult.add(nextBtn);

scroll_views_data.push(viewExerResult);


//滚动分页视图
var scrollView = Titanium.UI.createScrollableView({
	views:scroll_views_data,
	showPagingControl:false,
	pagingControlHeight:30,
	maxZoomScale:2.0,
	currentPage:0,
	scrollingEnabled:false,
});
win.add(scrollView);


var activeView = scroll_views_data[0];

scrollView.addEventListener('scroll', function(e)
{
	return;
	activeView = e.view;  // the object handle to the view that is about to become visible
	//i = e.currentPage;
	//label_page.setText(i + 1 + '/' + exam_data.length);
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

