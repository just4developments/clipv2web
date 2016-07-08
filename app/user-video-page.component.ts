import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { VideoCard, VideoService } from './video.service';
import { UserSearchVideoComponent } from './user-search-video.component';
import { UserListVideoComponent } from './user-list-video.component';

@Component({
    selector: 'user-video-page',
    template: `
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <user-search-video (added)="added($event)"></user-search-video>
        </div>
        <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <user-list-video #myvideo></user-list-video>
        </div>
      </div>
    `,
    directives: [UserSearchVideoComponent, UserListVideoComponent]
})
export class UserVideoPageComponent implements AfterViewInit { 
  @ViewChild('myvideo') myvideo:UserListVideoComponent;

  constructor(){

  }

  ngAfterViewInit() {      
    
  }

  added(item: any){
    this.myvideo.add(item);
  }
}