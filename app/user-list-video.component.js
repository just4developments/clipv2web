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
var event_service_1 = require('./event.service');
var user_service_1 = require('./user.service');
var video_directive_1 = require('./video.directive');
var UserListVideoComponent = (function () {
    function UserListVideoComponent(zone, videoService, eventService, userService) {
        this.zone = zone;
        this.videoService = videoService;
        this.eventService = eventService;
        this.userService = userService;
        this.isLoaded = false;
    }
    UserListVideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gsub = this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'facebook') {
                if (data.action === 'login') {
                    if (data.data) {
                        _this.zone.run(function () {
                            _this.loadMyVideo();
                        });
                    }
                }
            }
        });
        this.loadMyVideo();
    };
    UserListVideoComponent.prototype.loadMyVideo = function () {
        var _this = this;
        if (!this.userService.currentUser)
            return;
        this.videoService.getMyVideo().subscribe(function (videos) { _this.videos = videos; }, function (error) { return console.error(error); });
    };
    UserListVideoComponent.prototype.ngOnDestroy = function () {
        this.gsub.unsubscribe();
    };
    UserListVideoComponent.prototype.ngAfterViewInit = function () {
    };
    UserListVideoComponent.prototype.add = function (item) {
        this.videos.splice(0, 0, item);
    };
    UserListVideoComponent.prototype.remove = function (item) {
        var _this = this;
        this.videoService.removeVideo(item._id).subscribe(function (v) {
            _this.videos.splice(_this.videos.indexOf(item), 1);
            _this.eventService.emit({ com: 'snack-bar', msg: 'Removed done' });
        }, function (error) { return console.error(error); });
    };
    UserListVideoComponent = __decorate([
        core_1.Component({
            selector: 'user-list-video',
            template: "\n      <div class=\"mdl-card mdl-shadow--2dp\">\n        <div class=\"mdl-card__title mdl-card--border\">\n          <h6 class=\"mdl-card__title-text\">My videos</h6>\n          <div class=\"mdl-layout-spacer\"></div>\n          <i class=\"material-icons mdl-list__item-icon\">videocam</i>\n        </div>\n        <ul class=\"mdl-list\" *ngIf=\"videos\">\n          <li class=\"mdl-list__item mdl-list__item--three-line\" style=\"width: 100%\" *ngFor=\"let item of videos\">\n            <a class=\"mdl-list__item-primary-content nothing\" [routerLink]=\"['/'+item._id]\" go-top>\n              <img src=\"{{item.image}}\" *ngIf=\"!item.youtubeid\" width=\"80\" style=\"float: left; margin-right: 5px;\" class=\"rounded\">\n              <img src=\"http://i.ytimg.com/vi/{{item.youtubeid}}/0.jpg\" *ngIf=\"item.youtubeid\" width=\"80\" style=\"float: left; margin-right: 5px;\" class=\"rounded\">\n              <div class=\"main-color title\">{{item.title}}</div>\n              <span class=\"mdl-list__item-text-body des-color\">\n                {{item.updateat | date: 'dd/MM/yyyy'}}\n              </span>\n            </a>\n            <a class=\"mdl-list__item-secondary-action\" href=\"javascript:void(0)\" (click)=\"remove(item)\" *ngIf=\"!item.status\"><i class=\"material-icons\">remove_circle</i></a>\n          </li>\n        </ul>\n      </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES, video_directive_1.GoTop]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, video_service_1.VideoService, event_service_1.EventService, user_service_1.UserService])
    ], UserListVideoComponent);
    return UserListVideoComponent;
}());
exports.UserListVideoComponent = UserListVideoComponent;
