"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var video_service_1 = require('./video.service');
var video_directive_1 = require('./video.directive');
var filter_pipe_1 = require('./filter.pipe');
var VideoRelationItemComponent = (function () {
    function VideoRelationItemComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', video_service_1.VideoCard)
    ], VideoRelationItemComponent.prototype, "item", void 0);
    VideoRelationItemComponent = __decorate([
        core_1.Component({
            selector: 'video-relation-item',
            template: "\n      <li class=\"mdl-list__item mdl-list__item--three-line\">\n        <a class=\"mdl-list__item-primary-content nothing\" [routerLink]=\"['/'+item._id]\" go-top>          \n          <div class=\"img-des\">\n            <img src=\"{{item.image}}\" width=\"80\" class=\"rounded\" *ngIf=\"!item.youtubeid\">\n            <img src=\"http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg\" width=\"80\" style=\"float: left; margin-right: 5px;\" class=\"rounded\" *ngIf=\"item.youtubeid\">                    \n            <div class=\"howlong\"><i class=\"material-icons dp48\">alarm</i>{{item.duration | HowlongPipe}}</div>\n          </div>\n          <div class=\"main-color title\">{{item.title}}</div>\n          <span class=\"mdl-list__item-text-body des-color\">\n            <i class=\"material-icons dp48\">alarm_on</i> {{item.nowOnTime}}\n          </span>\n        </a>\n      </li>\n    ",
            pipes: [filter_pipe_1.HowlongPipe],
            directives: [router_1.ROUTER_DIRECTIVES, video_directive_1.GoTop]
        }), 
        __metadata('design:paramtypes', [])
    ], VideoRelationItemComponent);
    return VideoRelationItemComponent;
}());
exports.VideoRelationItemComponent = VideoRelationItemComponent;
