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
var user_search_video_component_1 = require('./user-search-video.component');
var user_list_video_component_1 = require('./user-list-video.component');
var UserVideoPageComponent = (function () {
    function UserVideoPageComponent() {
    }
    UserVideoPageComponent.prototype.ngAfterViewInit = function () {
    };
    UserVideoPageComponent.prototype.added = function (item) {
        this.myvideo.add(item);
    };
    __decorate([
        core_1.ViewChild('myvideo'), 
        __metadata('design:type', user_list_video_component_1.UserListVideoComponent)
    ], UserVideoPageComponent.prototype, "myvideo", void 0);
    UserVideoPageComponent = __decorate([
        core_1.Component({
            selector: 'user-video-page',
            template: "\n      <div class=\"mdl-grid\">\n        <div class=\"mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n          <user-search-video (added)=\"added($event)\"></user-search-video>\n        </div>\n        <div class=\"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top\">\n          <user-list-video #myvideo></user-list-video>\n        </div>\n      </div>\n    ",
            directives: [user_search_video_component_1.UserSearchVideoComponent, user_list_video_component_1.UserListVideoComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], UserVideoPageComponent);
    return UserVideoPageComponent;
}());
exports.UserVideoPageComponent = UserVideoPageComponent;
