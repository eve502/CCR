// 
//  helper.js
//  CCR
//  
//  Created by eve on 2013-4-7.
//  Copyright 2013 eve. All rights reserved.


// Ti.UI. shadow module
//require('ti.viewshadow');


var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
Ti.App.SCREEN_WIDTH = (pWidth > pHeight) ? pHeight : pWidth;
Ti.App.SCREEN_HEIGHT = (pWidth > pHeight) ? pWidth : pHeight;



function Loading(){
	
	/*
	queue = [
		'name_01',
		'name_02',
	]*/
	
	// 请求序列
	//XMLHttpRequest (XHR) is an API available in web browser scripting languages such as JavaScript.
	var queue = Titanium.App.Properties.getList('xhr_queue');  
	
	queue = queue || []
	
	var indWin = Titanium.UI.createWindow({
		height:150,
		width:150,
		opacity:0,
		zIndex:50,	// top of all !!
	})
	// black view
	var indView = Titanium.UI.createView({
		height:150,
		width:150,
		backgroundColor:'#000',
		borderRadius:10,
		opacity:0.8
	});
	// message
	var message = Titanium.UI.createLabel({
		color:'#fff',
		width:'auto',
		height:'auto',
		font:{fontSize:20,fontWeight:'bold'},
		bottom:20
	});
	var actInd = Titanium.UI.createActivityIndicator({
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:30,
		width:30
	});
	
	indWin.add(indView);
	indView.add(actInd);
	indView.add(message);

	indWin.addEventListener('click', function(){
		loader.end();
	})
	
	var loading =  false;
	var loader = {
		start: function(name, text){
			
			// 序列中, 记录 name
			if(name){
				
				queue.push(name)
				
				//if(loading == false){
				loading = true;
				indWin.open({opacity:1,duration:800});
				actInd.show();
				//}
				message.text = L(text) || null;
			}
		},
		end: function(name){
			if(name){
				var pos = queue.indexOf(name);
				queue.splice(pos, 1)	// remove name
					
				if(queue.length<=0){
					loading = false;
					actInd.message = null;
					indWin.close();
					actInd.hide();
				}else{
					//
				}
			}
		}
	}
	return loader;
	
}

//
// Add global event handlers to hide/show custom indicator
//
Titanium.App.addEventListener('show_indicator', function(e)
{
	showIndicator(e);
})
Titanium.App.addEventListener('hide_indicator', function(e)
{
	hideIndicator();
})




// create button by eve

