import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { VideoCard, VideoService } from '../video.service';
import { UserService } from '../user.service';
import { EventService } from '../event.service';
import { UserSearchVideoComponent } from './user-search-video.component';
import { UserListVideoComponent } from './user-list-video.component';
import { UserFavoriteVideoComponent } from './user-favorite-video.component';

@Component({
    selector: 'user-video-page',
    template: `
      <div class="mdl-grid" *ngIf="userService.currentUser">
        <div class="mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <user-search-video (added)="addedMyVideo($event)"></user-search-video>
          <br/>
        </div>
        <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--top">
          <user-list-video #myvideo></user-list-video>
          <br/>
          <br/>
          <user-favorite-video></user-favorite-video>
        </div>
      </div>
    `,
    directives: [UserSearchVideoComponent, UserListVideoComponent, UserFavoriteVideoComponent]
})
export class UserVideoPageComponent implements OnInit, OnDestroy { 
  @ViewChild('myvideo') myvideo:UserListVideoComponent;
  myvideos: Array<VideoCard>;
  myfavories: Array<VideoCard>;
  isLoaded: boolean= false;
  gsub: any;

  constructor(private userService: UserService, private videoService: VideoService, private eventService: EventService){

  }

  loadMyVideo(){
    if(!this.userService.currentUser || this.isLoaded) return;    
    this.isLoaded = true;
    this.myfavories = this.userService.currentUser.favorites;
    this.videoService.getMyVideo().subscribe(
                 videos => { this.myvideos = videos; },
                 error =>  console.error(error));
  }

  ngOnInit(){
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'facebook'){
        if(data.action === 'login'){
          if(data.data){
            this.loadMyVideo();
          }
        }     
      }
    });    
    this.loadMyVideo();
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  addedMyVideo(item: VideoCard){
    this.myvideo.add(item);
  }
}