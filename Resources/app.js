// 
//  app.js
//  LA
//  
//  Created by eve on 2013-4-6
//  Copyright 2013 eve. All rights reserved.
// 


// 程序入口文件

// 调试模式(必须设置 true 或者 false)
if(Titanium.Platform.model == 'Simulator' && 1==2){
	Ti.API.info("DEBUG_MODE = true")
	Titanium.App.Properties.setBool('DEBUG_MODE', true);
}else{
	Ti.API.info("DEBUG_MODE = false")
	Titanium.App.Properties.setBool('DEBUG_MODE', false);
}






// 程序启动参数
var LAUNCH_ARGS = Titanium.App.getArguments();
Ti.API.info('LAUNCH_ARGS', LAUNCH_ARGS);
Ti.API.info(Titanium.App);

Ti.API.info(Titanium.Network.networkType)
Ti.API.info(Titanium.Network.networkTypeName)


if(Titanium.Network.online == true){
	if(Titanium.Network.networkTypeName=='WIFI'){	// 如果是 wifi 连接
		
	}
}else{
	//alert('需要网络连接');
}


// namespace
var APP = {};

//currentUser
var currentUser = {};	 // 集成微博用.


// settings
APP.theme = 'default';

Ti.API.info( Titanium.Platform.model );
Ti.API.info( Ti.Platform.osname );

// include helper functions
Ti.include('/Views/common/common.js')
Ti.include('/Views/common/helper.js')
Ti.include('utils.js')


APP.showWelcomeScreen = false	// show welcome screen after user login


// setup view
initMainView();

// test for iOS 4+
function isiOS4Plus(){
    if (Titanium.Platform.name == 'iPhone OS'){
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0]);
        // can only test this support on a 3.2+ device
        if (major >= 4){
            return true;
        }
    }
    return false;
}
if (isiOS4Plus()){ 
    var service;
 
    // Ti.App.iOS.addEventListener('notification',function(e){
        // You can use this event to pick up the info of the noticiation.
        // Also to collect the 'userInfo' property data if any was set
        // Ti.API.info("local notification received: "+JSON.stringify(e));
    // });
 
    // fired when an app resumes from suspension
    Ti.App.addEventListener('resume',function(e){
        Ti.API.info("app is resuming from the background");
        
    });
    Ti.App.addEventListener('resumed',function(e){
        Ti.API.info("app has resumed from the background");            
        /*
         * 处理收件箱新短信列表用 
         */
       	Titanium.App.fireEvent('insert_new_sms_by_list', {});       
        if(service!=null){
            service.stop();
            service.unregister();
        }     
    });
 
    Ti.App.addEventListener('pause',function(e){
        Ti.API.info("app was paused from the foreground"); 		
 		/*
 		 * 初始化某些东西
 		 */	 		
        service = Titanium.App.iOS.registerBackgroundService({
        	url:'/lib/background_services.js'
        });        
        Ti.API.info("registered background service = "+service); 
    }); 
}

/*
 * 做些程序一开始的初始化工作
 */
(function(){
	Ti.App.addEventListener('init',function(e){
        
 		
    }); 
})()




