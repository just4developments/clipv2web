import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { EventService } from './event.service';
import { VideoCard, VideoService } from './video.service';
import { GoTop } from './video.directive';
import { FacebookCommentComponent, FacebookPageComponent, FacebookShareComponent, FacebookLikeComponent } from './facebook.component';

import { Observable }     from 'rxjs/Observable';

declare var componentHandler: any;

///////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-card',
    template: `
    <a [routerLink]="['/'+item._id]" class="nothing">
      <div class="mdl-card__title">
         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>
      </div>      
      <div class="mdl-card__media">        
        <img src="{{item.image}}">
      </div>
      <div class="howlong"><i class="material-icons dp48">alarm</i>14p40"</div>
      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"><i class="material-icons dp48">tag_faces</i> Chủ xị</div>
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"><i class="material-icons dp48">alarm_on</i> 1 giờ trước</div>
      </div>
    </a>
    `,
    host: {
      '[class.mdl-card]': 'true',
      '[class.mdl-shadow--3dp]': 'true',
      '[class.mdl-cell]': 'true',
      '[class.mdl-cell--4-col]': 'true',
      '[class.mdl-cell--4-col-tablet]': 'true',
      '[class.mdl-cell--4-col-phone]': 'true'
    },
    directives: [ROUTER_DIRECTIVES]
})
export class VideoCardComponent implements AfterViewInit { 
  @Input()
  item: VideoCard;

  ngAfterViewInit() {      
    
  }
}

///////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-card-loading',
    template: `
    <div>
      <img src="images/loading.gif" class="inner" />
    </div>
    `,
    host: {
      '[class.mdl-card]': 'true',
      '[class.mdl-shadow--3dp]': 'true',
      '[class.mdl-cell]': 'true',
      '[class.mdl-cell--4-col]': 'true',
      '[class.mdl-cell--4-col-tablet]': 'true',
      '[class.mdl-cell--4-col-phone]': 'true'
    }
})
export class VideoCardLoadingComponent { 
}

///////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-card-list',
    template: `
      <div class="android-card-container mdl-grid">
          <div #viewContainer></div>
          <video-card-loading [hidden]="!isLoading"></video-card-loading>
      </div>
    `,
    providers: [VideoService],
    directives: [VideoCardComponent, VideoCardLoadingComponent]
})
export class VideoCardListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit { 
    isLoading: boolean = true;
    gsub:any;
    rsub: any;
    @Input() filter:any;

    @ViewChild('viewContainer', {read: ViewContainerRef}) 
    viewContainer:any;

    constructor(private router: Router, private videoService: VideoService, private eventService: EventService, private cmpResolver: ComponentResolver){
      
    }

    ngAfterViewInit() {            
      componentHandler.upgradeDom();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
      this.clearContent(this);
      this.filter.query.page = 1;
      this.nextPage(this, changes['filter'].currentValue);
    }

    ngOnInit(){
      this.gsub = this.eventService.emitter.subscribe((data: any) => {
        if(data.com === 'video-card-list'){
          if(data.action === 'append') {             
            this.isLoading = true;
            this.nextPage(this, this.filter);
          }
          else if(data.action === 'loaded') {
            this.isLoading = false;
          }
        }
      });
      this.nextPage(this, this.filter);
    }

    ngOnDestroy(){
      this.gsub.unsubscribe();
    }

