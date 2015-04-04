# これは何
リトルノアのファミ通Wikiにあるcoop掲示板をリロードするのを手助けするブックマークレットです。

# 使い方
1. bookmarklet.min.js [これ]((function(\){prevTextList=[];timeoutID=null;loadCSS=function(a\){$(\"head link:last\"\).after('<link rel=\"stylesheet\" href=\"'+a+'\">'\)};loadJavaScript=function(a\){$(\"head link:last\"\).after('<script href=\"'+a+'\">'\)};cdn=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/\";loadCSS(cdn+\"css/bootstrap.min.css\"\);loadJavaScript(cdn+\"js/bootstrap.min.js\"\);load=function(a\){$.ajax({url:window.location.href,type:\"GET\",success:a,error:function(b\){$(\"#status\"\).html(\"load error.\"+b\);$(\"#status\"\).show(\)}}\)};reloadCount=0;render=function(a\){html='<div class=\"col-md-12\">'+a.join(\"\"\)+'<div class=\"text-right\"><a onClick=\"reload(\);\" class=\"btn btn-primary\" href=\"#\">reload</a>\&nbsp;\&nbsp;\&nbsp;</div><div id=\"status\">Now loading...</div></div>';$(\"body\"\).html(html\);$(\"#status\"\).hide(\)};reloadFunc=function(b\){if(timeoutID!=null\){cancelTimeout(timeoutID\)}$(\"#status\"\).show(\);contents=$(b\).find(\".content\"\);newPostList=[];newTextList=[];isNewAlive=false;for(var a=contents.length-1;a>=0;a--\){c=contents.eq(a\);text=c.find(\".comment-body\"\).text(\);newTextList.push(text\);post='<div class=\"col-md-12\">'+text;if(prevTextList.indexOf(text\)<0\){post+=' <span style=\"color:red\">New!</span>';isNewAlive=true}post+='</div><div style=\"font-size:xx-small\" class=\"col-md-12\">'+c.find(\".comment-create-date\"\).text(\)+\"</div>\";newPostList.push(post\)}prevTextList=newTextList;render(newPostList\);if(!isNewAlive\){reloadCount++;$(\"#status\"\).show(\);if(reloadCount>30\){$(\"#status\"\).text(\"reload stoped. \"+reloadCount\);return}$(\"#status\"\).text(\"Now loading... \"+reloadCount\);console.log(\"reloading...\"\);setTimeout(function(\){load(reloadFunc\)},800\)}else{reloadCount=0}};reload=function(\){reloadCount=0;load(reloadFunc\)};reload(\)}\)(\);)をブックマークレットとしてブックマークに登録します。
2. ファミ通Wikiのcoop掲示板のどこかのレベルの掲示板をブラウザで開きます。
3. 登録したブックマークレットを選択します。
4. 表示されているものががらっと変わるので、coopの募集情報を読んだり、「reload」ボタンを押してリロードしたりします。

「reload」ボタンを押すと、新しい書き込みが無い間は30回程まで勝手にリロードし続けます。
ファミ通Wikiさんの負荷にならないようにあんまり躍起になってreloadはしないでくださいネ。
