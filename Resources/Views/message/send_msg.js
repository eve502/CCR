/*
 * 发送消息页面
 */

var win = Ti.UI.currentWindow;

var label = Titanium.UI.createButton({
	title:win.title,
	color:'#fff',
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

// create a button to close window
var closeBtn = Titanium.UI.createButton({
	title:L('btn_close'),
	height:30,
	width:150,
	systemButton:Titanium.UI.iPhone.SystemButton.CANCEL
});
closeBtn.addEventListener('click', function()
{
	var t3 = Titanium.UI.create2DMatrix();
	t3 = t3.scale(0);
	win.close({transform:t3,duration:300});
});

//发送按钮
var sendBtn = Titanium.UI.createButton({
	title:L('send'),
	height:30,
	width:150,
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
sendBtn.addEventListener('click',function(e){
	Ti.API.info('send message');
});


// create and add toolbar
var toolbar = Titanium.UI.iOS.createToolbar({
	items:[closeBtn,flexSpace,label,flexSpace,sendBtn],
	top:0,
	borderTop:true,
	borderBottom:true
});
win.add(toolbar);


//消息输入框
var messageCont = Ti.UI.createTextArea({
  borderWidth: 3,
  borderColor: '#ccc',
  borderRadius: 5,
  color: '#888',
  font: {fontSize:20, fontWeight:'bold'},
  keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
  returnKeyType: Ti.UI.RETURNKEY_GO,
  textAlign: 'left',
  top: 60,
  width: 580,
  height: 300,
  focusable:true,
});
win.add(messageCont);

messageCont.focus();
















