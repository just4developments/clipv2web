import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChange, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

import { EventService } from '../event.service';
import { VideoCard, VideoService } from '../video.service';
import { GoTop } from '../video.directive';
import { FacebookCommentComponent, FacebookPageComponent, FacebookShareComponent, FacebookLikeComponent } from '../facebook.component';

import { Observable }     from 'rxjs/Observable';

declare var componentHandler: any;
declare const FB:any;

///////////////////////////////////////////////////////////////////

@Component({
    selector: 'user-menu',
    template: `
      <li class="mdl-menu__item">{{user.name}}</li>
      <li class="mdl-menu__item" (click)="goto('my-video')">Post</li>
      <li class="mdl-menu__item" (click)="logout()">Logout</li>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class UserMenuComponent implements AfterViewInit { 
  @Input()
  user: any;

  constructor(private eventService:EventService, private router: Router){

  }

  ngAfterViewInit() {      
    componentHandler.upgradeDom();
  }

  goto(path: string){
    this.router.navigateByUrl(path);
  }

  logout(){
    FB.logout((res:any) => {
      this.eventService.emit({com: 'facebook', action: 'logout'});
    });
  }
}




