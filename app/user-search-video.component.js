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
var platform_browser_1 = require('@angular/platform-browser');
var video_service_1 = require('./video.service');
var user_service_1 = require('./user.service');
var event_service_1 = require('./event.service');
var video_directive_1 = require('./video.directive');
var UserSearchVideoComponent = (function () {
    function UserSearchVideoComponent(sanitizer, videoService, userService, eventService) {
        this.sanitizer = sanitizer;
        this.videoService = videoService;
        this.userService = userService;
        this.eventService = eventService;
        this.item = {};
        this.added = new core_1.EventEmitter();
    }
    UserSearchVideoComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    UserSearchVideoComponent.prototype.find = function (event) {
        if (event.keyCode === 13) {
            //https://www.youtube.com/watch?v=YW1G2UdM47o
            try {
                var m = this.link.match(/[^]*?youtube.com\/watch\?v=([^&]+)/);
                if (m && m.length > 1) {
                    this.item.youtubeid = m[1];
                    this.item.image = "http://i.ytimg.com/vi/" + this.item.youtubeid + "/0.jpg";
                    this.item.link = "https://www.youtube.com/embed/" + this.item.youtubeid;
                }
                else {
                    this.item.link = this.link;
                }
                this.item.creator = this.userService.currentUser._id;
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);
            }
            catch (e) {
                this.item.link = undefined;
            }
            console.log(this.item);
        }
        else {
            if (this.item.link && !this.link) {
                this.item.link = undefined;
            }
        }
    };
    UserSearchVideoComponent.prototype.save = function () {
        var _this = this;
        if (!this.item) {
            return this.eventService.emit({ com: 'snack-bar', msg: 'Not found' });
        }
        this.videoService.addVideo(this.item).subscribe(function (v) {
            if (v.length > 0) {
                _this.added.emit(v[0]);
                _this.eventService.emit({ com: 'snack-bar', msg: 'Insert done' });
            }
            else {
                _this.eventService.emit({ com: 'snack-bar', msg: 'Insert failed' });
            }
        }, function (error) { return console.error(error); });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UserSearchVideoComponent.prototype, "added", void 0);
    UserSearchVideoComponent = __decorate([
        core_1.Component({
            selector: 'user-search-video',
            template: "\n      <h3>Upload video c\u1EE7a b\u1EA1n cho ch\u00FAng t\u00F4i</h3>\n      <hr/>\n      <div class=\"mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label\" style=\"width: 100%\">\n        <label class=\"mdl-button mdl-js-button mdl-button--icon\" for=\"link\">\n          <i class=\"material-icons\">search</i>\n        </label>\n        <div class=\"mdl-textfield__expandable-holder\" style=\"width: 100%\">\n          <input class=\"mdl-textfield__input\" type=\"text\" id=\"link\" [(ngModel)]=\"link\" (keypress)=\"find($event)\" required select-when-focus>\n          <label class=\"mdl-textfield__label\" for=\"link\">\n            Youtube link\n          </label>\n        </div>\n      </div>\n      <br /><br />\n      \n      <div class=\"mdl-card mdl-cell--12-col\" [hidden]=\"!item.link\">\n        <div class=\"mdl-card__title mdl-card--expand\">                    \n          <div class=\"mdl-textfield mdl-js-textfield mdl-card__title-text\" style=\"width: 100%\">\n            <input class=\"mdl-textfield__input\" type=\"text\" id=\"title\" [(ngModel)]=\"item.title\">\n            <label class=\"mdl-textfield__label\" for=\"title\">Title</label>\n          </div>\n        </div>\n        <div class=\"videoWrapper\">\n          <iframe width=\"560\" height=\"349\" [src]=\"url\" frameborder=\"0\" allowfullscreen *ngIf=\"url && item.youtubeid\"></iframe>\n          <video width=\"100%\" controls *ngIf=\"item.link && !item.youtubeid\">\n            <source [src]=\"item.link\" type=\"video/mp4\">\n          </video>\n        </div>\n        <div class=\"mdl-card__menu\">\n          <button class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--colored\" (click)=\"save()\">\n            <i class=\"material-icons\">save</i>\n          </button>\n        </div>\n      </div>      \n    ",
            directives: [video_directive_1.SelectWhenFocusDirective]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService, video_service_1.VideoService, user_service_1.UserService, event_service_1.EventService])
    ], UserSearchVideoComponent);
    return UserSearchVideoComponent;
}());
exports.UserSearchVideoComponent = UserSearchVideoComponent;
