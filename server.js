let express = require('express');
let fs = require('fs');
let app = express();
var compression = require('compression');
var unirest = require('unirest');

const URL = 'http://clipvnet.com:8000';

let checkBot = (req, fcTrue, fcFalse) => {
	// let agent = req.headers['user-agent'];
	// if(agent && /visionutils|facebook|facebot|google|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|archive.org_bot|twitterbot/i.test(agent)){
	// 	return fcTrue();
	// }
	// fcFalse();
	fcFalse();
}

app.use(require('prerender-node').set('prerenderToken', 'QQkE5hbB6CfQ0M4B2nzk'));
app.use(compression({ threshold: 0 }));
app.use(express.static(__dirname + '/dist', {index: false}));

let indexLastModified = new Date(fs.statSync('./dist/index.html').mtime).toUTCString();

let page = (p, res) => {
 res.sendFile(p, { root: __dirname + '/dist', headers: { 'Last-Modified': indexLastModified }});
};

let temp = (p, res) => {
 res.sendFile(p, { root: __dirname + '/temp' });
};

let handler = (req, res) => {		
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
}

app.get('/sitemap.xml', (req, res) => {
	var HOST = URL.replace(/:8000/, '');
	var appendContent = (path, fcDone) => {
		var cnt = '';
	  unirest.get(`${URL}${path}`)
	  .headers({'decrypt': '1'})
	  .query({
		  page: 1,
		  rows: 12
		})
		.end(function (res0) {
		  for(var r of res0.body){	  	  
		  	cnt += `
		  		<url>
		        <loc>${HOST}/${r._id}/${r.title0}</loc>
		        <changefreq>daily</changefreq>
		      </url>
	      `;      
		  }		  
			fcDone(cnt);
		});		
	}
	appendContent('/video/newest', (cnt0) => {
		appendContent('/video/most', (cnt1) => {
			appendContent('/video/hot', (cnt2) => {				
				var cnt = `<?xml version="1.0" encoding="UTF-8"?>
				<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			    <url>
			      <loc>${HOST}</loc>
			      <changefreq>daily</changefreq>
			    </url>
			    ${cnt0}
			    <url>
			      <loc>${HOST}/v/most</loc>
			      <changefreq>daily</changefreq>
			    </url>
			    ${cnt1}
			    <url>
			      <loc>${HOST}/v/hot</loc>
			      <changefreq>daily</changefreq>
			    </url>
			    ${cnt2}
			  </urlset>`
			  res.type('xml').send(cnt);
			});
		});		
	});
});
app.get('/', handler);
app.get('/v/:mode', handler);
app.get('/k/:keyword', handler);
app.get('/search/:txtSearch', handler);
app.get('/my-video', handler);
app.get('/:id/:title', handler);
// app.get('/:id/:title', (req, res) => {
// 	if(req.headers['user-agent'].includes('facebookexternalhit')){
// 		let content = `
// 			<html>
// 				<head>
// 					<meta property="og:type" content="article" />					
// 					<meta property="og:url" content="http://kenh14.vn/news-2016072523515093.chn" />
// 					<meta property="og:title" content="17 tuổi, nữ sinh tài năng này đã sáng lập hội thảo Mô phỏng Liên Hợp Quốc cho các bạn trẻ Việt Nam" />
// 					<meta property="og:description" content="17 tuổi, sáng lập hội thảo Mô phỏng Liên Hợp Quốc lớn nhất Việt Nam, đang thực tập tại Ernst&amp;Young, làm CTV cho một dự án của UNESCO. Đó chính là những thông tin cơ bản nhất về cô bạn thú vị này." />
// 					<meta property="og:image" content="http://kenh14cdn.com/thumb_w/600/2016/img-0311-1469464784467-1416-0-2917-2912-crop-1469465362749.jpg" />
// 				</head>
// 			</html>
// 		`;
// 		res.send(content);
// 	}else{
// 		handler(req, res);
// 	}
// });

app.listen(80, function () {
  console.log('clipv2web listening on port 80!');
});