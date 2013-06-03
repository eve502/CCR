/*
 * 学习帮助页
 */

var viewHelp = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var label_help = Ti.UI.createLabel({
	text:'学习帮助',
	top:10,
	height:50,
	textAlign:'center'
});

viewHelp.add(label_help);
win.add(viewHelp);