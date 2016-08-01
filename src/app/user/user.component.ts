import { Component, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { EventService } from '../event.service';
import { VideoService } from '../video.service';

declare const FB:any;

@Component({
    selector: 'user-menu',
    template: `
      <li class="mdl-menu__item" disabled>{{user.name}}</li>
      <li class="mdl-menu__item" [routerLink]="['/my-video']"><i class="material-icons">sentiment_very_satisfied</i> Video của tôi</li>
      <li class="mdl-menu__item" (click)="logout()"><i class="material-icons">power_settings_new</i> Logout</li>
    `,
    styles: ['i { position: relative; top: 6px;}'],
    directives: [ROUTER_DIRECTIVES]
})
export class UserMenuComponent implements AfterViewInit { 
  @Input() user: any;

  constructor(private eventService:EventService, private videoService: VideoService){

  }

  ngAfterViewInit() {      
    this.videoService.upgradeDom();
  }

  logout(){
    FB.logout((res:any) => {
      this.eventService.emit({com: 'facebook', action: 'logout'});
    });
  }
}





