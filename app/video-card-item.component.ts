import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VideoCard } from './video.service';
import { GoTop } from './video.directive';

@Component({
    selector: 'video-card-item',
    template: `
    <a [routerLink]="['/'+item._id]" class="nothing" go-top>
      <div class="mdl-card__title">
         <h4 class="mdl-card__title-text main-color">{{item.title}}</h4>
      </div>      
      <div class="mdl-card__media">        
        <img src="{{item.image}}">
      </div>
      <div class="howlong"><i class="material-icons dp48">alarm</i>14p40"</div>
      <div class="mdl-card__supporting-text icon-des mdl-grid des-color">
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"><i class="material-icons dp48">tag_faces</i> {{item.creator}}</div>
        <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"><i class="material-icons dp48">alarm_on</i> {{item.nowOnTime}}</div>
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
    },
    directives: [GoTop, ROUTER_DIRECTIVES]
})
export class VideoCardItemComponent { 
  @Input()
  item: VideoCard;
}