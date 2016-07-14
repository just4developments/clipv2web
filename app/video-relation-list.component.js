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
var video_service_1 = require('./video.service');
var video_relation_item_component_1 = require('./video-relation-item.component');
var VideoRelationListComponent = (function () {
    function VideoRelationListComponent(videoService) {
        this.videoService = videoService;
        this.query = {};
        this.videosRelation = [];
    }
    VideoRelationListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.mode === 'relation') {
            this.title = 'Video liên quan';
            this.videoService.getRelateVideos(this.query.id, this.query.keywords, this.query.updateat, { page: this.page, rows: this.rows }).subscribe(function (videos) { _this.videosRelation = videos; }, function (error) { return console.error(error); });
        }
    };
    VideoRelationListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.mode === 'most') {
            this.title = 'Video xem nhiều nhất';
            this.videoService.getMostVideos({ page: this.page, rows: this.rows }).subscribe(function (videos) { _this.videosRelation = videos; }, function (error) { return console.error(error); });
        }
        else if (this.mode === 'hot') {
            this.title = 'Video hot';
            this.videoService.getHotVideos({ page: this.page, rows: this.rows }).subscribe(function (videos) { _this.videosRelation = videos; }, function (error) { return console.error(error); });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VideoRelationListComponent.prototype, "mode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VideoRelationListComponent.prototype, "page", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VideoRelationListComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VideoRelationListComponent.prototype, "query", void 0);
    VideoRelationListComponent = __decorate([
        core_1.Component({
            selector: 'video-relation-list',
            template: "\n      <div class=\"mdl-card mdl-shadow--2dp\">\n        <div class=\"mdl-card__title mdl-card--border\">\n          <h6 class=\"mdl-card__title-text\">{{title}}</h6>\n          <div class=\"mdl-layout-spacer\"></div>\n          <i class=\"material-icons mdl-list__item-icon\">videocam</i>\n        </div>\n        <ul class=\"mdl-list\">\n          <video-relation-item style=\"width: 100%\" *ngFor=\"let v of videosRelation\" [item]=\"v\"></video-relation-item>\n        </ul>\n      </div>\n    ",
            providers: [video_service_1.VideoService],
            directives: [video_relation_item_component_1.VideoRelationItemComponent]
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService])
    ], VideoRelationListComponent);
    return VideoRelationListComponent;
}());
exports.VideoRelationListComponent = VideoRelationListComponent;
