import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit } from '@angular/core';

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
    `,
    providers: [VideoService],
    directives: [VideoCardItemComponent, VideoCardLoadingComponent]
})
export class VideoCardListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit { 
    isLoading: boolean = true;
    gsub:any;
    @Input() filter:any;

    @ViewChild('viewContainer', {read: ViewContainerRef}) 
    viewContainer:any;

    constructor(private videoService: VideoService, private eventService: EventService, private cmpResolver: ComponentResolver){
      
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
        self.videoService.getMostVideos({page: self.filter.query.page++, rows: self.filter.query.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'newest'){
        self.videoService.getNewestVideos({page: self.filter.query.page++, rows: self.filter.query.rows, title: self.filter.query.title}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'hot'){
        self.videoService.getHotVideos({page: self.filter.query.page++, rows: self.filter.query.rows, title: self.filter.query.title}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'search'){
        self.videoService.searchVideos(self.filter.query.txtSearch, {page: self.filter.query.page++, rows: self.filter.query.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos);
        }, self.drawError);
      }else if(self.filter.mode === 'keyword'){        
        self.videoService.getKeywordVideos(self.filter.query.keyword, {page: self.filter.query.page++, rows: self.filter.query.rows}).subscribe((videos: Array<VideoCard>) => {
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
      self.cmpResolver.resolveComponent(VideoCardItemComponent)
      .then((factory:ComponentFactory<VideoCardItemComponent>) => {
        var index = self.viewContainer.length;
        for(var i in videos){
          var com: ComponentRef<VideoCardItemComponent> = self.viewContainer.createComponent(factory, index++, self.viewContainer.injector);
          com.instance.item = videos[i];
        }
      });
      self.eventService.emit({com: 'video-card-list', action: 'loaded'});
   }
}