    nextPage(self:VideoCardListComponent, filter: any){
      self.filter = filter;
      if(self.filter.mode === 'most'){
        self.videoService.getMostVideos({page: self.filter.query.page++, rows: self.filter.query.rows}).subscribe(videos => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'newest'){
        self.videoService.getNewestVideos({page: self.filter.query.page++, rows: self.filter.query.rows, title: self.filter.query.title}).subscribe(videos => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'hot'){
        self.videoService.getHotVideos({page: self.filter.query.page++, rows: self.filter.query.rows, title: self.filter.query.title}).subscribe(videos => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'search'){
        self.videoService.searchVideos(self.filter.query.txtSearch, {page: self.filter.query.page++, rows: self.filter.query.rows}).subscribe(videos => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'keyword'){        
        self.videoService.getKeywordVideos(self.filter.query.keyword, {page: self.filter.query.page++, rows: self.filter.query.rows}).subscribe(videos => {
          self.drawContent(self, videos);
        }, self.drawError);
      }
    }

    drawError(err: any){
      console.error(err);
    }

    clearContent(self: VideoCardListComponent){
      self.viewContainer.clear();
    }

    drawContent(self: VideoCardListComponent, videos: Array<VideoCard>){            
      if(videos.length === 0) {
        this.filter.query.page--;
        this.isLoading = false;
        return;
      }
      self.cmpResolver.resolveComponent(VideoCardComponent)
      .then((factory:ComponentFactory<VideoCardComponent>) => {
        var index = self.viewContainer.length;
        for(var i in videos){
          var com: ComponentRef<VideoCardComponent> = self.viewContainer.createComponent(factory, index++, self.viewContainer.injector);
          com.instance.item = videos[i];
        }
      });
      self.eventService.emit({com: 'video-card-list', action: 'loaded'});
   }
}

////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-details',
    template: `
      <div class="mdl-card mdl-cell--12-col" *ngIf="item">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text icon-des" style="width: initial;">          
          <div class="mdl-grid mdl-grid--no-spacing">
            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top">
              <i class="material-icons dp48">tag_faces</i>
              &nbsp;<small class="ng-binding">Chủ xị</small>&nbsp;&nbsp;
              <i class="material-icons dp48">alarm_on</i>
              &nbsp;<small class="ng-binding">1 giờ trước</small>&nbsp;&nbsp;
              <i class="material-icons dp48">alarm</i>
              &nbsp;<small class="ng-binding">14p40"</small>&nbsp;&nbsp;
            </div>
            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share" align="right">
              <facebook-share></facebook-share>
            </div>
          </div>
        </div>
        <div class="videoWrapper">        
          <iframe width="560" height="349" [src]="url" frameborder="0" allowfullscreen *ngIf="item.youtubeid"></iframe>
          <video width="100%" *ngIf="!item.youtubeid" controls>
            <source [src]="item.link" type="video/mp4">
          </video>
        </div>
        <div class="keywords">
          <a *ngFor="let k of item.keywords" style="float: left;" class="mdl-button mdl-js-button mdl-button--raised" [routerLink]="['/k/'+k._id]">{{k.name}}</a>
        </div>
        <facebook-comment></facebook-comment>
      </div>
    `,
    providers: [VideoService],
    directives: [FacebookCommentComponent, FacebookShareComponent, ROUTER_DIRECTIVES]
})
export class VideoDetailsComponent implements OnInit, OnChanges { 
  @Input() id: string;  
  keywords: Array<any>;
  item: VideoCard;
  url: SafeResourceUrl;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizationService){
    this.videoService.getKeywords().subscribe(
                 keywords => { this.keywords = keywords; },
                 error =>  console.error(error));
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    this.id = changes['id'].currentValue;
    this.loadVideo();
  }

  ngOnInit(){
    this.loadVideo();
  }

  loadVideo(){
    this.videoService.getVideo(this.id).subscribe(
                 video => {
                   this.item = video; 
                   for(let i in this.item.keywords){
                      for(let all of this.keywords){
                        if(this.item.keywords[i] === all._id){
                          this.item.keywords[i] = all;
                        }
                      } 
                   }                   
                   if(this.item.youtubeid) this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.link);                   
                 },
                 error =>  console.error(error));
  }
}

