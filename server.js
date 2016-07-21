let express = require('express');
let fs = require('fs');
let app = express();
var etag = require('etag');
var compression = require('compression');

let checkBot = (req, fcTrue, fcFalse) => {
	// let agent = req.headers['user-agent'];
	// if(agent && /visionutils|facebook|facebot|google|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|archive.org_bot|twitterbot/i.test(agent)){
	// 	return fcTrue();
	// }
	// fcFalse();
	fcFalse();
}

app.use(compression({ threshold: 0 }));
app.use(express.static(__dirname + '/dist', {index: false}));

let page = (p, res) => {
 res.sendFile(p, { root: __dirname + '/dist'});
};

let temp = (p, res) => {
 res.sendFile(p, { root: __dirname + '/temp'});
};

let handler = (req, res) => {
	console.log(req.path);
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
}

app.get('/', handler);
app.get('/v/:mode', handler);
app.get('/k/:keyword', handler);
app.get('/search/:txtSearch', handler);
app.get('/my-video', handler);
app.get('/:id/:title', handler);

app.listen(3001, function () {
  console.log('clipv2web listening on port 80!');
});