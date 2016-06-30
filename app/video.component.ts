import { Component, Input, OnInit, OnDestroy, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { EventService } from './event.service';
import { VideoCard, VideoService } from './video.service';

declare var componentHandler: any;

///////////////////////////////////////////////////////////////////

@Component({
    selector: 'video-card',
    template: `
    <a href="/{{item._id}}" class="nothing">
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
    }
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
export class VideoCardListComponent implements OnInit, OnDestroy, AfterViewInit { 
    videos: VideoCard[] = [];
    page: number = 1;
    isLoading: boolean = true;
    gsub:any;
    @Input()
    filter:any;

    @ViewChild('viewContainer', {read: ViewContainerRef}) 
    viewContainer:any;

    constructor(private videoService: VideoService, private eventService: EventService, private cmpResolver: ComponentResolver){
      
    }

    ngAfterViewInit() {            
      componentHandler.upgradeDom();
    }

    ngOnInit(){
      this.gsub = this.eventService.emitter.subscribe((data: any) => {
        if(data.com === 'video-card-list'){
          if(data.action === 'load') {             
            this.isLoading = true;
            this.nextPage(data.filter);
          }
          else if(data.action === 'loaded') {
            this.isLoading = false;
          }
        }
      });
      this.nextPage({});
    }

    ngOnDestroy(){
      this.gsub.unsubscribe();
    }

    nextPage(filter: any){
      if(this.filter.mode = 'most'){
        this.videoService.getMostVideos({page: this.page++}).subscribe(videos => {
          this.drawContent(this, videos);
        }, this.drawError);
      }else if(this.filter.mode === 'newest'){
        this.videoService.getNewestVideos({page: this.page++, title: this.filter.query.title}).subscribe(videos => {
          this.drawContent(this, videos);
        }, this.drawError);
      }
    }

    drawError(err: any){
      console.error(err);
    }

    drawContent(self: VideoCardListComponent, videos: Array<VideoCard>){            
      self.cmpResolver.resolveComponent(VideoCardComponent)
      .then((factory:ComponentFactory<VideoCardComponent>) => {
        for(var i in videos){
          var com: ComponentRef<VideoCardComponent> = self.viewContainer.createComponent(factory, i, self.viewContainer.injector);
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
        <div class="mdl-card__supporting-text icon-des">
          <i class="material-icons dp48">tag_faces</i>
          &nbsp;<small class="ng-binding">Chủ xị</small>&nbsp;&nbsp;
          <i class="material-icons dp48">alarm_on</i>
          &nbsp;<small class="ng-binding">1 giờ trước</small>&nbsp;&nbsp;
          <i class="material-icons dp48">alarm</i>
          &nbsp;<small class="ng-binding">14p40"</small>&nbsp;&nbsp;
        </div>
        <div class="videoWrapper">        
          <iframe width="560" height="349" [src]="url" frameborder="0" allowfullscreen *ngIf="item.youtubeid"></iframe>
          <video width="100%" *ngIf="!item.youtubeid" controls>
            <source [src]="item.link" type="video/mp4">
          </video>
        </div>
      </div>
    `,
    providers: [VideoService]
})
export class VideoDetailsComponent implements OnInit { 
  @Input()
  id: string;  
  item: VideoCard;
  url: SafeResourceUrl;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizationService){
    
  }

  ngOnInit(){    
    this.videoService.getVideo(this.id).subscribe(
                 video => {
                   this.item = video; 
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
        <a href="/{{item._id}}" class="mdl-list__item-primary-content nothing">
          <img src="{{item.image}}" width="80" style="float: left; margin-right: 5px;" class="rounded">       
          <div class="main-color title">{{item.title}}</div>
          <span class="mdl-list__item-text-body">
            <div class="icon-des des-color"><i class="material-icons dp48">alarm_on</i> 1 giờ trước</div>
          </span>
        </a>
      </li>
    `,
    providers: [VideoService]
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
  @Input()
  id: string;
  title: string;
  videosRelation: VideoCard[] = [];
  constructor(private videoService: VideoService){
    
  }

  ngOnInit(){
    if(!this.id){
      this.title = 'Xem nhieu nhat';
      this.videoService.getMostVideos({page: 1}).subscribe(
                       videos => {this.videosRelation = videos;},
                       error =>  console.error(error));
    }else{
      this.title = 'Video lien quan';
      this.videoService.getRelateVideos(this.id).subscribe(
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
          <video-relation-list [id] = "id" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoDetailsComponent, VideoRelationListComponent]
})
export class VideoDetailsPageComponent implements OnInit, OnDestroy { 
  id: string;
  sub: any;
  constructor(private route: ActivatedRoute){
    
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];      
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
          <video-card-list [filter]="filter"></video-card-list>          
        </div>
        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <video-relation-list></video-relation-list>
          <br/>
          <video-relation-list></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoCardListComponent, VideoRelationListComponent]
})
export class VideoPageComponent implements OnInit, OnDestroy, AfterViewInit { 
  filter:any;
  sub: any;

  constructor(private eventService: EventService, private route: ActivatedRoute){
    
  }

  updateModel(){

  }

  ngOnInit(){        
    this.sub = this.route.params.subscribe(params => {      
      this.filter = {
        mode: params['mode'] || 'newest',
        query: {
          title: params['txtSearch'] || ''
        }
      };
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    
  }


}