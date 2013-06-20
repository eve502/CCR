// 
//  database.js
//  LA
//  
//  Created by h2o on 2011-09-19.
//  Copyright 2011 h2o. All rights reserved.
// 

var DEBUG_MODE = Titanium.App.Properties.getBool('DEBUG_MODE');
// 导入数据库操作文件
var APP = APP || {};

APP.db = {
	init: function(){
		
		if(DEBUG_MODE===true){
			pr( 'db.init' )
		}
		this.DB = Ti.Database.install('/db/appdb.db', 'appdb')
		this.columns = {
			// 账号
			account:[
				"_id",
			    "user_id",
			    "user_name",
			    "type",
			    "avatar",
			    "email",
			    "phone",
			    "access_key",
			    "access_secret",
			    "screen_name",
			    "location",
			    "gender",
			    "active",
			    "user_identity"			    
			],
			// 设置
			setting:[
				"_id",
				"key",
				"value"
			],
			// 短信(收件/发件)
			cache_sms_message:[		// 该表字段命名等待优化. 2011-11-16 h2o
				"_id",
				"msg_id",
				"content",
				"created_at",
				"object",
				"is_read",
				"is_dir",
				"type",
				"receiver",
				//"receiver_id",
				"sender",
				"sender_id",
				"table_flag",			// 标记:  0=收件箱,  1=发件箱
			],
			// 分组
			cache_group_list:[
				"_id",
				"group_id",			// 组id (如果分组是班级的话 这里就是班级id)
				"group_name",		// 组名 (或者 班级名)
				"group_desc",		// 组描述文字
				"group_type",		// 组类型 [学生组, 教师组, ]	1:学生组(即 家长组), 2:教师组, 3:用户自定义组(目前 服务器没有该分类)
				"color_label",		// 色彩标签 ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray']
				"is_public",		// 是否公用 1:公用		0:私用
				"last_used_at",		// 最后使用的时间 '2011-10-10 18:30:00'
				"last_update_at",	// 组最后的修改时间 (修改包括: 1:组基本信息修改. 2:组成员信息修改)
				"owner_id",			// 组创建人 (对应 服务器上的 user_id )
				"school_id",		// 该分组所关联的学校 (组创建人 可能在多个学校任教, 进入不同学校 读取不同的组列表)
			],
			// 分组成员
			cache_group_member_list:[
				"_id",
				"member_id",			// 成员 user_id
				"member_name",		// 成员名
				"order",			// 成员(组内)排序
				"group_id",			// 所属分组
				"flag",				// 是否能使用短信服务 (用途: 未开通短信服务的组员 发送短信时, 成员名会有特殊标记标注)
			],
			
			// 
			client_account_data:[
				"_id",
				"account_id",		// 账号id
				"schools",			// 该账号关联的学校
				"all_groups",		// 该账户关联的所有分组 (包括"班级" <短信沟通> 发短信用)
				"custom_groups",	// 该用户关联的所有自定义分组 ("班级"之外的分组. <短信沟通>组管理用. 组管理 不允许管理"班级"组)
			],
			
			// 
			client_group_member_list:[
				"_id",
				"group_type",		// 组类型 [学生, 老师]
				"group_id",			// 
				"members",			// 组成员
			],
			
			/*
			 * 缓存 - >采用db来实现应用级别的缓存。
			 */
			cache:[
				"_id",
				"inbox_new_data"	//收件箱后台运行时保持的最新信息列表缓存
			]
		}
	},
	
	execute: function(sql, colums){
		
		// for SELECT
		if(!isEmpty(colums)){
			var rows = this._execute(sql);
			var outputRes = [];
			
		        while (rows.isValidRow()){
		            var rowRes = {};
		            for (c in colums){
		                rowRes[ colums[c] ] = rows.fieldByName( colums[c] ) || '';
		            }
		            outputRes.push(rowRes);
		            rows.next();
		        }
		        rows.close();
			
	       return outputRes;
      
      // INSERT .. 
      }else{
      	this._execute(sql);
      }
	},
	
	getAll: function(table, param){
		
		param = this._parse(param);
						
		var sql = 'SELECT * FROM '+table+' ' + param;
		
		var rows = this._execute(sql);
		var outputRes = [];
			try{
		        while (rows && rows.isValidRow()){
		            var colums = this.columns[table];
		            var rowRes = {};
		            for (c in colums){
		                rowRes[ colums[c] ] = rows.fieldByName( colums[c] ) || '';
		            }
		            outputRes.push(rowRes);
		            rows.next();
		        }
		        rows.close();
			}catch(err){
				onError(err);
				try{
					rows.close();
				}catch(err2){
					onError(err2);
				}
			}
		
       return outputRes;

	},
	getOne: function(table, param){
		param = this._parse(param);
		var sql = 'SELECT * FROM '+table+' ' + param; 
		if( sql.indexOf('limit')<0 ){
			sql = sql+' limit 1';
		}
		pr( sql );
		var row = this._execute(sql); 
		var rowRes = {}; 
			try{
				if(row && row.isValidRow()){
					var colums = this.columns[table];
		            for (c in colums){
		                rowRes[ colums[c] ] = row.fieldByName( colums[c] ) || '';
		            }
				}
				row.close();
			}catch(err){
				onError(err);
			}
		return rowRes;
	},
	update: function(table, data, param, elseinsert, data_for_insert){	// elseinsert default: false
		
		//pr( 'in db update' )
		//pr( data )
		//pr( param )
		//pr( elseinsert )
		
		var res = this.getAll(table, param)
		//pr(res)
		if(res.length>0){
			//update recorder
			var sets = ''
			
			for(var k in data){
				var v = data[k];
				if(typeof(v)=='string'){
					v = v.replace(/'/g, '"');
				}
				sets += sets ? ', ' : '';
				sets += k+"='"+v+"'";
			}
			var sql = 'UPDATE '+table+' SET '+sets+' '+param;	
				
			this._execute(sql);
			return this.DB.rowsAffected
			
		}else if(elseinsert){
			var keys = '';
			var vals = '';
			for(var k in data_for_insert){
				
				var v = data_for_insert[k];
				if(typeof(v)=='string'){
					v = v.replace(/'/g, '"');
				}
				
				keys += keys ? ', ' : '';
				keys += k;
				vals += vals ? ', ' : '';
				vals += "'" +v+ "'";
			}
			// insert new one
			var sql = 'INSERT INTO '+table+' ('+keys+') VALUES ('+vals+')'
			this._execute(sql);
			return this.DB.lastInsertRowId
		}else{
			// do nothing
			if(DEBUG_MODE===true){
				pr('db无操作')
			}
		}
	},
	insert: function(table, data){
		
		
		if(DEBUG_MODE===true){
			pr( 'insert' )
			pr( data )
		}
		
		var keys = '';
		var vals = '';
		for(var k in data){
			var v = data[k];
			if(typeof(v)=='string'){
				v = v.length>0 ? v : '';
				v = v.replace(/'/g, '"');	// 过滤单引号
			}
			if(typeof(v)=='undefined'){
				v = '';
			}
			
			keys += keys ? ', ' : '';
			keys += '"' +k+ '"';
			vals += vals ? ', ' : '';
			vals += "'" +v+ "'";
		}
		// insert new one
		var sql = 'INSERT INTO '+table+' ('+keys+') VALUES ('+vals+')'
		//pr('execute='+ sql )
		this._execute(sql);
		return this.DB.lastInsertRowId
	},
	
	remove: function(table, param){
		if(DEBUG_MODE===true){
			pr( 'remove' )
			pr( param )
		}
		
		param = this._parse(param);
		// insert new one
		var sql = 'DELETE FROM '+table+' '+param
		
		this._execute(sql);
		return this.DB.rowsAffected
	},
	
	_execute: function(sql){
		
		if(DEBUG_MODE===true){
			pr('DB execute : '+ sql )
		}
		
		try{
			return this.DB.execute(sql);
		}catch(err){
			onError(err);
		}
	},
	_parse: function(param){
		var _param = '';
		
		// 'limit 1,4' where id=4 ... 
		if(typeof(param)=='string'){
			_param = param;
		}
		return _param;
	}
}

APP.db.init();








