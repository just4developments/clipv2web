var express = require('express');
var app = express();


app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/v/:mode', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/k/:keyword', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/search/:txtSearch', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/my-video', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/:id', function(req, res){
	// res.set('Content-Type', 'text/html');
	// res.send(`
	// 	<!DOCTYPE html>
	// 	<html ng-app='myApp'>
	// 		<head prefix="og: http://ogp.me/ns#">
	// 			<meta property="og:type" content="article" />
	// 			<meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1506977592847257" />
	// 			<meta property="og:url" content="http://kenh14.vn/news-2016070811445743.chn" />
	// 			<meta property="og:title" content="Hot: Cảnh sát Gangnam tuyên bố ADN trên tang vật đầu tiên trùng khớp với Yoochun (JYJ)" />
	// 			<meta property="og:description" content="Ngoài ra, Dispatch vừa đưa tin rằng, có vẻ cảnh sát sẽ sớm đưa ra kết luận vô tội đối với Yoochun ở vụ kiện thứ nhất, bởi rất khó tìm được chứng cứ của hành vi xâm hại hay cưỡng chế dù đúng thật là có quan hệ." />
	// 			<meta property="og:image" content="http://kenh14.mediacdn.vn/thumb_w/600/2016/20160630184611-ijn-4391-1467282550642-1467953065437-103-0-413-600-crop-1467953079818.jpg" />
	// 	  </head>
	//  	</html>		
	// `);
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});