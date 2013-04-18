// 
//  analytics.js
//  LA
//  
//  Created by eve on 2013-04-12.
//  Copyright 2013 eve. All rights reserved.
// 

var User = {};

function isEmpty(obj){
	for ( var prop in obj ) {
		return false;
	}
	return true; 
}
var _account = Titanium.App.Properties.getList('account');
if(typeof(_account) == 'object'){
	if(!isEmpty(_account)){
		User.user_id = _account[0].user_id;
		User.geo = _account[0].geo || [];
	}
}


// 程序使用统计分析

//if( typeof(Analytics) != 'object' ){
//	var Analytics = require('/common/analytics')
//}
// var A = new Analytics('sms')   or   var A = new Analytics()
// A.featureEvent(e)  or  A.featureEvent(e, {somekey: somevalue, })

// @true : 只在 IDE Console 输出事件. 不发送至远程服务器
// @false : Analytics data send to remote servers.
var LOCAL_DEBUG = false;


var info = Ti.API.info;

var Console = {
	Log: {
		featureEvent:function(event, data){
			info('Console.Log.featureEvent')
			info('event='+event)
			info('data=', data)
		},
		navEvent:function(event, data){
			info('Console.Log.navEvent')
			info('event='+event)
			info('data=', data)
		},
		settingEvent:function(event, data){
			info('Console.Log.settingEvent')
			info('event='+event)
			info('data=', data)
		},
		timedEvent:function(event, data){
			info('Console.Log.timedEvent')
			info('event='+event)
			info('data=', data)
		},
		userEvent:function(event, data){
			info('Console.Log.userEvent')
			info('event='+event)
			info('data=', data)
		}
	}
}

// 
function Analytics(identify) {
    this.identify = identify || {}
    if(LOCAL_DEBUG == true){
    	this.Analytics = Console.Log;
    }else{
    	this.Analytics = Titanium.Analytics;
    }
}


Analytics.prototype.featureEvent = function(event, data) {
	var new_data = {
		id:this.identify,
		data: data || '',
		user:User
	};
    this.Analytics.featureEvent(event, new_data)
};

Analytics.prototype.navEvent = function(event, data) {
	data = data ? data : this.identify;
    this.Analytics.navEvent(event, data)
};

Analytics.prototype.settingsEvent = function(event, data) {
	var new_data = {
		id:this.identify,
		data: data || '',
		user:User
	};
    this.Analytics.settingsEvent(event, new_data)
};

Analytics.prototype.timedEvent = function(event, data) {
	data = data ? data : this.identify;
    this.Analytics.timedEvent(event, data)
};

Analytics.prototype.userEvent = function(event, data) {
	data = data ? data : this.identify;
    this.Analytics.userEvent(event, data)
};


// 
module.exports = Analytics;


