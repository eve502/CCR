// 
//  _account.js
//  LA
//  
//  Created by admin on 2011-09-21.
//  Copyright 2011 admin. All rights reserved.
// 

var win = Titanium.UI.currentWindow;


Titanium.include('/Views/common/helper.js');
Titanium.include('/Views/lib/cachedImageView.js');
//Titanium.include('/ipad/cloud/sms/sms_api.js');
Titanium.include('/Views/lib/reloader.js');
Titanium.include('/Views/model/user.js');

var loading = Loading();

//var AccountList = Titanium.App.Properties.getList('account') || []; 
//var CurrentAccount = AccountList[0];

var AccountList = [
	{_id:1,avatar:'/images/avatar/user.png',user_name:'王小小'},
	{_id:2,avatar:'/images/avatar/user.png',user_name:'李大大'},
];

///*
var CurrentAccount = {_id:1,avatar:'/images/avatar/user.png',user_name:'王小小'};
//*/

var access_data = {};
var Users = {};

var main_view = Ti.UI.createView({
	top:0,
	width:526,
	left:0,
});

win.add(main_view);


var account_tb = Ti.UI.createTableView({
	//style:Titanium.UI.iPhone.TableViewStyle.NONE,
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	backgroundImage:'/images/bg_vertical_01.png',
	backgroundRepeat:true,
	rowBackgroundColor:'#fff',
	minRowHeight:130,
	top:0,
})

main_view.add(account_tb);

account_tb.addEventListener('click', function(e){
	//APP.weibo.exec.activeAccount( Users[ e.index ] )
})

var account_edit_btn = Titanium.UI.createButton({
	title:'编辑',
})

win._parent.rightNavButton = account_edit_btn;

// 编辑账号 按钮
account_edit_btn.addEventListener('click', function(e){
	account_tb.editing = !account_tb.editing;
})

// 删除账号
account_tb.addEventListener('delete', function(e){
	var account = e.rowData.account;
	//SMS.API.logout_account(account, logout_account_callback)
})


function logout_account_callback(result){
	if(result==1){//注销成功	
			appClear();//清理信息
			//Titanium.App.fireEvent('close_box_group');
			Titanium.App.fireEvent('grantEntrance');				// step2. 触发事件
			//Titanium.App.fireEvent('sms_inbox_destroy');			// 清除 收件箱 计时器 (间隔 5 分钟 check 新收件)
	}else{
		alert('删除失败')
	}
}


/*
 * 
 */
var AccountRender={
	
	/*
	 * 罗列本地账号
	 */
	listLocalAccount: function(accountList,param){
		var AccountList = accountList;  //pr(AccountList);
		var param = param || {};
		//var AccountList = Users;
		var rows = []
		var active = ''
		
		try{
			for(var i=0, n=AccountList.length; i<n; i++){
				var account = AccountList[i];
				active = account.active==1 ? 1 : 0;
				var row = Titanium.UI.createTableViewRow({
					height:'auto',
					selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
					account:account,
				})
				var _account_name_label = Titanium.UI.createLabel({
					color:(active==1 ? '#f63' : '#ccc'),
					//top:10,
					left:140,
					text:account.screen_name || account.user_name,
					width:'auto', 
					height:'auto',
					font:{fontSize:18, fontWeight:'bold', fontFamily:'Helvetica Neue'}
				})
				var _account_type_icon = Titanium.UI.createImageView({
					//image: '/images/ico_'+ account.type +'.png',
					image:AccountList[i].avatar,
					bottom:10,
					right:10,
					width:20,
					height:20,
					opacity:0.9
				})
				var _account_avatar_img = Titanium.UI.createImageView({
					image: AccountList[i].avatar,
					top:16,
					//bottom:10,
					left:16,
					width:96, 
					height:96,
					borderRadius:48,
					//borderColor:'#fff',
					//borderWidth:3,
					backgroundColor:'#fff',
					zIndex:5,
					opacity:0.9,
					shadow0000:{
						shadowRadius:6,
				        shadowOpacity:0.8,
				        shadowOffset:{x:0, y:0}
					},
				})
				var _account_avatar_shadow = Titanium.UI.createView({
					//image: AccountList[i].avatar,
					top:8,
					left:8,
					width:112, 
					height:112,
					borderRadius:30,
					backgroundImage:'/images/bg_circle_middle.png',
					opacity:0.5,
					zIndex:4
				})
				//cachedImageView('avatar', AccountList[i].avatar, _account_avatar_img);
				var force = false;
				force = param.force || force;
				//cachedImageView('avatar', UC_avatar(account.user_id), _account_avatar_img, force);	// true 强制替换缓存
				
				row.add(_account_avatar_shadow)
				row.add(_account_name_label)
				//row.add(_account_type_icon)
				row.add(_account_avatar_img)
				
				rows.push(row)
			}
			account_tb.setData([])
			account_tb.setData(rows)
			Ti.App.fireEvent('rollerBlindEnd');
		}catch(err){
			onError(err)
		}
	}	
}


