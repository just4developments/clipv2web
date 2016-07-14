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
var video_card_list_component_1 = require('./video-card-list.component');
var video_relation_list_component_1 = require('./video-relation-list.component');
var facebook_component_1 = require('./facebook.component');
var VideoPageComponent = (function () {
    function VideoPageComponent(router, route, title) {
        this.router = router;
        this.route = route;
        this.title = title;
        this.query = {};
        this.page = 1;
    }
    VideoPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.qsub = this.router.routerState.queryParams.subscribe(function (params) {
            _this.page = +params.page || 1;
        });
        this.sub = this.route.params.subscribe(function (params) {
            var txtSearch = params['txtSearch'];
            var keyword = params['keyword'];
            if (txtSearch) {
                _this.mode = 'search';
                _this.query.txtSearch = txtSearch;
                _this.title.setTitle(txtSearch + '***');
            }
            else if (keyword) {
                _this.mode = 'keyword';
                _this.query.keyword = keyword;
                _this.title.setTitle(keyword);
            }
            else {
                _this.mode = params['mode'] || 'newest';
                if (_this.mode === 'most') {
                    _this.title.setTitle('Xem nhiều nhất');
                }
                else if (_this.mode === 'hot') {
                    _this.title.setTitle('Clip HOT nhất');
                }
                else {
                    _this.title.setTitle('ClipVNet - kênh video giải trí');
                }
            }
        });
    };
    VideoPageComponent.prototype.ngOnDestroy = function () {
        this.qsub.unsubscribe();
        this.sub.unsubscribe();
    };
    VideoPageComponent = __decorate([
        core_1.Component({
            selector: 'video-page',
            template: "\n      <div class=\"mdl-grid\">\n        <div class=\"mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">                 \n          <video-card-list [mode]=\"mode\" [query]=\"query\" [page]=\"page\" [rows]=\"12\"></video-card-list>          \n        </div>\n        <div                class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n          <facebook-page></facebook-page>\n          <br/>\n          <br/>\n          <video-relation-list [mode]=\"'most'\" [page]=\"1\" [rows]=\"5\"></video-relation-list>\n          <br/>\n          <video-relation-list [mode]=\"'hot'\" [page]=\"1\" [rows]=\"5\"></video-relation-list>\n        </div>\n      </div>\n    ",
            directives: [video_card_list_component_1.VideoCardListComponent, video_relation_list_component_1.VideoRelationListComponent, facebook_component_1.FacebookPageComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, platform_browser_1.Title])
    ], VideoPageComponent);
    return VideoPageComponent;
}());
exports.VideoPageComponent = VideoPageComponent;
