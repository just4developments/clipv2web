let express = require('express');
let fs = require('fs');
let app = express();
var etag = require('etag');
var compression = require('compression');

app.use(compression({ threshold: 0 }));
app.use(express.static(__dirname + '/dist'));

let page = (p, res) => {
 res.sendFile(p, { root: __dirname + '/dist'});
};

app.get('/', function(req, res){
  page('index.html', res);
});

app.get('/v/:mode', function(req, res){
  page('index.html', res);
});

app.get('/k/:keyword', function(req, res){
  page('index.html', res);
});

app.get('/search/:txtSearch', function(req, res){
  page('index.html', res);
});

app.get('/my-video', function(req, res){
  page('index.html', res);
});

app.get('/:id', function(req, res){
	page('index.html', res);
});

app.listen(80, function () {
  console.log('clipv2web listening on port 80!');
});