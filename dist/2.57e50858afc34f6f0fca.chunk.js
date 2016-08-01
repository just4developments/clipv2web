webpackJsonp([2],{992:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e.prototype.transform=function(e){return e?e.replace("H","g").replace("M","p").replace("S",'"'):e},e=__decorate([o.Pipe({name:"HowlongPipe"}),__metadata("design:paramtypes",[])],e)}();t.HowlongPipe=n},488:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(993)),o(i(995)),o(i(997));var n=i(488);t.routes={path:"",component:n.VideoPageComponent,children:[{path:"",pathMatch:"full",component:n.VideoCardListComponent},{path:":mode",pathMatch:"full",component:n.VideoCardListComponent},{path:"keyword/:id/:title",pathMatch:"full",component:n.VideoCardListComponent},{path:"search/:txtSearch",pathMatch:"full",component:n.VideoCardListComponent}]}},994:function(e,t,i){"use strict";var o=i(1),n=i(49),r=i(57),a=i(67),s=i(992),d=function(){function e(e){this.sanitizer=e}return e.prototype.ngOnInit=function(){this.url=this.sanitizer.bypassSecurityTrustUrl(this.item.image)},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof a.VideoCard&&a.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-card-item",template:'\n    <a [routerLink]="[\'/detail\', item._id, item.title0]" class="nothing">\n      <div class="mdl-card__title">\n         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>\n      </div>      \n      <div class="mdl-card__media">\n        <img src="{{item.image}}"                                 *ngIf="!item.youtubeid">\n        <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/mqdefault.jpg" *ngIf="item.youtubeid">\n      </div>\n      <div class="howlong" *ngIf="item.duration"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.creator}}"><i class="material-icons dp48">tag_faces</i> {{item.creator}}</div>\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.nowOnTime}}"><i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}</div>\n      </div>\n    </a>\n    ',host:{"[class.mdl-card]":"true","[class.mdl-shadow--2dp]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"},pipes:[s.HowlongPipe],directives:[n.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof r.DomSanitizationService&&r.DomSanitizationService)&&i||Object])],e);var t,i}();t.VideoCardItemComponent=d},995:function(e,t,i){"use strict";var o=i(1),n=i(49),r=i(489),a=i(50),s=i(67),d=i(307),c=i(994),l=i(996),m=function(){function e(e,t,i,o,n,r){this.metaService=e,this.router=t,this.route=i,this.videoService=o,this.eventService=n,this.cmpResolver=r,this.isLoading=!1,this.isInit=!1,this.isLastAutoScroll=!1,this.initPage=1,this.query={},this.page=1,this.rows=12}return e.prototype.ngAfterViewInit=function(){this.videoService.upgradeDom()},e.prototype.ngOnChanges=function(e){var t=this;this.nextPage(this,function(){t.eventService.emit({com:"video-card-list",action:"loaded"})})},e.prototype.ngOnInit=function(){var e=this;this.gsub=this.eventService.emitter.subscribe(function(t){"video-card-list"===t.com&&"append"===t.action&&(e.page++,e.nextPage(e,function(){if(e.eventService.emit({com:"video-card-list",action:"loaded"}),e.page>e.initPage&&(e.page-e.initPage)%2===0)return e.isLastAutoScroll=!0,e.eventService.emit({com:"video-card-list",action:"stop"})}))}),this.sub=this.route.params.subscribe(function(t){var i,o=t.txtSearch,n=t.id;if(o)e.mode="search",e.query.txtSearch=o,i=o+"***";else if(n){e.mode="keyword",e.query.keyword=n;var r=e.videoService.keywords.findIndex(function(e){return e._id===n});i=r<0?n:e.videoService.keywords[r].name}else e.mode=t.mode||"newest","most"===e.mode?i="Clip xem nhiều nhất":"hot"===e.mode&&(i="Clip HOT nhất");i&&setTimeout(function(){e.metaService.setTitle(i)}),e.init()}),this.qsub=this.router.routerState.queryParams.subscribe(function(t){e.initPage=+t.page||1,e.page=e.initPage,e.isLastAutoScroll=!1,e.init()})},e.prototype.init=function(){var e=this;this.isInit||(this.isInit=!0,setTimeout(function(){e.clearContent(e),e.eventService.emit({com:"video-card-list",action:"start"}),e.nextPage(e,function(){e.isInit=!1,e.eventService.emit({com:"video-card-list",action:"loaded"})})},100))},e.prototype.ngOnDestroy=function(){this.gsub.unsubscribe(),this.qsub.unsubscribe(),this.sub.unsubscribe()},e.prototype.nextPage=function(e,t){e.isLoading=!0,e.eventService.emit({com:"page-loading",action:1}),"most"===e.mode?e.videoService.getMostVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"newest"===e.mode?e.videoService.getNewestVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"hot"===e.mode?e.videoService.getHotVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"search"===e.mode?e.videoService.searchVideos(e.query.txtSearch,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"keyword"===e.mode&&e.videoService.getKeywordVideos(e.query.keyword,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError)},e.prototype.drawError=function(e){console.error(e)},e.prototype.clearContent=function(e){e.viewContainer.clear()},e.prototype.drawContent=function(e,t,i){return 0===t.length?(this.isLoading=void 0,i()):void e.cmpResolver.resolveComponent(c.VideoCardItemComponent).then(function(o){var n=e.viewContainer.length;for(var r in t){var a=e.viewContainer.createComponent(o,n++,e.viewContainer.injector);a.instance.item=t[r]}e.isLoading=!1,e.eventService.emit({com:"page-loading",action:0}),i()})},__decorate([o.ViewChild("viewContainer",{read:o.ViewContainerRef}),__metadata("design:type",Object)],e.prototype,"viewContainer",void 0),e=__decorate([o.Component({selector:"video-card-list",template:'\n      <div class="android-card-container mdl-grid" id="mainContent0">\n          <div #viewContainer></div>\n          <video-card-loading [hidden]="!isLoading"></video-card-loading>\n      </div>      \n      <div *ngIf="isLastAutoScroll" align="center" class="isLastAutoScroll">\n        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" [routerLink]="[\'/\', mode]" [queryParams]="{page: page+1}" go-top>\n          <i class="normal material-icons">hdr_weak</i>\n          <i class="hover material-icons">hdr_strong</i>\n        </button>\n      </div>\n    ',styles:["button { position: relative; margin-bottom: -90px; }","button i.hover { display: none; }","button:hover i.hover { display: block; }","button:hover i.normal { display: none; }"],directives:[c.VideoCardItemComponent,l.VideoCardLoadingComponent,n.ROUTER_DIRECTIVES,d.GoTop]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof r.MetaService&&r.MetaService)&&t||Object,"function"==typeof(i="undefined"!=typeof n.Router&&n.Router)&&i||Object,"function"==typeof(m="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&m||Object,"function"==typeof(p="undefined"!=typeof s.VideoService&&s.VideoService)&&p||Object,"function"==typeof(u="undefined"!=typeof a.EventService&&a.EventService)&&u||Object,"function"==typeof(v="undefined"!=typeof o.ComponentResolver&&o.ComponentResolver)&&v||Object])],e);var t,i,m,p,u,v}();t.VideoCardListComponent=m},996:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e=__decorate([o.Component({selector:"video-card-loading",template:'\n      <img src="/assets/img/loading.gif" class="inner" />\n    ',host:{"[class.mdl-card]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"}}),__metadata("design:paramtypes",[])],e)}();t.VideoCardLoadingComponent=n},997:function(e,t,i){"use strict";var o=i(1),n=i(34),r=i(49),a=i(993),s=i(306),d=i(490),c=i(50),l=i(68),m=function(){function e(e,t){this.eventService=e,this.userService=t}return e.prototype.ngOnInit=function(){},e.prototype.ngOnDestroy=function(){this.eventService.emit({com:"video-card-list",action:"stop"})},e=__decorate([o.Component({selector:"video-page",template:'\n      <div class="mdl-grid">\n        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 \n          <router-outlet></router-outlet>\n        </div>\n        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <facebook-like *xl class="mdl-card"></facebook-like>\n          <br/>\n          <div class="fixed-col">\n            <user-favorite-video [rows]="3" *ngIf="userService.currentUser"></user-favorite-video>            \n            <video-relation-list [mode]="\'most\'" [page]="1" [rows]="8"></video-relation-list>\n            <br/>\n            <video-relation-list [mode]="\'hot\'" [page]="1" [rows]="8"></video-relation-list>\n          </div>\n        </div>\n      </div>\n    ',directives:[a.VideoRelationListComponent,s.FacebookLikeComponent,n.CORE_DIRECTIVES,r.ROUTER_DIRECTIVES,d.UserFavoriteVideoComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof c.EventService&&c.EventService)&&t||Object,"function"==typeof(i="undefined"!=typeof l.UserService&&l.UserService)&&i||Object])],e);var t,i}();t.VideoPageComponent=m},998:function(e,t,i){"use strict";var o=i(1),n=i(49),r=i(67),a=i(992),s=function(){function e(){}return __decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof r.VideoCard&&r.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-relation-item",template:'\n      <li class="mdl-list__item mdl-list__item--three-line">\n        <a class="mdl-list__item-primary-content nothing" [routerLink]="[\'/detail\', item._id, item.title0]">          \n          <div class="img-des">\n            <img src="{{item.image}}" width="100" class="rounded" *ngIf="!item.youtubeid">\n            <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg" width="100" style="float: left; margin-right: 5px;" class="rounded" *ngIf="item.youtubeid">                    \n            <div class="howlong"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n          </div>\n          <div class="main-color title">{{item.title}}</div>\n          <span class="mdl-list__item-text-body des-color">\n            <i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}\n          </span>\n        </a>\n      </li>\n    ',pipes:[a.HowlongPipe],directives:[n.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",[])],e);var t}();t.VideoRelationItemComponent=s},993:function(e,t,i){"use strict";var o=i(1),n=i(67),r=i(998),a=function(){function e(e){this.videoService=e,this.query={},this.videosRelation=[]}return e.prototype.ngOnChanges=function(e){var t=this;"relation"===this.mode&&(this.title="Video liên quan",this.videoService.getRelateVideos(this.query.id,this.query.keywords,this.query.updateat,{page:this.page,rows:this.rows}).subscribe(function(e){t.videosRelation=e},function(e){return console.error(e)}))},e.prototype.ngOnInit=function(){var e=this;"most"===this.mode?(this.title="Video xem nhiều nhất",this.videoService.getMostVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)})):"hot"===this.mode&&(this.title="Video hot",this.videoService.getHotVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)}))},__decorate([o.Input(),__metadata("design:type",String)],e.prototype,"mode",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"page",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"rows",void 0),__decorate([o.Input(),__metadata("design:type",Object)],e.prototype,"query",void 0),e=__decorate([o.Component({selector:"video-relation-list",template:'\n      <div class="mdl-card mdl-shadow--2dp">\n        <div class="mdl-card__title mdl-card--border">\n          <h6 class="mdl-card__title-text">{{title}}</h6>\n          <div class="mdl-layout-spacer"></div>\n          <i class="material-icons mdl-list__item-icon">videocam</i>\n        </div>\n        <ul class="mdl-list">\n          <video-relation-item style="width: 100%" *ngFor="let v of videosRelation" [item]="v"></video-relation-item>\n        </ul>\n      </div>\n    ',directives:[r.VideoRelationItemComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.VideoService&&n.VideoService)&&t||Object])],e);var t}();t.VideoRelationListComponent=a}});
//# sourceMappingURL=2.57e50858afc34f6f0fca.bundle.map