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
var platform_browser_2 = require('@angular/platform-browser');
var video_service_1 = require('./video.service');
var video_directive_1 = require('./video.directive');
var facebook_component_1 = require('./facebook.component');
var VideoDetailsComponent = (function () {
    function VideoDetailsComponent(sanitizer, title) {
        this.sanitizer = sanitizer;
        this.title = title;
    }
    VideoDetailsComponent.prototype.ngOnChanges = function (changes) {
        this.locationHref = location.href;
        this.title.setTitle(this.item.title);
        if (this.item.youtubeid)
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', video_service_1.VideoDetails)
    ], VideoDetailsComponent.prototype, "item", void 0);
    VideoDetailsComponent = __decorate([
        core_1.Component({
            selector: 'video-details',
            template: "\n      <div class=\"mdl-card mdl-cell--12-col\" *ngIf=\"item\">\n        <div class=\"mdl-card__title mdl-card--expand\">\n          <h2 class=\"mdl-card__title-text\">{{item.title}}</h2>\n        </div>\n        <div class=\"mdl-card__supporting-text\" style=\"width: initial;\">          \n          <div class=\"mdl-grid mdl-grid--no-spacing\">\n            <div class=\"mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n              <i class=\"material-icons dp48\">tag_faces</i>\n              &nbsp;{{item.creator}}&nbsp;&nbsp;\n              <i class=\"material-icons dp48\">alarm_on</i>\n              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;\n              <i class=\"material-icons dp48\">alarm</i>\n              &nbsp;14p40\"&nbsp;&nbsp;\n            </div>\n            <div class=\"mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share\" align=\"right\">\n              <facebook-share [title]=\"item.title\" [description]=[item.title] [picture]=\"item.image\" [caption]=\"abc\"></facebook-share>\n            </div>\n          </div>\n        </div>\n        <div class=\"videoWrapper\">        \n          <iframe width=\"560\" height=\"349\" [src]=\"url\" frameborder=\"0\" allowfullscreen *ngIf=\"item.youtubeid\"></iframe>\n          <video width=\"100%\" *ngIf=\"!item.youtubeid\" controls>\n            <source [src]=\"item.link\" type=\"video/mp4\">\n          </video>\n        </div>\n        <div class=\"keywords\">\n          <a *ngFor=\"let k of item.keywords\" go-top style=\"float: left;\" class=\"mdl-button mdl-js-button\" [routerLink]=\"['/k/'+k._id]\">{{k.name}}</a>\n        </div>\n        <hr style=\"clear: both\"/>\n        <facebook-comment [link]=\"locationHref\"></facebook-comment>\n      </div>\n    ",
            styles: ['.mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}'],
            directives: [video_directive_1.GoTop, facebook_component_1.FacebookCommentComponent, facebook_component_1.FacebookShareComponent, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService, platform_browser_2.Title])
    ], VideoDetailsComponent);
    return VideoDetailsComponent;
}());
exports.VideoDetailsComponent = VideoDetailsComponent;
