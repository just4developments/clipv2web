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
///////////////////////////////////////////////////////////////////
var UserMenuComponent = (function () {
    function UserMenuComponent(eventService, router) {
        this.eventService = eventService;
        this.router = router;
    }
    UserMenuComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    UserMenuComponent.prototype.goto = function (path) {
        this.router.navigateByUrl(path);
    };
    UserMenuComponent.prototype.logout = function () {
        var _this = this;
        FB.logout(function (res) {
            _this.eventService.emit({ com: 'facebook', action: 'logout' });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserMenuComponent.prototype, "user", void 0);
    UserMenuComponent = __decorate([
        core_1.Component({
            selector: 'user-menu',
            template: "\n      <li class=\"mdl-menu__item\">{{user.name}}</li>\n      <li class=\"mdl-menu__item\" (click)=\"goto('my-video')\">Post</li>\n      <li class=\"mdl-menu__item\" (click)=\"logout()\">Logout</li>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
    ], UserMenuComponent);
    return UserMenuComponent;
}());
exports.UserMenuComponent = UserMenuComponent;
