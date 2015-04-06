(function(){
	prevTextList = [];
	timeoutID = null;
	loadCSS = function(url){
		$('head link:last').after('<link rel="stylesheet" href="' + url + '">');
	};
	loadJavaScript = function(url){
		$('head link:last').after('<script href="' + url + '">');
	};
	cdn = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/";
	loadCSS(cdn+"css/bootstrap.min.css");
	loadJavaScript(cdn+"js/bootstrap.min.js");
	statusLoading = function(text){
		$("#status").html(text);
		$("#status").show();
		$("#reloadButton").attr('disabled', true);
	}
	statusWaiting = function(){
		$("#status").hide();
		$("#reloadButton").removeAttr('disabled');
	}
	load = function(s){
		$.ajax({url: window.location.href, type: "GET", success: s, error: function(err){
			statusLoading("load error. " + err);
		}});
	}
	reloadCount = 30;
	render=function(postList){
		html = '<div class="col-md-12">'
		+ postList.join('')
		+ '<div class="text-right"><a id="reloadButton" onClick="reload();" class="btn btn-primary" href="#">reload</a>&nbsp;&nbsp;&nbsp;</div><div id="status"></div></div>';
		$('body').html(html);
		statusWaiting();
	}
	reloadFunc = function(data){
		if(timeoutID != null){
			clearTimeout(timeoutID);
		}
		statusLoading("Now Loading..." + reloadCount);
		contents = $(data).find('.content');
		newPostList = [];
		newTextList = [];
		isNewAlive = false;
		for(var i = contents.length - 1; i >= 0; i--){
			c = contents.eq(i);
			text = c.find('.comment-body').text();
			newTextList.push(text);
			post = '<div class="col-md-12">'
			+ text;
			if(prevTextList.indexOf(text)<0){
				post += ' <span style="color:red">New!</span>';
				isNewAlive = true;
			}
			post += '</div><div style="font-size:xx-small" class="col-md-12">'
			+ c.find('.comment-create-date').text()
			+ "</div>";
			newPostList.push(post);
		}
		prevTextList = newTextList;
		render(newPostList);
		if(!isNewAlive){
			reloadCount--;
			if(reloadCount <= 0){
				statusLoading('<span style="color:orange">reload stoped.</span> ' + reloadCount);
				$("#reloadButton").removeAttr('disabled');
				return;
			}
			statusLoading("Now loading..." + reloadCount);
			console.log("reloading...");
			timeoutID = setTimeout(function(){load(reloadFunc);}, 800);
		}else{
			reloadCount = 30;
		}
	};
	reload=function(){
		reloadCount = 30;
		load(reloadFunc);
	}
	reload();
})();
