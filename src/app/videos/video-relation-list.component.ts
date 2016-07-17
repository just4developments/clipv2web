import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { VideoCard, VideoService } from '../video.service';
import { VideoRelationItemComponent } from './video-relation-item.component';

@Component({
    selector: 'video-relation-list',
    template: `
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--border">
          <h6 class="mdl-card__title-text">{{title}}</h6>
          <div class="mdl-layout-spacer"></div>
          <i class="material-icons mdl-list__item-icon">videocam</i>
        </div>
        <ul class="mdl-list">
          <video-relation-item style="width: 100%" *ngFor="let v of videosRelation" [item]="v"></video-relation-item>
        </ul>
      </div>
    `,
    directives: [VideoRelationItemComponent]
})
export class VideoRelationListComponent implements OnInit, OnChanges { 
  @Input() mode: string;
  @Input() page: number;
  @Input() rows: number;
  @Input() query: any = {};

  title: string;
  videosRelation: VideoCard[] = [];
  
  constructor(private videoService: VideoService){
    
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){    
    if(this.mode === 'relation'){      
      this.title = 'Video liên quan';
      this.videoService.getRelateVideos(this.query.id, this.query.keywords, this.query.updateat, {page: this.page, rows: this.rows}).subscribe(
                       (videos: Array<VideoCard>) => {this.videosRelation = videos;},
                       error =>  console.error(error));  
    }
  }

  ngOnInit(){
    if(this.mode === 'most'){
      this.title = 'Video xem nhiều nhất';
      this.videoService.getMostVideos({page: this.page, rows: this.rows}).subscribe(
                       (videos: Array<VideoCard>) => {this.videosRelation = videos;},
                       error =>  console.error(error));
    }else if(this.mode === 'hot'){
      this.title = 'Video hot';
      this.videoService.getHotVideos({page: this.page, rows: this.rows}).subscribe(
                       (videos: Array<VideoCard>) => {this.videosRelation = videos;},
                       error =>  console.error(error));
    }
  }
}