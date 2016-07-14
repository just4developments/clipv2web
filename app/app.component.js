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
var user_component_1 = require('./user.component');
var video_directive_1 = require('./video.directive');
var event_service_1 = require('./event.service');
var user_service_1 = require('./user.service');
var video_service_1 = require('./video.service');
var snack_bar_component_1 = require('./snack-bar.component');
var AppComponent = (function () {
    function AppComponent(zone, videoService, eventService, router, userService) {
        var _this = this;
        this.zone = zone;
        this.videoService = videoService;
        this.eventService = eventService;
        this.router = router;
        this.userService = userService;
        this.videoService.getKeywords().subscribe(function (keywords) { _this.keywords = keywords; }, function (error) { return console.error(error); });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gsub = this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'facebook') {
                if (data.action === 'login') {
                    if (data.data) {
                        _this.zone.run(function () {
                            _this.userService.currentUser = data.data;
                        });
                    }
                    else {
                        console.log('login failed');
                    }
                }
                else if (data.action === 'logout') {
                    _this.zone.run(function () {
                        _this.userService.logout();
                    });
                }
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.gsub.unsubscribe();
    };
    AppComponent.prototype.actived = function (path) {
        return this.router.url === path ? 'actived' : '';
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeDom();
    };
    AppComponent.prototype.search = function () {
        this.router.navigateByUrl('search/' + this.txtSearch);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n      <snack-bar></snack-bar>\n      <div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header\" mdl>\n        <div class=\"android-header mdl-layout__header mdl-layout__header--waterfall\">\n          <div class=\"mdl-layout__header-row\">\n            <a class=\"android-title mdl-layout-title\" [routerLink]=\"['/']\" go-top>\n              ClipVNet<small>.com</small>\n            </a>\n            <!-- Add spacer, to align navigation to the right in desktop -->\n            <div class=\"android-header-spacer mdl-layout-spacer\"></div>\n            <div class=\"android-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width\">\n              <label class=\"mdl-button mdl-js-button mdl-button--icon\" for=\"search-field\" id=\"label-search-field\">\n                <i class=\"material-icons\">search</i>\n              </label>\n              <div class=\"mdl-tooltip\" for=\"label-search-field\">\n                T\u00ECm ki\u1EBFm video\n              </div>\n              <div class=\"mdl-textfield__expandable-holder\">\n                <input class=\"mdl-textfield__input\" type=\"text\" id=\"search-field\" [(ngModel)]=\"txtSearch\" (enter)=\"search()\" select-when-focus>\n                <div class=\"mdl-tooltip\" for=\"search-field\">\n                  Press enter to search\n                </div>\n              </div>              \n            </div>\n            <!-- Navigation -->\n            <div class=\"android-navigation-container\">\n              <nav class=\"android-navigation mdl-navigation\">\n                <a class=\"mdl-navigation__link mdl-typography--text-uppercase {{actived('/')}}\" [routerLink]=\"['/']\" go-top>M\u1EDBi nh\u1EA5t</a>\n                <a class=\"mdl-navigation__link mdl-typography--text-uppercase {{actived('/v/most')}}\" [routerLink]=\"['/v/most']\" go-top>Xem nhi\u1EC1u nh\u1EA5t</a>\n                <a class=\"mdl-navigation__link mdl-typography--text-uppercase {{actived('/v/hot')}}\" [routerLink]=\"['/v/hot']\" go-top>Hot nh\u1EA5t</a>\n              </nav>\n            </div>\n            <a class=\"android-mobile-title mdl-layout-title\" [routerLink]=\"['/']\">\n              ClipVNet<small>.com</small>\n            </a>\n            <facebook-login *ngIf=\"!userService.currentUser\" class=\"android-more-button\"></facebook-login>\n            <a id=\"inbox-button\" class=\"android-more-button\" href=\"javascript: void(0)\" *ngIf=\"userService.currentUser\">\n              <span class=\"mdl-badge\" data-badge=\"4\">{{userService.currentUser.name}}</span>\n            </a>\n            <ul class=\"mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect\" for=\"inbox-button\" *ngIf=\"userService.currentUser\">\n              <user-menu [user]=\"userService.currentUser\"></user-menu>\n            </ul>\n          </div>\n        </div>\n        <div class=\"android-content mdl-layout__content\" align=\"center\" scroll-bottom>\n          <div align=\"left\" id=\"mainContent\">\n            <router-outlet></router-outlet>\n          </div>\n          <footer class=\"android-footer mdl-mega-footer\" id=\"footer\">\n            <div class=\"mdl-mega-footer--top-section\">\n              <div class=\"mdl-mega-footer--right-section\">\n                <a class=\"mdl-typography--font-light\" href=\"javascript: void(0);\" go-top>\n                  Back to Top\n                  <i class=\"material-icons\">expand_less</i>\n                </a>\n              </div>\n            </div>\n            <div class=\"keywords\">\n              <a *ngFor=\"let k of keywords\" style=\"float: left;\" go-top class=\"mdl-button mdl-js-button\" [routerLink]=\"['/k/'+k._id]\">{{k.name}}</a>\n            </div>\n            <div class=\"mdl-mega-footer--middle-section\" style=\"clear: both;\">\n              <p class=\"mdl-typography--font-light\">Satellite imagery: \u00A9 2014 Astrium, DigitalGlobe</p>\n              <p class=\"mdl-typography--font-light\">Some features and devices may not be available in all areas</p>\n            </div>\n          </footer>\n        </div>  \n      </div>\n    ",
            providers: [video_service_1.VideoService],
            directives: [user_component_1.UserMenuComponent, video_directive_1.MainScrollDirective, video_directive_1.MDL, video_directive_1.GoTop, router_1.ROUTER_DIRECTIVES, facebook_component_1.FacebookLoginComponent, snack_bar_component_1.SnackBarComponent, video_directive_1.EnterDirective, video_directive_1.SelectWhenFocusDirective]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, video_service_1.VideoService, event_service_1.EventService, router_1.Router, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
