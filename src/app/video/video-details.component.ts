import { Component, Input, OnInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { VideoDetails, VideoService } from '../video.service';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { GoTop } from '../video.directive';
import { FacebookCommentComponent, FacebookShareComponent, FacebookPlayerComponent, YoutubePlayerComponent, Html5PlayerComponent } from '../facebook.component';

declare const location: any;

@Component({
    selector: 'video-details',
    template: `
      <div class="mdl-card mdl-cell--12-col" *ngIf="item">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="width: initial;">          
          <div class="mdl-grid mdl-grid--no-spacing">
            <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--4-col-phone mdl-cell--top">
              <i class="material-icons dp48">tag_faces</i>
              &nbsp;{{item.creator}}&nbsp;&nbsp;
              <i class="material-icons dp48">alarm_on</i>
              &nbsp;{{item.nowOnTime}}&nbsp;&nbsp;
              <i class="material-icons dp48">alarm</i>
              &nbsp;14p40"&nbsp;&nbsp;
            </div>
            <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--4-col-phone mdl-cell--top facebook-share" align="right">
              <button id="btnFavorite" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--primary" (click)="favorite($event)" title="{{isFavorite ? 'Xóa khỏi': 'Thêm vào'}} danh sách yêu thích">
                <i class="material-icons" *ngIf="!isFavorite">favorite_border</i>
                <i class="material-icons" *ngIf="isFavorite" title="">favorite</i>
              </button>
              <facebook-share [title]="item.title" [description]=[item.title] [picture]="item.image" [caption]="abc"></facebook-share>              
            </div>
          </div>
        </div>
        <div class="videoWrapper">        
          <youtube-player [link]="item.link" *ngIf="item.youtubeid"></youtube-player>
          <facebook-player [link]="item.link" *ngIf="item.facebookid"></facebook-player>
          <html5-player [link]="item.link" *ngIf="!item.youtubeid && !item.facebookid"></html5-player>          
        </div>
        <div class="keywords">
          <a *ngFor="let k of item.keywords" go-top style="float: left;" class="mdl-button mdl-js-button" [routerLink]="['/k/'+k._id]">{{k.name}}</a>
        </div>
        <hr style="clear: both"/>
        <facebook-comment [link]="locationHref"></facebook-comment>
      </div>
    `,
    styles: ['.mdl-card__supporting-text, .mdl-card__supporting-text i {font-size: 12px}'],    
    directives: [GoTop, FacebookCommentComponent, FacebookShareComponent, ROUTER_DIRECTIVES, FacebookPlayerComponent, YoutubePlayerComponent, Html5PlayerComponent]
})
export class VideoDetailsComponent implements OnChanges, OnInit, OnDestroy { 
  @Input() item: VideoDetails;
  isFavorite:boolean;
  locationHref: string;
  gsub: any;
  isChecked: boolean= false;

  constructor(private title: Title, private videoService: VideoService, private eventService: EventService, private userService: UserService){
    
  }

  ngOnInit(){
    this.gsub = this.eventService.emitter.subscribe((data: any) => {
      if(data.com === 'facebook'){
        if(data.action === 'login'){
          if(data.data){
            this.checkFavorite();
          }
        }     
      }
    });
  }

  ngOnDestroy(){
    this.gsub.unsubscribe();
  }

  checkFavorite(){
    if(!this.userService.currentUser) return;
    this.isChecked = true;
    this.isFavorite = this.userService.currentUser.favorites.findIndex((e, idx, arr) => {
      if(e._id === this.item._id) return true;
      return false;
    }) != -1;
  }

  favorite(){
    if(!this.isFavorite){
      this.videoService.addFavorite(this.item).subscribe(
       (v: any) => { 
          if(v.length > 0){
            this.userService.currentUser.favorites = v;
            this.userService.save();
            this.eventService.emit({com: 'snack-bar', msg: 'Đã thêm vào danh sách yêu thích'}); 
          }else{
            this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}); 
          }
       },
       error =>  this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}));
    }else{
      this.videoService.removeFavorite(this.item._id).subscribe(
       (v: any) => {             
          this.userService.currentUser.favorites = v;
          this.userService.save();
          this.eventService.emit({com: 'snack-bar', msg: 'Đã xóa khỏi danh sách yêu thích'}); 
       },
       error =>  this.eventService.emit({com: 'snack-bar', msg: 'Có lỗi trong quá trình xử lý'}));
    }
    this.isFavorite = !this.isFavorite;
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    this.locationHref = location.href;
    this.title.setTitle(this.item.title);    
    this.checkFavorite();
    this.isChecked = false;
  }
}