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
var platform_browser_1 = require('@angular/platform-browser');
var event_service_1 = require('./event.service');
var video_service_1 = require('./video.service');
///////////////////////////////////////////////////////////////////
var VideoCardComponent = (function () {
    function VideoCardComponent() {
    }
    VideoCardComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', video_service_1.VideoCard)
    ], VideoCardComponent.prototype, "item", void 0);
    VideoCardComponent = __decorate([
        core_1.Component({
            selector: 'video-card',
            template: "\n    <a href=\"/{{item._id}}\" class=\"nothing\">\n      <div class=\"mdl-card__title\">\n         <h4 class=\"mdl-card__title-text main-color\">{{item.title}}</h4>\n      </div>      \n      <div class=\"mdl-card__media\">        \n        <img src=\"{{item.image}}\">\n      </div>\n      <div class=\"howlong\"><i class=\"material-icons dp48\">alarm</i>14p40\"</div>\n      <div class=\"mdl-card__supporting-text icon-des mdl-grid des-color\">\n        <div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone\"><i class=\"material-icons dp48\">tag_faces</i> Ch\u1EE7 x\u1ECB</div>\n        <div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone\"><i class=\"material-icons dp48\">alarm_on</i> 1 gi\u1EDD tr\u01B0\u1EDBc</div>\n      </div>\n    </a>\n    ",
            host: {
                '[class.mdl-card]': 'true',
                '[class.mdl-shadow--3dp]': 'true',
                '[class.mdl-cell]': 'true',
                '[class.mdl-cell--4-col]': 'true',
                '[class.mdl-cell--4-col-tablet]': 'true',
                '[class.mdl-cell--4-col-phone]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], VideoCardComponent);
    return VideoCardComponent;
}());
exports.VideoCardComponent = VideoCardComponent;
///////////////////////////////////////////////////////////////////
var VideoCardLoadingComponent = (function () {
    function VideoCardLoadingComponent() {
    }
    VideoCardLoadingComponent = __decorate([
        core_1.Component({
            selector: 'video-card-loading',
            template: "\n    <div>\n      <img src=\"images/loading.gif\" class=\"inner\" />\n    </div>\n    ",
            host: {
                '[class.mdl-card]': 'true',
                '[class.mdl-shadow--3dp]': 'true',
                '[class.mdl-cell]': 'true',
                '[class.mdl-cell--4-col]': 'true',
                '[class.mdl-cell--4-col-tablet]': 'true',
                '[class.mdl-cell--4-col-phone]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], VideoCardLoadingComponent);
    return VideoCardLoadingComponent;
}());
exports.VideoCardLoadingComponent = VideoCardLoadingComponent;
///////////////////////////////////////////////////////////////////
var VideoCardListComponent = (function () {
    function VideoCardListComponent(videoService, eventService, cmpResolver) {
        this.videoService = videoService;
        this.eventService = eventService;
        this.cmpResolver = cmpResolver;
        this.videos = [];
        this.page = 1;
        this.isLoading = true;
    }
    VideoCardListComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    VideoCardListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gsub = this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'video-card-list') {
                if (data.action === 'load') {
                    _this.isLoading = true;
                    _this.nextPage(data.filter);
                }
                else if (data.action === 'loaded') {
                    _this.isLoading = false;
                }
            }
        });
        this.nextPage({});
    };
    VideoCardListComponent.prototype.ngOnDestroy = function () {
        this.gsub.unsubscribe();
    };
    VideoCardListComponent.prototype.nextPage = function (filter) {
        var _this = this;
        if (this.filter.mode = 'most') {
            this.videoService.getMostVideos({ page: this.page++ }).subscribe(function (videos) {
                _this.drawContent(_this, videos);
            }, this.drawError);
        }
        else if (this.filter.mode === 'newest') {
            this.videoService.getNewestVideos({ page: this.page++, title: this.filter.query.title }).subscribe(function (videos) {
                _this.drawContent(_this, videos);
            }, this.drawError);
        }
    };
    VideoCardListComponent.prototype.drawError = function (err) {
        console.error(err);
    };
    VideoCardListComponent.prototype.drawContent = function (self, videos) {
        self.cmpResolver.resolveComponent(VideoCardComponent)
            .then(function (factory) {
            for (var i in videos) {
                var com = self.viewContainer.createComponent(factory, i, self.viewContainer.injector);
                com.instance.item = videos[i];
            }
        });
        self.eventService.emit({ com: 'video-card-list', action: 'loaded' });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VideoCardListComponent.prototype, "filter", void 0);
    __decorate([
        core_1.ViewChild('viewContainer', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', Object)
    ], VideoCardListComponent.prototype, "viewContainer", void 0);
    VideoCardListComponent = __decorate([
        core_1.Component({
            selector: 'video-card-list',
            template: "\n      <div class=\"android-card-container mdl-grid\">\n          <div #viewContainer></div>\n          <video-card-loading [hidden]=\"!isLoading\"></video-card-loading>\n      </div>\n    ",
            providers: [video_service_1.VideoService],
            directives: [VideoCardComponent, VideoCardLoadingComponent]
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService, event_service_1.EventService, core_1.ComponentResolver])
    ], VideoCardListComponent);
    return VideoCardListComponent;
}());
exports.VideoCardListComponent = VideoCardListComponent;
////////////////////////////////////////////////////////////////
var VideoDetailsComponent = (function () {
    function VideoDetailsComponent(videoService, sanitizer) {
        this.videoService = videoService;
        this.sanitizer = sanitizer;
    }
    VideoDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.videoService.getVideo(this.id).subscribe(function (video) {
            _this.item = video;
            if (_this.item.youtubeid)
                _this.url = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.item.link);
        }, function (error) { return console.error(error); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VideoDetailsComponent.prototype, "id", void 0);
    VideoDetailsComponent = __decorate([
        core_1.Component({
            selector: 'video-details',
            template: "\n      <div class=\"mdl-card mdl-cell--12-col\" *ngIf=\"item\">\n        <div class=\"mdl-card__title mdl-card--expand\">\n          <h2 class=\"mdl-card__title-text\">{{item.title}}</h2>\n        </div>\n        <div class=\"mdl-card__supporting-text icon-des\">\n          <i class=\"material-icons dp48\">tag_faces</i>\n          &nbsp;<small class=\"ng-binding\">Ch\u1EE7 x\u1ECB</small>&nbsp;&nbsp;\n          <i class=\"material-icons dp48\">alarm_on</i>\n          &nbsp;<small class=\"ng-binding\">1 gi\u1EDD tr\u01B0\u1EDBc</small>&nbsp;&nbsp;\n          <i class=\"material-icons dp48\">alarm</i>\n          &nbsp;<small class=\"ng-binding\">14p40\"</small>&nbsp;&nbsp;\n        </div>\n        <div class=\"videoWrapper\">        \n          <iframe width=\"560\" height=\"349\" [src]=\"url\" frameborder=\"0\" allowfullscreen *ngIf=\"item.youtubeid\"></iframe>\n          <video width=\"100%\" *ngIf=\"!item.youtubeid\" controls>\n            <source [src]=\"item.link\" type=\"video/mp4\">\n          </video>\n        </div>\n      </div>\n    ",
            providers: [video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService, platform_browser_1.DomSanitizationService])
    ], VideoDetailsComponent);
    return VideoDetailsComponent;
}());
exports.VideoDetailsComponent = VideoDetailsComponent;
////////////////////////////////////////////////////////////////
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
            template: "\n      <li class=\"mdl-list__item mdl-list__item--three-line\">\n        <a href=\"/{{item._id}}\" class=\"mdl-list__item-primary-content nothing\">\n          <img src=\"{{item.image}}\" width=\"80\" style=\"float: left; margin-right: 5px;\" class=\"rounded\">       \n          <div class=\"main-color title\">{{item.title}}</div>\n          <span class=\"mdl-list__item-text-body\">\n            <div class=\"icon-des des-color\"><i class=\"material-icons dp48\">alarm_on</i> 1 gi\u1EDD tr\u01B0\u1EDBc</div>\n          </span>\n        </a>\n      </li>\n    ",
            providers: [video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [])
    ], VideoRelationItemComponent);
    return VideoRelationItemComponent;
}());
exports.VideoRelationItemComponent = VideoRelationItemComponent;
////////////////////////////////////////////////////////////////
var VideoRelationListComponent = (function () {
    function VideoRelationListComponent(videoService) {
        this.videoService = videoService;
        this.videosRelation = [];
    }
    VideoRelationListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.id) {
            this.title = 'Xem nhieu nhat';
            this.videoService.getMostVideos({ page: 1 }).subscribe(function (videos) { _this.videosRelation = videos; }, function (error) { return console.error(error); });
        }
        else {
            this.title = 'Video lien quan';
            this.videoService.getRelateVideos(this.id).subscribe(function (videos) { _this.videosRelation = videos; }, function (error) { return console.error(error); });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VideoRelationListComponent.prototype, "id", void 0);
    VideoRelationListComponent = __decorate([
        core_1.Component({
            selector: 'video-relation-list',
            template: "\n      <div class=\"mdl-card mdl-shadow--2dp\">\n        <div class=\"mdl-card__title mdl-card--border\">\n          <h2 class=\"mdl-card__title-text\">{{title}}</h2>\n        </div>\n        <ul class=\"mdl-list\">\n          <video-relation-item style=\"width: 100%\" *ngFor=\"let v of videosRelation\" [item]=\"v\"></video-relation-item>\n        </ul>\n      </div>\n    ",
            providers: [video_service_1.VideoService],
            directives: [VideoRelationItemComponent]
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService])
    ], VideoRelationListComponent);
    return VideoRelationListComponent;
}());
exports.VideoRelationListComponent = VideoRelationListComponent;
var VideoDetailsPageComponent = (function () {
    function VideoDetailsPageComponent(route) {
        this.route = route;
    }
    VideoDetailsPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
    };
    VideoDetailsPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    VideoDetailsPageComponent = __decorate([
        core_1.Component({
            selector: 'video-details-page',
            template: "\n      <div class=\"mdl-grid\">\n        <video-details [id] = \"id\" class=\"mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\"></video-details>\n        <div                       class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n          <video-relation-list [id] = \"id\" class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\"></video-relation-list>\n        </div>\n      </div>\n    ",
            directives: [VideoDetailsComponent, VideoRelationListComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], VideoDetailsPageComponent);
    return VideoDetailsPageComponent;
}());
exports.VideoDetailsPageComponent = VideoDetailsPageComponent;
///////////////////////////////////////////////////////////////////
var VideoPageComponent = (function () {
    function VideoPageComponent(eventService, route) {
        this.eventService = eventService;
        this.route = route;
    }
    VideoPageComponent.prototype.updateModel = function () {
    };
    VideoPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.filter = {
                mode: params['mode'] || 'newest',
                query: {
                    title: params['txtSearch'] || ''
                }
            };
        });
    };
    VideoPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    VideoPageComponent.prototype.ngAfterViewInit = function () {
    };
    VideoPageComponent = __decorate([
        core_1.Component({
            selector: 'video-page',
            template: "\n      <div class=\"mdl-grid\">\n        <div class=\"mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">       \n          <video-card-list [filter]=\"filter\"></video-card-list>          \n        </div>\n        <div                class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n          <video-relation-list></video-relation-list>\n          <br/>\n          <video-relation-list></video-relation-list>\n        </div>\n      </div>\n    ",
            directives: [VideoCardListComponent, VideoRelationListComponent]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.ActivatedRoute])
    ], VideoPageComponent);
    return VideoPageComponent;
}());
exports.VideoPageComponent = VideoPageComponent;
