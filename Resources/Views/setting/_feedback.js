// 
//  _feedback.js
//  LA
//  
//  Created by David on 2012-02-04.
//  Copyright 2012 David. All rights reserved.
// 
var Win = Ti.UI.currentWindow;
Win.backgroundColor = '#DFE2E7';


Titanium.include('/Views/common/helper.js');
//Titanium.include('/api/api.js');

var CurrentAccount = Titanium.App.Properties.getList('account') || [];

CurrentAccount[0] = {_id:1,avatar:'/images/avatar/user.png',user_name:'王小小'};

var user_name = CurrentAccount[0].user_name;



var content_view = Titanium.UI.createView({
	height:340,
	top:0,
	width:526,
	left:0,
})

var content_view_tb = Titanium.UI.createTableView({
	backgroundColor:'transparent',
	backgroundImage:'/images/bg_vertical_01.png',
	backgroundRepeat:true,	// 有 bug 慎用. 2012-02-06 by h2o
	separatorStyle:Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
})
Win.add(content_view_tb);
var content_view_tb_row = Titanium.UI.createTableViewRow({
	//height:400
	height:'auto',
	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
});
content_view_tb_row.add(content_view);
content_view_tb.setData([content_view_tb_row])

var send_btn = Titanium.UI.createButton({
	title:'发送',
	width:120,
	height:38,
})
Win._parent.rightNavButton = send_btn;


send_btn.addEventListener('click', function(e){
	var data = {content:feedback_textarea.value};
	Action.send_feedback(data, e.source);
})

var user_name_lb = Titanium.UI.createLabel({
	text: user_name + '老师 : ',
	top:16,
	left:24,
	height:32,
	width:'auto',
	color:'#888',
	font:{fontSize:18, fontWeight:'bold', fontFamily:'Helvetica Neue'},
	//backgroundColor:'#696',
})
content_view.add(user_name_lb);

var text_padding = [6, 6];
var border_view = Titanium.UI.createView({
	backgroundColor:'#fff',
	width:478,
	height:200,
	top:user_name_lb.height + 22,
	borderRadius:8,
	borderColor:'#999',
	borderWidth:4,
})

// 输入提示
var feedback_textarea_hint = Titanium.UI.createLabel({
	text:'您的意见和建议...',
	textAlign:'center',
	font:{fontSize:22},
	color:'#999',
});
var feedback_textarea = Titanium.UI.createTextArea({
	width:border_view.width-text_padding[1]*2,
	height:border_view.height-text_padding[0]*2,
	top:text_padding[0],
	left:text_padding[1],
	borderRadius:6,
	backgroundColor:'#fff',
	font:{fontSize:18},
	//value:'你好 我是王老师 我有一个建议 希望你们增加一个....blahblah...'
});

feedback_textarea.add(feedback_textarea_hint);
border_view.add(feedback_textarea);
content_view.add(border_view);

feedback_textarea.addEventListener('focus', function(e){
	feedback_textarea.remove(feedback_textarea_hint)
	border_view_borderColor = border_view.borderColor;
	border_view.borderColor = '#963';
})
feedback_textarea.addEventListener('blur', function(e){
	if( !feedback_textarea.value ){
		feedback_textarea.add(feedback_textarea_hint)
	}
	border_view.borderColor = border_view_borderColor;
	border_view_borderColor = null;
})

var loading = Loading();

// 添加 照片 按钮
var attach_photo_btn = Titanium.UI.createButton({
	//title:'发送',
	width:34,
	height:34,
	top:border_view.height + border_view.top - 34,
	left:( Win.width - border_view.width ) / 2,
	backgroundImage:'/images/ico_pic.png',
	opacity:0,
})
content_view.add(attach_photo_btn);
attach_photo_btn.addEventListener('click', function(e){
	
	// 显示图片库
	Titanium.Media.openPhotoGallery({
		allowImageEditing:true,
		success:function(e){
			
			photo_thumb.add(e.media);
			//Action.photo_thumb(e.media);
			/*
			var data = {file: e.media};		// data 中的 file 键值, 对应 php 中的 $_FILES['file']  
		    Action.upload(data);
		    */
		},
		cancel:function(){
		},
		error:function(error){
		}
	});
})

// 上传 进度条
var upload_ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0.1,
	style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	top:border_view.height + user_name_lb.height + 24,
	message:'Uploading Image',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#888'
});
content_view.add(upload_ind);

var uploader_dock = Titanium.UI.createView({
	//backgroundColor:'#369',
	//width:border_view.width + 40,
	height:100,
	//borderRadius:8,
	top:border_view.height + border_view.top + 12,
	//left:( Win.width - border_view.width ) / 2,
})
content_view.add(uploader_dock);


var photo_for_uploads = [];

var photo_thumb = {
	add: function(image){
		var _left = uploader_dock.children ? parseInt( uploader_dock.children.length ) * 104 : 0;
		pr('_left='+_left);
		var photo_for_upload = Titanium.UI.createImageView({
			width:84,
			height:84,
			borderRadius:4,
			opacity:0.9,
			backgroundColor:'#fff',
			shadow:{
				shadowRadius:1,
		        shadowOpacity:0.8,
		        shadowOffset:{x:0, y:0}
			},
			top:10,
			left:( Win.width - border_view.width ) / 2 + _left,
			image:'/002.jpg',
		})
		
		//photo_for_uploads.push(photo_for_upload);
		uploader_dock.add(photo_for_upload);
		
		var photo_for_upload_remove_btn = Titanium.UI.createButton({
			title:'',
			//backgroundImage:'transparent',
			width:24,
			height:24,
			borderRadius:12,
			opacity:1,
			top:-8,
			left:-8,
		})
		photo_for_upload.add(photo_for_upload_remove_btn);
		
		photo_for_upload_remove_btn.addEventListener('click', function(e){
			uploader_dock.remove(this.parent)
		})
		
		photo_for_upload.image = image.imageAsThumbnail(120, 4, 8);
	}
}



var Action = {
	source:{},
	send_feedback: function(data, source){
		if(!data.content){
			alert('您需要先填写内容 再提交')
			feedback_textarea.focus()
			return;
		};
		Action.source = source || {};
		Action.source.enabled = false;
		loading.start('fetch_group_list');
		APP.API.feedback(data, this.send_feedback_callback);
	},
	send_feedback_callback: function(error, data, xhr){
		Action.source.enabled = true;
		loading.end('fetch_group_list');
		if(!error){
			if(data.result == true){
				feedback_textarea.value = null;
				feedback_textarea.blur();
				alert(user_name + "老师, 谢谢您的反馈 \n 我们会以更好的产品回馈您的支持")
			}
		}else{
			APP.API.error_handling(error, xhr)
		}
	},
	upload: function(data){
		loading.start('file_upload');
		upload_ind.show();
		//APP.API.upload(data, this.upload_callback, null, this._upload_ondatastream);
	},
	_upload_ondatastream: function(e){
		pr('in _upload_event')
		upload_ind.value = e.progress ;
	},
	upload_callback: function(error, data, xhr){
		loading.end('file_upload');
		upload_ind.hide();
		if(!error){
			if(data.result == true){
				alert('上传完毕')
			}
		}else{
			APP.API.error_handling(error, xhr)
		}
	},
}





