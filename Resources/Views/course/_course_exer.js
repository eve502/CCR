/*
 * 课程练习页
 */

var data_exam = [
	{score:25,question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]},
	{score:25,question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]},
	{score:25,question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]},
	{score:25,question:'买一个本子要8元，有6元4角，还差多少钱？', answers:[
		{cont:'1元6角',result:true},
		{cont:'2元',result:false},
		{cont:'2元4角',result:false},
		{cont:'1元2角',result:false}
	]}
];

var cur_page = 1; //当前题目
var cur_level = 0; //当前测试级别
var total_score = 0; //题目测试得分
var result_list = []; //测试结果列表（对or错）

var data_level = ['初级篇','中级篇','高级篇'];


var viewExer = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

//题目内容显示区域
var viewCurEaxm = Ti.UI.createView({
	width:720,
	height:710,
	top:0
});

//测试完成显示区域
var viewResult = Ti.UI.createView({
	width:720,
	height:710,
	top:0
});

//测试结果列表
var viewResultList = Ti.UI.createView({
	width:720,
	height:830,
	top:0
});

//页面内容初始化
createViewCurExam();

//跳过按钮
var pass_btn = Ti.UI.createButton({
	title:L('pass'),
	top:730,
	width:300,
	height:80,
	borderRadius:20,
	borderColor:'#DFE2E7',
	borderWidth:2
});

pass_btn.addEventListener('click',function(){
	if(cur_page < data_exam.length){
		//进入下一个测试题目
		cur_page++;	
		clearViewCurExam();	
		createViewCurExam();
	}else{
		//进入测试结果页面
		pass_btn.hide();
		clearViewCurExam();
		createViewResult();
	}
});

viewExer.add(pass_btn);

win.add(viewExer);

function removeViewResult()
{
	viewExer.remove(viewResult);
}

function createViewResult()
{
	viewExer.add(viewResult);
	
	var resultWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:200,
		top:100,
		font:{fontSize:28},
	});
	
	viewResult.add(resultWrap);
	
	if(total_score >= 80){
		var exam_result = total_score + '分，恭喜您！可以进入下一轮测试啦！ 可点击“下一轮测试”开始。';
	}else{
		var exam_result = total_score + '分，继续努力，达到80分就可以进入下一轮测试喽！';
	}
	
	var label_result = Ti.UI.createLabel({
		text:exam_result,
		fontSize:32,
	});
	
	resultWrap.add(label_result);
	
	//查看测试结果按钮
	var viewResultBtn = Ti.UI.createButton({
		title:L('view_result'),
		top:630,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2
	});
	
	viewResult.add(viewResultBtn);
	viewResultBtn.addEventListener('click',function(e){
		pass_btn.hide();
		removeViewResult();
		createResultList();
	});
	
	//下一轮测试按钮
	var nextBtn = Ti.UI.createButton({
		title:L('next_exam'),
		top:730,
		width:300,
		height:80,
		borderRadius:20,
		borderColor:'#DFE2E7',
		borderWidth:2
	});
	
	viewResult.add(nextBtn);
}

function createResultList()
{
	viewExer.add(viewResultList);
	
	var data_result = [],image;

	for(i=0;i<data_exam.length;i++){
		result_list[i] == 1  ? image = '/images/icon/icon_right.png' : image = '/images/icon/icon_wrong.png';
		data_result.push({title:data_exam[i].question,leftImage:image,hasChild:true});
	}	
	
	var resultListTb = Ti.UI.createTableView({
		data:data_result,
		borderRadius:10,
		borderColor:'#DFE2E7',
		borderWidth:2
	});
	
	viewResultList.add(resultListTb);
}

function clearViewCurExam()
{
	viewExer.remove(viewCurEaxm);
}

//页面内容创建
function createViewCurExam()
{
	viewExer.add(viewCurEaxm);
	
	var label_exer = Ti.UI.createLabel({
		text:'    课堂练习 - ' + data_level[cur_level],
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
	
	viewCurEaxm.add(label_exer);
	
	var label_page = Ti.UI.createLabel({
		text:cur_page + '/' + data_exam.length,
		top:0,
		right:20,
		width:700,
		height:80,
		color:'#FFF',
		font:{fontSize:32},
		textAlign:'right'
	});
	
	viewCurEaxm.add(label_page);
	
	//当前页面问题描述
	var exerWrap = Ti.UI.createView({
		borderRadius:20,
		borderWidth:10,
		borderColor:'#DFE2E7',
		width:720,
		height:200,
		top:100,
	});
	
	viewCurEaxm.add(exerWrap);
	
	var label_question = Ti.UI.createLabel({
		text:data_exam[cur_page-1].question,
		fontSize:28
	});
	
	exerWrap.add(label_question);
	
	//当前页面题目选项按钮
	var cur_answers = data_exam[cur_page-1].answers; 
	var cur_answers_len = cur_answers.length; 

	var title_list = [];
	
	for(i=0;i<cur_answers_len;i++)
	{
		//Ti.API.info('i=' + i);
		var answer_btn = Ti.UI.createButton({
			title:cur_answers[i].cont,
			top:320 + i*100,
			width:500,
			height:90,
			borderRadius:20,
			borderColor:'#DFE2E7',
			borderWidth:2
		});	
		viewCurEaxm.add(answer_btn);
		
		title_list.push(cur_answers[i].cont);
		
		//按钮事件
		answer_btn.addEventListener('click',function(e){
			var title = e.source.title;
			var index = inArray(title,title_list);
			
			Ti.API.info('index='+index);
			
			var isRight = cur_answers[index].result;
			
			if(isRight){
				var cur_score = data_exam[cur_page-1].score;
				total_score += cur_score;
				result_list.push(1);
			}else{
				result_list.push(0);
			}
			
			if(cur_page < data_exam.length){
				//进入下一个测试题目
				cur_page++;	
				clearViewCurExam();	
				createViewCurExam();
			}else{
				//进入测试结果页面
				pass_btn.hide();
				clearViewCurExam();
				createViewResult();
			}
		});
		
	}
}


/*
 * @string
 * @array
 */
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return i;
        }
    }
    return -1;
}



