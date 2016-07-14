"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var event_service_1 = require("./event.service");
var user_service_1 = require("./user.service");
var FANPAGE = "https://www.facebook.com/clipvnet/";
var AbsFacebookComponent = (function () {
    function AbsFacebookComponent(eventService, e, tag) {
        this.eventService = eventService;
        this.e = e;
        this.tag = tag;
    }
    AbsFacebookComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gsub = this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'facebook') {
                if (data.action === 'loaded') {
                    _this.render();
                }
            }
        });
        this.render();
    };
    AbsFacebookComponent.prototype.ngOnDestroy = function () {
        this.gsub.unsubscribe();
    };
    AbsFacebookComponent.prototype.render = function () {
        if (this.isRenderer)
            return;
        try {
            var fc = this.e.nativeElement.querySelector(this.tag);
            FB.XFBML.parse(fc);
            this.isRenderer = true;
        }
        catch (e) { }
    };
    return AbsFacebookComponent;
}());
var FacebookLoginComponent = (function () {
    function FacebookLoginComponent(userService, eventService) {
        this.userService = userService;
        this.eventService = eventService;
    }
    FacebookLoginComponent.prototype.onFacebookLoginClick = function () {
        var _this = this;
        var self = this;
        FB.login(function (resp) {
            _this.getInfor(self, resp);
        }, { scope: 'email, publish_actions, user_friends' });
    };
    FacebookLoginComponent.prototype.ngOnInit = function () {
        // this.gsub = this.eventService.emitter.subscribe((data: any) => {
        //   console.log(data);
        //   if(data.com === 'facebook'){
        //     if(data.action === 'loaded') {             
        //       this.loginCallback();
        //     }
        //   }
        // });
        this.loginCallback();
    };
    FacebookLoginComponent.prototype.ngOnDestroy = function () {
        // this.gsub.unsubscribe();
    };
    FacebookLoginComponent.prototype.loginCallback = function () {
        var self = this;
        FB.getLoginStatus(function (resp) {
            self.getInfor(self, resp);
        });
    };
    FacebookLoginComponent.prototype.getInfor = function (self, resp) {
        if (resp.status === 'connected') {
            FB.api('/me', {
                fields: ['email', 'name', 'age_range']
            }, function (res) {
                if (!res || res.error) {
                    self.eventService.emit({ com: 'facebook', action: 'login' });
                }
                else {
                    res.accessToken = resp.authResponse.accessToken;
                    self.userService.loginSystem(res).subscribe(function (user) {
                        self.eventService.emit({ com: 'facebook', action: 'login', data: user });
                    }, function (error) {
                        self.eventService.emit({ com: 'facebook', action: 'login' });
                    });
                }
            });
        }
        else {
            self.eventService.emit({ com: 'facebook', action: 'login' });
        }
    };
    FacebookLoginComponent = __decorate([
        core_1.Component({
            selector: 'facebook-login',
            template: "\n      <button class=\"mdl-button mdl-js-button mdl-button--colored\" (click)=\"onFacebookLoginClick()\">\n        Login\n      </button>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, event_service_1.EventService])
    ], FacebookLoginComponent);
    return FacebookLoginComponent;
}());
exports.FacebookLoginComponent = FacebookLoginComponent;
var FacebookPageComponent = (function (_super) {
    __extends(FacebookPageComponent, _super);
    function FacebookPageComponent(eventService, e) {
        _super.call(this, eventService, e, 'facebook-page');
        this.eventService = eventService;
        this.e = e;
    }
    FacebookPageComponent = __decorate([
        core_1.Component({
            selector: 'facebook-page',
            template: '<div class="fb-page" data-href="' + FANPAGE + '" data-tabs="timeline" data-height="70" data-small-header="false" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="false"><blockquote cite="' + FANPAGE + '" class="fb-xfbml-parse-ignore"><a href="' + FANPAGE + '">Clipvnet.com</a></blockquote></div>',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, core_1.ElementRef])
    ], FacebookPageComponent);
    return FacebookPageComponent;
}(AbsFacebookComponent));
exports.FacebookPageComponent = FacebookPageComponent;
var FacebookLikeComponent = (function (_super) {
    __extends(FacebookLikeComponent, _super);
    function FacebookLikeComponent(eventService, e) {
        _super.call(this, eventService, e, 'facebook-like');
        this.eventService = eventService;
        this.e = e;
    }
    FacebookLikeComponent = __decorate([
        core_1.Component({
            selector: 'facebook-like',
            template: '<div class="fb-like" data-href="' + FANPAGE + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, core_1.ElementRef])
    ], FacebookLikeComponent);
    return FacebookLikeComponent;
}(AbsFacebookComponent));
exports.FacebookLikeComponent = FacebookLikeComponent;
var FacebookShareComponent = (function () {
    function FacebookShareComponent() {
    }
    FacebookShareComponent.prototype.share = function (event) {
        var link = location.href;
        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:url': link,
                    'og:title': this.title,
                    'og:description': this.description,
                    'og:image': this.picture,
                    'og:caption': this.caption
                }
            }) }, function (res) {
            if (!res || res.error_message)
                console.log(res);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FacebookShareComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FacebookShareComponent.prototype, "caption", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FacebookShareComponent.prototype, "picture", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FacebookShareComponent.prototype, "description", void 0);
    FacebookShareComponent = __decorate([
        core_1.Component({
            selector: 'facebook-share',
            template: "\n      <button class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--primary\" (click)=\"share($event)\">\n        <i class=\"material-icons\">share</i>\n      </button>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], FacebookShareComponent);
    return FacebookShareComponent;
}());
exports.FacebookShareComponent = FacebookShareComponent;
var FacebookCommentComponent = (function (_super) {
    __extends(FacebookCommentComponent, _super);
    function FacebookCommentComponent(eventService, e, r) {
        _super.call(this, eventService, e, 'facebook-comment');
        this.eventService = eventService;
        this.e = e;
        this.r = r;
    }
    FacebookCommentComponent.prototype.ngOnChanges = function (changes) {
        this.r.setElementAttribute(this.e.nativeElement, 'data-href', this.link);
        this.render();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FacebookCommentComponent.prototype, "link", void 0);
    FacebookCommentComponent = __decorate([
        core_1.Component({
            selector: 'facebook-comment',
            template: '<div id="fb-comments" class="fb-comments" data-width="100%" data-numposts="5"></div>',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, core_1.ElementRef, core_1.Renderer])
    ], FacebookCommentComponent);
    return FacebookCommentComponent;
}(AbsFacebookComponent));
exports.FacebookCommentComponent = FacebookCommentComponent;
