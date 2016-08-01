webpackJsonp([1,2],{992:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e.prototype.transform=function(e){return e?e.replace("H","g").replace("M","p").replace("S",'"'):e},e=__decorate([o.Pipe({name:"HowlongPipe"}),__metadata("design:paramtypes",[])],e)}();t.HowlongPipe=n},491:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(999))},999:function(e,t,i){"use strict";var o=i(1),n=i(49),s=i(34),r=i(306),a=i(1e3),c=i(488),d=i(67),l=function(){function e(e,t){var i=this;this.route=e,this.videoService=t,this.route.data.subscribe(function(e){i.item=e.video})}return e.prototype.ngOnInit=function(){},e=__decorate([o.Component({selector:"video-details-page",template:'\n      <div class="mdl-grid" *ngIf="item">\n        <video-details [item] = "item" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>\n        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <video-relation-list [query]="{keywords: item.keywords, id: item._id, updateat: item.updateat}" [mode]="\'relation\'" [page]="1" [rows]="10" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>\n        </div>\n      </div>\n    ',directives:[a.VideoDetailsComponent,c.VideoRelationListComponent,r.FacebookLikeComponent,s.CORE_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&t||Object,"function"==typeof(i="undefined"!=typeof d.VideoService&&d.VideoService)&&i||Object])],e);var t,i}();t.VideoDetailsPageComponent=l},1e3:function(e,t,i){"use strict";var o=i(1),n=i(49),s=i(489),r=i(67),a=i(50),c=i(992),d=i(68),l=i(307),m=i(20),p=i(306),u=function(){function e(e,t,i,o){this.metaService=e,this.videoService=t,this.eventService=i,this.userService=o,this.isChecked=!1,this.document=m.getDOM()}return e.prototype.hasExist=function(e){return this.item.keywords.findIndex(function(t){return t._id===e})!==-1},e.prototype.applyKeyword=function(){for(var e in this.item.keywords)for(var t=0,i=this.videoService.keywords;t<i.length;t++){var o=i[t];this.item.keywords[e]instanceof Object||this.item.keywords[e]===o._id&&(this.item.keywords[e]=o)}},e.prototype.ngOnInit=function(){var e=this;this.applyKeyword(),this.gsub=this.eventService.emitter.subscribe(function(t){"facebook"===t.com&&"login"===t.action&&t.data&&e.checkFavorite()})},e.prototype.ngAfterViewInit=function(){this.container=this.document.query("[scroll-bottom]"),this.container.scrollTop=48},e.prototype.manageKeyword=function(e){var t=this;this.videoService.updateVideoKeyword(this.item._id,e._id).subscribe(function(e){t.item.keywords=e,t.applyKeyword()})},e.prototype.ngOnDestroy=function(){this.gsub.unsubscribe()},e.prototype.checkFavorite=function(){var e=this;this.userService.currentUser&&(this.isChecked=!0,this.isFavorite=this.userService.currentUser.favorites.findIndex(function(t,i,o){return t._id===e.item._id})!=-1)},e.prototype.special=function(){var e=this;this.videoService.updateSpecial(this.item._id,!this.item.isSpecial).subscribe(function(t){e.item.isSpecial=t,e.eventService.emit({com:"snack-bar",msg:t?"Đã thêm vào danh sách clip HOT":"Đã xóa khỏi danh sách clip HOT"})})},e.prototype.updateStatus=function(){var e=this;0!==this.item.status&&this.videoService.updateVideoStatus(this.item._id,this.item.status*-1).subscribe(function(t){e.item.status=t,e.eventService.emit({com:"snack-bar",msg:1==t?"Video đã được hiển thị":"Video đã bị ẩn"})})},e.prototype.favorite=function(){var e=this;this.isFavorite?this.videoService.removeFavorite(this.item._id).subscribe(function(t){e.userService.currentUser.favorites=t,e.userService.save(),e.eventService.emit({com:"snack-bar",msg:"Đã xóa khỏi danh sách yêu thích"})},function(t){return e.eventService.emit({com:"snack-bar",msg:"Có lỗi trong quá trình xử lý"})}):this.videoService.addFavorite(this.item).subscribe(function(t){t.length>0?(e.userService.currentUser.favorites=t,e.userService.save(),e.eventService.emit({com:"snack-bar",msg:"Đã thêm vào danh sách yêu thích"})):e.eventService.emit({com:"snack-bar",msg:"Có lỗi trong quá trình xử lý"})},function(t){return e.eventService.emit({com:"snack-bar",msg:"Có lỗi trong quá trình xử lý"})}),this.isFavorite=!this.isFavorite},e.prototype.ngOnChanges=function(e){this.metaService.setTitle(this.item.title),this.metaService.setTag("og:type","video.other"),this.metaService.setTag("og:url",this.document.getLocation().href),this.metaService.setTag("og:image",this.item.image),this.metaService.setTag("video:writer",this.item.creator),this.applyKeyword(),this.checkFavorite(),this.isChecked=!1,this.container&&(this.container.scrollTop=48)},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof r.VideoDetails&&r.VideoDetails)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-details",template:'\n      <div class="mdl-card mdl-cell--12-col" *ngIf="item">\n        <div class="mdl-card__title mdl-card--expand">\n          <h2 class="mdl-card__title-text">{{item.title}}</h2>\n        </div>\n        <div class="mdl-card__supporting-text" style="width: initial;">          \n          <div class="mdl-grid mdl-grid--no-spacing">\n            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top left">\n              <span><i class="material-icons dp48">tag_faces</i>\n              &nbsp;{{item.creator}}&nbsp;&nbsp;</span>\n              <span *ngIf="item.nowOnTime"><i class="material-icons dp48">alarm_on</i>\n              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;</span>\n              <span *ngIf="item.duration"><i class="material-icons dp48">alarm</i>\n              &nbsp;{{item.duration | HowlongPipe}}&nbsp;&nbsp;</span>\n            </div>\n            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top right" align="right">\n              <button id="btnFavorite" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" [ngClass]="isFavorite ? \'mdl-button--accent\' : \'\'" (click)="favorite($event)" title="{{isFavorite ? \'Xóa khỏi\': \'Thêm vào\'}} danh sách yêu thích">\n                <i class="material-icons" [hidden]="isFavorite">favorite_border</i>\n                <i class="material-icons" [hidden]="!isFavorite">favorite</i>\n              </button>              \n              <facebook-share [title]="item.title" [description]=[item.title] [picture]="item.image" [caption]="\'ClipVNet.com\'"></facebook-share>\n\n              <button id="btnSpecial" *ngIf="userService.isBoss()" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" [ngClass]="item.isSpecial ? \'mdl-button--accent\' : \'\'" (click)="special($event)" title="{{item.isSpecial ? \'Đã thêm vào\': \'Đã xóa khỏi\'}} danh sách clip HOT">\n                <i class="material-icons" [hidden]="item.isSpecial">star_border</i>\n                <i class="material-icons" [hidden]="!item.isSpecial">star</i>\n              </button>\n              <button id="btnRemove" *ngIf="userService.isBoss()" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" [ngClass]="item.status === 1 ? \'mdl-button--accent\' : \'\'" (click)="updateStatus($event)" title="{{item.status === 1 ? \'Video đã được hiển thị\': (item.status === -1 ? \'Video đã bị ẩn\' : \'Video chưa được duyệt\')}}">\n                <i class="material-icons" [hidden]="item.status === -1">visibility</i>\n                <i class="material-icons" [hidden]="item.status === 1">visibility_off</i>\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class="videoWrapper">        \n          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>\n          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>\n          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>          \n        </div>\n        <div class="keywords" *ngIf="!userService.isBoss()">\n          <div *ngFor="let k of item.keywords" [routerLink]="[\'/keyword\', k._id, k.uname]">{{k.name}}</div>\n        </div>\n        <div class="keywords" *ngIf="userService.isBoss()">\n          <div *ngFor="let k of videoService.keywords" class="{{hasExist(k._id) ? \'active\' : \'\'}}" (click)="manageKeyword(k)">{{k.name}}</div>          \n        </div>\n        <hr style="clear: both"/>\n        <facebook-comment [link]="document.getLocation().href"></facebook-comment>\n      </div>\n    ',pipes:[c.HowlongPipe],directives:[l.GoTop,p.FacebookCommentComponent,p.FacebookShareComponent,n.ROUTER_DIRECTIVES,p.FacebookPlayerComponent,p.YoutubePlayerComponent,p.Html5PlayerComponent]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof s.MetaService&&s.MetaService)&&i||Object,"function"==typeof(u="undefined"!=typeof r.VideoService&&r.VideoService)&&u||Object,"function"==typeof(v="undefined"!=typeof a.EventService&&a.EventService)&&v||Object,"function"==typeof(h="undefined"!=typeof d.UserService&&d.UserService)&&h||Object])],e);var t,i,u,v,h}();t.VideoDetailsComponent=u},488:function(e,t,i){"use strict";function o(e){for(var i in e)t.hasOwnProperty(i)||(t[i]=e[i])}o(i(993)),o(i(995)),o(i(997));var n=i(488);t.routes={path:"",component:n.VideoPageComponent,children:[{path:"",pathMatch:"full",component:n.VideoCardListComponent},{path:":mode",pathMatch:"full",component:n.VideoCardListComponent},{path:"keyword/:id/:title",pathMatch:"full",component:n.VideoCardListComponent},{path:"search/:txtSearch",pathMatch:"full",component:n.VideoCardListComponent}]}},994:function(e,t,i){"use strict";var o=i(1),n=i(49),s=i(57),r=i(67),a=i(992),c=function(){function e(e){this.sanitizer=e}return e.prototype.ngOnInit=function(){this.url=this.sanitizer.bypassSecurityTrustUrl(this.item.image)},__decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof r.VideoCard&&r.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-card-item",template:'\n    <a [routerLink]="[\'/detail\', item._id, item.title0]" class="nothing">\n      <div class="mdl-card__title">\n         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>\n      </div>      \n      <div class="mdl-card__media">\n        <img src="{{item.image}}"                                 *ngIf="!item.youtubeid">\n        <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/mqdefault.jpg" *ngIf="item.youtubeid">\n      </div>\n      <div class="howlong" *ngIf="item.duration"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.creator}}"><i class="material-icons dp48">tag_faces</i> {{item.creator}}</div>\n        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.nowOnTime}}"><i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}</div>\n      </div>\n    </a>\n    ',host:{"[class.mdl-card]":"true","[class.mdl-shadow--2dp]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"},pipes:[a.HowlongPipe],directives:[n.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",["function"==typeof(i="undefined"!=typeof s.DomSanitizationService&&s.DomSanitizationService)&&i||Object])],e);var t,i}();t.VideoCardItemComponent=c},995:function(e,t,i){"use strict";var o=i(1),n=i(49),s=i(489),r=i(50),a=i(67),c=i(307),d=i(994),l=i(996),m=function(){function e(e,t,i,o,n,s){this.metaService=e,this.router=t,this.route=i,this.videoService=o,this.eventService=n,this.cmpResolver=s,this.isLoading=!1,this.isInit=!1,this.isLastAutoScroll=!1,this.initPage=1,this.query={},this.page=1,this.rows=12}return e.prototype.ngAfterViewInit=function(){this.videoService.upgradeDom()},e.prototype.ngOnChanges=function(e){var t=this;this.nextPage(this,function(){t.eventService.emit({com:"video-card-list",action:"loaded"})})},e.prototype.ngOnInit=function(){var e=this;this.gsub=this.eventService.emitter.subscribe(function(t){"video-card-list"===t.com&&"append"===t.action&&(e.page++,e.nextPage(e,function(){if(e.eventService.emit({com:"video-card-list",action:"loaded"}),e.page>e.initPage&&(e.page-e.initPage)%2===0)return e.isLastAutoScroll=!0,e.eventService.emit({com:"video-card-list",action:"stop"})}))}),this.sub=this.route.params.subscribe(function(t){var i,o=t.txtSearch,n=t.id;if(o)e.mode="search",e.query.txtSearch=o,i=o+"***";else if(n){e.mode="keyword",e.query.keyword=n;var s=e.videoService.keywords.findIndex(function(e){return e._id===n});i=s<0?n:e.videoService.keywords[s].name}else e.mode=t.mode||"newest","most"===e.mode?i="Clip xem nhiều nhất":"hot"===e.mode&&(i="Clip HOT nhất");i&&setTimeout(function(){e.metaService.setTitle(i)}),e.init()}),this.qsub=this.router.routerState.queryParams.subscribe(function(t){e.initPage=+t.page||1,e.page=e.initPage,e.isLastAutoScroll=!1,e.init()})},e.prototype.init=function(){var e=this;this.isInit||(this.isInit=!0,setTimeout(function(){e.clearContent(e),e.eventService.emit({com:"video-card-list",action:"start"}),e.nextPage(e,function(){e.isInit=!1,e.eventService.emit({com:"video-card-list",action:"loaded"})})},100))},e.prototype.ngOnDestroy=function(){this.gsub.unsubscribe(),this.qsub.unsubscribe(),this.sub.unsubscribe()},e.prototype.nextPage=function(e,t){e.isLoading=!0,e.eventService.emit({com:"page-loading",action:1}),"most"===e.mode?e.videoService.getMostVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"newest"===e.mode?e.videoService.getNewestVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"hot"===e.mode?e.videoService.getHotVideos({page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"search"===e.mode?e.videoService.searchVideos(e.query.txtSearch,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError):"keyword"===e.mode&&e.videoService.getKeywordVideos(e.query.keyword,{page:e.page,rows:e.rows}).subscribe(function(i){e.drawContent(e,i,t)},e.drawError)},e.prototype.drawError=function(e){console.error(e)},e.prototype.clearContent=function(e){e.viewContainer.clear()},e.prototype.drawContent=function(e,t,i){return 0===t.length?(this.isLoading=void 0,i()):void e.cmpResolver.resolveComponent(d.VideoCardItemComponent).then(function(o){var n=e.viewContainer.length;for(var s in t){var r=e.viewContainer.createComponent(o,n++,e.viewContainer.injector);r.instance.item=t[s]}e.isLoading=!1,e.eventService.emit({com:"page-loading",action:0}),i()})},__decorate([o.ViewChild("viewContainer",{read:o.ViewContainerRef}),__metadata("design:type",Object)],e.prototype,"viewContainer",void 0),e=__decorate([o.Component({selector:"video-card-list",template:'\n      <div class="android-card-container mdl-grid" id="mainContent0">\n          <div #viewContainer></div>\n          <video-card-loading [hidden]="!isLoading"></video-card-loading>\n      </div>      \n      <div *ngIf="isLastAutoScroll" align="center" class="isLastAutoScroll">\n        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" [routerLink]="[\'/\', mode]" [queryParams]="{page: page+1}" go-top>\n          <i class="normal material-icons">hdr_weak</i>\n          <i class="hover material-icons">hdr_strong</i>\n        </button>\n      </div>\n    ',styles:["button { position: relative; margin-bottom: -90px; }","button i.hover { display: none; }","button:hover i.hover { display: block; }","button:hover i.normal { display: none; }"],directives:[d.VideoCardItemComponent,l.VideoCardLoadingComponent,n.ROUTER_DIRECTIVES,c.GoTop]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof s.MetaService&&s.MetaService)&&t||Object,"function"==typeof(i="undefined"!=typeof n.Router&&n.Router)&&i||Object,"function"==typeof(m="undefined"!=typeof n.ActivatedRoute&&n.ActivatedRoute)&&m||Object,"function"==typeof(p="undefined"!=typeof a.VideoService&&a.VideoService)&&p||Object,"function"==typeof(u="undefined"!=typeof r.EventService&&r.EventService)&&u||Object,"function"==typeof(v="undefined"!=typeof o.ComponentResolver&&o.ComponentResolver)&&v||Object])],e);var t,i,m,p,u,v}();t.VideoCardListComponent=m},996:function(e,t,i){"use strict";var o=i(1),n=function(){function e(){}return e=__decorate([o.Component({selector:"video-card-loading",template:'\n      <img src="/assets/img/loading.gif" class="inner" />\n    ',host:{"[class.mdl-card]":"true","[class.mdl-cell]":"true","[class.mdl-cell--4-col]":"true","[class.mdl-cell--4-col-tablet]":"true","[class.mdl-cell--4-col-phone]":"true"}}),__metadata("design:paramtypes",[])],e)}();t.VideoCardLoadingComponent=n},997:function(e,t,i){"use strict";var o=i(1),n=i(34),s=i(49),r=i(993),a=i(306),c=i(490),d=i(50),l=i(68),m=function(){function e(e,t){this.eventService=e,this.userService=t}return e.prototype.ngOnInit=function(){},e.prototype.ngOnDestroy=function(){this.eventService.emit({com:"video-card-list",action:"stop"})},e=__decorate([o.Component({selector:"video-page",template:'\n      <div class="mdl-grid">\n        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 \n          <router-outlet></router-outlet>\n        </div>\n        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">\n          <facebook-like *xl class="mdl-card"></facebook-like>\n          <br/>\n          <div class="fixed-col">\n            <user-favorite-video [rows]="3" *ngIf="userService.currentUser"></user-favorite-video>            \n            <video-relation-list [mode]="\'most\'" [page]="1" [rows]="8"></video-relation-list>\n            <br/>\n            <video-relation-list [mode]="\'hot\'" [page]="1" [rows]="8"></video-relation-list>\n          </div>\n        </div>\n      </div>\n    ',directives:[r.VideoRelationListComponent,a.FacebookLikeComponent,n.CORE_DIRECTIVES,s.ROUTER_DIRECTIVES,c.UserFavoriteVideoComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof d.EventService&&d.EventService)&&t||Object,"function"==typeof(i="undefined"!=typeof l.UserService&&l.UserService)&&i||Object])],e);var t,i}();t.VideoPageComponent=m},998:function(e,t,i){"use strict";var o=i(1),n=i(49),s=i(67),r=i(992),a=function(){function e(){}return __decorate([o.Input(),__metadata("design:type","function"==typeof(t="undefined"!=typeof s.VideoCard&&s.VideoCard)&&t||Object)],e.prototype,"item",void 0),e=__decorate([o.Component({selector:"video-relation-item",template:'\n      <li class="mdl-list__item mdl-list__item--three-line">\n        <a class="mdl-list__item-primary-content nothing" [routerLink]="[\'/detail\', item._id, item.title0]">          \n          <div class="img-des">\n            <img src="{{item.image}}" width="100" class="rounded" *ngIf="!item.youtubeid">\n            <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg" width="100" style="float: left; margin-right: 5px;" class="rounded" *ngIf="item.youtubeid">                    \n            <div class="howlong"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>\n          </div>\n          <div class="main-color title">{{item.title}}</div>\n          <span class="mdl-list__item-text-body des-color">\n            <i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}\n          </span>\n        </a>\n      </li>\n    ',pipes:[r.HowlongPipe],directives:[n.ROUTER_DIRECTIVES]}),__metadata("design:paramtypes",[])],e);var t}();t.VideoRelationItemComponent=a},993:function(e,t,i){"use strict";var o=i(1),n=i(67),s=i(998),r=function(){function e(e){this.videoService=e,this.query={},this.videosRelation=[]}return e.prototype.ngOnChanges=function(e){var t=this;"relation"===this.mode&&(this.title="Video liên quan",this.videoService.getRelateVideos(this.query.id,this.query.keywords,this.query.updateat,{page:this.page,rows:this.rows}).subscribe(function(e){t.videosRelation=e},function(e){return console.error(e)}))},e.prototype.ngOnInit=function(){var e=this;"most"===this.mode?(this.title="Video xem nhiều nhất",this.videoService.getMostVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)})):"hot"===this.mode&&(this.title="Video hot",this.videoService.getHotVideos({page:this.page,rows:this.rows}).subscribe(function(t){e.videosRelation=t},function(e){return console.error(e)}))},__decorate([o.Input(),__metadata("design:type",String)],e.prototype,"mode",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"page",void 0),__decorate([o.Input(),__metadata("design:type",Number)],e.prototype,"rows",void 0),__decorate([o.Input(),__metadata("design:type",Object)],e.prototype,"query",void 0),e=__decorate([o.Component({selector:"video-relation-list",template:'\n      <div class="mdl-card mdl-shadow--2dp">\n        <div class="mdl-card__title mdl-card--border">\n          <h6 class="mdl-card__title-text">{{title}}</h6>\n          <div class="mdl-layout-spacer"></div>\n          <i class="material-icons mdl-list__item-icon">videocam</i>\n        </div>\n        <ul class="mdl-list">\n          <video-relation-item style="width: 100%" *ngFor="let v of videosRelation" [item]="v"></video-relation-item>\n        </ul>\n      </div>\n    ',directives:[s.VideoRelationItemComponent]}),__metadata("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.VideoService&&n.VideoService)&&t||Object])],e);var t}();t.VideoRelationListComponent=r}});
//# sourceMappingURL=1.68eb259bbc3fd6bbc252.bundle.map