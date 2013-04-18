// 
//  common.js
//  LA
//  
//  Created by eve on 2013-4-6.
//  Copyright 2013 eve. All rights reserved.
// 


/*
 * 浏览器 UA 定制
 * (没有设置的话 Ti会自动修改为Ti定制的值. 所以这里定制下. 这里还要修改为自动监测 然后赋值)
 * 
 */


// Ti.userAgent 
// Appcelerator Titanium/1.8.1 (iPad Simulator/5.0; iPhone OS; en_US;)
//APP.User_Agent = "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)"
APP.User_Agent = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5";
Ti.App.Properties.setString('User_Agen', APP.User_Agent);

Ti.API.info( Ti.userAgent );



/*
 * 定义 res 目录名称
 * 所有的用户 res 都归类在该目录下 (目前 cachedImageView.js 用到)
 * res:
 *	- avatar
 * 	- others
 * 
 */
Ti.App.Properties.setString('resDirname', 'res');
