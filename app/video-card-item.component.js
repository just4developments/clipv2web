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
var VideoCardItemComponent = (function () {
    function VideoCardItemComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', video_service_1.VideoCard)
    ], VideoCardItemComponent.prototype, "item", void 0);
    VideoCardItemComponent = __decorate([
        core_1.Component({
            selector: 'video-card-item',
            template: "\n    <a [routerLink]=\"['/'+item._id]\" class=\"nothing\" go-top>\n      <div class=\"mdl-card__title\">\n         <h4 class=\"mdl-card__title-text main-color\">{{item.title}}</h4>\n      </div>      \n      <div class=\"mdl-card__media\">        \n        <img src=\"{{item.image}}\" *ngIf=\"!item.youtubeid\">\n        <img src=\"http://i.ytimg.com/vi/{{item.youtubeid}}/0.jpg\" *ngIf=\"item.youtubeid\">\n      </div>\n      <div class=\"howlong\" *ngIf=\"item.duration\"><i class=\"material-icons dp48\">alarm</i>{{item.duration | HowlongPipe}}</div>\n      <div class=\"mdl-card__supporting-text icon-des mdl-grid des-color\">\n        <div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone ellipsis-1\" title=\"{{item.creator}}\"><i class=\"material-icons dp48\">tag_faces</i> {{item.creator}}</div>\n        <div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone ellipsis-1\" title=\"{{item.nowOnTime}}\"><i class=\"material-icons dp48\">alarm_on</i> {{item.nowOnTime}}</div>\n      </div>\n    </a>\n    ",
            host: {
                '[class.mdl-card]': 'true',
                '[class.mdl-shadow--3dp]': 'true',
                '[class.mdl-cell]': 'true',
                '[class.mdl-cell--4-col]': 'true',
                '[class.mdl-cell--4-col-tablet]': 'true',
                '[class.mdl-cell--4-col-phone]': 'true'
            },
            pipes: [filter_pipe_1.HowlongPipe],
            directives: [video_directive_1.GoTop, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], VideoCardItemComponent);
    return VideoCardItemComponent;
}());
exports.VideoCardItemComponent = VideoCardItemComponent;
