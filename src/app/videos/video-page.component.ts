import { Component, OnInit, OnDestroy } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { VideoRelationListComponent } from './video-relation-list.component';
import { FacebookLikeComponent } from '../facebook.component';
import { UserFavoriteVideoComponent } from '../user/user-favorite-video.component'; 
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
    selector: 'video-page',
    template: `
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">                 
          <router-outlet></router-outlet>
        </div>
        <div                class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <facebook-like *xl class="mdl-card"></facebook-like>
          <br/>
          <div class="fixed-col">
            <user-favorite-video [rows]="3" *ngIf="userService.currentUser"></user-favorite-video>            
            <video-relation-list [mode]="'most'" [page]="1" [rows]="8"></video-relation-list>
            <br/>
            <video-relation-list [mode]="'hot'" [page]="1" [rows]="8"></video-relation-list>
          </div>
        </div>
      </div>
    `,
    directives: [VideoRelationListComponent, FacebookLikeComponent, CORE_DIRECTIVES, ROUTER_DIRECTIVES, UserFavoriteVideoComponent]
})
export class VideoPageComponent implements OnInit, OnDestroy { 

  constructor(private eventService: EventService, private userService: UserService){
    
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.eventService.emit({com: 'video-card-list', action: 'stop'});    
  }


}