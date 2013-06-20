// 
//  cachedImageView.js
//  LA
//  
//  Created by h2o on 2011-10-13.
//  Copyright 2011 h2o. All rights reserved.
// 

// memo:
// 需要加入时间戳判断, 参考: 

//		var timestamp = Titanium.Filesystem.File.modificationTimestamp;
//		req.setRequestHeader('If-Modified-Since', timestamp)
// 		Titanium.Network.HTTPClient::getResponseHeader('Date')
//		and ...


function cachedImageView(imageCate, url, imageViewObject, force, local_only)
{
	if(!imageCate || !imageViewObject){	// 无效参数格式
		imageViewObject.image = '';
		return;
	}
	
	// 默认头像
	var num = GetRandomNum(0, 6);		// 目前一共有 0-6 七个图片.
	var default_avatar_path = '/images/default_avatar_'+num+'.png'
	imageViewObject.image = default_avatar_path;	// 先显示 默认头像占位. 避免空白. 然后去服务器读取. 读取完 替换默认.

	if(!url || url.indexOf('noavatar')>=0 ){	// 用户没有指定头像的 就显示默认头像
		imageViewObject.image = default_avatar_path;
		return;
	}
	
	if( url.indexOf('http://') == -1 ){
		imageViewObject.image = url;
		return;
	}
	var res_dirname = Ti.App.Properties.getString('resDirname');
	var res_dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, res_dirname);

	if (!res_dir.exists()) {
		res_dir.createDirectory();
	};
	
	var filename = Ti.Utils.md5HexDigest(url)+'.png' 
	
	// Try and get the file that has been previously cached
	var file = Ti.Filesystem.getFile(res_dir.nativePath, imageCate, filename);
	
	
	if (file.exists() && force != true) {
		// If it has been cached, assign the local asset path to the image view object.
		imageViewObject.image = file.nativePath;
	} else {

		var g = Ti.Filesystem.getFile(res_dir.nativePath, imageCate);
		if (!g.exists()) {
			g.createDirectory();
		};
		
		var defaultImage = '/images/bg_img_loading.png';
		imageViewObject.defaultImage = defaultImage;
		
		//pr('get avatar :: ')
		//pr(url)
				
		var xhr = Ti.Network.createHTTPClient();
		xhr.open('GET', url);
		xhr.setRequestHeader("User-Agent", Ti.App.Properties.getString('User_Agen'));
		xhr.send();
		
		xhr.onload = function() {
			if (xhr.status == 200) {
				file.write(xhr.responseData);
				imageViewObject.image = file.nativePath;
			}else if(xhr.status == 404){
				imageViewObject.image = default_avatar_path;	// 默认头像
				pr(xhr.status+' '+url)
			}
		};
		xhr.onerror = function(e){
			pr(url)
			onError(e);
			imageViewObject.image = defaultImage;
		}
		
	};
};