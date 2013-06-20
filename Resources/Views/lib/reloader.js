
/*
 * @tableView: tableview
 * @task: function to call
 * @param: (Array)param for @task	eg: param = [arg1, arg2, ..]
 * 
 */
function PDReload(tableView, task, param){

	//var win = Ti.UI.currentWindow;
	
	function formatDate()
	{
		var date = new Date();
		var datestr = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
		if (date.getHours()>=12){
			datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
		}else{
			datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
		}
		return datestr;
	}
	
	var border = Ti.UI.createView({
		backgroundColor:"#999",
		height:6,
		bottom:0
	});
	
	var tableHeader = Ti.UI.createView({
		backgroundColor:"#eee",
		width:320,
		height:60
	});
	
	// fake it til ya make it..  create a 2 pixel
	// bottom border
	tableHeader.add(border);
	
	var arrow = Ti.UI.createView({
		backgroundImage:"/images/whiteArrow.png",
		width:23,
		height:60,
		bottom:10,
		left:20
	});
	
	var statusLabel = Ti.UI.createLabel({
		text:"下拉刷新内容...",
		left:55,
		width:200,
		bottom:30,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:13,fontWeight:"bold"},
		//shadowColor:"#999",
		//shadowOffset:{x:0,y:1}
	});
	
	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"最新数据: "+formatDate(),
		left:55,
		width:200,
		bottom:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		//shadowColor:"#999",
		//shadowOffset:{x:0,y:1}
	});
	
	var actInd = Titanium.UI.createActivityIndicator({
		left:20,
		bottom:13,
		width:30,
		height:30
	});
	
	tableHeader.add(arrow);
	tableHeader.add(statusLabel);
	tableHeader.add(lastUpdatedLabel);
	tableHeader.add(actInd);
	
	tableView.headerPullView = tableHeader;

	
	
	
	var pulling = false;
	var reloading = false;
	
	var rollerBlind = {
		start: function(){
			pr(task);
			pr(param);
			try{
				if(param){			
					task(param.join(','))
				}else{
					task()
				}
				//callback()
			}catch(err){
				pr('in beginReloading')
				onError(err.message)
			}finally{
				//endReloading()
				//setTimeout(endReloading,500);
			}
		},
		end: function(){
			// when you're done, just reset
			tableView.setContentInsets({top:0},{animated:true});
			reloading = false;
			lastUpdatedLabel.text = "最新数据: "+formatDate();
			statusLabel.text = "下拉刷新内容...";
			actInd.hide();
			arrow.show();
		},
		setTips: function(data){
			var text = data.text
			var percent = data.percent
			if(text){
				//lastUpdatedLabel.text = "最新数据: "+text;
			}
			lastUpdatedLabel.text = Math.floor(percent*100)+'%';
		}
	}
	
	tableView.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		if (offset <= -65.0 && !pulling)
		{
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			pulling = true;
			arrow.animate({transform:t,duration:180});
			statusLabel.text = "放开刷新...";
		}
		else if (pulling && offset > -65.0 && offset < 0)
		{
			pulling = false;
			var t = Ti.UI.create2DMatrix();
			arrow.animate({transform:t,duration:180});
			statusLabel.text = "下拉刷新内容...";
		}
	});
	
	tableView.addEventListener('scrollEnd',function(e)
	{
		if (pulling && !reloading && e.contentOffset.y <= -65.0)
		{
			reloading = true;
			pulling = false;
			arrow.hide();
			actInd.show();
			statusLabel.text = "正在读取...";
			tableView.setContentInsets({top:60},{animated:true});
			arrow.transform=Ti.UI.create2DMatrix();
			//beginReloading();
			rollerBlind.start();
			
			if( typeof(A) == 'object' ){
				var analytics_data = ''
				if( typeof(tableView.analytics) != 'undefined'){
					analytics_data = tableView.analytics;
				}
				if(A instanceof Analytics) A.featureEvent(e, analytics_data);	// 日志
			}
		}
	});
	
	Titanium.App.addEventListener('rollerBlindEnd', function(e)
	{
		//rollerBlind.end()
		setTimeout(rollerBlind.end,500);
	})
	
	return rollerBlind;

}
