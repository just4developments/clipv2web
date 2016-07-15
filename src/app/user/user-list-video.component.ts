import { Component, Input, OnInit, OnDestroy, NgZone, OnChanges, SimpleChange, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VideoCard, VideoService } from '../video.service';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { GoTop } from '../video.directive';

@Component({
    selector: 'user-list-video',
    template: `
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--border">
          <h6 class="mdl-card__title-text">My videos</h6>
          <div class="mdl-layout-spacer"></div>
          <i class="material-icons mdl-list__item-icon">videocam</i>
        </div>
        <ul class="mdl-list" *ngIf="videos">
          <li class="mdl-list__item mdl-list__item--three-line" style="width: 100%" *ngFor="let item of videos">
            <a class="mdl-list__item-primary-content nothing" [routerLink]="['/'+item._id]" go-top>
              <img src="{{item.image}}" *ngIf="!item.youtubeid" width="80" style="float: left; margin-right: 5px;" class="rounded">
              <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/0.jpg" *ngIf="item.youtubeid" width="80" style="float: left; margin-right: 5px;" class="rounded">
              <div class="main-color title">{{item.title}}</div>
              <span class="mdl-list__item-text-body des-color">
                {{item.updateat | date: 'dd/MM/yyyy'}}
              </span>
            </a>
            <a class="mdl-list__item-secondary-action" href="javascript:void(0)" (click)="remove(item)" *ngIf="!item.status"><i class="material-icons">remove_circle</i></a>
          </li>
        </ul>
      </div>
    `,
    directives: [ROUTER_DIRECTIVES, GoTop]
})
export class UserListVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  videos: Array<VideoCard>;
  isLoaded: boolean= false;
  gsub: any;

  constructor(private zone: NgZone, private videoService: VideoService, private eventService: EventService, private userService: UserService){
    
  }

  ngOnInit(){
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'facebook'){
        if(data.action === 'login'){
          if(data.data){
            this.zone.run(()=>{
              this.loadMyVideo();
            });
          }
        }     
      }
    });
    this.loadMyVideo();
  }

  loadMyVideo(){
    if(!this.userService.currentUser) return;
    this.videoService.getMyVideo().subscribe(
                 videos => { this.videos = videos; },
                 error =>  console.error(error));     
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  ngAfterViewInit() {      
    
  }

  public add(item: VideoCard){
    this.videos.splice(0, 0, item);
  }

  remove(item: VideoCard){
    this.videoService.removeVideo(item._id).subscribe(
                       (v: any) => { 
                         this.videos.splice(this.videos.indexOf(item), 1);
                         this.eventService.emit({com: 'snack-bar', msg: 'Removed done'}); 
                       },
                       error =>  console.error(error));
  }
}
