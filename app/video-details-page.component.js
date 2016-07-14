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
var facebook_component_1 = require('./facebook.component');
var video_details_component_1 = require('./video-details.component');
var video_relation_list_component_1 = require('./video-relation-list.component');
var video_service_1 = require('./video.service');
var VideoDetailsPageComponent = (function () {
    function VideoDetailsPageComponent(route, videoService) {
        var _this = this;
        this.route = route;
        this.videoService = videoService;
        this.filter = {};
        this.videoService.getKeywords().subscribe(function (keywords) { _this.keywords = keywords; }, function (error) { return console.error(error); });
    }
    VideoDetailsPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.videoService.getVideo(params['id']).subscribe(function (video) {
                _this.item = video;
                for (var i in _this.item.keywords) {
                    for (var _i = 0, _a = _this.keywords; _i < _a.length; _i++) {
                        var all = _a[_i];
                        if (_this.item.keywords[i] === all._id) {
                            _this.item.keywords[i] = all;
                        }
                    }
                }
            }, function (error) { return console.error(error); });
        });
    };
    VideoDetailsPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    VideoDetailsPageComponent = __decorate([
        core_1.Component({
            selector: 'video-details-page',
            template: "\n      <div class=\"mdl-grid\" *ngIf=\"item\">\n        <video-details [item] = \"item\" class=\"mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\"></video-details>\n        <div                       class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n          <facebook-page></facebook-page>\n          <br/>\n          <video-relation-list [query]=\"{keywords: item.keywords, id: item._id, updateat: item.updateat}\" [mode]=\"'relation'\" [page]=\"1\" [rows]=\"10\" class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\"></video-relation-list>\n        </div>\n      </div>\n    ",
            providers: [video_service_1.VideoService],
            directives: [video_details_component_1.VideoDetailsComponent, video_relation_list_component_1.VideoRelationListComponent, facebook_component_1.FacebookPageComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, video_service_1.VideoService])
    ], VideoDetailsPageComponent);
    return VideoDetailsPageComponent;
}());
exports.VideoDetailsPageComponent = VideoDetailsPageComponent;
