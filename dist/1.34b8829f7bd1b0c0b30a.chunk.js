webpackJsonp([1,2],{989:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e.prototype.transform=function(e){return e?e.replace("H","g").replace("M","p").replace("S",'"'):e},e=__decorate([o.Pipe({name:"HowlongPipe"}),__metadata("design:paramtypes",[])],e)}();t.HowlongPipe=n},487:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(996))},996:function(e,t,i){"use strict";var o=i(1),n=i(64),a=i(32),l=i(305),r=i(997),d=i(486),s=i(120),c=function(){function e(e,t){var i=this;this.route=e,this.videoService=t,this.keywords=this.videoService.getKeywords(),this.route.data.subscribe(function(e){i.item=e.video;for(var t in i.item.keywords)for(var o=0,n=i.keywords;o<n.length;o++){var a=n[o];i.item.keywords[t]===a._id&&(i.item.keywords[t]=a)}})}return e.prototype.ngOnInit=function(){},e=__decorate([o.Component({selector:"video-details-page",template:'\n      <div class="mdl-grid" *ngIf="item">\n        <video-details [item] = "item" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>\n        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <video-relation-list [query]="{keywords: item.keywords, id: item._id, updateat: item.updateat}" [mode]="\'relation\'" [page]="1" [rows]="10" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>\n        </div>\n      </div>\n    ',directives:[r.VideoDetailsComponent,d.VideoRelationListComponent,l.FacebookLikeComponent,a.CORE_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&t||Object,"function"==typeof(i="undefined"!=typeof s.VideoService&&s.VideoService)&&i||Object])],e);var t,i}();t.VideoDetailsPageComponent=c},997:function(e,t,i){"use strict";var o=i(1),n=i(64),a=i(86),l=i(120),r=i(200),d=i(305),s=function(){function e(e){this.title=e}return e.prototype.ngOnChanges=function(e){this.locationHref=location.href,this.title.setTitle(this.item.title)},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof l.VideoDetails&&l.VideoDetails)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-details",template:'\n      <div class="mdl-card mdl-cell--12-col" *ngIf="item">\n        <div class="mdl-card__title mdl-card--expand">\n          <h2 class="mdl-card__title-text">{{item.title}}</h2>\n        </div>\n        <div class="mdl-card__supporting-text" style="width: initial;">          \n          <div class="mdl-grid mdl-grid--no-spacing">\n            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n              <i class="material-icons dp48">tag_faces</i>\n              &nbsp;{{item.creator}}&nbsp;&nbsp;\n              <i class="material-icons dp48">alarm_on</i>\n              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;\n              <i class="material-icons dp48">alarm</i>\n              &nbsp;14p40"&nbsp;&nbsp;\n            </div>\n            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share" align="right">\n              <facebook-share [title]="item.title" [description]=[item.title] [picture]="item.image" [caption]="abc"></facebook-share>\n            </div>\n          </div>\n        </div>\n        <div class="videoWrapper">        \n          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>\n          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>\n          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>          \n        </div>\n        <div class="keywords">\n          <a *ngFor="let k of item.keywords" go-top style="float: left;" class="mdl-button mdl-js-button" [routerLink]="[\'/k/\'+k._id]">{{k.name}}</a>\n        </div>\n        <hr style="clear: both"/>\n        <facebook-comment [link]="locationHref"></facebook-comment>\n      </div>\n    ',styles:[".mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}"],directives:[r.GoTop,d.FacebookCommentComponent,d.FacebookShareComponent,n.ROUTER_DIRECTIVES,d.FacebookPlayerComponent,d.YoutubePlayerComponent,d.Html5PlayerComponent]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof a.Title&&a.Title)&&i||Object])],e);var t,i}();t.VideoDetailsComponent=s},486:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(990)),o(i(992)),o(i(994));var n=i(486);t.routes={path:"",component:n.VideoPageComponent,children:[{path:"",component:n.VideoCardListComponent},{path:"v/:mode",component:n.VideoCardListComponent},{path:"k/:keyword",component:n.VideoCardListComponent},{path:"search/:txtSearch",component:n.VideoCardListComponent}]}},991:function(e,t,i){"use strict";var o=i(1),n=i(64),a=i(86),l=i(120),r=i(200),d=i(989),s=function(){function e(e){this.sanitizer=e}return e.prototype.ngOnInit=function(){this.url=this.sanitizer.bypassSecurityTrustUrl(this.item.image)},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof l.VideoCard&&l.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-card-item",template:'\n    <a [routerLink]="[\'/\'+item._id]" class="nothing" go-top>\n      <div class="mdl-card__title">\n         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>\n      </div>      \n      <div class="mdl-card__media">\n        <img [src]="url">\n      </div>\n      <div class="howlong" *ngIf="item.duration"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.creator}}"><i class="material-icons dp48">tag_faces</i> {{item.creator}}</div>\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.nowOnTime}}"><i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}</div>\n      </div>\n    </a>\n    ',host:{"[class.mdl-card]":"true","[class.mdl-shadow--2dp]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"},pipes:[d.HowlongPipe],directives:[r.GoTop,n.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof a.DomSanitizationService&&a.DomSanitizationService)&&i||Object])],e);var t,i}();t.VideoCardItemComponent=s},992:function(e,t,i){"use strict";var o=i(1),n=i(64),a=i(86),l=i(65),r=i(120),d=i(200),s=i(991),c=i(993),m=function(){function e(e,t,i,o,n,a){this.router=e,this.route=t,this.title=i,this.videoService=o,this.eventService=n,this.cmpResolver=a,this.isLoading=!1,this.isInit=!1,this.isLastAutoScroll=!1,this.initPage=1,this.query={},this.page=1,this.rows=12}return e.prototype.ngAfterViewInit=function(){componentHandler.upgradeDom()},e.prototype.ngOnChanges=function(e){var t=this;this.nextPage(this,function(){t.eventService.emit({com:"video-card-list",action:"loaded"})})},e.prototype.ngOnInit=function(){var e=this;this.gsub=this.eventService.emitter.subscribe(function(t){"video-card-list"===t.com&&"append"===t.action&&(e.page++,e.nextPage(e,function(){if(e.eventService.emit({com:"video-card-list",action:"loaded"}),e.page>e.initPage&&(e.page-e.initPage)%2===0)return e.isLastAutoScroll=!0,e.eventService.emit({com:"video-card-list",action:"stop"})}))}),this.sub=this.route.params.subscribe(function(t){var i=t.txtSearch,o=t.keyword;i?(e.mode="search",e.query.txtSearch=i,e.title.setTitle(i+"***")):o?(e.mode="keyword",e.query.keyword=o,e.title.setTitle(o)):(e.mode=t.mode||"newest","most"===e.mode?e.title.setTitle("Xem nhiều nhất"):"hot"===e.mode?e.title.setTitle("Clip HOT nhất"):e.title.setTitle("ClipVNet - kênh video giải trí")),e.init()}),this.qsub=this.router.routerState.queryParams.subscribe(function(t){e.initPage=+t.page||1,e.page=e.initPage,e.isLastAutoScroll=!1,e.init()})},e.prototype.init=function(){var e=this;this.isInit||(this.isInit=!0,setTimeout(function(){e.clearContent(e),e.eventService.emit({com:"video-card-list",action:"start"}),e.nextPage(e,function(){e.isInit=!1,e.eventService.emit({com:"video-card-list",action:"loaded"})})},100))},e.prototype.ngOnDestroy=function(){this.gsub.unsubscribe(),this.qsub.unsubscribe(),this.sub.unsubscribe()},e.prototype.nextPage=function(e,t){e.isLoading=!0,e.eventService.emit({com:"page-loading",action:1}),"most"===e.mode?e.videoService.getMostVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"newest"===e.mode?e.videoService.getNewestVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"hot"===e.mode?e.videoService.getHotVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"search"===e.mode?e.videoService.searchVideos(e.query.txtSearch,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"keyword"===e.mode&&e.videoService.getKeywordVideos(e.query.keyword,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError)},e.prototype.drawError=function(e){console.error(e)},e.prototype.clearContent=function(e){e.viewContainer.clear()},e.prototype.drawContent=function(e,t,i){return 0===t.length?(this.isLoading=void 0,i()):void e.cmpResolver.resolveComponent(s.VideoCardItemComponent).then(function(o){var n=e.viewContainer.length;for(var a in t){var l=e.viewContainer.createComponent(o,n++,e.viewContainer.injector);l.instance.item=t[a]}e.isLoading=!1,e.eventService.emit({com:"page-loading",action:0}),i()})},__decorate([o.ViewChild("viewContainer",{read:o.ViewContainerRef}),__metadata("design:type",Object)],e.prototype,"viewContainer",void 0),e=__decorate([o.Component({selector:"video-card-list",template:'\n      <div class="android-card-container mdl-grid" id="mainContent0">\n          <div #viewContainer></div>\n          <video-card-loading [hidden]="!isLoading"></video-card-loading>\n      </div>      \n      <div *ngIf="isLastAutoScroll" align="center" class="isLastAutoScroll">\n        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" go-top [routerLink]="[\'/v/\'+mode]" [queryParams]="{page: page+1}">\n          <i class="normal material-icons">hdr_weak</i>\n          <i class="hover material-icons">hdr_strong</i>\n        </button>\n      </div>\n    ',styles:["button { position: relative; margin-bottom: -90px; }","button i.hover { display: none; }","button:hover i.hover { display: block; }","button:hover i.normal { display: none; }"],directives:[s.VideoCardItemComponent,c.VideoCardLoadingComponent,n.ROUTER_DIRECTIVES,d.GoTop]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.Router&&n.Router)&&t||Object,"function"==typeof(i="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&i||Object,"function"==typeof(m="undefined"!=typeof a.Title&&a.Title)&&m||Object,"function"==typeof(p="undefined"!=typeof r.VideoService&&r.VideoService)&&p||Object,"function"==typeof(u="undefined"!=typeof l.EventService&&l.EventService)&&u||Object,"function"==typeof(v="undefined"!=typeof o.ComponentResolver&&o.ComponentResolver)&&v||Object])],e);var t,i,m,p,u,v}();t.VideoCardListComponent=m},993:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e=__decorate([o.Component({selector:"video-card-loading",template:'\n      <img src="/assets/img/loading.gif" class="inner" />\n    ',host:{"[class.mdl-card]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"}}),__metadata("design:paramtypes",[])],e)}();t.VideoCardLoadingComponent=n},994:function(e,t,i){"use strict";var o=i(1),n=i(32),a=i(64),l=i(990),r=i(305),d=i(65),s=function(){function e(e){this.eventService=e}return e.prototype.ngOnInit=function(){},e.prototype.ngOnDestroy=function(){this.eventService.emit({com:"video-card-list",action:"stop"})},e=__decorate([o.Component({selector:"video-page",template:'\n      <div class="mdl-grid">\n        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 \n          <router-outlet></router-outlet>\n        </div>\n        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <facebook-like *xl class="mdl-card"></facebook-like>\n          <br/>\n          <br/>\n          <div class="fixed-col">\n            <video-relation-list [mode]="\'most\'" [page]="1" [rows]="12"></video-relation-list>\n            <br/>\n            <br/>\n            <video-relation-list [mode]="\'hot\'" [page]="1" [rows]="12"></video-relation-list>\n          </div>\n        </div>\n      </div>\n    ',directives:[l.VideoRelationListComponent,r.FacebookLikeComponent,n.CORE_DIRECTIVES,a.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof d.EventService&&d.EventService)&&t||Object])],e);var t}();t.VideoPageComponent=s},995:function(e,t,i){"use strict";var o=i(1),n=i(64),a=i(120),l=i(200),r=i(989),d=function(){function e(){}return __decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof a.VideoCard&&a.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-relation-item",template:'\n      <li class="mdl-list__item mdl-list__item--three-line">\n        <a class="mdl-list__item-primary-content nothing" [routerLink]="[\'/\'+item._id]" go-top>          \n          <div class="img-des">\n            <img src="{{item.image}}" width="80" class="rounded" *ngIf="!item.youtubeid">\n            <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg" width="80" style="float: left; margin-right: 5px;" class="rounded" *ngIf="item.youtubeid">                    \n            <div class="howlong"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n          </div>\n          <div class="main-color title">{{item.title}}</div>\n          <span class="mdl-list__item-text-body des-color">\n            <i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}\n          </span>\n        </a>\n      </li>\n    ',pipes:[r.HowlongPipe],directives:[n.ROUTER_DIRECTIVES,l.GoTop]}),__metadata("design:paramtypes",[])],e);var t}();t.VideoRelationItemComponent=d},990:function(e,t,i){"use strict";var o=i(1),n=i(120),a=i(995),l=function(){function e(e){this.videoService=e,this.query={},this.videosRelation=[]}return e.prototype.ngOnChanges=function(e){var t=this;"relation"===this.mode&&(this.title="Video liên quan",this.videoService.getRelateVideos(this.query.id,this.query.keywords,this.query.updateat,{page:this.page,rows:this.rows}).subscribe(function(e){t.videosRelation=e},function(e){return console.error(e)}))},e.prototype.ngOnInit=function(){var e=this;"most"===this.mode?(this.title="Video xem nhiều nhất",this.videoService.getMostVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)})):"hot"===this.mode&&(this.title="Video hot",this.videoService.getHotVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)}))},__decorate([o.Input(),__metadata("design:type",String)],e.prototype,"mode",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"page",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"rows",void 0),__decorate([o.Input(),__metadata("design:type",Object)],e.prototype,"query",void 0),e=__decorate([o.Component({selector:"video-relation-list",template:'\n      <div class="mdl-card mdl-shadow--2dp">\n        <div class="mdl-card__title mdl-card--border">\n          <h6 class="mdl-card__title-text">{{title}}</h6>\n          <div class="mdl-layout-spacer"></div>\n          <i class="material-icons mdl-list__item-icon">videocam</i>\n        </div>\n        <ul class="mdl-list">\n          <video-relation-item style="width: 100%" *ngFor="let v of videosRelation" [item]="v"></video-relation-item>\n        </ul>\n      </div>\n    ',directives:[a.VideoRelationItemComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.VideoService&&n.VideoService)&&t||Object])],e);var t}();t.VideoRelationListComponent=l}});
//# sourceMappingURL=1.34b8829f7bd1b0c0b30a.bundle.map