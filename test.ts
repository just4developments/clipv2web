// import * as path from 'path';
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
 
// import {App} from './src/app/app.component'; // our entry point
// /**
//  * Angular 2 universal
//  */
// import 'angular2-universal/polyfills';
// import {
//  provide,
//  enableProdMode,
//  expressEngine,
//  REQUEST_URL,
//  ORIGIN_URL,
//  BASE_URL,
//  NODE_ROUTER_PROVIDERS,
//  NODE_HTTP_PROVIDERS,
//  ExpressEngineConfig
// } from 'angular2-universal';

// declare var __dirname:any; 

// const app = express();
// const root = __dirname;
 
// enableProdMode();
 
// // Express View
// app.engine('ng2.html', expressEngine);
// app.set('views', root);
// app.set('view engine', 'ng2.html');
 
// app.use(bodyParser.json());
 
// function ngApp(req, res) {
//  let baseUrl = '/';
//  let url = req.originalUrl || '/';
 
//  let config: ExpressEngineConfig = {
//     directives:[ App ],
//     platformProviders:[
//       provide(ORIGIN_URL, {useValue: 'http://localhost:3000'}),
//       provide(BASE_URL, {useValue: baseUrl})
//     ],
//     providers:[
//       provide(REQUEST_URL, {useValue:url}),
//       NODE_ROUTER_PROVIDERS,
//       NODE_HTTP_PROVIDERS,
//     ],
//     async:true,
//     preboot: false
//   }
//   res.render('index', config);
// }
 
// // Serve satic files
// app.use(express.static(root, {index: false}));
 
// // Routes
// app.get('/**', ngApp);
 
// // Server
// app.listen(3000, () => {
//  console.log('Listen on http://localhost:3000');
// });