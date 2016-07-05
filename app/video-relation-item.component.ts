import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VideoCard } from './video.service';
import { GoTop } from './video.directive';

@Component({
    selector: 'video-relation-item',
    template: `
      <li class="mdl-list__item mdl-list__item--three-line">
        <a class="mdl-list__item-primary-content nothing" [routerLink]="['/'+item._id]" go-top>
          <img src="{{item.image}}" width="80" style="float: left; margin-right: 5px;" class="rounded">       
          <div class="main-color title">{{item.title}}</div>
          <span class="mdl-list__item-text-body des-color">
            <i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}
          </span>
        </a>
      </li>
    `,
    directives: [ROUTER_DIRECTIVES, GoTop]
})
export class VideoRelationItemComponent { 
  @Input()
  item: VideoCard;
}