import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { EventService } from './event.service';
import { VideoCard, VideoService } from './video.service';
import { VideoCardItemComponent } from './video-card-item.component'
import { VideoCardLoadingComponent } from './video-card-loading.component'

declare var componentHandler: any;

@Component({
    selector: 'video-card-list',
    template: `
      <div class="android-card-container mdl-grid">
          <div #viewContainer></div>
          <video-card-loading [hidden]="!isLoading"></video-card-loading>
      </div>      
      <div *ngIf="isLastAutoScroll" align="center">
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" [routerLink]="['/']" [queryParams]="{page: filter.query.page}">
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    `,
    styles: ['button { position: relative; margin-bottom: -90px; }'],
    providers: [VideoService],
    directives: [VideoCardItemComponent, VideoCardLoadingComponent, ROUTER_DIRECTIVES]
})
export class VideoCardListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit { 
    isLoading: boolean = true;
    gsub:any;
    isLastAutoScroll: boolean = false;
    initPage:number = -1;
    @Input() filter:any;

    @ViewChild('viewContainer', {read: ViewContainerRef}) 
    viewContainer:any;

    constructor(private videoService: VideoService, private eventService: EventService, private cmpResolver: ComponentResolver){
      
    }

    ngAfterViewInit() {            
      componentHandler.upgradeDom();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}){      
      console.log('changed');
      this.clearContent(this);
      this.nextPage(this);
    }

    ngOnInit(){
      lskdajflkj
      this.gsub = this.eventService.emitter.subscribe((data: any) => {
        if(data.com === 'video-card-list'){
          if(data.action === 'append') {
            this.filter.query.page++;
            this.isLoading = true;
            this.nextPage(this);
          }
          else if(data.action === 'loaded') {
            this.isLoading = false;
          }
        }
      });
    }

    ngOnDestroy(){
      this.gsub.unsubscribe();
    }

    nextPage(self:VideoCardListComponent){
      if(this.initPage < 0){
        this.initPage = this.filter.query.page;
      }else if(this.filter.query.page > this.initPage && (this.filter.query.page - this.initPage) % 2 === 0){
        this.isLastAutoScroll = true;
        this.initPage = -1;
        console.log(this.initPage, this.filter.query.page, this.isLastAutoScroll);
        return this.eventService.emit({com: 'video-card-list', action: 'stop'});
      }      

      if(self.filter.mode === 'most'){
        self.videoService.getMostVideos({page: self.filter.query.page, rows: self.filter.query.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'newest'){        
        self.videoService.getNewestVideos({page: self.filter.query.page, rows: self.filter.query.rows, title: self.filter.query.title}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'hot'){
        self.videoService.getHotVideos({page: self.filter.query.page, rows: self.filter.query.rows, title: self.filter.query.title}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'search'){
        self.videoService.searchVideos(self.filter.query.txtSearch, {page: self.filter.query.page, rows: self.filter.query.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'keyword'){        
        self.videoService.getKeywordVideos(self.filter.query.keyword, {page: self.filter.query.page, rows: self.filter.query.rows}).subscribe((videos: Array<VideoCard>) => {
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
        this.filter.query.page;
        this.isLoading = false;
        return;
      }
      self.cmpResolver.resolveComponent(VideoCardItemComponent)
      .then((factory:ComponentFactory<VideoCardItemComponent>) => {
        var index = self.viewContainer.length;
        for(var i in videos){
          var com: ComponentRef<VideoCardItemComponent> = self.viewContainer.createComponent(factory, index++, self.viewContainer.injector);
          com.instance.item = videos[i];
        }
        self.eventService.emit({com: 'video-card-list', action: 'loaded', page: this.filter.query.page-1});
      });      
   }
}