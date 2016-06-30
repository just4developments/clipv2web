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
var facebook_component_1 = require('./facebook.component');
var video_directive_1 = require('./video.directive');
var event_service_1 = require('./event.service');
var AppComponent = (function () {
    function AppComponent(eventService, router) {
        this.eventService = eventService;
        this.router = router;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    AppComponent.prototype.login = function (event) {
        if (event) {
            this.user = event;
            setTimeout(function () {
                componentHandler.upgradeDom();
            });
        }
    };
    AppComponent.prototype.search = function (event) {
        if (event.keyCode === 13) {
            this.router.navigateByUrl('search/' + this.txtSearch);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n      <div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header\" mdl>\n        <div class=\"android-header mdl-layout__header mdl-layout__header--waterfall\">\n          <div class=\"mdl-layout__header-row\">\n            <span class=\"android-title mdl-layout-title\">\n              <img class=\"android-logo-image\" src=\"images/android-logo.png\">\n            </span>\n            <!-- Add spacer, to align navigation to the right in desktop -->\n            <div class=\"android-header-spacer mdl-layout-spacer\"></div>\n            <div class=\"android-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width\">\n              <label class=\"mdl-button mdl-js-button mdl-button--icon\" for=\"search-field\" id=\"label-search-field\">\n                <i class=\"material-icons\">search</i>\n              </label>\n              <div class=\"mdl-tooltip\" for=\"label-search-field\">\n                T\u00ECm ki\u1EBFm video\n              </div>\n              <div class=\"mdl-textfield__expandable-holder\">\n                <input class=\"mdl-textfield__input\" type=\"text\" id=\"search-field\" [(ngModel)]=\"txtSearch\" (keypress)=\"search($event)\">\n              </div>              \n            </div>            \n            <facebook-login (login)=\"login($event)\" *ngIf=\"!user\"></facebook-login>\n            <!-- Navigation -->\n            <div class=\"android-navigation-container\">\n              <nav class=\"android-navigation mdl-navigation\">\n                <a class=\"mdl-navigation__link mdl-typography--text-uppercase\" href=\"/most\">Hot nh\u1EA5t</a>\n                <a class=\"mdl-navigation__link mdl-typography--text-uppercase\" href=\"/\">\u0110\u01B0\u1EE3c \u0111\u1EC1 c\u1EED</a>\n              </nav>\n            </div>\n            <span class=\"android-mobile-title mdl-layout-title\">\n              <img class=\"android-logo-image\" src=\"images/android-logo.png\">\n            </span>\n            <button class=\"android-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect\" id=\"more-button\" *ngIf=\"user\">\n              <i class=\"material-icons\">more_vert</i>\n            </button>\n            <ul class=\"mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect\" for=\"more-button\" *ngIf=\"user\">\n              <li class=\"mdl-menu__item\">{{user.name}}</li>\n              <li class=\"mdl-menu__item\">Post</li>\n              <li disabled class=\"mdl-menu__item\">Messages</li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"android-content mdl-layout__content\" align=\"center\" scroll-bottom>\n          <div align=\"left\" id=\"mainContent\">\n            <router-outlet></router-outlet>\n          </div>\n          <footer class=\"android-footer mdl-mega-footer\" id=\"footer\">\n            <div class=\"mdl-mega-footer--top-section\">\n              <div class=\"mdl-mega-footer--right-section\">\n                <a class=\"mdl-typography--font-light\" href=\"#top\">\n                  Back to Top\n                  <i class=\"material-icons\">expand_less</i>\n                </a>\n              </div>\n            </div>\n            <div class=\"mdl-mega-footer--middle-section\">\n              <p class=\"mdl-typography--font-light\">Satellite imagery: \u00A9 2014 Astrium, DigitalGlobe</p>\n              <p class=\"mdl-typography--font-light\">Some features and devices may not be available in all areas</p>\n            </div>\n          </footer>\n        </div>  \n      </div>\n    ",
            directives: [video_directive_1.MainScrollDirective, video_directive_1.MDL, router_1.ROUTER_DIRECTIVES, facebook_component_1.FacebookLoginComponent]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
