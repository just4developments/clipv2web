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
var router_1 = require("@angular/router");
var FacebookLoginComponent = (function () {
    function FacebookLoginComponent() {
        this.login = new core_1.EventEmitter();
        FB.init({
            appId: '850835344955953',
            cookie: true,
            xfbml: true,
            version: 'v2.6'
        });
    }
    FacebookLoginComponent.prototype.onFacebookLoginClick = function () {
        FB.login();
    };
    FacebookLoginComponent.prototype.ngOnInit = function () {
        var self = this;
        FB.getLoginStatus(function (resp) {
            if (resp.status === 'connected') {
                FB.api('/me', {
                    fields: ['email', 'name', 'age_range']
                }, function (res) {
                    if (!res || res.error) {
                        self.login.emit(null);
                    }
                    else {
                        self.login.emit(res);
                    }
                });
            }
            else {
                self.login.emit(null);
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FacebookLoginComponent.prototype, "login", void 0);
    FacebookLoginComponent = __decorate([
        core_1.Component({
            selector: 'facebook-login',
            template: "\n      <button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\" (click)=\"onFacebookLoginClick()\">\n        Facebook\n      </button>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], FacebookLoginComponent);
    return FacebookLoginComponent;
}());
exports.FacebookLoginComponent = FacebookLoginComponent;