////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-relation-item',
    template: `
      <li class="mdl-list__item mdl-list__item--three-line">
        <a class="mdl-list__item-primary-content nothing" [routerLink]="['/'+item._id]" go-top>
          <img src="{{item.image}}" width="80" style="float: left; margin-right: 5px;" class="rounded">       
          <div class="main-color title">{{item.title}}</div>
          <span class="mdl-list__item-text-body">
            <div class="icon-des des-color"><i class="material-icons dp48">alarm_on</i> 1 giờ trước</div>
          </span>
        </a>
      </li>
    `,
    providers: [VideoService],
    directives: [ROUTER_DIRECTIVES, GoTop]
    // <span class="mdl-list__item-secondary-content">
    //   <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
    // </span>
})
export class VideoRelationItemComponent { 
  @Input()
  item: VideoCard;
}

////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-relation-list',
    template: `
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--border">
          <h2 class="mdl-card__title-text">{{title}}</h2>
        </div>
        <ul class="mdl-list">
          <video-relation-item style="width: 100%" *ngFor="let v of videosRelation" [item]="v"></video-relation-item>
        </ul>
      </div>
    `,
    providers: [VideoService],
    directives: [VideoRelationItemComponent]
})
export class VideoRelationListComponent implements OnInit { 
  @Input() filter: any;
  title: string;
  videosRelation: VideoCard[] = [];  
  constructor(private videoService: VideoService){
    
  }

  ngOnInit(){
    if(this.filter.mode === 'most'){
      this.title = 'Xem nhieu nhat';
      this.videoService.getMostVideos({page: this.filter.query.page, rows: this.filter.query.rows}).subscribe(
                       videos => {this.videosRelation = videos;},
                       error =>  console.error(error));
    }else if(this.filter.mode === 'hot'){
      this.title = 'Hot';
      this.videoService.getHotVideos({page: this.filter.query.page, rows: this.filter.query.rows}).subscribe(
                       videos => {this.videosRelation = videos;},
                       error =>  console.error(error));
    }else if(this.filter.mode === 'relation'){
      this.title = 'Video lien quan';
      this.videoService.getRelateVideos(this.filter.query.id, {page: this.filter.query.page, rows: this.filter.query.rows}).subscribe(
                       videos => {this.videosRelation = videos;},
                       error =>  console.error(error));  
    }
  }
}

@Component({
    selector: 'video-details-page',
    template: `
      <div class="mdl-grid">
        <video-details [id] = "id" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>
        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-page></facebook-page>
          <br/>
          <video-relation-list [filter] = "filter.relation" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoDetailsComponent, VideoRelationListComponent, FacebookPageComponent]
})
export class VideoDetailsPageComponent implements OnInit, OnDestroy { 
  id: string;
  sub: any;
  filter: any;
  constructor(private route: ActivatedRoute){
    this.filter = {};
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];      
      this.filter.relation = {
        mode: 'relation',      
        query: {
          id: this.id,
          page: 1,        
          rows: 10
        }
      };
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}

///////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-page',
    template: `
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 
          <video-card-list [filter]="filter.all"></video-card-list>          
        </div>
        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-page></facebook-page>
          <br/>
          <br/>
          <video-relation-list [filter]="filter.most" [filter]=""></video-relation-list>
          <br/>
          <video-relation-list [filter]="filter.hot"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoCardListComponent, VideoRelationListComponent, FacebookPageComponent, FacebookLikeComponent]
})
export class VideoPageComponent implements OnInit, OnDestroy, AfterViewInit { 
  filter:any;
  sub: any;

  constructor(private eventService: EventService, private route: ActivatedRoute){
    this.filter = {};
    this.filter.most = {
      mode: 'most',
      query: {
        page: 1,        
        rows: 5
      }
    };
    this.filter.hot = {
      mode: 'hot',
      query: {
        page: 1,        
        rows: 5
      }
    };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {     
      var txtSearch: string = params['txtSearch'];      
      var keyword: string =  params['keyword'];      
      this.filter.all = {        
        query: {
          page: 1,
          rows: 10,
        }
      };
      if(txtSearch){
        this.filter.all.mode = 'search';
        this.filter.all.query.txtSearch = txtSearch;
      }else if(keyword){
        this.filter.all.mode = 'keyword';
        this.filter.all.query.keyword = keyword;
      }else {
        this.filter.all.mode = params['mode'] || 'newest';
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    
  }


}