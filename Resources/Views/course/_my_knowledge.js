/**
 * 知识共享页
 */
var win = Ti.UI.currentWindow;

var viewShare = Ti.UI.createView({
	width:720,
	height:850,
	top:60,
	visible:false
});

var label_share = Ti.UI.createLabel({
	text:'知识共享',
	top:10,
	height:50,
	textAlign:'center'
});

viewShare.add(label_share);
win.add(viewShare);