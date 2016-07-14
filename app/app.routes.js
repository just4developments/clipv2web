"use strict";
var video_details_page_component_1 = require('./video-details-page.component');
var video_page_component_1 = require('./video-page.component');
var user_video_page_component_1 = require('./user-video-page.component');
exports.routes = [
    { path: '', component: video_page_component_1.VideoPageComponent },
    { path: 'v/:mode', component: video_page_component_1.VideoPageComponent },
    { path: 'k/:keyword', component: video_page_component_1.VideoPageComponent },
    { path: 'search/:txtSearch', component: video_page_component_1.VideoPageComponent },
    { path: 'my-video', component: user_video_page_component_1.UserVideoPageComponent },
    { path: ':id', component: video_details_page_component_1.VideoDetailsPageComponent }
];
