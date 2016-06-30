"use strict";
var router_1 = require('@angular/router');
var video_component_1 = require('./video.component');
var routes = [
    { path: '', component: video_component_1.VideoPageComponent },
    { path: 'v/:mode', component: video_component_1.VideoPageComponent },
    { path: 'search/:txtSearch', component: video_component_1.VideoPageComponent },
    { path: ':id', component: video_component_1.VideoDetailsPageComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
