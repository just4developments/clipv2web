let express = require('express');
let fs = require('fs');
let app = express();
var compression = require('compression');
var unirest = require('unirest');

const config = {
	FB_ID: '291510107860506'
};

const URL = 'http://clipvnet.com:8000';

let checkBot = (req, fcTrue, fcFalse) => {
	let agent = req.headers['user-agent'];
	if(agent && /visionutils|facebook|facebot|google|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|archive.org_bot|twitterbot/i.test(agent)){
		return fcTrue(agent);
	}
	fcFalse();
}

// app.use(require('prerender-node').set('prerenderToken', 'QQkE5hbB6CfQ0M4B2nzk'));
app.use(compression({ threshold: 0 }));
app.use(express.static(__dirname + '/dist', {index: false}));

let indexLastModified = new Date(fs.statSync('./dist/index.html').mtime).toUTCString();

let page = (p, res) => {
 res.sendFile(p, { root: __dirname + '/dist', headers: { 'Last-Modified': indexLastModified }});
};

let temp = (p, res) => {
 res.sendFile(p, { root: __dirname + '/temp' });
};

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
		        <loc>${HOST}/detail/${r._id}/${r.title0}?_escaped_fragment_=</loc>
		        <changefreq>never</changefreq>
		      </url>
	      `;      
		  }		  
			fcDone(cnt);
		});		
	}
	appendContent('/video/newest', (cnt0) => {
		var cnt = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	    <url>
	      <loc>${HOST}?_escaped_fragment_=</loc>
	      <changefreq>always</changefreq>
	    </url>	    
	    <url>
	      <loc>${HOST}/most?_escaped_fragment_=</loc>
	      <changefreq>daily</changefreq>
	    </url>
	    <url>
	      <loc>${HOST}/hot?_escaped_fragment_=</loc>
	      <changefreq>daily</changefreq>
	    </url>
	    ${cnt0}
	  </urlset>`
	  res.type('xml').send(cnt);
	});
});
app.get('/', (req, res) => {		
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
});
app.get('/my-video', (req, res) => {		
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
});
app.get('/detail/:id/:title', (req, res) => {
	var HOST = URL.replace(/:8000/, '') + req.url;
	checkBot(req, (agent) => {
		if(agent.includes('facebook')){
			unirest.get(`${URL}/video/${req.params.id}`)
		  .headers({'decrypt': '1'})
			.end(function (res0) {
				var v = res0.body;
			  let content = 
			  `<!DOCTYPE html>
					<html lang="vi"	>
						<head>							
							<meta property="fb:app_id" content="${config.FB_ID}" />
							<meta property="og:type" content="article" />
							<meta property="og:url" content="${HOST}" />
							<meta property="og:title" content="${v.title}" />
							<meta property="og:image" content="${v.image}" />
							<meta property="article:author" content="${v.creator}" />
							<meta property="article:publisher" content="ClipVNet" />							
						</head>
					</html>`;
				res.send(content);
			});					
		}else{
			page('index.html', res);
		}		
	}, () => {
		page('index.html', res);
	});
});
app.get('/keyword/:keyword/:title', (req, res) => {		
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
});
app.get('/search/:txtSearch', (req, res) => {		
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
});
app.get('/:mode', (req, res) => {		
	checkBot(req, () => {
		page('index.html', res);
	}, () => {
		page('index.html', res);
	});
});
// app.get('/:id/:title', (req, res) => {
// 	if(req.headers['user-agent'].includes('facebookexternalhit')){
// 		let content = `
// 			<!DOCTYPE html>
// 			<html lang="vi"	>
// 				<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# video: http://ogp.me/ns/video#">
// 					<meta property="og:type" content="article" />					
// 					<meta property="og:url" content="http://kenh14.vn/news-2016072523515093.chn" />
// 					<meta property="og:title" content="17 tuổi, nữ sinh tài năng này đã sáng lập hội thảo Mô phỏng Liên Hợp Quốc cho các bạn trẻ Việt Nam" />
// 					<meta property="og:image" content="http://kenh14cdn.com/thumb_w/600/2016/img-0311-1469464784467-1416-0-2917-2912-crop-1469465362749.jpg" />
// 					<meta property="video:writer" content="http://kenh14cdn.com/thumb_w/600/2016/img-0311-1469464784467-1416-0-2917-2912-crop-1469465362749.jpg" />
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