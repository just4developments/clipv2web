webpackJsonp([1,2],{990:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e.prototype.transform=function(e){return e?e.replace("H","g").replace("M","p").replace("S",'"'):e},e=__decorate([o.Pipe({name:"HowlongPipe"}),__metadata("design:paramtypes",[])],e)}();t.HowlongPipe=n},488:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(997))},997:function(e,t,i){"use strict";var o=i(1),n=i(56),r=i(32),s=i(305),a=i(998),c=i(486),l=i(87),d=function(){function e(e,t){var i=this;this.route=e,this.videoService=t,this.keywords=this.videoService.getKeywords(),this.route.data.subscribe(function(e){i.item=e.video;for(var t in i.item.keywords)for(var o=0,n=i.keywords;o<n.length;o++){var r=n[o];i.item.keywords[t]===r._id&&(i.item.keywords[t]=r)}})}return e.prototype.ngOnInit=function(){},e=__decorate([o.Component({selector:"video-details-page",template:'\n      <div class="mdl-grid" *ngIf="item">\n        <video-details [item] = "item" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>\n        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <video-relation-list [query]="{keywords: item.keywords, id: item._id, updateat: item.updateat}" [mode]="\'relation\'" [page]="1" [rows]="10" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>\n        </div>\n      </div>\n    ',directives:[a.VideoDetailsComponent,c.VideoRelationListComponent,s.FacebookLikeComponent,r.CORE_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&t||Object,"function"==typeof(i="undefined"!=typeof l.VideoService&&l.VideoService)&&i||Object])],e);var t,i}();t.VideoDetailsPageComponent=d},998:function(e,t,i){"use strict";var o=i(1),n=i(56),r=i(88),s=i(87),a=i(49),c=i(66),l=i(142),d=i(305),m=function(){function e(e,t,i,o){this.title=e,this.videoService=t,this.eventService=i,this.userService=o,this.isChecked=!1}return e.prototype.ngOnInit=function(){var e=this;this.gsub=this.eventService.emitter.subscribe(function(t){"facebook"===t.com&&"login"===t.action&&t.data&&e.checkFavorite()})},e.prototype.ngOnDestroy=function(){this.gsub.unsubscribe()},e.prototype.checkFavorite=function(){var e=this;this.userService.currentUser&&(this.isChecked=!0,this.isFavorite=this.userService.currentUser.favorites.findIndex(function(t,i,o){return t._id===e.item._id})!=-1)},e.prototype.favorite=function(){var e=this;this.isFavorite?this.videoService.removeFavorite(this.item._id).subscribe(function(t){e.userService.currentUser.favorites=t,e.userService.save(),e.eventService.emit({com:"snack-bar",msg:"Đã xóa khỏi danh sách yêu thích"})},function(t){return e.eventService.emit({com:"snack-bar",msg:"Có lỗi trong quá trình xử lý"})}):this.videoService.addFavorite(this.item).subscribe(function(t){t.length>0?(e.userService.currentUser.favorites=t,e.userService.save(),e.eventService.emit({com:"snack-bar",msg:"Đã thêm vào danh sách yêu thích"})):e.eventService.emit({com:"snack-bar",msg:"Có lỗi trong quá trình xử lý"})},function(t){return e.eventService.emit({com:"snack-bar",msg:"Có lỗi trong quá trình xử lý"})}),this.isFavorite=!this.isFavorite},e.prototype.ngOnChanges=function(e){this.locationHref=location.href,this.title.setTitle(this.item.title),this.checkFavorite(),this.isChecked=!1},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof s.VideoDetails&&s.VideoDetails)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-details",template:'\n      <div class="mdl-card mdl-cell--12-col" *ngIf="item">\n        <div class="mdl-card__title mdl-card--expand">\n          <h2 class="mdl-card__title-text">{{item.title}}</h2>\n        </div>\n        <div class="mdl-card__supporting-text" style="width: initial;">          \n          <div class="mdl-grid mdl-grid--no-spacing">\n            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n              <i class="material-icons dp48">tag_faces</i>\n              &nbsp;{{item.creator}}&nbsp;&nbsp;\n              <i class="material-icons dp48">alarm_on</i>\n              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;\n              <i class="material-icons dp48">alarm</i>\n              &nbsp;14p40"&nbsp;&nbsp;\n            </div>\n            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share" align="right">\n              <button id="btnFavorite" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--accent" (click)="favorite($event)" title="{{isFavorite ? \'Xóa khỏi\': \'Thêm vào\'}} danh sách yêu thích">\n                <i class="material-icons" *ngIf="!isFavorite">favorite_border</i>\n                <i class="material-icons" *ngIf="isFavorite" title="">favorite</i>\n              </button>\n              <facebook-share [title]="item.title" [description]=[item.title] [picture]="item.image" [caption]="\'ClipVNet.com\'"></facebook-share>              \n            </div>\n          </div>\n        </div>\n        <div class="videoWrapper">        \n          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>\n          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>\n          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>          \n        </div>\n        <div class="keywords">\n          <a *ngFor="let k of item.keywords" go-top style="float: left;" class="mdl-button mdl-js-button" [routerLink]="[\'/k/\'+k._id]">{{k.name}}</a>\n        </div>\n        <hr style="clear: both"/>\n        <facebook-comment [link]="locationHref"></facebook-comment>\n      </div>\n    ',styles:[".mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}","#btnFavorite i {zoom: 2}"],directives:[l.GoTop,d.FacebookCommentComponent,d.FacebookShareComponent,n.ROUTER_DIRECTIVES,d.FacebookPlayerComponent,d.YoutubePlayerComponent,d.Html5PlayerComponent]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof r.Title&&r.Title)&&i||Object,"function"==typeof(m="undefined"!=typeof s.VideoService&&s.VideoService)&&m||Object,"function"==typeof(p="undefined"!=typeof a.EventService&&a.EventService)&&p||Object,"function"==typeof(u="undefined"!=typeof c.UserService&&c.UserService)&&u||Object])],e);var t,i,m,p,u}();t.VideoDetailsComponent=m},486:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(991)),o(i(993)),o(i(995));var n=i(486);t.routes={path:"",component:n.VideoPageComponent,children:[{path:"",component:n.VideoCardListComponent},{path:"v/:mode",component:n.VideoCardListComponent},{path:"k/:keyword",component:n.VideoCardListComponent},{path:"search/:txtSearch",component:n.VideoCardListComponent}]}},992:function(e,t,i){"use strict";var o=i(1),n=i(56),r=i(88),s=i(87),a=i(142),c=i(990),l=function(){function e(e){this.sanitizer=e}return e.prototype.ngOnInit=function(){this.url=this.sanitizer.bypassSecurityTrustUrl(this.item.image)},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof s.VideoCard&&s.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-card-item",template:'\n    <a [routerLink]="[\'/\'+item._id+\'/\'+item.title0]" class="nothing" go-top>\n      <div class="mdl-card__title">\n         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>\n      </div>      \n      <div class="mdl-card__media">\n        <img [src]="url">\n      </div>\n      <div class="howlong" *ngIf="item.duration"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.creator}}"><i class="material-icons dp48">tag_faces</i> {{item.creator}}</div>\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.nowOnTime}}"><i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}</div>\n      </div>\n    </a>\n    ',host:{"[class.mdl-card]":"true","[class.mdl-shadow--2dp]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"},pipes:[c.HowlongPipe],directives:[a.GoTop,n.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof r.DomSanitizationService&&r.DomSanitizationService)&&i||Object])],e);var t,i}();t.VideoCardItemComponent=l},993:function(e,t,i){"use strict";var o=i(1),n=i(56),r=i(88),s=i(49),a=i(87),c=i(142),l=i(992),d=i(994),m=function(){function e(e,t,i,o,n,r){this.router=e,this.route=t,this.title=i,this.videoService=o,this.eventService=n,this.cmpResolver=r,this.isLoading=!1,this.isInit=!1,this.isLastAutoScroll=!1,this.initPage=1,this.query={},this.page=1,this.rows=12}return e.prototype.ngAfterViewInit=function(){componentHandler.upgradeDom()},e.prototype.ngOnChanges=function(e){var t=this;this.nextPage(this,function(){t.eventService.emit({com:"video-card-list",action:"loaded"})})},e.prototype.ngOnInit=function(){var e=this;this.gsub=this.eventService.emitter.subscribe(function(t){"video-card-list"===t.com&&"append"===t.action&&(e.page++,e.nextPage(e,function(){if(e.eventService.emit({com:"video-card-list",action:"loaded"}),e.page>e.initPage&&(e.page-e.initPage)%2===0)return e.isLastAutoScroll=!0,e.eventService.emit({com:"video-card-list",action:"stop"})}))}),this.sub=this.route.params.subscribe(function(t){var i=t.txtSearch,o=t.keyword;i?(e.mode="search",e.query.txtSearch=i,e.title.setTitle(i+"***")):o?(e.mode="keyword",e.query.keyword=o,e.title.setTitle(o)):(e.mode=t.mode||"newest","most"===e.mode?e.title.setTitle("Xem nhiều nhất"):"hot"===e.mode?e.title.setTitle("Clip HOT nhất"):e.title.setTitle("ClipVNet - kênh video giải trí")),e.init()}),this.qsub=this.router.routerState.queryParams.subscribe(function(t){e.initPage=+t.page||1,e.page=e.initPage,e.isLastAutoScroll=!1,e.init()})},e.prototype.init=function(){var e=this;this.isInit||(this.isInit=!0,setTimeout(function(){e.clearContent(e),e.eventService.emit({com:"video-card-list",action:"start"}),e.nextPage(e,function(){e.isInit=!1,e.eventService.emit({com:"video-card-list",action:"loaded"})})},100))},e.prototype.ngOnDestroy=function(){this.gsub.unsubscribe(),this.qsub.unsubscribe(),this.sub.unsubscribe()},e.prototype.nextPage=function(e,t){e.isLoading=!0,e.eventService.emit({com:"page-loading",action:1}),"most"===e.mode?e.videoService.getMostVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"newest"===e.mode?e.videoService.getNewestVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"hot"===e.mode?e.videoService.getHotVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"search"===e.mode?e.videoService.searchVideos(e.query.txtSearch,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"keyword"===e.mode&&e.videoService.getKeywordVideos(e.query.keyword,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError)},e.prototype.drawError=function(e){console.error(e)},e.prototype.clearContent=function(e){e.viewContainer.clear()},e.prototype.drawContent=function(e,t,i){return 0===t.length?(this.isLoading=void 0,i()):void e.cmpResolver.resolveComponent(l.VideoCardItemComponent).then(function(o){var n=e.viewContainer.length;for(var r in t){var s=e.viewContainer.createComponent(o,n++,e.viewContainer.injector);s.instance.item=t[r]}e.isLoading=!1,e.eventService.emit({com:"page-loading",action:0}),i()})},__decorate([o.ViewChild("viewContainer",{read:o.ViewContainerRef}),__metadata("design:type",Object)],e.prototype,"viewContainer",void 0),e=__decorate([o.Component({selector:"video-card-list",template:'\n      <div class="android-card-container mdl-grid" id="mainContent0">\n          <div #viewContainer></div>\n          <video-card-loading [hidden]="!isLoading"></video-card-loading>\n      </div>      \n      <div *ngIf="isLastAutoScroll" align="center" class="isLastAutoScroll">\n        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" go-top [routerLink]="[\'/v/\'+mode]" [queryParams]="{page: page+1}">\n          <i class="normal material-icons">hdr_weak</i>\n          <i class="hover material-icons">hdr_strong</i>\n        </button>\n      </div>\n    ',styles:["button { position: relative; margin-bottom: -90px; }","button i.hover { display: none; }","button:hover i.hover { display: block; }","button:hover i.normal { display: none; }"],directives:[l.VideoCardItemComponent,d.VideoCardLoadingComponent,n.ROUTER_DIRECTIVES,c.GoTop]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.Router&&n.Router)&&t||Object,"function"==typeof(i="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&i||Object,"function"==typeof(m="undefined"!=typeof r.Title&&r.Title)&&m||Object,"function"==typeof(p="undefined"!=typeof a.VideoService&&a.VideoService)&&p||Object,"function"==typeof(u="undefined"!=typeof s.EventService&&s.EventService)&&u||Object,"function"==typeof(v="undefined"!=typeof o.ComponentResolver&&o.ComponentResolver)&&v||Object])],e);var t,i,m,p,u,v}();t.VideoCardListComponent=m},994:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e=__decorate([o.Component({selector:"video-card-loading",template:'\n      <img src="/assets/img/loading.gif" class="inner" />\n    ',host:{"[class.mdl-card]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"}}),__metadata("design:paramtypes",[])],e)}();t.VideoCardLoadingComponent=n},995:function(e,t,i){"use strict";var o=i(1),n=i(32),r=i(56),s=i(991),a=i(305),c=i(487),l=i(49),d=function(){function e(e){this.eventService=e}return e.prototype.ngOnInit=function(){},e.prototype.ngOnDestroy=function(){this.eventService.emit({com:"video-card-list",action:"stop"})},e=__decorate([o.Component({selector:"video-page",template:'\n      <div class="mdl-grid">\n        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 \n          <router-outlet></router-outlet>\n        </div>\n        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <facebook-like *xl class="mdl-card"></facebook-like>\n          <br/>\n          <br/>\n          <div class="fixed-col">\n            <user-favorite-video [rows]="3"></user-favorite-video>\n            <br/>\n            <br/>\n            <video-relation-list [mode]="\'most\'" [page]="1" [rows]="8"></video-relation-list>\n            <br/>\n            <br/>\n            <video-relation-list [mode]="\'hot\'" [page]="1" [rows]="8"></video-relation-list>\n          </div>\n        </div>\n      </div>\n    ',directives:[s.VideoRelationListComponent,a.FacebookLikeComponent,n.CORE_DIRECTIVES,r.ROUTER_DIRECTIVES,c.UserFavoriteVideoComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof l.EventService&&l.EventService)&&t||Object])],e);var t}();t.VideoPageComponent=d},996:function(e,t,i){"use strict";var o=i(1),n=i(56),r=i(87),s=i(142),a=i(990),c=function(){function e(){}return __decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof r.VideoCard&&r.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-relation-item",template:'\n      <li class="mdl-list__item mdl-list__item--three-line">\n        <a class="mdl-list__item-primary-content nothing" [routerLink]="[\'/\'+item._id+\'/\'+item.title0]" go-top>          \n          <div class="img-des">\n            <img src="{{item.image}}" width="80" class="rounded" *ngIf="!item.youtubeid">\n            <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg" width="80" style="float: left; margin-right: 5px;" class="rounded" *ngIf="item.youtubeid">                    \n            <div class="howlong"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n          </div>\n          <div class="main-color title">{{item.title}}</div>\n          <span class="mdl-list__item-text-body des-color">\n            <i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}\n          </span>\n        </a>\n      </li>\n    ',pipes:[a.HowlongPipe],directives:[n.ROUTER_DIRECTIVES,s.GoTop]}),__metadata("design:paramtypes",[])],e);var t}();t.VideoRelationItemComponent=c},991:function(e,t,i){"use strict";var o=i(1),n=i(87),r=i(996),s=function(){function e(e){this.videoService=e,this.query={},this.videosRelation=[]}return e.prototype.ngOnChanges=function(e){var t=this;"relation"===this.mode&&(this.title="Video liên quan",this.videoService.getRelateVideos(this.query.id,this.query.keywords,this.query.updateat,{page:this.page,rows:this.rows}).subscribe(function(e){t.videosRelation=e},function(e){return console.error(e)}))},e.prototype.ngOnInit=function(){var e=this;"most"===this.mode?(this.title="Video xem nhiều nhất",this.videoService.getMostVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)})):"hot"===this.mode&&(this.title="Video hot",this.videoService.getHotVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)}))},__decorate([o.Input(),__metadata("design:type",String)],e.prototype,"mode",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"page",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"rows",void 0),__decorate([o.Input(),__metadata("design:type",Object)],e.prototype,"query",void 0),e=__decorate([o.Component({selector:"video-relation-list",template:'\n      <div class="mdl-card mdl-shadow--2dp">\n        <div class="mdl-card__title mdl-card--border">\n          <h6 class="mdl-card__title-text">{{title}}</h6>\n          <div class="mdl-layout-spacer"></div>\n          <i class="material-icons mdl-list__item-icon">videocam</i>\n        </div>\n        <ul class="mdl-list">\n          <video-relation-item style="width: 100%" *ngFor="let v of videosRelation" [item]="v"></video-relation-item>\n        </ul>\n      </div>\n    ',directives:[r.VideoRelationItemComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.VideoService&&n.VideoService)&&t||Object])],e);var t}();t.VideoRelationListComponent=s}});
//# sourceMappingURL=1.dca94ed24c7014f98e36.bundle.map