import { Component, Input, OnInit, OnDestroy, NgZone, OnChanges, SimpleChange, ElementRef, EventEmitter, Output, HostListener, ComponentResolver, ViewContainerRef, ComponentFactory, ViewChild, ComponentRef, AfterViewInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VideoCard, VideoService } from '../video.service';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
    selector: 'user-favorite-video',
    template: `
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--border">
          <h6 class="mdl-card__title-text" [routerLink]="['/my-video']">Video yêu thích của tôi</h6>
          <div class="mdl-layout-spacer"></div>
          <i class="material-icons mdl-list__item-icon">favorite</i>
        </div>
        <ul class="mdl-list" *ngIf="videos && videos.length > 0">
          <li class="mdl-list__item mdl-list__item--three-line" style="width: 100%" *ngFor="let item of videos">
            <a class="mdl-list__item-primary-content nothing" [routerLink]="['/detail', item._id, item.title0]">
              <img src="{{item.image}}" *ngIf="!item.youtubeid" width="100" style="float: left; margin-right: 5px;" class="rounded">
              <img src="http://i.ytimg.com/vi/{{item.youtubeid}}/1.jpg" *ngIf="item.youtubeid" width="100" style="float: left; margin-right: 5px;" class="rounded">
              <div class="main-color title">{{item.title}}</div>
              <span class="mdl-list__item-text-body des-color">
                {{item.updateat | date: 'dd/MM/yyyy'}}
              </span>
            </a>
            <a class="mdl-list__item-secondary-action" href="javascript:void(0)" (click)="remove(item)"><i class="material-icons">remove_circle</i></a>
          </li>          
        </ul>
        <div class="mdl-card__supporting-text" *ngIf="!videos || videos.length === 0">
          Không tìm thấy video nào
        </div>
      </div>
    `,
    styles: ['.mdl-card {min-height: 0px}'],
    directives: [ROUTER_DIRECTIVES]
})
export class UserFavoriteVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() rows:number;
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
    if(this.rows) this.videos = this.userService.currentUser.favorites.slice(0, this.rows);
    else this.videos = this.userService.currentUser.favorites;
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
    this.videoService.removeFavorite(item._id).subscribe(
     (v: any) => {        
       this.userService.currentUser.favorites = v;
       this.userService.save();
       this.loadMyVideo();
       this.eventService.emit({com: 'snack-bar', msg: 'Đã xóa khỏi danh sách yêu thích'}); 
     },
     error =>  console.error(error));
  }
}
