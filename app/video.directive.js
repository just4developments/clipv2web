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
var event_service_1 = require('./event.service');
///////////////////////////////////////////////////////////////////
var MainScrollDirective = (function () {
    function MainScrollDirective(eventService) {
        this.eventService = eventService;
    }
    MainScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.gsub = this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'video-card-list') {
                if (_this.isLoadedData === false && data.action === 'loaded')
                    _this.isLoadedData = true;
                else if (data.action === 'stop')
                    _this.isLoadedData = undefined;
                else if (_this.isLoadedData === undefined && data.action === 'start')
                    _this.isLoadedData = false;
            }
        });
    };
    MainScrollDirective.prototype.ngOnDestroy = function () {
        this.gsub.unsubscribe();
    };
    MainScrollDirective.prototype.onScroll = function (event) {
        if (!this.isLoadedData)
            return false;
        var e = event.target;
        var m = e.querySelector('#mainContent0');
        if (e.scrollTop + e.offsetHeight >= m.offsetHeight) {
            this.isLoadedData = false;
            this.eventService.emit({ com: 'video-card-list', action: 'append' });
        }
    };
    __decorate([
        core_1.HostListener('scroll', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MainScrollDirective.prototype, "onScroll", null);
    MainScrollDirective = __decorate([
        core_1.Directive({
            selector: '[scroll-bottom]'
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], MainScrollDirective);
    return MainScrollDirective;
}());
exports.MainScrollDirective = MainScrollDirective;
var EnterDirective = (function () {
    function EnterDirective() {
        this.enter = new core_1.EventEmitter();
    }
    EnterDirective.prototype.onScroll = function (event) {
        if (event.keyCode === 13) {
            this.enter.emit(null);
        }
    };
    __decorate([
        core_1.Output('enter'), 
        __metadata('design:type', core_1.EventEmitter)
    ], EnterDirective.prototype, "enter", void 0);
    __decorate([
        core_1.HostListener('keypress', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], EnterDirective.prototype, "onScroll", null);
    EnterDirective = __decorate([
        core_1.Directive({
            selector: '[enter]'
        }), 
        __metadata('design:paramtypes', [])
    ], EnterDirective);
    return EnterDirective;
}());
exports.EnterDirective = EnterDirective;
var SelectWhenFocusDirective = (function () {
    function SelectWhenFocusDirective() {
    }
    SelectWhenFocusDirective.prototype.onScroll = function (event) {
        event.target.select();
    };
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SelectWhenFocusDirective.prototype, "onScroll", null);
    SelectWhenFocusDirective = __decorate([
        core_1.Directive({
            selector: '[select-when-focus]'
        }), 
        __metadata('design:paramtypes', [])
    ], SelectWhenFocusDirective);
    return SelectWhenFocusDirective;
}());
exports.SelectWhenFocusDirective = SelectWhenFocusDirective;
var GoTop = (function () {
    function GoTop() {
    }
    GoTop.prototype.ngAfterViewInit = function () {
        this.container = window.document.querySelector('[scroll-bottom]');
    };
    GoTop.prototype.onClick = function (event) {
        var _this = this;
        if (this.container.scrollTop !== 0) {
            setTimeout(function () {
                _this.container.scrollTop = 0;
            }, 200);
        }
    };
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], GoTop.prototype, "onClick", null);
    GoTop = __decorate([
        core_1.Directive({
            selector: '[go-top]'
        }), 
        __metadata('design:paramtypes', [])
    ], GoTop);
    return GoTop;
}());
exports.GoTop = GoTop;
var MDL = (function () {
    function MDL() {
    }
    MDL.prototype.ngAfterViewInit = function () {
        componentHandler.upgradeAllRegistered();
    };
    MDL = __decorate([
        core_1.Directive({
            selector: '[mdl]'
        }), 
        __metadata('design:paramtypes', [])
    ], MDL);
    return MDL;
}());
exports.MDL = MDL;
var Facebook = (function () {
    function Facebook() {
    }
    Facebook.prototype.ngAfterViewInit = function () {
    };
    Facebook = __decorate([
        core_1.Directive({
            selector: '[facebook]'
        }), 
        __metadata('design:paramtypes', [])
    ], Facebook);
    return Facebook;
}());
exports.Facebook = Facebook;
