import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { EventService } from '../event.service';
import { VideoCard, VideoService } from '../video.service';
import { VideoCardItemComponent } from './video-card-item.component'
import { VideoCardLoadingComponent } from './video-card-loading.component'

declare var componentHandler: any;

@Component({
    selector: 'video-card-list',
    template: `
      <div class="android-card-container mdl-grid" id="mainContent0">
          <div #viewContainer></div>
          <video-card-loading [hidden]="!isLoading"></video-card-loading>
      </div>      
      <div *ngIf="isLastAutoScroll" align="center" class="isLastAutoScroll">
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" [routerLink]="['/v/'+mode]" [queryParams]="{page: page+1}">
          <i class="normal material-icons">hdr_weak</i>
          <i class="hover material-icons">hdr_strong</i>
        </button>
      </div>
    `,
    styles: [
      'button { position: relative; margin-bottom: -90px; }', 
      'button i.hover { display: none; }',
      'button:hover i.hover { display: block; }',
      'button:hover i.normal { display: none; }'
    ],
    directives: [VideoCardItemComponent, VideoCardLoadingComponent, ROUTER_DIRECTIVES]
})
export class VideoCardListComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit { 
    isLoading: boolean = false;
    isInit: boolean = false;
    sub: any;
    qsub: any;
    gsub:any;
    isLastAutoScroll: boolean = false;
    initPage:number = 1;
    mode: string;
    query: any = {};
    page: number = 1;
    rows: number = 12;

    @ViewChild('viewContainer', {read: ViewContainerRef}) 
    viewContainer:any;

    constructor(private router: Router, private route: ActivatedRoute, private title: Title, private videoService: VideoService, private eventService: EventService, private cmpResolver: ComponentResolver){
      
    }

    ngAfterViewInit() {            
      componentHandler.upgradeDom();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}){ 
      
      this.nextPage(this, () => {
        this.eventService.emit({com: 'video-card-list', action: 'loaded'});
      });
    }

    ngOnInit(){
      this.gsub = this.eventService.emitter.subscribe((data: any) => {
        if(data.com === 'video-card-list'){
          if(data.action === 'append') {            
            this.page++;
            this.nextPage(this, () => {
              this.eventService.emit({com: 'video-card-list', action: 'loaded'});
              if(this.page > this.initPage && (this.page - this.initPage) % 2 === 0){
                this.isLastAutoScroll = true;
                return this.eventService.emit({com: 'video-card-list', action: 'stop'});
              }              
            });            
          }
        }
      });
      this.sub = this.route.params.subscribe((params: any) => {
        var txtSearch: string = params['txtSearch'];      
        var keyword: string =  params['keyword'];
        if(txtSearch){
          this.mode = 'search';
          this.query.txtSearch = txtSearch;
          this.title.setTitle(txtSearch + '***');
        }else if(keyword){
          this.mode = 'keyword';
          this.query.keyword = keyword;
          this.title.setTitle(keyword);
        }else {
          this.mode = params['mode'] || 'newest';
          if(this.mode === 'most'){
            this.title.setTitle('Xem nhiều nhất');
          }else if(this.mode === 'hot'){
            this.title.setTitle('Clip HOT nhất');
          }else {
            this.title.setTitle('ClipVNet - kênh video giải trí');
          }
        }
        this.init();
      });
      this.qsub = this.router.routerState.queryParams.subscribe((params:any) => {
        this.initPage = +params.page || 1;
        this.page = this.initPage;
        this.isLastAutoScroll = false;
        this.init();
      });
    }

    init() {
      if(this.isInit) return;      
      this.isInit = true;
      setTimeout(() => {
        this.clearContent(this);
        this.eventService.emit({com: 'video-card-list', action: 'start'});
        this.nextPage(this, () => {
          this.isInit = false;
          this.eventService.emit({com: 'video-card-list', action: 'loaded'});
        });
      }, 100);
    }

    ngOnDestroy(){
      this.gsub.unsubscribe();
      this.qsub.unsubscribe();
      this.sub.unsubscribe();
    }

    nextPage(self:VideoCardListComponent, fcDone: any){
      self.isLoading = true;
      self.eventService.emit({com: 'page-loading', action: 1});
      if(self.mode === 'most'){
        self.videoService.getMostVideos({page: self.page, rows: self.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos, fcDone);
        }, self.drawError);
      }else if(self.mode === 'newest'){        
        self.videoService.getNewestVideos({page: self.page, rows: self.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos, fcDone);
        }, self.drawError);
      }else if(self.mode === 'hot'){
        self.videoService.getHotVideos({page: self.page, rows: self.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos, fcDone);
        }, self.drawError);
      }else if(self.mode === 'search'){
        self.videoService.searchVideos(self.query.txtSearch, {page: self.page, rows: self.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos, fcDone);
        }, self.drawError);
      }else if(self.mode === 'keyword'){        
        self.videoService.getKeywordVideos(self.query.keyword, {page: self.page, rows: self.rows}).subscribe((videos: Array<VideoCard>) => {
          self.drawContent(self, videos, fcDone);
        }, self.drawError);
      }
    }

    drawError(err: any){
      console.error(err);
    }

    clearContent(self: VideoCardListComponent){
      self.viewContainer.clear();
    }

    drawContent(self: VideoCardListComponent, videos: Array<VideoCard>, fcDone: any){            
      if(videos.length === 0) {
        this.isLoading = undefined;
        return fcDone();
      }
      self.cmpResolver.resolveComponent(VideoCardItemComponent)
      .then((factory:ComponentFactory<VideoCardItemComponent>) => {
        var index = self.viewContainer.length;
        for(var i in videos){
          var com: ComponentRef<VideoCardItemComponent> = self.viewContainer.createComponent(factory, index++, self.viewContainer.injector);
          com.instance.item = videos[i];
        }
        self.isLoading = false;
        self.eventService.emit({com: 'page-loading', action: 0});
        fcDone();        
      });      
   }
}