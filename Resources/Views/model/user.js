// 
//  user.js
//  LA
//  
//  Created by h2o on 2011-11-06.
//  Copyright 2011 h2o. All rights reserved.
// 

Ti.include('/Views/lib/database.js');

var Model = {};


Model.User = {
	getCurrentUser: function(type){
		var user = {};
		if(type){
			// 多用户的话 就取最后添加的那个用户
			user = APP.db.getOne('account', " where type ='"+type+"' and active=1 order by _id desc limit 1");
		}
		return user;
	},
	getUserList:function(type){
		var user = {};
		if(type){
			// 多用户的话 就取最后添加的那个用户
			user = APP.db.getAll('account', " where type ='"+type+"'");
		}
		return user;
	},
	/*
	 * 删除单个用户
	 */
	deleteUser:function(id){
		var sql = "delete from account where _id = " + id.toString();
		return APP.db._execute(sql);
	},
	/*
	 * 删除其它账号保留一个
	 */
	deleteOtherUser:function(id){		
		var sql = "delete from account where _id != " + id.toString();
		return APP.db._execute(sql);
	},
	removeAccount: function(param){
		var user_id = param.user_id;
		var type = param.type;
		var where = 'user_id="'+user_id+'" AND type="'+type+'" ';
		var result = APP.db.remove('account', ' where '+where);
		return result;
	}
};
Model.User.UserManager = function(){
	this.userLIst = [];//用户列表信息
	
	
	
}











/*
 * 
 */
function getAllUsers(){
	//pr('getAllUsers')
	var users = APP.db.getAll('account');
	return users;
}

/*
 * 
 */
function getCurrentUser(type){
	var user = {};
	if(type){
		user = APP.db.getOne('account', ' where type ="'+type+'" and active=1 limit 1');
	}
	return user;
}

/*
 * 
 */
function getUsers(param){
	//pr('getUsers')
	var users = APP.db.getAll('account', param );
	return users;
}

/*
 * 
 */
function saveUser(Data, AuthInfo){
	//pr('in saveUser')
	
	
	try{
		// save to db
		var account = {
			user_id: Data.id,							// id = 2272833077;
			user_name: Data.name,							// name = m1840;
			screen_name: Data.screen_name,				// "screen_name" = m1840;
			//t_url: Data.t_url,						// "t_url" = "http://weibo.com/2272833077";
			gender: Data.gender,						// gender = m;
			//location: Data.location, 					// location = "\U5176\U4ed6";
			avatar: Data.profile_image_url				// "profile_image_url" = "http://tp2.sinaimg.cn/2272833077/50/0/1";
			//province: Data.province,					// province = 100;		
		};
		
		//pr( 'bef update db &&&&&&&&&&&&&&&&&&&&&&&& 00' )
		//pr( AuthInfo )
		//pr( Data )
		
		
		var blogtype = Data.blogType;
		
		if(AuthInfo){
			blogtype = blogtype || AuthInfo.blogtype;
			
			var key 	= AuthInfo.oauth_token_key; 
			var secret 	= AuthInfo.oauth_token_secret;
			if(key && secret) {
				account['access_key'] 	 = key;
				account['access_secret'] = secret;
			}
			
		}else{
			blogtype = blogtype || Data.type;
		}
		
		var user_id = Data.id || Data.user_id;
		
		
		
		if(blogtype && user_id){
			account['type'] = blogtype;			// tsina, tqq, ...
			var result = APP.db.update('account', account, "   where user_id=\"" +user_id+ "\" and type=\"" +blogtype+ "\" "  , true)
			//pr( 'result=' )
			//pr( result )	// result = 1
			return result;
		}else{
			onError('needed user_id and blogtype(uid='+user_id+'; blogtype='+blogtype+')')
			alert('miss ID and TYPE!!')
		}
	}catch(error){
		onError('saveUser err')
		onError(error)
		Errors = error;
	}
}


/*
 * 
 */
function updateAccount(user){
	//pr('in saveUser')
	
	
	try{
		account = user;
		delete account._id;		// remove Auto_Increment field  [ _id ]
		
		var user_id = account.user_id;
		var type = account.type;	
		
		if(type && user_id){
			//var result = APP.db.update('account', account, "   where user_id=\"" +user_id+ "\" and type=\"" +type+ "\" "  , false)
			var result = APP.db.update('account', account, "   where user_id=\"" +user_id+ "\" and type=\"" +type+ "\" "  , false)
			return result;
		}else{
			onError('needed user_id and type(uid='+user_id+'; type='+type+')')
			alert('miss ID and TYPE!!')
		}
	}catch(error){
		onError('updateUser err')
		onError(error)
		Errors = error;
	}
}