var UIB = {
	navButtonBack: function(text){
		text = text || 'Back'
		
		var button = Titanium.UI.createButton({
			backgroundImage:'/images/bg_btn_back.png',
			width:50,
			height:30
		})
		var label = this.ButtonLabel(text)
		button.add(label)
		return button
	},
	ButtonLabel: function(text, font, color, shadow){
		var shadow = shadow || {};
		font = font || {fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'}
		color = color || '#fff'
		shadow_color = shadow.color || '#333';
		shadow_offset = shadow.offset || {x:0, y:-1};
		var label = Ti.UI.createLabel({
			text:L(text),
			color:color,
			top:-2,
			left:1,
			textAlign:'center',
			font:font,
			shadowColor:shadow.color,
			shadowOffset:shadow_offset,
			opacity:0.9
		})
		return label;
	}
}

//递归删除view内的所有子元素
function emptyAllChildren(view)
{
	if(view.children){
		var viewLen = view.children.length;
		
		if(viewLen > 0)
		{
			emptyAllChildren(view.children[view.children.length-1]);		
			for(i=0;i<viewLen;i++)
			{
				view.remove(view.children[view.children.length-1]);
			}		
		}
	}		
}

// check object if empty
function isEmpty(obj){
	for ( var prop in obj ) {
		return false;
	}
	return true; 
}

/*
 * 判断字符串 是否是有效的日期格式
 */
function isDate(str){
	if(typeof(str)=='string' && str.length>0){	// 2011-11-11 18:00:00
		var date_int = Date.parse(str.replace(/-/g, "/"));
		var d = new Date(date_int);
		try{
			d.getFullYear()
			return true;
		}catch(err){
			return false;
		}
	}else{
		return false;
	}
}

// var str=URLencode("abc+")
function URLencode(sStr){
	//return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
	return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F').replace(/\:/g,'%3A').replace(/\ /g,'%20');
}


/*
 * date: Date Object
 * type: 1,2,3,4,5,6,...
 */
function dateFormat(date, type){
	var d = {};
	if(date==''){
		return '';
	}
	if(typeof(date)=='string'){	// 2011-11-11 18:00:00
		var date_int = Date.parse(date.replace(/-/g, "/"));
		d = new Date(date_int);
	}else if(typeof(date)=='number'){	// dateline
		d = new Date(date);
	}else if(typeof(date)=='object'){	// new Date()
		try{
			date.getFullYear()
			d = date;
		}catch(err){
			
		}
	}else{
		d = new Date();
	}
	
	var D = {
		year : d.getFullYear(),
		month : d.getMonth(),
		day : d.getDate(),
		hours : d.getHours(),
		minutes : d.getMinutes(),
		seconds : d.getSeconds(),
		milliseconds : d.getMilliseconds(),
		week:d.getDay(),
	}
	var week = '周' + '日一二三四五六'.charAt(D.week)
	D.week = week;
	
	if(typeof(type)=='undefined'){
		return D;
	}
	//
	var day=D.day, month=D.month+1, year=D.year, hours=D.hours, minutes=D.minutes, seconds=D.seconds, week=D.week;
	    hours = (hours < 10) ? '0'+hours : hours;
	    minutes = (minutes < 10) ? '0'+minutes : minutes;
	    seconds = (seconds < 10) ? '0'+seconds : seconds;
	    month = (month < 10) ? '0'+month : month;
	    day = (day < 10) ? '0'+day : day;
	var meridian = (hours < 12) ? '上午' : '下午';
	var newdate = '';
	//
	
	// 2011年10月22日 周六 上午 18:30
    if(type==1){
    	newdate = year +'年'+ month +'月'+ day +'日' +' ('+ week +') '+ meridian +' '+ hours +':'+ minutes;
    
    // 2011-10-22 周六 18:30
    }else if(type==2){
    	newdate = year +'-'+ month +'-'+ day +'' +' ('+ week +') '+ hours +':'+ minutes;
    
    // 今天 上午 18:30;  2011年10月23日 上午 18:30
    }else if(type==3){
    	var now = new Date();
    	if( year==now.getFullYear() && month==now.getMonth()){
    		var d = ['今天', '明天', '后天']; 
    		newdate = d[ (day-now.getDate()) ] || (month +'月'+ day +'日');
    	}else{
    		newdate = (month +'月'+ day +'日')
    	}
    	newdate = newdate+' '+meridian +' '+ hours +':'+ minutes;
    
    // 今天 ; 明天; 10月23日; 
    }else if(type==4){
    	var now = new Date();
    	if( year==now.getFullYear() && month==now.getMonth() ){
    		var d = ['今天', '明天', '后天']; 
    		newdate = d[ (day-now.getDate()) ] || (month +'月'+ day +'日');
    	}else{
    		newdate = (month +'月'+ day +'日')
    	}
    	newdate = newdate;
    
    // 今天18:30 ; 明天18:30; 10月23日; 
    }else if(type==5){
    	var now = new Date();
    	if( year==now.getFullYear() && month==now.getMonth() ){
    		var d = ['今天', '明天', '后天']; 
    		newdate = d[ (day-now.getDate()) ];
    		newdate = newdate ? newdate+(hours +':'+ minutes) : (month +'月'+ day +'日'+ week);
    	}else{
    		newdate = (month +'月'+ day +'日')
    	}
    	newdate = newdate;
   	
   	// 10月22日 周六 上午 18:30
    }else if(type==6){
    	newdate = month +'月'+ day +'日' +' ('+ week +') '+ meridian +' '+ hours +':'+ minutes;
    
    
    // 2011-10-22 18:30:00
    }else if(type==0){
    	newdate = year +'-'+ month +'-'+ day +'' +' '+ hours +':'+ minutes +':'+ seconds;
    
    
    // 默认最简输出
    // 2011-10-22 18:30
    }else if(type==7){
    	newdate = year +'-'+ month +'-'+ day +'' +' '+ hours +':'+ minutes;
    }

    return newdate; 
};


/*
 * pr(object) or pr('abc', object)
 */

// 调试模式 (编辑器调试模式. 启用的时候 不能使用 Ti.API.info() )
Titanium.App.Properties.setBool('Ti_DEBUG', false);
var Ti_DEBUG = Titanium.App.Properties.getBool('Ti_DEBUG');

function pr(a, b){
	if(!Ti_DEBUG){
		function f(i){Ti.API.info(i);}
		if(typeof(b)!='undefined'){
			f(a+' ====> ');f(b)
		}else{
			f(a);
		}
	}
}

/*
 * 强悍的日志系统
 */
function log(s){
	Ti.API.log(s);
	
	/*
	alert(arguments.callee.name)

	alert(arguments.callee)	

	var myName = arguments.callee.toString();
	myName = myName.substr('function '.length);
	myName = myName.substr(0, myName.indexOf('('));
	
	//log(arguments, )
	*/
	
}


function onError(a){
	if(!Ti_DEBUG){
		Ti.API.error(a)
	}
}


// 去空格
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

// 类似 php time()
function time(){
	var d = new Date();
	return Math.round(d.getTime() / 1000);
}

// js 时间转 unix timestamp
/*
 * @date: javascript 时间格式 或者 形如: 2011-10-08 18:30:00
 */
function toDateline(date){
	
	var d = {};
	if(typeof(date)=='string'){
		var date_int = Date.parse(date.replace(/-/g, "/"));
		d = new Date(date_int);
	}else if(typeof(date)=='object'){
		try{
			date.getFullYear()
			d = date;
		}catch(err){
			return;
		}
	}else{
		onError('invalid Date format:')
		return '';
	}
	
	return Math.round(d.getTime() / 1000);
	
	// or
	/*
	var $time = Date.now || function() {
	  return +new Date;
	};
	
	$time()
	*/
}

function toDate(timestamp){
	var date = new Date(timestamp*1000);
	return date;
}




/*
 * 根据 uid 获得用户 avatar 路径
 * 2013-4-7 by eve
 * (临时使用) 
 * 
 * @size: big middle small
 * 
 
function UC_avatar(uid, size){
	if(parseInt(uid)){
		
		var UC_Avatar_Path = 'http://uc.hopejy.cn/data/avatar/';
		
		//var uid = 14007;
		//var size = 'middle';
		size = size ? size : 'middle';
		
		function avatarfile(uid){
			uid = Math.abs(parseInt(uid));
			uid = zeroFill(uid, 9);
			
			uid = ''+uid;			// 转成 string ( substr 用 )
	
			var dir1 = uid.substr(0, 3);
			var dir2 = uid.substr(3, 2);
			var dir3 = uid.substr(5, 2);
			var avafile = dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+'_avatar_'+size+'.jpg';
			return avafile;
		}
		
		function zeroFill(num, len){
		  len -= num.toString().length;
		  if(len>0) return new Array( len + (/\./.test( num ) ? 2 : 1) ).join( '0' ) + num;
		  return num;
		}
		
		
		var img_url = UC_Avatar_Path + avatarfile(uid);
		//var img_url = UC_API+'/images/noavatar_'+size+'.gif';
		
		return img_url;
	}
}*/


/*
 * inArray for js
 */
function arrayCompare(a1, a2) {
    if (a1.length != a2.length) return false;
    var length = a2.length;
    for (var i = 0; i < length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
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


function GetRandomNum(Min,Max){
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}

function GetRandom(array){
	var Min = 0;
	var Max = array.length-1;
	var Range = Max - Min;
	var Rand = Math.random();
	var rnd = Min + Math.round(Rand * Range);
	return array[rnd];
};





var helper = {
	
	// countdown timer 
	CountDown: function( h ,m , s, fn_tick, fn_end  ) {
	    return {
	        total_sec:h*3600+m*60+s,
	        timer:this.timer,
	        
	        set: function(h,m,s) {
	            this.total_sec = parseInt(h)*3600+parseInt(m)*60+parseInt(s);
	            this.time = {h:h,m:m,s:s};
	            return this;
	        },
	        start: function() {
	            var self = this;
	            this.timer = setInterval( function() {
	                if (self.total_sec) {
	                    self.total_sec--;
	                    self.time = { h:parseInt(self.total_sec/3600),m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
	                    fn_tick(self);
	                }
	                else {
	                    self.stop();
	                    fn_end(self);
	                }
	                }, 1000 );
	            return this;
	        },
	        stop: function() {
	            clearInterval(this.timer);
	            this.time = {h:0,m:0,s:0};
	            this.total_sec = 0;
	            return this;
	        }
	    }
	},
	
	Console: {
		Log: function(info){
			Ti.API.log(info)
		}
	}
}

// 简化
var h = helper;
