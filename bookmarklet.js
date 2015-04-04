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
	load = function(s){
		$.ajax({url: window.location.href, type: "GET", success: s, error: function(err){
			$("#status").html("load error." + err);
			$("#status").show();
		}});
	}
	reloadCount = 0;
	render=function(postList){
		html = '<div class="col-md-12">'
		+ postList.join('')
		+ '<div class="text-right"><a onClick="reload();" class="btn btn-primary" href="#">reload</a>&nbsp;&nbsp;&nbsp;</div><div id="status">Now loading...</div></div>';
		$('body').html(html);
		$("#status").hide();
	}
	reloadFunc = function(data){
		if(timeoutID != null){
			cancelTimeout(timeoutID);
		}
		$("#status").show();
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
			reloadCount++;
			$("#status").show();
			if(reloadCount > 30){
				$("#status").text("reload stoped. " + reloadCount);
				return;
			}
			$("#status").text("Now loading... " + reloadCount);
			console.log("reloading...");
			setTimeout(function(){load(reloadFunc);}, 800);
		}else{
			reloadCount = 0;
		}
	};
	reload=function(){
		reloadCount = 0;
		load(reloadFunc);
	}
	reload();
})();
