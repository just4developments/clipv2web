import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';

import { FacebookLikeComponent } from '../facebook.component';
import { VideoDetailsComponent } from './video-details.component';
import { VideoRelationListComponent } from '../videos';
import { VideoDetails, VideoService } from '../video.service';

@Component({
    selector: 'video-details-page',
    template: `
      <div class="mdl-grid" *ngIf="item">
        <video-details [item] = "item" class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-details>
        <div                       class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <video-relation-list [query]="{keywords: item.keywords, id: item._id, updateat: item.updateat}" [mode]="'relation'" [page]="1" [rows]="10" class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top"></video-relation-list>
        </div>
      </div>
    `,
    directives: [VideoDetailsComponent, VideoRelationListComponent, FacebookLikeComponent, CORE_DIRECTIVES]
})
export class VideoDetailsPageComponent implements OnInit { 
  item: VideoDetails;

  constructor(private route: ActivatedRoute, private videoService: VideoService){    
    this.route.data.subscribe((data: any) => {      
      this.item = data.video;      
    });
  }

  ngOnInit(){
    
  }


}