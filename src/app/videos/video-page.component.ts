import { Component, OnInit, OnDestroy } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { VideoRelationListComponent } from './video-relation-list.component';
import { FacebookLikeComponent } from '../facebook.component';
import { EventService } from '../event.service';

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
          <br/>
          <div class="fixed-col">
            <video-relation-list [mode]="'most'" [page]="1" [rows]="12"></video-relation-list>
            <br/>
            <br/>
            <video-relation-list [mode]="'hot'" [page]="1" [rows]="12"></video-relation-list>
          </div>
        </div>
      </div>
    `,
    directives: [VideoRelationListComponent, FacebookLikeComponent, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class VideoPageComponent implements OnInit, OnDestroy { 

  constructor(private eventService: EventService){
    
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.eventService.emit({com: 'video-card-list', action: 'stop'});    
  }


}