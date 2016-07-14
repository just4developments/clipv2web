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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
// import 'rxjs/add/operator/map';
require('rxjs/Rx');
var user_service_1 = require('./user.service');
var VideoCard = (function () {
    function VideoCard() {
    }
    return VideoCard;
}());
exports.VideoCard = VideoCard;
var VideoDetails = (function () {
    function VideoDetails() {
    }
    return VideoDetails;
}());
exports.VideoDetails = VideoDetails;
var VideoService = (function () {
    function VideoService(http, userService) {
        this.http = http;
        this.userService = userService;
    }
    VideoService.prototype.fromNowOn = function (v) {
        if (!v)
            return v;
        var now = new Date();
        var handleVideo = function (v) {
            var t0 = (now.getTime() - new Date(v.updateat).getTime());
            var str = '';
            var t = Math.floor(t0 / 1000 / 60 / 60 / 24);
            if (t > 0)
                str = t + ' ngày';
            else {
                t = Math.floor(t0 / 1000 / 60 / 60);
                if (t > 0)
                    str = t + ' giờ';
                else {
                    t = Math.floor(t0 / 1000 / 60);
                    if (t > 0)
                        str = t + ' phút';
                    else {
                        t = Math.floor(t0 / 1000);
                        if (t > 0)
                            str = t + ' giây';
                    }
                }
            }
            v.nowOnTime = str + ' trước';
            return v;
        };
        if (v instanceof Array) {
            for (var i in v) {
                v[i] = handleVideo(v[i]);
            }
        }
        else {
            v = handleVideo(v);
        }
        return v;
    };
    VideoService.prototype.searchVideos = function (txtSearch, meta) {
        var _this = this;
        return this.http.get('http://localhost:8000/video/search?txtSearch=' + txtSearch + '&page=' + meta.page + "&rows=" + meta.rows)
            .map(function (res) { return _this.fromNowOn(res.json()); })
            .catch(this.handleError);
    };
    VideoService.prototype.getKeywords = function () {
        return this.http.get('http://localhost:8000/keywords')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.getKeywordVideos = function (keyword, meta) {
        return this.http.get('http://localhost:8000/video/keyword?keyword=' + keyword + '&page=' + meta.page + "&rows=" + meta.rows)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.getNewestVideos = function (meta) {
        var _this = this;
        return this.http.get('http://localhost:8000/video/newest?page=' + meta.page + "&rows=" + meta.rows)
            .map(function (res) { return _this.fromNowOn(res.json()); })
            .catch(this.handleError);
    };
    VideoService.prototype.getMostVideos = function (meta) {
        var _this = this;
        return this.http.get('http://localhost:8000/video/most?page=' + meta.page + "&rows=" + meta.rows)
            .map(function (res) { return _this.fromNowOn(res.json()); })
            .catch(this.handleError);
    };
    VideoService.prototype.getHotVideos = function (meta) {
        var _this = this;
        return this.http.get('http://localhost:8000/video/hot?page=' + meta.page + "&rows=" + meta.rows)
            .map(function (res) { return _this.fromNowOn(res.json()); })
            .catch(this.handleError);
    };
    VideoService.prototype.getRelateVideos = function (id, keywords, updateat, meta) {
        var _this = this;
        var s = '';
        for (var i in keywords) {
            var k = keywords[i];
            if (s.length > 0)
                s += ',';
            s += '' + k._id;
        }
        return this.http.get('http://localhost:8000/video/relate?id=' + id + '&keywords=' + s + '&updateat=' + updateat + '&page=' + meta.page + "&rows=" + meta.rows)
            .map(function (res) { return _this.fromNowOn(res.json()); })
            .catch(this.handleError);
    };
    VideoService.prototype.getVideo = function (id) {
        return this.http.get('http://localhost:8000/video/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.addVideo = function (v) {
        return this.http.post('http://localhost:8000/video', v, new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }))
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.removeVideo = function (id) {
        return this.http.delete('http://localhost:8000/video/' + id, new http_1.RequestOptions({ headers: new http_1.Headers({ 'me': this.userService.currentUser._id }) }))
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.getMyVideo = function () {
        return this.http.get('http://localhost:8000/myvideo', new http_1.RequestOptions({ headers: new http_1.Headers({ 'me': this.userService.currentUser._id }) }))
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    VideoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
