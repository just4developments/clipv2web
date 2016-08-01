import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VideoCard } from '../video.service';
import { HowlongPipe } from '../filter.pipe';

@Component({
    selector: 'video-relation-item',
    template: `
      <li class="mdl-list__item mdl-list__item--three-line">
        <a class="mdl-list__item-primary-content nothing" [routerLink]="['/detail', item._id, item.title0]">          
          <div class="img-des">
            <img src="{{item.image}}" width="100" class="rounded" *ngIf="!item.youtubeid">
            <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg" width="100" style="float: left; margin-right: 5px;" class="rounded" *ngIf="item.youtubeid">                    
            <div class="howlong"><i class="material-icons dp48">alarm</i>{{item.duration | HowlongPipe}}</div>
          </div>
          <div class="main-color title">{{item.title}}</div>
          <span class="mdl-list__item-text-body des-color">
            <i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}
          </span>
        </a>
      </li>
    `,
    pipes: [HowlongPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class VideoRelationItemComponent { 
  @Input() item: VideoCard;
}