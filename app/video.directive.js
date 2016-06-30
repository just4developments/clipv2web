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
        this.isNexting = 0;
    }
    MainScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.emitter.subscribe(function (data) {
            if (data.com === 'video-card-list' && data.action === 'loaded') {
                _this.isNexting = 0;
            }
        });
    };
    MainScrollDirective.prototype.onScroll = function (event) {
        if (this.isNexting)
            return;
        var e = event.target;
        if (e.scrollTop + e.offsetHeight >= e.scrollHeight) {
            this.isNexting = 1;
            this.eventService.emit({ com: 'video-card-list', action: 'load' });
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
