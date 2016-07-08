import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FacebookPageComponent } from './facebook.component';
import { VideoDetailsComponent } from './video-details.component';
import { VideoRelationListComponent } from './video-relation-list.component';
import { VideoDetails, VideoService } from './video.service';


@Component({
    selector: 'video-details-page',
    template: `
      <div class="mdl-grid" *ngIf="item">
        <video-details [item] = "item" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>
        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-page></facebook-page>
          <br/>
          <video-relation-list [query]="{keywords: item.keywords, id: item._id, updateat: item.updateat}" [mode]="'relation'" [page]="1" [rows]="10" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>
        </div>
      </div>
    `,
    providers: [VideoService],
    directives: [VideoDetailsComponent, VideoRelationListComponent, FacebookPageComponent]
})
export class VideoDetailsPageComponent implements OnInit, OnDestroy { 
  item: VideoDetails;
  sub: any;
  filter: any;
  keywords: Array<any>;

  constructor(private route: ActivatedRoute, private videoService: VideoService){
    this.filter = {};
    this.videoService.getKeywords().subscribe(
                 keywords => { this.keywords = keywords; },
                 error =>  console.error(error));
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.videoService.getVideo(params['id']).subscribe(
       (video: VideoDetails) => {
          this.item = video;
          for(let i in this.item.keywords){
            for(let all of this.keywords){
              if(this.item.keywords[i] === all._id){
                this.item.keywords[i] = all;
              }
            } 
          }
       },
       error =>  console.error(error));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}