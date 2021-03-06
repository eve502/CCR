var win = Titanium.UI.currentWindow;

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
//  CREATE FIELD TWO
//
var confirmPassword = Titanium.UI.createLabel({
	color:'#fff',
	text:L('confirm_password'),
	top:135,
	left:30,
	width:160,
	height:'auto'
});

win.add(confirmPassword);

var confirmPasswordField = Titanium.UI.createTextField({
	hintText:L('enter_comfirm_password'),
	height:35,
	top:160,
	left:30,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(confirmPasswordField);


//
// CREATE BUTTON
//
var Register = Titanium.UI.createButton({
	title:L('Register'),
	top:230,
	left:30,
	height:30,
	width:120
});
win.add(Register);

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