/*
 * AccountManager [class] -->单账号管理类，过后应该会改成多个账号管理
 * 
 * 
 */

function AccountManager(){
	this.curAccount = null;
	
	/*
	 * 初始化--->显示当前的活动账号列表
	 */
	this.init = function (){
		this.delOtherAcc();
		//AccountRender.listLocalAccount([this.getCurAccount()],{force:1});
		AccountRender.listLocalAccount([this.getCurAccount()],{force:1});
	}
	
	/*
	 * 从数据库中得到当前的账号
	 */
	this.getCurAccount = function () {	
		var curUser = CurrentAccount; //Model.User.getCurrentUser('tlifedu'); Ti.API.info(curUser);
		//var curUser = Model.User.getUserList('tlifedu'); Ti.API.info(curUser); 
		return curUser;	 	
	}
	
	/*
	 * 清理当前账号之外的账号
	 */
	this.delOtherAcc = function(){
		var curAcc = this.getCurAccount();	
		if(curAcc.length < 1){
			Model.User.deleteOtherUser(curAcc._id);
		}
	} 
	
	/*
	 * 下拉刷新,服务器端取出并更新本地的
	 */
}	
function accountUpdate(){
		try{
			//var user = {}			
			var curAcc = aM.getCurAccount();
			var access_data = {
	        	authtype: 'oauth',
	        	oauth_token_key: curAcc.access_key,  
	        	oauth_token_secret: curAcc.access_secret,
	    	}
	        //SMS.API.get_user_info(access_data,updateCallback,curAcc)
			
		}catch(err){
			onError(err)
		}
}

function updateCallback (error, data, xhr){
		var curAcc = this;
		if(!error){
			if(data == ''){//找不到账号，在本地删除
				alert('该账号不存在');
				Model.User.deleteUser(currentAccount._id);
			}
			else if(data.uid){//找到的更新
				var account = {
					user_id: data.uid,
					screen_name: data.nickname || '',		// 昵称
					user_name: data.account,		// 用户名
					avatar: data.avatar || '',			// 头像
					type: 'tlifedu',				// 用户类型 (区分外站用户数据 以后用)
					email: data.email || '',				// email
					phone: data.phone || '',				// 手机
					gender: data.sex,				// 性别
					//access_key: access_data.oauth_token_key,
					//access_secret: access_data.oauth_token_secret,
					active: 1,		// 新登录的用户 默认处于"激活"状态
				}
				// 存入手机db
				var result = SMS.API.save_account_data(account);
				if(result){
					var newAcc = aM.getCurAccount();
					AccountRender.listLocalAccount([newAcc],{force:1});
					Titanium.App.Properties.setList('account',[newAcc]);					
				}		
				
		    }else{
		    	alert('认证错误')
		    }
			
		}else{
			onError(error);
			try{
				if(error.message.status_code == 401){
					alert('认证错误')
				}
			}catch(err){
				alert('认证错误 请您稍后重试')
			}
		}	
		reloader.end();
}


var aM = new AccountManager();
aM.init();
var reloader = PDReload(account_tb, accountUpdate);

//程序退出时执行的一些清理工作
function appClear(){
	Titanium.App.Properties.setList('account', []);	// step1. 清空用户信息缓存
	Titanium.App.Properties.setList('inbox_unread_list', []); //清空未读信息内容
	clearTable();//清理表中数据
}

function clearTable(){	
	var sql = '';
	tableNames = ['sqlite_sequence','setting','cache','account'];
	for(var i in tableNames){
		sql = 'delete from ' + tableNames[i] +';';
		APP.db.execute(sql);
	}	 
}
