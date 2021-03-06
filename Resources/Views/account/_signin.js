var win = Titanium.UI.currentWindow;
win.hideNavBar();

//
//  CREATE FIELD ONE
//
var username = Titanium.UI.createLabel({
	color:'#fff',
	text:L('username'),
	top:10,
	left:30,
	width:100,
	height:'auto'
});

win.add(username);

var usernameField = Titanium.UI.createTextField({
	hintText:L('enter_username'),
	height:35,
	top:35,
	left:30,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(usernameField);

//
//  CREATE FIELD TWO
//
var password = Titanium.UI.createLabel({
	color:'#fff',
	text:L('password'),
	top:75,
	left:30,
	width:100,
	height:'auto'
});

win.add(password);

var passwordField = Titanium.UI.createTextField({
	hintText:L('enter_password'),
	height:35,
	top:100,
	left:30,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(passwordField);

//
// CREATE BUTTON
//
var login = Titanium.UI.createButton({
	title:L('login'),
	top:170,
	left:30,
	height:30,
	width:120
});
win.add(login);

login.addEventListener("click",function(){
	w = Titanium.UI.createWindow({
		url:"/Views/main_window/main.js"
	});
	w.open();
});




var SignUp = Titanium.UI.createButton({
	title:L('Register'),
	top:170,
	left:180,
	height:30,
	width:120
});
/*进入注册页面*/
SignUp.addEventListener("click",function(){
	w = Titanium.UI.createWindow({
		url:"/Views/account/_signup.js"
	});
	var b = Titanium.UI.createButton({
		title:L('btn_close'),
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	w.setLeftNavButton(b);
	b.addEventListener('click',function()
	{
		w.close();
	});
	w.open({modal:true});
});

win.add(SignUp);


//
//  CREATE INFO MESSAGE
//
var messageView = Titanium.UI.createView({
	bottom:10,
	backgroundColor:'#111',
	height:40,
	width:270,
	borderRadius:10
});

var messageLabel = Titanium.UI.createLabel({
	color:'#fff',
	text:L('welcome_message'),
	height:'auto',
	width:'auto',
	textAlign:'center'
});

messageView.add(messageLabel);

win.add(messageView);