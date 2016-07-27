import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { VideoCard } from '../video.service';
import { HowlongPipe } from '../filter.pipe';

@Component({
    selector: 'video-card-item',
    template: `
    <a [routerLink]="['/'+item._id+'/'+item.title0]" class="nothing">
      <div class="mdl-card__title">
         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>
      </div>      
      <div class="mdl-card__media">
        <img src="{{item.image}}"                                 *ngIf="!item.youtubeid">
        <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/mqdefault.jpg" *ngIf="item.youtubeid">
      </div>
      <div class="howlong" *ngIf="item.duration"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>
      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.creator}}"><i class="material-icons dp48">tag_faces</i> {{item.creator}}</div>
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone ellipsis-1" title="{{item.nowOnTime}}"><i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}</div>
      </div>
    </a>
    `,
    host: {
      '[class.mdl-card]': 'true',
      '[class.mdl-shadow--2dp]': 'true',
      '[class.mdl-cell]': 'true',
      '[class.mdl-cell--4-col]': 'true',
      '[class.mdl-cell--4-col-tablet]': 'true',
      '[class.mdl-cell--4-col-phone]': 'true'
    },
    pipes: [HowlongPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class VideoCardItemComponent implements OnInit { 
  @Input() item: VideoCard;
  url: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizationService){
    
  }

  ngOnInit(){
    this.url = this.sanitizer.bypassSecurityTrustUrl(this.item.image);   
  }
}