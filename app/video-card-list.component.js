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
var event_service_1 = require('./event.service');
var video_service_1 = require('./video.service');
var video_directive_1 = require('./video.directive');
var video_card_item_component_1 = require('./video-card-item.component');
var video_card_loading_component_1 = require('./video-card-loading.component');
var VideoCardListComponent = (function () {
    function VideoCardListComponent(videoService, eventService, cmpResolver) {
        this.videoService = videoService;
        this.eventService = eventService;
        this.cmpResolver = cmpResolver;
        this.isLoading = false;
        this.isLastAutoScroll = false;
        this.initPage = 1;
    }
    VideoCardListComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    VideoCardListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.eventService.emit({ com: 'video-card-list', action: 'start' });
        this.initPage = this.page;
        this.isLastAutoScroll = false;
        this.clearContent(this);
        this.nextPage(this, function () {
            _this.eventService.emit({ com: 'video-card-list', action: 'loaded' });
        });
    };
    VideoCardListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gsub = this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'video-card-list') {
                if (data.action === 'append') {
                    _this.page++;
                    _this.nextPage(_this, function () {
                        _this.eventService.emit({ com: 'video-card-list', action: 'loaded' });
                        if (_this.page > _this.initPage && (_this.page - _this.initPage) % 2 === 0) {
                            _this.isLastAutoScroll = true;
                            return _this.eventService.emit({ com: 'video-card-list', action: 'stop' });
                        }
                    });
                }
            }
        });
    };
    VideoCardListComponent.prototype.ngOnDestroy = function () {
        this.gsub.unsubscribe();
    };
    VideoCardListComponent.prototype.nextPage = function (self, fcDone) {
        self.isLoading = true;
        self.eventService.emit({ com: 'page-loading', action: 1 });
        if (self.mode === 'most') {
            self.videoService.getMostVideos({ page: self.page, rows: self.rows }).subscribe(function (videos) {
                self.drawContent(self, videos, fcDone);
            }, self.drawError);
        }
        else if (self.mode === 'newest') {
            self.videoService.getNewestVideos({ page: self.page, rows: self.rows }).subscribe(function (videos) {
                self.drawContent(self, videos, fcDone);
            }, self.drawError);
        }
        else if (self.mode === 'hot') {
            self.videoService.getHotVideos({ page: self.page, rows: self.rows }).subscribe(function (videos) {
                self.drawContent(self, videos, fcDone);
            }, self.drawError);
        }
        else if (self.mode === 'search') {
            self.videoService.searchVideos(self.query.txtSearch, { page: self.page, rows: self.rows }).subscribe(function (videos) {
                self.drawContent(self, videos, fcDone);
            }, self.drawError);
        }
        else if (self.mode === 'keyword') {
            self.videoService.getKeywordVideos(self.query.keyword, { page: self.page, rows: self.rows }).subscribe(function (videos) {
                self.drawContent(self, videos, fcDone);
            }, self.drawError);
        }
    };
    VideoCardListComponent.prototype.drawError = function (err) {
        console.error(err);
    };
    VideoCardListComponent.prototype.clearContent = function (self) {
        self.viewContainer.clear();
    };
    VideoCardListComponent.prototype.drawContent = function (self, videos, fcDone) {
        if (videos.length === 0) {
            this.isLoading = undefined;
            return;
        }
        self.cmpResolver.resolveComponent(video_card_item_component_1.VideoCardItemComponent)
            .then(function (factory) {
            var index = self.viewContainer.length;
            for (var i in videos) {
                var com = self.viewContainer.createComponent(factory, index++, self.viewContainer.injector);
                com.instance.item = videos[i];
            }
            self.isLoading = false;
            self.eventService.emit({ com: 'page-loading', action: 0 });
            fcDone();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VideoCardListComponent.prototype, "mode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VideoCardListComponent.prototype, "query", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VideoCardListComponent.prototype, "page", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VideoCardListComponent.prototype, "rows", void 0);
    __decorate([
        core_1.ViewChild('viewContainer', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', Object)
    ], VideoCardListComponent.prototype, "viewContainer", void 0);
    VideoCardListComponent = __decorate([
        core_1.Component({
            selector: 'video-card-list',
            template: "\n      <div class=\"android-card-container mdl-grid\" id=\"mainContent0\">\n          <div #viewContainer></div>\n          <video-card-loading [hidden]=\"!isLoading\"></video-card-loading>\n      </div>      \n      <div *ngIf=\"isLastAutoScroll\" align=\"center\" class=\"isLastAutoScroll\">\n        <button class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\" go-top [routerLink]=\"['/']\" [queryParams]=\"{page: page}\">\n          <i class=\"normal material-icons\">hdr_weak</i>\n          <i class=\"hover material-icons\">hdr_strong</i>\n        </button>\n      </div>\n    ",
            styles: [
                'button { position: relative; margin-bottom: -90px; }',
                'button i.hover { display: none; }',
                'button:hover i.hover { display: block; }',
                'button:hover i.normal { display: none; }'
            ],
            providers: [video_service_1.VideoService],
            directives: [video_card_item_component_1.VideoCardItemComponent, video_card_loading_component_1.VideoCardLoadingComponent, router_1.ROUTER_DIRECTIVES, video_directive_1.GoTop]
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService, event_service_1.EventService, core_1.ComponentResolver])
    ], VideoCardListComponent);
    return VideoCardListComponent;
}());
exports.VideoCardListComponent = VideoCardListComponent;
